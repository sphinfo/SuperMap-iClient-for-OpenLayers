import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {FullScreen, defaults as defaultControls} from 'ol/control';

var map = new Map({
  controls: defaultControls().extend([
    new FullScreen({
        source: 'fullscreen'
    })
  ]),
  target: 'map',
  view: new View({
      center: [0, 0],
      zoom: 1,
      projection: 'EPSG:4326'
  })
});

var layer = new TileLayer({
      source: new OSM()
});

map.addLayer(layer);