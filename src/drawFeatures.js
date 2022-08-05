import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { TileSuperMapRest } from '@supermap/iclient-ol';
import Control from 'ol/control/Control';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Snap';

const container = document.getElementById('popup');

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

//그리기 영역 추가
const info = new Control({element: container});
info.setMap(map);

map.addControl(info);

//그리는 개체 layer 추가
var vectorSource = new VectorSource({
    wrapX: false
})

var vectorLayer = new VectorLayer({
    source: vectorSource
});

map.addLayer(vectorLayer);

//그리기 이벤트 설정
var draw;
var snap;
var buttons = $('.btn-group').children();

buttons.map(function (key) {

    var value = buttons[key].value;

    if (value === 'None') {
        $(buttons[key]).on('click', function () {
            clearInteraction();
        });
        return;
    }
    if (value === 'Clear') {
        $(buttons[key]).on('click', function () {
            clearInteraction();
            vectorSource.clear();
        });
        return;
    }
    $(buttons[key]).on('click', function () {
        clearInteraction();

        draw = new Draw({
            source: vectorSource,
            type: buttons[key].value,
            snapTolerance: 20,
            freehand: true //필기그리기 
        });

        map.addInteraction(draw);

        //그리는 동안 스냅 처리
        snap = new Snap({
            source: vectorSource
          });
          
        map.addInteraction(snap);
    });
});

function clearInteraction() {

    if (draw) {
        map.removeInteraction(draw);
    }

    if (snap) {
        map.removeInteraction(snap);
    }
}