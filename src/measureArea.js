import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { TileSuperMapRest, MeasureParameters, MeasureService } from '@supermap/iclient-ol';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw';

const url = "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";

const map = new Map({
  target: 'map', //지도 컨테이너 ID
  view: new View({
      center: [100, 0], //지도의 중심점
      zoom: 4, //지도의 초기 해상도를 계산하는 확대/축소 레벨
      projection: 'EPSG:4326' //지도 좌표계
  })
});

const layer = new TileLayer({
      source: new TileSuperMapRest({
          url: url, //SuperMap iServer에 발행된 맵서비스 주소
          wrapX: true //타일을 반경선 너머로 렌더링
      }),
      projection: 'EPSG:4326' //레이어 좌표계
});

map.addLayer(layer);

//거리측정 layer추가
var vectorSource = new VectorSource({
    wrapX: false
});

var vectorLayer = new VectorLayer({
    source: vectorSource
});

map.addLayer(vectorLayer);

//그리기 유형 설정
var interaction = new Draw({
    source: vectorSource,
    type: "Polygon" //도형 유형
});

//그리기
var feature;
interaction.on('drawstart', function (evt) {
    feature = evt.feature;
});

interaction.on('drawend', function () {
    
    var distanceMeasureParam = new MeasureParameters(feature.getGeometry());
    
    new MeasureService(url, {measureMode: ""}).measureDistance(distanceMeasureParam, function (serviceResult) {
        alert(serviceResult.result.distance + "sq.m", true);
    });
});

map.addInteraction(interaction);