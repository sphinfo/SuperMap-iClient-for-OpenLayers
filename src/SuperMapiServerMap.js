import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { TileSuperMapRest } from '@supermap/iclient-ol';

var url = "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
var map = new Map({
  target: 'map', //지도 컨테이너 ID
  view: new View({
      center: [0, 0], //지도의 중심점
      zoom: 2, //지도의 초기 해상도를 계산하는 확대/축소 레벨
      projection: 'EPSG:4326' //지도 좌표계
  })
});

var layer = new TileLayer({
      source: new TileSuperMapRest({
          url: url, //SuperMap iServer에 발행된 맵서비스 주소
          wrapX: true, //세계를 가로로 감쌀지 여부
          projection: 'EPSG:4326' //레이어 좌표계
      })
});

map.addLayer(layer);