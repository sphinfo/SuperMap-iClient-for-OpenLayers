import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {Zoom, ZoomSlider, defaults as defaultControls} from 'ol/control';

var zoomControl = new Zoom({
    // zoomInLabel: '확대', //확대버튼라벨
    // zoomOutLabel : '축소', //축소버튼라벨
    zoomInTipLabel: '확대', //확대버튼 팁라벨
    zoomOutTipLabel: '축소' //축소버튼 팁라벨
});

var map = new Map({
    controls: defaultControls().extend([zoomControl,new ZoomSlider()]),
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
