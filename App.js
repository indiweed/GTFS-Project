import React from 'react';
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';
import Layers from './components/Layers/Layers';

class App extends React.Component {
    render () {
        return (
        <div>
            <Layers />
            <Sidebar />
            <Map />
        </div>
        )
    };

}

export default App