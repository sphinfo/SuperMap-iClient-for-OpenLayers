// import 'ol/ol.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import { TileSuperMapRest, MeasureParameters, MeasureService,
//             GetFeaturesByGeometryParameters, FeatureService } from '@supermap/iclient-ol';
// import {Control, defaults as defaultControls} from 'ol/control';
// import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
// import VectorSource from 'ol/source/Vector';
// import VectorLayer from 'ol/layer/Vector';
// import Draw from 'ol/interaction/Draw';
// import Overlay from 'ol/Overlay';
// import {unByKey} from 'ol/Observable';
// import {DragPan, defaults as defaultInteractions} from 'ol/interaction';
// import GeoJSON from 'ol/format/GeoJSON';

import { MapView } from './mapView.js';

var instance;
var view;

window.onload = init();

function init() {
    instance = new MapView('map');
    view = instance.getMapView();
    
    document.getElementById('zoomIn').addEventListener('click',zoomIn);
    document.getElementById('zoomOut').addEventListener('click',zoomOut);
    document.getElementById('move').addEventListener('click',move);
    document.getElementById('fullScreen').addEventListener('click',fullScreen);
    document.getElementById('measureDistance').addEventListener('click',measureDistance);
    document.getElementById('measureArea').addEventListener('click',measureArea);
}

//zoom
function zoomIn() {
    view.animate({zoom: view.getZoom() + 1});
}

function zoomOut() {
    view.animate({zoom: view.getZoom() - 1});
}

//이동
function move() {
    instance.setDragPanInteractions();
}

//전체보기
function fullScreen() {
    view.animate({zoom: 7}, {center: [127.77, 35.89]});
}

//측정
function getMeasureTooltipElement() {

    // if (measureTooltipElement) {
    //   measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    // }
    
    let measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    return measureTooltipElement;
}

function measureDistance() {
    instance.measureMap({ drawType: 'LineString', tooltipElement: getMeasureTooltipElement()});
}

function measureArea() {
    instance.measureMap({ drawType: 'Polygon', tooltipElement: getMeasureTooltipElement()});
}


// const view = map.getView();
// let measureTooltipElement;
// let measureTooltip;
// let draw;

// //그리기 벡터소스
// var vectorSource = new VectorSource({
//     wrapX: false
// });

// var vectorLayer = new VectorLayer({
//     source: vectorSource
// });

// map.addLayer(vectorLayer);

// //검색 벡터소스
// var featuresVectorSource;

// //measure - tooltip
// function createMeasureTooltip() {

//     if (measureTooltipElement) {
//       measureTooltipElement.parentNode.removeChild(measureTooltipElement);
//     }
    
//     measureTooltipElement = document.createElement('div');
//     measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
//     measureTooltip = new Overlay({
//         element: measureTooltipElement,
//         offset: [0, -15],
//         positioning: 'bottom-center',
//         stopEvent: false,
//         insertFirst: false,
//     });

//     map.addOverlay(measureTooltip);
// }

// //measure
// function measure(drawType){
    
//     if (draw != null) {
//         map.removeInteraction(draw);
//     }

//     const dType = drawType == 'DISTANCE' ? 'LineString' : 'Polygon';

//     draw = new Draw({
//         source: vectorSource,
//         type: dType, //도형 유형
//         style: new Style({
//             fill: new Fill({
//                 color: 'rgba(255, 255, 255, 0.2)',
//             }),
//             stroke: new Stroke({
//                 color: 'rgba(0, 0, 0, 0.5)',
//                 lineDash: [10, 10],
//                 width: 2,
//             }),
//             image: new CircleStyle({
//                 radius: 5,
//                 stroke: new Stroke({
//                     color: 'rgba(0, 0, 0, 0.7)',
//                 }),
//                 fill: new Fill({
//                     color: 'rgba(255, 255, 255, 0.2)',
//                 }),
//             }),
//         }),
//     });

//     map.addInteraction(draw);
//     createMeasureTooltip();

//     let listener;
//     let feature;
//     let geom;
   
//     draw.on('drawstart', function (evt) {
//         feature = evt.feature;

//         listener = feature.getGeometry().on('change', function(evt){
//             geom = evt.target;
//         });
//     });

//     draw.on ('drawend', function () {
                
//         var measureParms = new MeasureParameters(feature.getGeometry());
        
//         new MeasureService(url, {measureMode: ""}).measureDistance(measureParms, function (serviceResult) {
//             let output = serviceResult.result.distance;
//             let length;

//             if (draw.type == "LineString")
//             {
//                 if (output > 100) {
//                     length =  Math.round((output / 1000) * 100) / 100 + ' ' + 'km';
//                 } else {
//                     length =  Math.round(output * 100) / 100 + ' ' + 'm';
//                 }
//             } else {
//                 if (output > 10000) {
//                     length = Math.round((output / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
//                   } else {
//                     length = Math.round(output * 100) / 100 + ' ' + 'm<sup>2</sup>';
//                   }
//             }

//             measureTooltipElement.innerHTML = length;    
//             measureTooltip.setPosition(geom.getLastCoordinate());

//             measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
//             measureTooltip.setOffset([0, -7]);

//             feature = null;
//             measureTooltipElement = null;
//             createMeasureTooltip();
//             unByKey(listener);
//         });
//     });
// }


// function getInteractionArray(){
//     return map.getInteractions().getArray();
// }

// function findDragPanIndex(interaction){
//     return (interaction instanceof DragPan);
// }


// //속성검색
// function queryAttribute() {

// }

// //공간검색
// function queryBound(drawType) {
    
//     const dType = drawType == 'Polygon' ? 'Polygon' : 'Circle';

//     draw = new Draw({
//         source: vectorSource,
//         type: dType, //도형 유형
//         style: new Style({
//             stroke: new Stroke({
//                 color: 'red',
//                 width: 2
//             }),
//             fill: new Fill({
//                 color: 'rgba(0, 0, 255, 0.1)'
//             })
//         })
//     });

//     map.addInteraction(draw);

//     let feature;
   
//     draw.on('drawstart', function (evt) {
//         feature = evt.feature;
//     });

//     draw.on ('drawend', function () {
        
//         //조회대상
//         var param = new GetFeaturesByGeometryParameters({
//             datasetNames: ["World:Capitals"], //[Datasource Name:Dataset Name]
//             geometry: feature.getGeometry(), //공간영역
//             //spatialQueryMode: "INTERSECT" //공간쿼리모드
//         });

//         new FeatureService(dataUrl).getFeaturesByGeometry(param, function (serviceResult) {
//             //조회결과
//             featuresVectorSource = new VectorSource({
//                 features: (new GeoJSON()).readFeatures(serviceResult.result.features),
//                 wrapX: false
//             });

//             //조회결과 레이어
//             var resultLayer = new VectorLayer({
//                 source: featuresVectorSource
//             });

//             map.addLayer(resultLayer);
//         });
//     });
// }

// //버퍼검색
// function queryBuffer() {

// }

// //초기화
// function clearInteraction() {
    
//     if (draw) {
//         map.removeInteraction(draw);

//         //툴팁 삭제
//         const staticTooltip = document.getElementsByClassName('ol-tooltip ol-tooltip-static');

//         while(staticTooltip.length > 0)
//         {
//             staticTooltip[0].parentNode.removeChild(staticTooltip[0]);
//         }
//     }

//     vectorSource.clear();

//     if (featuresVectorSource != null) {
//         featuresVectorSource.clear();
//     }
    

//     //이동 삭제
//     const interactions = getInteractionArray();
//     const index = interactions.findIndex(findDragPanIndex);
//     if (index > -1) {
//         const dragPan = interactions.at(index);
//         map.removeInteraction(dragPan);
//     }

//     //전체보기
//     fullScreen();
// }