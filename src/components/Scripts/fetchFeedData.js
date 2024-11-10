import React from "react";
import { fetchFeed } from "./fetchFeed";
import ldb from 'localdata';

const fetchFeedData = async (feed_route, feed_trips, feed_shapes) => {
        
    const tableRoutes = await fetchFeed(feed_route);
    const tableTrips = await fetchFeed(feed_trips);
    const tableShapes = await fetchFeed(feed_shapes);
    
    console.log(tableRoutes, tableTrips, tableShapes);

    const routeToTrips = tableTrips.reduce((acc, {route_id, trip_id, direction_id, shape_id}) => {
        if (!acc[route_id]) {
            acc[route_id] = {};
        }
          acc[route_id][trip_id] = [direction_id, shape_id];
          return acc;
    })
    console.log('routetotrips', routeToTrips)

    const tripsToShapes = tableShapes.reduce((accumulator, item) => {
        const { shape_id, shape_pt_lat, shape_pt_lon } = item;
        
        if (!accumulator[shape_id]) {
          accumulator[shape_id] = [];
        }
        
        accumulator[shape_id].push([parseFloat(shape_pt_lat), parseFloat(shape_pt_lon)]);
      
        return accumulator;
      }, {})
    console.log('tripstoshapes', tripsToShapes)
    
    ldb.set('routes', routeToTrips)
    ldb.set('shapes', tripsToShapes)
};

export {fetchFeedData}