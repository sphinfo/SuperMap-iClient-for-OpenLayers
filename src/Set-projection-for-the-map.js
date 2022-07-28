import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import Projection from 'ol/proj/Projection';

var custProj = new Projection({
    code: 'EPSG:4326'
});

var map = new Map({
    view: new View({
        projection: custProj.projection,
        center: [0, 0],
        zoom: 2        
    }),
    layers: [
        new TileLayer({
        source: new OSM()
        }),
    ],
    target: 'map'
});