import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { TileSuperMapRest, GetFeaturesByIDsParameters, FeatureService } from '@supermap/iclient-ol';

const baseUrl = "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
const dataUrl = "https://iserver.supermap.io/iserver/services/data-world/rest/data";

const map = new Map({
  target: 'map', //지도 컨테이너 ID
  view: new View({
      center: [127.77, 35.89], //지도의 중심점
      zoom: 5, //지도의 초기 해상도를 계산하는 확대/축소 레벨
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

    //파라메터 정의
    var param = new GetFeaturesByIDsParameters({
        IDs: [233, 234], //Dataset의 SmID
        datasetNames: ["World:Countries"] //[Datasource Name:Dataset Name]
    });

    new FeatureService(dataUrl).getFeaturesByIDs(param, function (serviceResult) {
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