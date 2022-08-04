import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { TileSuperMapRest, QueryByDistanceParameters, QueryService } from '@supermap/iclient-ol';
import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';
import { Feature } from 'ol';

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

query();

function query(){

    //기준 포인트 레이어
    const point = new Point([104, 30]);
    const pointFeature= new Feature(point);

    pointFeature.setStyle(
        new Style({
            image: new Icon({
                scale: 0.5,
                src: 'selectedPoints.png'
            })
        })
    );

    var pointSource = new VectorSource({
        features: [pointFeature],
        wrapX: false
    });

    var pointLayer = new VectorLayer({
        source: pointSource
    });

    //기준 포인트 레이어 map 추가
    map.addLayer(pointLayer);

    //조회대상
    var param = new QueryByDistanceParameters({
        queryParams: {name: "Capitals@World.1"},
        distance: 10,
        geometry: point
    });

    new QueryService(url).queryByDistance(param, function (serviceResult) {
        //조회결과
        var vectorSource = new VectorSource({
            features: (new GeoJSON()).readFeatures(serviceResult.result.recordsets[0].features),
            wrapX: false
        });

        //조회결과 레이어
        var resultLayer = new VectorLayer({
            source: vectorSource
        });

        map.addLayer(resultLayer);
    });
}
