// 公共变量
var map = null; //地图对象

var MapObj = {};

/*
 查询默认显示位置
 */
function QueryPosition(func)
{
    // var data = {sample_provice: "江苏省", sample_city: "南京市", sample_area: "秦淮区", position: "320104",sample_lon:"118.797365",sample_lat:"32.049585"};
    //
    // if (func != undefined && func != null){
    //     func(data);
    // }

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

    QueryPosition(function (data) {
        map = new AMap.Map('container', {
            center: [data.sample_lon,data.sample_lat],
            layers: [
                new AMap.TileLayer.Satellite(),
                new AMap.TileLayer.RoadNet()
            ],
            zoom: 13
        });


        //为地图注册click事件获取鼠标点击出的经纬度坐标
        var clickEventListener = map.on('click', function(e) {
            document.getElementById('map-center').innerHTML = '左击获取经纬度：' + e.lnglat.getLng().toFixed(6) + '&nbsp;&nbsp;' + e.lnglat.getLat().toFixed(6) ;
        });


        map.on('zoomchange', function(e) {
            var zoom = map.getZoom();
            document.getElementById('zoom-level').innerHTML = "缩放级别：" + Math.round(zoom);
        });


        SetMapMarker();
    });


}


/**
 * 地图放大
 */
var zoomIn = function() {
    map.zoomIn();
}

/**
 * 地图缩小
 */
var zoomOut = function() {
    map.zoomOut();
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
                var x = obj.sampleInfoList[i].sample_lon;
                var y = obj.sampleInfoList[i].sample_lat;

                console.log(x,y);

                var marker = new AMap.Marker({
                    icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
                    position: [x,y]
                });

                marker.setMap(map);

                var str = "";

                str += obj.sampleInfoList[i].sample_village;

                marker.on('click', function(event) {
                    ShowMapInfo(event.target.getPosition());
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
                var x = MapObj.sampleInfoList[i].sample_lon;
                var y = MapObj.sampleInfoList[i].sample_lat;

                console.log(obj.lng,obj.lat);
                console.log(x,y);


                if (obj.lng - x == 0 && obj.lat - y == 0) {
                    var objMap = MapObj.sampleInfoList[i];

                    if (objMap != undefined && JSON.stringify(objMap) != "{}") {

                        var head = '<p class="lead" align="center">样品统一编码: ' + objMap.sample_id + '</p>';

                        var html1 =  '<div class="col-sm-3">' + "<address><strong>省：     "+  objMap.sample_provice+ "<strong><br>";
                        html1 = html1 + "<strong>市：    "+  objMap.sample_city+ "</strong><br>";
                        html1 = html1 + "<strong>县：    "+  objMap.sample_area+ "</strong><br>";
                        html1 = html1 + "<strong>乡镇：  "+  objMap.sample_towns+ "</strong><br>";
                        html1 = html1 + "<strong>村/街道:"+  objMap.sample_village+ "</strong><br>";
                        html1 = html1 + '</address></div>';


                        html1 = html1 +  '<div class="col-sm-3">' + "<address><strong>采样人："+  objMap.sample_operator+ "<strong><br>";
                        html1 = html1 + "<strong>记录人：</strong>"+  objMap.sample_recorder+ "<br>";
                        html1 = html1 + "<strong>校准人：</strong>"+  objMap.sample_checker+ "<br>";
                        html1 = html1 + "<strong>制表日期：</strong>"+  objMap.sample_date+ "<br>";
                        html1 = html1 + "<strong>采样日期：</strong>"+  objMap.sample_time+ "</b><br>";
                        html1 = html1 + '</address></div>';

                        html1 = html1 +  '<div class="col-sm-3">' + "<address><strong>采样深度："+  objMap.sample_depth+ "<strong><br>";
                        html1 = html1 + "<strong>海拔：</strong>"+  objMap.sample_altitude+ " m<br>";
                        html1 = html1 + "<strong>天气：</strong>"+  objMap.sample_weather+ "<br>";
                        html1 = html1 + "<strong>样品重量：</strong>"+  objMap.sample_weight+ " kg<br>";
                        html1 = html1 + "<strong>位置：</strong>"+ "E[" + objMap.sample_lon +"] N[" + objMap.sample_lat +"]<br>";
                        html1 = html1 + '</address></div>';


                        html1 = html1 +  '<div class="col-sm-3">' + "<address><strong>土地利用类型："+  objMap.sample_using+ "<strong><br>";
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


                        var html3 = '<a class="fancybox" href=';
                        html3 = html3 + ServerPath + objMap.sample_pic_before;
                        html3 = html3 + '><img  src=';
                        html3 = html3 + ServerPath + objMap.sample_pic_before;
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
                            ,skin: 'layui-layer-lan' //样式类名
                            ,closeBtn: 0 //不显示关闭按钮
                            ,area: ['80%', '70%']
                            ,title: '样品信息'
                            ,zIndex:888
                            ,shade: 0.8 //遮罩透明度
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

