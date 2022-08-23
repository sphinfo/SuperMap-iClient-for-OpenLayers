//OpenLayers
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {DragPan, defaults as defaultInteractions} from 'ol/interaction';
import {Control, defaults as defaultControls} from 'ol/control';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw';
import Overlay from 'ol/Overlay';
import {unByKey} from 'ol/Observable';
import GeoJSON from 'ol/format/GeoJSON';

//SuperMap iClient for OpenLayers
import { TileSuperMapRest, MeasureParameters, MeasureService,
            GetFeaturesByGeometryParameters, FeatureService } from '@supermap/iclient-ol';
            
const url = "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
const dataUrl = "https://iserver.supermap.io/iserver/services/data-world/rest/data";

let instance = null;
let measureTooltipElement;
let measureTooltip;
export class MapView {

    constructor(target) {

        if (!instance) {

            this.map = new Map({
                controls: defaultControls({
                    attribution : false,
                    zoom : false       
                }),
                interactions: defaultInteractions({
                    mouseWheelZoom : false,
                    doubleClickZoom: false,
                    dragPan: false
                }),
                target: target, //지도 컨테이너 ID
                view: new View({
                    center: [127.77, 35.89], //지도의 중심점
                    zoom: 7, //지도의 초기 해상도를 계산하는 확대/축소 레벨
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

            this.map.addLayer(layer);
            this.interactions = this.map.getInteractions().getArray();
            this.vectorSource = new VectorSource({
                wrapX: false
            });
            this.mapView = this.map.getView();

            instance = this;        
        }
        
        return instance;
    }

    setDragPanInteractions() {
        const isDragPan = (interaction) => interaction instanceof DragPan;
        const index = instance.interactions.findIndex(isDragPan);

        let dragPan;
        if (index == -1) {
            dragPan = new DragPan();
            dragPan.setActive(true);
            this.map.addInteraction(dragPan);
        } else {
            dragPan = instance.interactions.at(index);
            dragPan.setActive(!dragPan.getActive());
        }
    }

    createMeasureTooltip() {

        if (measureTooltipElement) {
          measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        } 
        
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';

        measureTooltip = new Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center',
            stopEvent: false,
            insertFirst: false,
        });
        
        this.map.addOverlay(measureTooltip);
    }

    measureMap(option) {
        let draw;
        let sketch;
        let listener;
        let geom;

        //tooltip 생성
        instance.createMeasureTooltip();
    
        //vectorLayer 생성
        let vectorLayer = new VectorLayer({
            source: instance.vectorSource
        });

        this.map.addLayer(vectorLayer);

        //Draw Interaction 존재여부 체크 -> 있으면 삭제
        const isDraw = (interaction) => interaction instanceof Draw;
        const index = instance.interactions.findIndex(isDraw);

        if (index > -1) {
            draw = instance.interactions.at(index);
            this.map.removeInteraction(draw);
        }

        //Draw 생성
        draw = new Draw({
            source: instance.vectorSource,
            type: option.drawType, //도형 유형
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2,
                }),
                image: new CircleStyle({
                    radius: 5,
                    stroke: new Stroke({
                        color: 'rgba(0, 0, 0, 0.7)',
                    }),
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                    }),
                }),
            }),
        });

        draw.on('drawstart', function(event){
            sketch = event.feature;

            listener = sketch.getGeometry().on('change', function(event){
                geom = event.target;
            });
        });

        draw.on('drawend', function(){

            const measureParms = new MeasureParameters(sketch.getGeometry());
            
            if (option.drawType == 'LineString')
            {
                //거리측정
                new MeasureService(url).measureDistance(
                    measureParms, function(serviceResult) {

                        measureTooltipElement.innerHTML = serviceResult.result.distance + 'm';
                        measureTooltip.setPosition(geom.getLastCoordinate());
        
                        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                        measureTooltip.setOffset([0, -7]); 
        
                        sketch = null;
                        measureTooltipElement = null;
                        instance.createMeasureTooltip();
                        unByKey(listener);
                    });

            } else {
                //면적측정
                new MeasureService(url).measureArea(
                    measureParms, function(serviceResult) {

                        measureTooltipElement.innerHTML = serviceResult.result.area + 'sq.m';
                        measureTooltip.setPosition(geom.getLastCoordinate());
        
                        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                        measureTooltip.setOffset([0, -7]); 
        
                        sketch = null;
                        measureTooltipElement = null;
                        instance.createMeasureTooltip();
                        unByKey(listener);
                    });
            }
        });

        this.map.addInteraction(draw);
    }
}