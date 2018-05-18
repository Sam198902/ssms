// 公共变量
var map = null; //地图对象

var weburl = window.location.href;

//Server地址
var basePath = weburl.substring(0,weburl.indexOf("ssms")+4);

var BaseURL = weburl.substring(0,weburl.indexOf("ssms"));

var MapObj = {};

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
    var myLatlng = new google.maps.LatLng(31.671791,118.48583);
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
      //传送请求数据
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

                        $("#Resume_id").html("样品统一编码: "+ objMap.sample_id);   

                        $("#Resume_msg").empty();
                        var msg =  "<b>省：     "+  objMap.sample_provice+ "</b><br>";
                        msg = msg + "<b>市：    "+  objMap.sample_city+ "</b><br>";
                        msg = msg + "<b>县：    "+  objMap.sample_area+ "</b><br>";
                        msg = msg + "<b>乡镇：  "+  objMap.sample_towns+ "</b><br>";
                        msg = msg + "<b>村/街道:"+  objMap.sample_village+ "</b><br>";
                        $("#Resume_msg").append(msg);


                        $("#Resume_people").empty();
                        var msg =  "<b>采样人：</b>"+  objMap.sample_operator+ "<br>";
                        msg = msg + "<b>记录人：</b>"+  objMap.sample_recorder+ "<br>";
                        msg = msg + "<b>校准人：</b>"+  objMap.sample_checker+ "<br>";
                        msg = msg + "<b>制表日期：</b>"+  objMap.sample_date+ "<br>";
                        msg = msg + "<b>采样日期：</b>"+  objMap.sample_time+ "</b><br>";
                        $("#Resume_people").append(msg);

                        $("#Resume_table").empty();
                        var msg =  "<b>采样深度：</b>"+  objMap.sample_depth+ " cm<br>";
                        msg = msg + "<b>海拔：</b>"+  objMap.sample_altitude+ " m<br>";
                        msg = msg + "<b>天气：</b>"+  objMap.sample_weather+ "<br>";
                        msg = msg + "<b>样品重量：</b>"+  objMap.sample_weight+ " kg<br>";
                        msg = msg + "<b>位置：</b>"+ "E[" + objMap.sample_lon +"] N[" + objMap.sample_lat +"]<br>";
                        $("#Resume_table").append(msg);

                        $("#Resume_info").empty();
                        var msg =  "<b>土地利用类型：</b>"+  objMap.sample_using+ "<br>";
                        msg = msg + "<b>作物类型：</b>"+  objMap.sample_use_type+ "<br>";
                        msg = msg + "<b>地形地貌：</b>"+  objMap.sample_soil_face+ "<br>";
                         msg = msg +   "<b>土壤类型：</b>"+  objMap.sample_soil_type+ "<br>";
                        msg = msg + "<b>土壤质地：</b>"+  objMap.sample_soil_texture+ "<br>";
                        msg = msg + "<b>土壤颜色：</b>"+  objMap.sample_soil_color+ "<br>";
                        $("#Resume_info").append(msg);

                        if (document.getElementById('Resume_PhotoBefore') != null) {
                            document.getElementById('Resume_PhotoBefore').src = objMap.sample_pic_before;
                            document.getElementById('Resume_PhotoAfter').src = objMap.sample_pic_after;
                            document.getElementById('Resume_PhotoEast').src = objMap.sample_pic_east;
                            document.getElementById('Resume_PhotoSouth').src = objMap.sample_pic_south;
                            document.getElementById('Resume_PhotoWest').src = objMap.sample_pic_west;
                            document.getElementById('Resume_PhotoNorth').src = objMap.sample_pic_north;
                            document.getElementById('Resume_PhotoBefore1').href = objMap.sample_pic_before;
                            document.getElementById('Resume_PhotoAfter1').href = objMap.sample_pic_after;
                            document.getElementById('Resume_PhotoEast1').href = objMap.sample_pic_east;
                            document.getElementById('Resume_PhotoSouth1').href = objMap.sample_pic_south;
                            document.getElementById('Resume_PhotoWest1').href = objMap.sample_pic_west;
                            document.getElementById('Resume_PhotoNorth1').href = objMap.sample_pic_north;
                        }

                        $("#ResumeInfo1").empty();
                        $("#ResumeInfo2").empty();
                        $("#ResumeInfo3").empty();
                        $("#ResumeInfo4").empty();
                        $("#ResumeInfo5").empty();
                        $("#ResumeInfo6").empty();
                        var msg =  "<p>"+  objMap.sample_provice+ "-" + objMap.sample_city+ "-" + objMap.sample_area + "</p>";
                        msg = msg +  "<p>"+  objMap.sample_towns+ "-" + objMap.sample_village+"</p>";
                        msg = msg + "<p>"+ "E[" + objMap.sample_lon +"] N[" + objMap.sample_lat +"]</p>";
                        msg = msg +  "<p><b>土地利用类型：</b>"+  objMap.sample_using+ "<br></p>";
                        msg = msg + "<p><b>地形地貌：</b>"+  objMap.sample_soil_face+ "</p>";
                        msg = msg +   "<p><b>土壤类型：</b>"+  objMap.sample_soil_type+ "</p>";
                        msg = msg + "<p><b>土壤质地：</b>"+  objMap.sample_soil_texture+ "</p>";
                        msg = msg + "<p><b>土壤颜色：</b>"+  objMap.sample_soil_color+ "</p>";
                        msg = msg + "<p><b>货柜信息: </b>"+ "区-" + objMap.sample_positon_1 + "|列-" +objMap.sample_positon_2+ "|架-"+objMap.sample_positon_3 + "|层-" +objMap.sample_positon_4+ " |行-"+objMap.sample_positon_5 +" |排-"+objMap.sample_positon_6 + "</p>"; 
        
                        $("#ResumeInfo1").append(msg);
                        $("#ResumeInfo2").append(msg);
                        $("#ResumeInfo3").append(msg);
                        $("#ResumeInfo4").append(msg);
                        $("#ResumeInfo5").append(msg);
                        $("#ResumeInfo6").append(msg);



                    }

                }
            }
        }
    }

    

   

  /*$("#Resume_table_3").empty();
  var msg =  "<b>土地利用类型：</b>"+  obj.sample_using+ "<br>";
  msg = msg + "<b>作物类型：</b>"+  obj.sample_use_type+ "<br>";
  msg = msg + "<b>地形地貌：</b>"+  obj.sample_soil_face+ "<br>";
  $("#Resume_table_3").append(msg);

  $("#Resume_table_4").empty();
  var msg =  "<b>土壤类型：</b>"+  obj.sample_soil_type+ "<br>";
  msg = msg + "<b>土壤质地：</b>"+  obj.sample_soil_texture+ "<br>";
  msg = msg + "<b>土壤颜色：</b>"+  obj.sample_soil_color+ "<br>";
  $("#Resume_table_4").append(msg);

  
  $("#Resume_Positon").html("区-" + obj.sample_positon_1 + "|列-" +obj.sample_positon_2+ "|架-"+obj.sample_positon_3 + "|层-" +obj.sample_positon_4+ " |行-"+obj.sample_positon_5 +" |排-"+obj.sample_positon_6) ; 
  
*/
    $('#print-show').modal('show');
}

function CloseResume()
{
     $('#print-show').modal('hide');
}

