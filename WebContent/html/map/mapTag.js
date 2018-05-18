// 公共变量
var map = null; //地图对象



var marker = new google.maps.Marker({ position: new google.maps.LatLng(31.671791,118.48583) });

/**
 * 初始化
 */
window.onload = function() {
  

    // 本地离线地图
    function LocalMapType() {}
    LocalMapType.prototype.tileSize = new google.maps.Size(256, 256);
    LocalMapType.prototype.maxZoom = 20;
    LocalMapType.prototype.minZoom = 0;
    LocalMapType.prototype.name = "服务器地图";
    LocalMapType.prototype.alt = "服务器地图";
    LocalMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var img = ownerDocument.createElement("img");
        img.style.width = this.tileSize.width + "px";
        img.style.height = this.tileSize.height + "px";
        var strURL = "googleTMS/" + zoom + '/' + coord.x + '/' + coord.y + '.png';
        img.src = strURL;
        return img;
    };
    // google在线地图（有偏移）
    function OnlineMap() {}
    OnlineMap.prototype.tileSize = new google.maps.Size(256, 256);
    OnlineMap.prototype.maxZoom = 20;
    OnlineMap.prototype.minZoom = 0;
    OnlineMap.prototype.name = "谷歌在线（有偏移）";
    OnlineMap.prototype.alt = "显示在线地图";
    OnlineMap.prototype.getTile = function(coord, zoom, ownerDocument) {
        var img = ownerDocument.createElement("img");
        img.style.width = this.tileSize.width + "px";
        img.style.height = this.tileSize.height + "px";
        var strURL = 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i' + zoom + '!2i' + coord.x + '!3i' + coord.y + '!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0';
        img.src = strURL;
        return img;
    };
    var onlineMap = new OnlineMap();

    x = parseFloat(decodeURI(getQueryString("x")));
    y = parseFloat(decodeURI(getQueryString("y")));


    if (x == null || y == null) {
        x = 118.506009;
        y = 31.670305;
    };


    var localMapType = new LocalMapType();
    var myLatlng = new google.maps.LatLng(y,x);
    var myOptions = {
        center: myLatlng,
        zoom: 15,
        streetViewControl: false,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        rotateControl: false,
        // mapTypeControlOptions: {
        //     mapTypeIds: ["local", google.maps.MapTypeId.ROADMAP]
        // }
    };
    this.map = new google.maps.Map(document.getElementById("map_container"),
        myOptions);
    map.mapTypes.set('local', localMapType);
    // map.setMapTypeId('local');
    map.mapTypes.set('online', onlineMap);
    map.setMapTypeId('local');

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
function addMarker(y,x) {

    var myCenter = new google.maps.LatLng(x,y);

    var myIcon = {
        url: "assets/img/pointIcon/8.png",
        size: new google.maps.Size(32, 32),
        scaledSize: new google.maps.Size(32, 32)
    };
    marker = new google.maps.Marker({ position: myCenter });
    marker.setIcon(myIcon);
    marker.setMap(map);
    map.panTo(myCenter);
}

function getQueryString(name){

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = encodeURI(window.location.search).substr(1).match(reg); 
    if (r != null) 
    return unescape(r[2]); 

    return null; 
}