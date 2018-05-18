/**
 * Created by Sam on 2018/4/17.
 */


var sampleInfoList = [];

/*
 查询样品编号
 */
function QueryData()
{

    var obj = {};

    obj.City = $('#sample_city option:selected').text();

    obj.Area = $('#sample_area option:selected').text();

    var SelectTown = $('#sample_towns').val();

    var SelectVillage = $('#sample_village').val();

    var func = SearchSomeStringValue;

    if (SelectTown != undefined && SelectTown != '' && SelectTown != null) {
        obj.Town = SelectTown;
        func = SearchSomeStringVillValue;

        if (SelectVillage != undefined && SelectVillage != '' && SelectVillage != null) {
            obj.Village = SelectVillage;
            func = SearchSomeStringVillValue;
        }
    }

    console.log(obj);

    QuerySomethingToService(obj,func);
}



/*
 查询数据回调函数
 */
function SearchSomeStringValue(obj)
{
    console.log(obj);

    $("#sample_towns").empty();

    $("#sample_village").empty();

    if (obj != undefined && JSON.stringify(obj) != "{}") {

        if (obj.Town != undefined && obj.Town != null && JSON.stringify(obj.Town) != "[]" ) {
            var str = "<option></option>";
            for (var i = 0; i < obj.Town.length; i++) {
                if(i == 0){
                    str = str + "<option selected>" + obj.Town[i] + "</option>";
                }else{
                    str = str + "<option>" + obj.Town[i] + "</option>";
                }

            };
            $("#sample_towns").append(str);
        }


        if (obj.sampleInfoList.length>0) {

            sampleInfoList = obj.sampleInfoList;

            $("#table_list").jqGrid('clearGridData');

            $("#table_list").jqGrid('setGridParam',{

                datatype:'local',

                data:sampleInfoList,//newData是符合格式要求的重新加载的数据

                page:1//哪一页的值

            }).trigger("reloadGrid");

            $("#show_towns").css("display","block");
            $("#show_village").css("display","none");

        }
        else{
            $("#show_towns").css("display","none");
            $("#show_village").css("display","none");
            swalAlert("提示！","未查询到数据");

        }
    }
    else{
        $("#show_towns").css("display","none");
        $("#show_village").css("display","none");
        swalAlert("提示！","未查询到数据");
    }
}


/*
 查询数据回调函数
 */
function SearchSomeStringVillValue(obj)
{
    $("#sample_towns").empty();

    $("#sample_village").empty();

    console.log(obj);

    if (obj != undefined && JSON.stringify(obj) != "{}") {

        if (obj.Town != undefined && obj.Town != null && JSON.stringify(obj.Town) != "[]" ) {
            var str = "<option></option>";
            for (var i = 0; i < obj.Town.length; i++) {
                if(i == 0){
                    str = str + "<option selected>" + obj.Town[i] + "</option>";
                }else{
                    str = str + "<option>" + obj.Town[i] + "</option>";
                }
            };
            $("#sample_towns").append(str);
        }

        if (obj.Village != undefined && obj.Village != null && JSON.stringify(obj.Village) != "[]") {
            var str = "<option></option>";
            for (var i = 0; i < obj.Village.length; i++) {
                if(i == 0){
                    str = str + "<option selected>" + obj.Village[i] + "</option>";
                }else{
                    str = str + "<option>" + obj.Village[i] + "</option>";
                }
            };
            $("#sample_village").append(str);
        }

        if (obj.sampleInfoList.length>0) {

            sampleInfoList = obj.sampleInfoList;

            $("#table_list").jqGrid('clearGridData');

            $("#table_list").jqGrid('setGridParam',{

                datatype:'local',

                data:sampleInfoList,//newData是符合格式要求的重新加载的数据

                page:1//哪一页的值

            }).trigger("reloadGrid");

            $("#show_towns").css("display","block");
            $("#show_village").css("display","block");

        }
        else{
            $("#show_towns").css("display","none");
            $("#show_village").css("display","none");
            swalAlert("提示！","未查询到数据");

        }
    }
    else{
        $("#show_towns").css("display","none");
        $("#show_village").css("display","none");
        swalAlert("提示！","未查询到数据");
    }
}


$(function () {


    QueryPosition(function (data) {
        $('#citymodel').citys({code:data.position});
    });


    $("#show_towns").css("display","none");

    $("#show_village").css("display","none");


    $.jgrid.defaults.styleUI = 'Bootstrap';
    $("#table_list").jqGrid({
        data: [],
        datatype: "local",
        height: 450,
        autowidth: true,
        shrinkToFit: true,
        rowNum: 20,
        rowList: [10, 20, 30],
        colNames: ['样品编号', '市区','县','乡镇','村/街道','东经','北纬'],
        colModel: [
            {
                name: 'sample_id',
                index: 'sample_id',
                editable: true,
                width: 90,
                sorttype: "int",
                search: true
            },
            {
                name: 'sample_city',
                index: 'sample_city',
                editable: true,
                width: 90
            },
            {
                name: 'sample_area',
                index: 'sample_area',
                editable: true,
                width: 90
            },
            {
                name: 'sample_towns',
                index: 'sample_towns',
                editable: true,
                width: 90
            },
            {
                name: 'sample_village',
                index: 'sample_village',
                editable: true,
                width: 90
            },
            {
                name: 'sample_lon',
                index: 'sample_lon',
                editable: true,
                width: 90
            },
            {
                name: 'sample_lat',
                index: 'sample_lat',
                editable: true,
                width: 90
            }
        ],
        pager: "#pager_list",
        viewrecords: true,
        caption: "样品信息",
        hidegrid: false,
        onSelectRow: function(id){
            var obj = $("#table_list").jqGrid("getRowData", id);
            for(var i = 0; i< sampleInfoList.length;++i){
                if(obj.sample_id == sampleInfoList[i].sample_id){

                    console.log(sampleInfoList[i]);


                    var head = '<p class="lead">样品统一编码: ' + sampleInfoList[i].sample_id + '</p>';


                    var html1 =  '<div class="col-sm-3">' + "<address><strong>省：     "+  sampleInfoList[i].sample_provice+ "</strong><br>";
                    html1 = html1 + "<strong>市：    "+  sampleInfoList[i].sample_city+ "</strong><br>";
                    html1 = html1 + "<strong>县：    "+  sampleInfoList[i].sample_area+ "</strong><br>";
                    html1 = html1 + "<strong>乡镇：  "+  sampleInfoList[i].sample_towns+ "</strong><br>";
                    html1 = html1 + "<strong>村/街道:"+  sampleInfoList[i].sample_village+ "</strong><br>";
                    html1 = html1 + '</address></div>';


                    html1 = html1 +  '<div class="col-sm-3">' + "<address><strong>采样人："+  sampleInfoList[i].sample_operator+ "</strong><br>";
                    html1 = html1 + "<strong>记录人：</strong>"+  sampleInfoList[i].sample_recorder+ "<br>";
                    html1 = html1 + "<strong>校准人：</strong>"+  sampleInfoList[i].sample_checker+ "<br>";
                    html1 = html1 + "<strong>制表日期：</strong>"+  sampleInfoList[i].sample_date+ "<br>";
                    html1 = html1 + "<strong>采样日期：</strong>"+  sampleInfoList[i].sample_time+ "</b><br>";
                    html1 = html1 + '</address></div>';

                    html1 = html1 +  '<div class="col-sm-3">' + "<address><strong>采样深度："+  sampleInfoList[i].sample_depth+ "</strong><br>";
                    html1 = html1 + "<strong>海拔：</strong>"+  sampleInfoList[i].sample_altitude+ " m<br>";
                    html1 = html1 + "<strong>天气：</strong>"+  sampleInfoList[i].sample_weather+ "<br>";
                    html1 = html1 + "<strong>样品重量：</strong>"+  sampleInfoList[i].sample_weight+ " kg<br>";
                    html1 = html1 + "<strong>样品属性：</strong>"+  sampleInfoList[i].sample_attribute+ "</b><br>";
                    html1 = html1 + "<strong>位置：</strong>"+ "E[" + sampleInfoList[i].sample_lon +"] N[" + sampleInfoList[i].sample_lat +"]<br>";
                    html1 = html1 + '</address></div>';



                    html1 = html1 + '<div class="col-sm-3">' + "<address><strong>采样点周边信息（1Km 内）</strong><br>";
                    html1 = html1 + "<strong>正东：</strong>"+  sampleInfoList[i].sample_env_info_east+ " <br>";
                    html1 = html1 + "<strong>正南：</strong>"+  sampleInfoList[i].sample_env_info_south+ "<br>";
                    html1 = html1 + "<strong>正西：</strong>"+  sampleInfoList[i].sample_env_info_west+ " <br>";
                    html1 = html1 + "<strong>正北：</strong>" + sampleInfoList[i].sample_env_info_north + "<br>";
                    html1 = html1 + '</address></div>';


                    var Positon  = '<p class="h4" align="center">';
                    Positon = Positon + "区-" + sampleInfoList[i].sample_positon_1 + "|列-" +sampleInfoList[i].sample_positon_2+ "|架-"+sampleInfoList[i].sample_positon_3 + "|层-" +sampleInfoList[i].sample_positon_4+ " |行-"+sampleInfoList[i].sample_positon_5 +" |排-"+ sampleInfoList[i].sample_positon_6;
                    Positon = Positon + '</p>';



                    var html2 =  '<div class="col-sm-6">' + "<address><strong>土地利用类型："+  sampleInfoList[i].sample_using+ "</strong><br>";
                    html2 = html2 + "<strong>作物类型：</strong>"+  sampleInfoList[i].sample_use_type+ "<br>";
                    html2 = html2 + "<strong>地形地貌：</strong>"+  sampleInfoList[i].sample_soil_face+ "<br>";
                    html2 = html2 + '</address></div>';

                    html2 = html2 +  '<div class="col-sm-6">' + "<address><strong>土壤类型："+  sampleInfoList[i].sample_soil_type+ "</strong><br>";
                    html2 = html2 + "<strong>土壤质地：</strong>"+  sampleInfoList[i].sample_soil_texture+ "<br>";
                    html2 = html2 + "<strong>土壤颜色：</strong>"+  sampleInfoList[i].sample_soil_color+ "<br>";
                    html2 = html2 + '</address></div>';


                    var html3 = '<a class="fancybox" title="采样前" href=';
                    html3 = html3 + ServerPath +sampleInfoList[i].sample_pic_before;
                    html3 = html3 + '><img  src=';
                    html3 = html3 + ServerPath +sampleInfoList[i].sample_pic_before;
                    html3 = html3 + '></a>';


                    html3 = html3 + '<a class="fancybox" title="采样后" href=';
                    html3 = html3 + ServerPath + sampleInfoList[i].sample_pic_after;
                    html3 = html3 + '><img src=';
                    html3 = html3 + ServerPath + sampleInfoList[i].sample_pic_after;
                    html3 = html3 + '></a>';


                    html3 = html3 + '<a class="fancybox" title="东侧" href=';
                    html3 = html3 + ServerPath + sampleInfoList[i].sample_pic_east;
                    html3 = html3 + '><img  src=';
                    html3 = html3 + ServerPath + sampleInfoList[i].sample_pic_east;
                    html3 = html3 + '></a>';

                    html3 = html3 + '<a class="fancybox" title="西侧" href=';
                    html3 = html3 + ServerPath + sampleInfoList[i].sample_pic_south;
                    html3 = html3 + '><img src=';
                    html3 = html3 + ServerPath + sampleInfoList[i].sample_pic_south;
                    html3 = html3 + '></a>';

                    html3 = html3 + '<a class="fancybox" title="南侧" href=';
                    html3 = html3 + ServerPath + sampleInfoList[i].sample_pic_west;
                    html3 = html3 + '><img src=';
                    html3 = html3 + ServerPath + sampleInfoList[i].sample_pic_west;
                    html3 = html3 + '></a>';

                    html3 = html3 + '<a class="fancybox" title="北侧" href=';
                    html3 = html3 + ServerPath + sampleInfoList[i].sample_pic_north;
                    html3 = html3 + '><img src=';
                    html3 = html3 + ServerPath + sampleInfoList[i].sample_pic_north;
                    html3 = html3 + '></a>';


                    var html = '<div class="wrapper wrapper-content animated fadeInRight" >\
                    <div class="row">\
                        <div class="col-sm-12">\
                            <div class="ibox-content p-xl">\
                            <div class="row">';

                    html = html + head;

                    html = html + '</div><div class="row">';

                    html = html + html1;

                    html = html + '</div><div class="row">';

                    html = html + Positon;

                    html = html + '</div><div class="row">';

                    html = html + html2;

                    html = html + '</div></div><div class="col-sm-12"><div class="ibox float-e-margins"><div class="ibox-content">'

                    html = html + html3;

                    html = html + '</div></div></div></div></div>';


                    layer.open({
                        type: 1,
                        skin: 'layui-layer-rim', //加上边框
                        closeBtn: 0, //不显示关闭按钮
                        area: ['80%', '70%'] //宽高
                        ,title: '样品信息'
                        ,shade: 0.8 //遮罩透明度
                        ,zIndex:888
                        ,maxmin: false //允许全屏最小化
                        ,shadeClose:true
                        ,anim: 1 //0-6的动画形式，-1不
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

        },
    });

    // Add selection
    $("#table_list").setSelection(1, true);

    // Setup buttons
    $("#table_list").jqGrid('navGrid', '#pager_list', {
        edit: false,
        add: false,
        del: false,
        search : {

            caption: "Search...",

            Find: "Find",

            Reset: "Reset",

            odata : ['equal', 'not equal', 'less', 'less or equal','greater','greater or equal', 'begins with','does not begin with','is in','is not in','ends with','does not end with','contains','does not contain'],

            groupOps: [ { op: "AND", text: "all" }, { op: "OR", text: "any" } ],

            matchText: " match",

            rulesText: " rules"

        },
    }, {
        height: 200,
        reloadAfterSubmit: true
    });


    // Add responsive to jqGrid
    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
        $('#table_list').setGridWidth(width);
    });



});

