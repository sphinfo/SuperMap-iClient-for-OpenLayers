import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {Zoom, defaults as defaultControls} from 'ol/control';

var zoomControl = new Zoom({
    zoomInLabel: '확대',
    zoomOutLabel : '축소'
});

var map = new Map({
    controls: defaultControls().extend([zoomControl]),
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