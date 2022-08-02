import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {ScaleLine,  defaults as defaultControls} from 'ol/control';

var scaleLineControl = new ScaleLine({
    units: 'metric', //스케일라인 단위 'degrees', 'imperial', 'nautical', 'metric'(기본값), 'us'
    bar: true, //선 대신 스케일바 렌더링
    text: true, //스케일바 위에 텍스트 렌더링
    steps: 6, //스케일바 단계설정, 기본값 4 (짝수로 설정권장)
    minWidth: 125 //OGC 기본 dpi의 최소 너비(픽셀), 기본값 64
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