import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { TileSuperMapRest } from '@supermap/iclient-ol';

var url = "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
var map = new Map({
  target: 'map',
  view: new View({
      center: [0, 0],
      zoom: 2,
      projection: 'EPSG:4326'
  })
});
var layer = new TileLayer({
      source: new TileSuperMapRest({
          url: url,
          wrapX: true,
          projection: "EPSG:4326"
      })
});
map.addLayer(layer);