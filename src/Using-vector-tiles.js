var url = (window.isLocal ? window.server : "https://iserver.supermap.io")+"/iserver/services/map-china400/rest/maps/China";
new ol.supermap.MapService(url).getMapInfo(function (serviceResult) {
    var map = new ol.Map({
        target: 'map',
        controls: ol.control.defaults({attributionOptions: {collapsed: false}})
            .extend([new ol.supermap.control.Logo()]),
        view: new ol.View({
            center: [12957388, 4853991],
            zoom: 11
        })
    });
    var stylesOptions = {
        url: url,
        view: map.getView()
    };
    var vectorTileStyles = new ol.supermap.VectorTileStyles(stylesOptions);
    var vectorTileOptions = ol.source.VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
    var vectorLayer = new ol.layer.VectorTile({
        source: new ol.source.VectorTileSuperMapRest(vectorTileOptions),
        style: vectorTileStyles.getFeatureStyle
    });
    map.addLayer(vectorLayer);
    map.on('click', function (e) {
        map.forEachFeatureAtPixel(e.pixel, function (feature) {
            vectorTileStyles.dispatchEvent({type: 'featureSelected',
                selectedId: feature.getProperties().id,
                layerName: feature.getProperties().layerName
            });
            return true;
        }, {hitTolerance: 5});
        vectorLayer.changed();
    })

});


// import 'ol/ol.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import VectorTileLayer from 'ol/layer/VectorTile';
// import { MapService, VectorTileSuperMapRest, VectorTileStyles } from '@supermap/iclient-ol';

// //var url = "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
// var url = "https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China";
// mapService();

// function mapService() {
//     new MapService(url).getMapInfo(function(serviceResult) {
        
//         var map = new Map({
//             target: 'map', //지도 컨테이너 ID
//             view: new View({
//                 center: [0, 0], //지도의 중심점
//                 zoom: 0, //지도의 초기 해상도를 계산하는 확대/축소 레벨
//                 projection: 'EPSG:4326' //지도 좌표계
//             })
//         });

//         var styleOptions = {
//             url: url,
//             view: map.getView(),
//             projection: 'EPSG:4326'
//         };
        
//         var vectorTileStyles = new VectorTileStyles(styleOptions);
//         var vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
//         var vectorLayer = new VectorTileLayer({
//             source: new VectorTileSuperMapRest({ url:url, projection: 'EPSG:4326' }),
//             style: vectorTileStyles.getFeatureStyle,
//             renderMode: 'vector'
//         });

//         map.addLayer(vectorLayer);
//     });
// }