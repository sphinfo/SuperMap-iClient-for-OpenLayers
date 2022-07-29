import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {ScaleLine,  defaults as defaultControls} from 'ol/control';

var scaleLineControl = new ScaleLine({
    units: 'us'
});

var map = new Map({
    controls: defaultControls().extend([scaleLineControl]),
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