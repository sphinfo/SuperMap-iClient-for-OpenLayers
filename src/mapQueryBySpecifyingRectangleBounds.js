import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Polygon from 'ol/geom/polygon';
import { TileSuperMapRest, GetFeaturesByBoundsParameters, FeatureService } from '@supermap/iclient-ol';
import { Feature } from 'ol';
import Style from 'ol/style/style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';

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

query();

function query(){

    //조회할 사각형 범위 레이어
    var polygon = new Polygon([[[-20, 20], [-20, -20], [20, -20], [20, 20], [-20, 20]]]);
    
    var polygonSource = new VectorSource({
        features: [new Feature(polygon)],
        wrapX: false
    });

    var polygonLayer = new VectorLayer({
        source: polygonSource,
        style: new Style({
            stroke: new Stroke({
                color: 'blue',
                width: 3
            }),
            fill: new Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            })
        })
    });

    //사각형 범위 레이어 map 추가
    map.addLayer(polygonLayer);


    //조회대상
    var param = new GetFeaturesByBoundsParameters({
        datasetNames: ["World:Capitals"], //[Datasource Name:Dataset Name]
        bounds: polygon.getExtent()
    });

    new FeatureService(dataUrl).getFeaturesByBounds(param, function (serviceResult) {
        //조회결과
        var vectorSource = new VectorSource({
            features: (new GeoJSON()).readFeatures(serviceResult.result.features),
            wrapX: false
        });

        //조회결과 레이어
        var resultLayer = new VectorLayer({
            source: vectorSource
        });

        map.addLayer(resultLayer);
    });
}
