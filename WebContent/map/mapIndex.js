// 公共变量
var map = null; //地图对象

var MapObj = {};


/*
 查询默认显示位置
 */
function QueryPosition(func)
{
    $.ajax({
        url: basePath + "/config/position/simpleGet",
        dataType: 'json',
        type:"POST",
        data: {r:Math.random()},
        success: function (data)
        {
            console.log(data);
            if(data.code == 0){
                swal("失败", "异常:" + data.message, "error");
            }else{
                if (func != undefined && func != null){
                    func(data.point);
                }
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });


}

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

    var localMapType = new LocalMapType();
    var myLatlng = new google.maps.LatLng(76.454842,118.788729);
    var myOptions = {
        center: myLatlng,
        zoom: 13,
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


    //地图事件监听
    google.maps.event.addListener(map, 'zoom_changed', function() {
        var zoom = map.zoom;
        document.getElementById('zoom-level').innerHTML = "缩放级别：" + Math.round(zoom);
    });


    google.maps.event.addListener(map, 'click', function(e) {
        document.getElementById('map-center').innerHTML = '左击获取经纬度：' + e.latLng.lng().toFixed(6) + '&nbsp;&nbsp;' + e.latLng.lat().toFixed(6) ;
    });

    SetMapMarker();
}


/**
 * 地图放大
 */
var zoomIn = function() {
    var zoom = map.zoom;
    map.setZoom(zoom + 1);
}

/**
 * 地图缩小
 */
var zoomOut = function() {
    var zoom = map.zoom;
    map.setZoom(zoom - 1);
}


/*
 查询数据
 */
function QueryDataToService(func)
{
    $.ajax({
        url: basePath + "/sample/get/list",
        dataType: 'json',
        type:"GET",
        data: {pageSize:100,r:Math.random()},
        success: function (data)
        {
            if (data.code == 1) {
                if (func != undefined && func != null) {
                    func(data);
                }
            }else{

            }
        }
    });

}

function SetMark(obj)
{
    if (obj != undefined && JSON.stringify(obj) != "{}") {

        MapObj = obj;

        if (obj.sampleInfoList != null) {
            for (var i = 0; i < obj.sampleInfoList.length; i++) {
                var y = obj.sampleInfoList[i].sample_lon;
                var x = obj.sampleInfoList[i].sample_lat;

                var myCenter = new google.maps.LatLng(x,y);

                var myIcon = {
                    url: "assets/img/pointIcon/8.png",
                    size: new google.maps.Size(32, 32),
                    scaledSize: new google.maps.Size(32, 32),

                };

                var str = "";

                str += obj.sampleInfoList[i].sample_village;

                var marker = new google.maps.Marker({ position: myCenter , title:str,index:i});
                marker.setIcon(myIcon);
                marker.setMap(map);


                google.maps.event.addListener(marker, 'click', function(event) {
                    ShowMapInfo(event.latLng);
                });


            }

        }
    }
}


function SetMapMarker()
{
    QueryDataToService(SetMark);
}

function ShowMapInfo(obj)
{
    if (MapObj != undefined && JSON.stringify(MapObj) != "{}") {

        if (MapObj.sampleInfoList != null) {

            for (var i = 0; i < MapObj.sampleInfoList.length; i++) {
                var y = MapObj.sampleInfoList[i].sample_lon;
                var x = MapObj.sampleInfoList[i].sample_lat;

                console.log(x);
                console.log(y);
                console.log(obj.lat().toFixed(6));
                console.log(obj.lng().toFixed(6));


                if (obj.lat().toFixed(6) - x == 0 && obj.lng().toFixed(6) - y == 0) {
                    var objMap = MapObj.sampleInfoList[i];

                    if (objMap != undefined && JSON.stringify(objMap) != "{}") {

                        var head = '<p class="lead">样品统一编码: ' + objMap.sample_id + '</p>';

                        var html1 =  '<div class="col-sm-3">' + "<address><strong>省：     "+  objMap.sample_provice+ "</strong><br>";
                        html1 = html1 + "<strong>市：    "+  objMap.sample_city+ "</strong><br>";
                        html1 = html1 + "<strong>县：    "+  objMap.sample_area+ "</strong><br>";
                        html1 = html1 + "<strong>乡镇：  "+  objMap.sample_towns+ "</strong><br>";
                        html1 = html1 + "<strong>村/街道:"+  objMap.sample_village+ "</strong><br>";
                        html1 = html1 + '</address></div>';


                        html1 = html1 +  '<div class="col-sm-3">' + "<address><strong>采样人："+  objMap.sample_operator+ "</strong><br>";
                        html1 = html1 + "<strong>记录人：</strong>"+  objMap.sample_recorder+ "<br>";
                        html1 = html1 + "<strong>校准人：</strong>"+  objMap.sample_checker+ "<br>";
                        html1 = html1 + "<strong>制表日期：</strong>"+  objMap.sample_date+ "<br>";
                        html1 = html1 + "<strong>采样日期：</strong>"+  objMap.sample_time+ "</b><br>";
                        html1 = html1 + '</address></div>';

                        html1 = html1 +  '<div class="col-sm-3">' + "<address><strong>采样深度："+  objMap.sample_depth+ "</strong><br>";
                        html1 = html1 + "<strong>海拔：</strong>"+  objMap.sample_altitude+ " m<br>";
                        html1 = html1 + "<strong>天气：</strong>"+  objMap.sample_weather+ "<br>";
                        html1 = html1 + "<strong>样品重量：</strong>"+  objMap.sample_weight+ " kg<br>";
                        html1 = html1 + "<strong>位置：</strong>"+ "E[" + objMap.sample_lon +"] N[" + objMap.sample_lat +"]<br>";
                        html1 = html1 + '</address></div>';


                        html1 = html1 +  '<div class="col-sm-3">' + "<address><strong>土地利用类型："+  objMap.sample_using+ "</strong><br>";
                        html1 = html1 + "<strong>作物类型：</strong>"+  objMap.sample_use_type+ "<br>";
                        html1 = html1 + "<strong>地形地貌：</strong>"+  objMap.sample_soil_face+ "<br>";
                        html1 = html1 +   "<strong>土壤类型：</strong>"+  objMap.sample_soil_type+ "<br>";
                        html1 = html1 + "<strong>土壤质地：</strong>"+  objMap.sample_soil_texture+ "<br>";
                        html1 = html1 + "<strong>土壤颜色：</strong>"+  objMap.sample_soil_color+ "<br>";
                        html1 = html1 + '</address></div>';


                        var html3 = '<a class="fancybox" title="采样前" href=';
                        html3 = html3 + ServerPath +objMap.sample_pic_before;
                        html3 = html3 + '><img  src=';
                        html3 = html3 + ServerPath +objMap.sample_pic_before;
                        html3 = html3 + '></a>';



                        html3 = html3 + '<a class="fancybox" title="采样后" href=';
                        html3 = html3 + ServerPath + objMap.sample_pic_after;
                        html3 = html3 + '><img  src=';
                        html3 = html3 + ServerPath + objMap.sample_pic_after;
                        html3 = html3 + '></a>';

                        html3 = html3 + '<a class="fancybox" title="东侧" href=';
                        html3 = html3 + ServerPath + objMap.sample_pic_east;
                        html3 = html3 + '><img  src=';
                        html3 = html3 + ServerPath + objMap.sample_pic_east;
                        html3 = html3 + '></a>';

                        html3 = html3 + '<a class="fancybox" title="西侧" href=';
                        html3 = html3 + ServerPath + objMap.sample_pic_south;
                        html3 = html3 + '><img src=';
                        html3 = html3 + ServerPath + objMap.sample_pic_south;
                        html3 = html3 + '></a>';

                        html3 = html3 + '<a class="fancybox" title="南侧" href=';
                        html3 = html3 + ServerPath + objMap.sample_pic_west;
                        html3 = html3 + '><img  src=';
                        html3 = html3 + ServerPath + objMap.sample_pic_west;
                        html3 = html3 + '></a>';

                        html3 = html3 + '<a class="fancybox" title="北侧" href=';
                        html3 = html3 + ServerPath + objMap.sample_pic_north;
                        html3 = html3 + '><img  src=';
                        html3 = html3 + ServerPath + objMap.sample_pic_north;
                        html3 = html3 + '></a>';


                        var html = '<div class="wrapper wrapper-content animated fadeInRight">\
                    <div class="row">\
                        <div class="col-sm-12">\
                            <div class="ibox-content p-xl">\
                            <div class="row">';

                        html = html + head;

                        html = html + '</div><div class="row">';

                        html = html + html1;

                        html = html + '</div><div class="ibox-content">'

                        html = html + html3;

                        html = html + '</div></div></div></div>';


                        //在这里面输入任何合法的js语句
                        layer.open({
                            type: 1 //Page层类型
                            ,area: ['80%', '70%']
                            ,title: '样品信息'
                            ,zIndex:888
                            ,shade: 0.6 //遮罩透明度
                            ,maxmin: false //允许全屏最小化
                            ,shadeClose:true
                            ,anim: 2 //0-6的动画形式，-1不开启
                            ,content: html

                        });

                        $(document).ready(function () {
                            $('.fancybox').fancybox({
                                openEffect: 'none',
                                closeEffect: 'none',
                            });
                        });


                    }

                }
            }
        }
    }

}

