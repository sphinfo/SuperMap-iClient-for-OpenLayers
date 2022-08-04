import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import Projection from 'ol/proj/Projection';

//1) View 속성의 projection 설정
// var map = new Map({
//     view: new View({
//         projection: 'EPSG:4326',
//         center: [0, 0],
//         zoom: 2        
//     }),
//     layers: [
//         new TileLayer({
//         source: new OSM()
//         }),
//     ],
//     target: 'map'
// });

//2) ol.proj.Projection 클래스를 통해 사용자 정의 투영 매개변수 설정
var custProjection = new Projection({
    code: 'EPSG:4326',
    extent: [-180.0, -90.0, 180.0, 90.0], //Projected bounds (https://epsg.io/ 참조)
    units: 'm'
});

var map = new Map({
    view: new View({
        projection: custProjection,
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