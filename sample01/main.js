import { MapView } from './mapView.js';

var instance;
var view;

window.onload = init();

function init() {
    instance = new MapView('map');
    view = instance.mapView;
    
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
function measureDistance() {
    instance.measureMap({ drawType: 'LineString' });
}

function measureArea() {
    instance.measureMap({ drawType: 'Polygon' });
}