// 公共变量
var map = null; //地图对象

var marker = null;
/**
 * 初始化
 */
window.onload = function() {

    x = parseFloat(decodeURI(getQueryString("x")));
    y = parseFloat(decodeURI(getQueryString("y")));



    if (x == null || y == null) {
        x = 118.788729;
        y = 76.454842;
    };


    map = new AMap.Map('container', {
        center: [x,y],
        layers: [
            new AMap.TileLayer.Satellite(),
            new AMap.TileLayer.RoadNet()
        ],
        zoom: 15
    });


    clearTag();

    addMarker(x,y);
}

function clearTag()
{
    if (marker) {
        marker.setMap(null);
        marker = null;
    }
}

// 实例化点标记
function addMarker(x,y) {

    var marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
        position: [x,y]
    });


    marker.setMap(map);

    map.setCenter(AMap.LngLat(x,y));
}

function getQueryString(name){

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = encodeURI(window.location.search).substr(1).match(reg); 
    if (r != null) 
    return unescape(r[2]); 

    return null; 
}