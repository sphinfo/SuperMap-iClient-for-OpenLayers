import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { FieldService, LayerInfoService, TileSuperMapRest, 
    FieldParameters, FieldStatisticsParameters, StatisticMode } from '@supermap/iclient-ol';
import Control from 'ol/control/Control';

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');

var info;
var currentData;
var layersName = [];

const baseUrl = "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
const dataUrl = "https://iserver.supermap.io/iserver/services/data-world/rest/data";

const map = new Map({
  target: 'map', //지도 컨테이너 ID
  view: new View({
      center: [-10, 15], //지도의 중심점
      zoom: 4, //지도의 초기 해상도를 계산하는 확대/축소 레벨
      projection: 'EPSG:4326' //지도 좌표계
  })
});

const layer = new TileLayer({
      source: new TileSuperMapRest({
          url: baseUrl, //SuperMap iServer에 발행된 맵서비스 주소
          wrapX: true //타일을 반경선 너머로 렌더링
      }),
      projection: 'EPSG:4326' //레이어 좌표계
});

map.addLayer(layer);

initResultInfoWin();
showLayersInfo();

//필드 정보 표시 컨테이터 추가
function initResultInfoWin() {

    info = new Control({element: container});
    info.setMap(map);
    
    map.addControl(info);
}

//레이어 정보 가져오기
function showLayersInfo() {

    var subLayer;
    
    new LayerInfoService(baseUrl).getLayersInfo(function (serviceResult) {
        
        var layers = serviceResult.result.subLayers.layers;
        
        if (!layers) { return; }

        for (var i = 0, len = layers.length; i < len; i++) {
            
            subLayer = layers[i];

            //레이어 타입이 SuperMap UGC 유형 레이어인가...
            //SuperMap UGC 유형 레이어 : vector layer, Grid layer, image layer
            if ("UGC" == subLayer.type) {
                
                if (subLayer.datasetInfo.name && subLayer.datasetInfo.dataSourceName) {
                    
                    layersName[i] = {
                        dataSetName: subLayer.datasetInfo.name,
                        dataSourceName: subLayer.datasetInfo.dataSourceName,
                        layerName: subLayer.name
                    };
                }
            }
        }

        getFields();
    });
}

//검색할 데이터셋 필드정보 가져오기
function getFields() {

    var name = 'continent_T@World';
    var dataInfo;
    
    for (var i = 0; i < layersName.length; i++) {

        dataInfo = layersName[i];
        
        if (dataInfo.layerName == name) {
            currentData = dataInfo;

            var param = new FieldParameters({
                datasource: dataInfo.dataSourceName,
                dataset: dataInfo.dataSetName
            });

            new FieldService(dataUrl).getFields(param, function (serviceResult) {
                fieldStatistic();
            });
        }
    }
}

function fieldStatistic() {

    var fieldName = 'SmID'; //조회대상 필드

    var param = new FieldStatisticsParameters({
        datasource: currentData.dataSourceName,
        dataset: currentData.dataSetName,
        fieldName: fieldName,
        statisticMode: [ //필드 통계 방법 유형
            StatisticMode.MAX, //조회대상 필드의 최대값
            StatisticMode.MIN,  //조회대상 필드의 최소값
            StatisticMode.SUM,  //조회대상 필드의 합계
            StatisticMode.AVERAGE,  //조회대상 필드의 평균
            StatisticMode.STDDEVIATION, //조회대상 필드의 표준편차
            StatisticMode.VARIANCE  //조회대상 필드의 분산
        ]
    });

    if (currentData) {
        new FieldService(dataUrl).getFieldStatisticsInfo(param, function (serviceResult) {
            showResult(serviceResult.result);
        });
    }
}

//popup 표시
function showResult(serviceResult) {

    if (!serviceResult) { return; }

    var innerHTMLStr = '<div style="line-height: 35px;">'
        + '<strong>Layer</strong>（continent_T@World）&nbsp;&nbsp;&nbsp;'
        + '<strong>Field</strong>（' + serviceResult.fieldName + '）<div>';

    innerHTMLStr += '<div style="line-height: 35px;">'
        + '<strong>Statistic Result</strong><div>';

    var keys = ["AVERAGE", "MAX", "MIN", "STDDEVIATION", "SUM", "VARIANCE"];

    var tableStr = `<table><tr><td>${keys[0]}</td><td>${keys[1]}</td><td>${keys[2]}</td><td>${keys[3]}</td><td>${keys[4]}</td><td>${keys[5]}</td></tr>`;

    var resultTR = '<tr>';

    for (var i = 0; i < keys.length; i++) {
        resultTR += `<td>${serviceResult[keys[i]]}</td>`;
    }
    
    resultTR += '</tr>';
    tableStr += resultTR + '</table>';
    innerHTMLStr += tableStr;
    content.innerHTML = innerHTMLStr;
    
    map.addControl(info);
}