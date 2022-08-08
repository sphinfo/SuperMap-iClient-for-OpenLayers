import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { TileSuperMapRest, GetGridCellInfosParameters, GridCellInfosService, } from '@supermap/iclient-ol';
import Overlay from 'ol/Overlay';

//지도 위에 표시할 오버레이 설정
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const overlay = new Overlay({
    element: container, //오버레이 요소
    autoPan: true, //오버레이 표시 후 지도 이동 여부
    autoPanAnimation :{
        duration: 250 //애니메이션 지속 시간(밀리초)
    }
});

const baseUrl = "https://iserver.supermap.io/iserver/services/map-world/rest/maps/世界地图_Day";
const dataUrl = "https://iserver.supermap.io/iserver/services/data-world/rest/data";

const map = new Map({
  target: 'map', //지도 컨테이너 ID
  view: new View({
      center: [0,0], //지도의 중심점
      zoom: 4, //지도의 초기 해상도를 계산하는 확대/축소 레벨
      projection: 'EPSG:4326' //지도 좌표계
  }),
  overlays: [overlay] //지도 오버레이추가
});

const layer = new TileLayer({
      source: new TileSuperMapRest({
          url: baseUrl, //SuperMap iServer에 발행된 맵서비스 주소
          wrapX: true //타일을 반경선 너머로 렌더링
      }),
      projection: 'EPSG:4326' //레이어 좌표계
});

map.addLayer(layer);

//map클릭 시 해당 위치의 픽셀 값 정보 표시
map.on("click", function(evt){

        var x = evt.coordinate[0];
        var y = evt.coordinate[1];

        if (x < -180.0 || x > 180.0 || y < -90 || y > 90) {
            return;
        }

        var getGridCellInfosParam = new GetGridCellInfosParameters({
            dataSourceName: "World",
            datasetName: "WorldEarth",
            X: x,
            Y: y
        });

        new GridCellInfosService(dataUrl).getGridCellInfos(getGridCellInfosParam, function(serviceResult){

            if (!serviceResult.result) {
                return;
            }

            var result = serviceResult.result;
            var innerHTML = "Raster query results" + "<br>" + "column: " + result.column + "<br>";
            innerHTML += "row: " + result.row + "<br>";
            innerHTML += "value: " + result.value + "<br>";
            content.innerHTML = innerHTML;
            overlay.setPosition([evt.coordinate[0], evt.coordinate[1]]);

        });
});