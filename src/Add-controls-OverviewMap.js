import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {OverviewMap, defaults as defaultControls} from 'ol/control';

var overviewMapControl = new OverviewMap({
    // see in overviewmap-custom.html to see the custom CSS used
    className: 'ol-overviewmap ol-custom-overviewmap',
    layers: [
        new TileLayer({
        source: new OSM()
        }),
    ],
    collapsed: false    
});

var map = new Map({
    controls: defaultControls().extend([overviewMapControl]),
    view: new View({
        projection: 'EPSG:4326',
        center: [127.1698, 37.7617],
        zoom: 7        
    }),
    layers: [
        new TileLayer({
        source: new OSM()
        }),
    ],
    target: 'map'
});