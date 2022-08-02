import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {OverviewMap, defaults as defaultControls} from 'ol/control';
import {DragRotateAndZoom, defaults as defaultInteractions} from 'ol/interaction';

var overviewMapControl = new OverviewMap({
    layers: [
        new TileLayer({
        source: new OSM()
        }),
    ],
    collapsed: false, //시작시 컨트롤 축소상태 설정
    rotateWithView: true //지도가 회전할 때 overview도 회전할지 여부
});

var map = new Map({
    controls: defaultControls().extend([overviewMapControl]), //overview 추가
    interactions: defaultInteractions().extend([new DragRotateAndZoom()]), //shift키+마우스로 지도 확대/축소, 회전
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