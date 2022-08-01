import 'ol/ol.css';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import {getRenderPixel} from 'ol/render';

//base
var baseLayer = new TileLayer({
    source: new XYZ({
        url: 'https://api.vworld.kr/req/image?service=image&version=2.0&request=getmap&key=[your own API key]&format=png&basemap=GRAPHIC&center=126.978275264,37.566642192&crs=epsg:4326&zoom=16&size=400,400'
    })
});

//회색지도
var glayLayer = new TileLayer({
    source: new XYZ({
        url: 'https://api.vworld.kr/req/image?service=image&version=2.0&request=getmap&key=[your own API key]&format=png&basemap=GRAPHIC_GRAY&center=126.978275264,37.566642192&crs=epsg:4326&zoom=16&size=400,400'
    })
});

var map = new Map({
    view: new View({
        center: [0, 0],
        zoom: 2        
    }),
    layers: [baseLayer,glayLayer],
    target: 'map'
});

var swipe = document.getElementById('swipe');

glayLayer.on('prerender', function (event) {
  const ctx = event.context;
  const mapSize = map.getSize();
  const width = mapSize[0] * (swipe.value / 100);
  const tl = getRenderPixel(event, [width, 0]);
  const tr = getRenderPixel(event, [mapSize[0], 0]);
  const bl = getRenderPixel(event, [width, mapSize[1]]);
  const br = getRenderPixel(event, mapSize);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(tl[0], tl[1]);
  ctx.lineTo(bl[0], bl[1]);
  ctx.lineTo(br[0], br[1]);
  ctx.lineTo(tr[0], tr[1]);
  ctx.closePath();
  ctx.clip();
});

glayLayer.on('postrender', function (event) {
  const ctx = event.context;
  ctx.restore();
});

const listener = function () {
  map.render();
};
swipe.addEventListener('input', listener);
swipe.addEventListener('change', listener);