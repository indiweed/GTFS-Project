import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../Map/map.css';
import routes from '../../feedfeed/routes.txt';
import trips from '../../feedfeed/trips.txt';
import shapes from '../../feedfeed/shapes.txt';
import stops from '../../feedfeed/stops.txt';
import ldb from 'localdata';
import { fetchExtractData } from '../Scripts/fetchExtractData';
import { fetchFeedData } from '../Scripts/fetchFeedData';
import { fetchFilterData } from '../Scripts/fetchFilterData';
import { routeMap } from '../Scripts/routeMap';
import { addStops } from '../Scripts/addStops';
import { getRouteValue } from '../Scripts/getRouteValue';

export default function Map() {

    const addFiniteMarkers = async (data) => {
        let markers = [];
        if (!data || data.length === 0) return;

        if (document.querySelectorAll('.maplibregl-marker').length > 0) {
            document.querySelectorAll('.maplibregl-marker').forEach(marker => marker.remove());
            console.log('маркеры удалены')
        }

        if (map.current.getSource('clusterData')) {
            deleteClusters();
        }

        const coordinates = await data.flat().map(innerArray => [innerArray[1], innerArray[0]]); 

        const route = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: coordinates,
            },
        };

        if (map.current) {
            if (!map.current.getSource('route')) {
                map.current.addSource('route', {
                    type: 'geojson',
                    data: route,
                });
            } else {
                map.current.getSource('route').setData(route);
            }

            if (!map.current.getLayer('route')) {
                map.current.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    paint: {
                        'line-color': '#888',
                        'line-width': 5,
                    },
                });
            }
        }

        markers.forEach(marker => marker.remove());
        markers = []; 

            const startMarker = new maplibregl.Marker({ color: 'green' })
                .setLngLat(coordinates[0])
                .addTo(map.current);
            markers.push(startMarker); 

            const endMarker = new maplibregl.Marker({ color: 'red' })
                .setLngLat(coordinates[data[0].length - 1])
                .addTo(map.current);
            markers.push(endMarker); 
        
        map.current.flyTo({ center: coordinates[0] });  
        let index = 0;

        const marker = new maplibregl.Marker({ color: 'blue' }) // Анимированная точка
            .setLngLat(coordinates[index])
            .addTo(map.current);

        const animateMarker = () => {
            if (index < coordinates.length) {
                marker.setLngLat(coordinates[index]);
                index++;
                requestAnimationFrame(animateMarker);
            }
            else {marker.remove()}
        };
        animateMarker()       
    };

    const addStopsMarkers = async (routeCoord) => {
        deleteMarkers();
        if (!routeCoord || !Array.isArray(routeCoord) || routeCoord.length === 0) return;
        const geojsonData = {
            type: 'FeatureCollection',
            features: routeCoord.map(coord => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [coord[1], coord[0]],
                }
            })),
        };
    
        addClusters(geojsonData)
    };

    const deleteMarkers = () => {
        document.querySelectorAll('.maplibregl-marker').forEach(marker => marker.remove());

        if (map.current.getSource('route')) {
            map.current.removeLayer('route');
            map.current.removeSource('route');
        }
    }

    const deleteClusters = () => {
        if (map.current.getSource('clusterData')) {
            map.current.removeLayer('clusters');
            map.current.removeLayer('cluster-count');
            map.current.removeLayer('unclustered-point');
            map.current.removeSource('clusterData');
        }
    };
    
    const addClusters = (data) => {
        if (!map.current.getSource('clusterData')) {
            map.current.addSource('clusterData', {
                type: 'geojson',
                data: data,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            });
            map.current.addLayer({
                id:'clusters',
                type: 'circle',
                source: 'clusterData',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#51bbd6',
                        100,
                        '#f1f075',
                        750,
                        '#f28cb1'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        100,
                        30,
                        750,
                        40
                    ]
                }
            })
            map.current.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'clusterData',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });
            map.current.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'clusterData',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 10,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });
        }
    };

    const mapContainer = useRef(null);
    const map = useRef(null);
    const lng = 30.312481;
    const lat = 59.938480;
    const zoom = 10;
    const API_KEY = 'MOGPDQoSiODCq4OuWQMJ';

    useEffect(() => {
        if (map.current) return;
        ldb.clear(function () {
            console.log('Storage cleared')
        });

        fetchFeedData(routes, trips, shapes)

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom,
        });
        map.current.addControl(new maplibregl.NavigationControl());

        const elements = document.querySelectorAll('.items');
        const checkboxEl = document.querySelectorAll('#stops');

        checkboxEl.forEach(e => {
            e.addEventListener('click', () => {
                if (!e.checked) {
                    deleteClusters()
                    return
                }
                addStops(stops, (stopsCoord) => {
                    addStopsMarkers(stopsCoord)
                    console.log('Остановки отображены!')
                })
            })
        })

        elements.forEach(e => {
            e.addEventListener('click', (event) => {
                if (event.target.tagName === 'BUTTON') {
                    event.stopPropagation();
                    const routeId = getRouteValue(event.target);
                    checkboxEl.forEach(e => e.checked = false);
                    ldb.get('routes', function(routeValues) {
                        fetchExtractData(routeValues, routeId, (data) => {
                            console.log('Количество рейсов по маршруту', Object.keys(routeValues[routeId]).length)
                            let dirId = 0;
                            if (event.target.classList.contains('direct_button')) {
                                dirId = 1;
                            }
                            else if (event.target.classList.contains('circular')) {
                                dirId = [0, 1];
                            }
                            const track = routeMap(data, dirId)
                            ldb.get('shapes', function (shapesValues) {
                                fetchFilterData(shapesValues, track, (coordsOfRoute) => {
                                    addFiniteMarkers(coordsOfRoute)
                                    console.log('Маршрут построен!')
                                })
                            })
                        })
                    })
                }
            });
        });

    }, [lng, lat, zoom, API_KEY]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}