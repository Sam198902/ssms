/**
 * Created by Sam on 2018/4/17.
 */

var sampleInfoList = [];

var PrintObj = {};


function InitPrint()
{
    var obj = {};
    obj.sample_id = decodeURI(getQueryString("sample_id"));
    obj.sample_soil_face = decodeURI(getQueryString("sample_soil_face"));
    obj.sample_use_type = decodeURI(getQueryString("sample_use_type"));
    obj.sample_soil_type = decodeURI(getQueryString("sample_soil_type"));
    obj.sample_soil_texture = decodeURI(getQueryString("sample_soil_texture"));
    obj.sample_time = decodeURI(getQueryString("sample_time"));
    obj.sample_area = decodeURI(getQueryString("sample_area"));
    obj.sample_towns = decodeURI(getQueryString("sample_towns"));
    obj.sample_village = decodeURI(getQueryString("sample_village"));
    obj.sample_positon_1 = decodeURI(getQueryString("sample_positon_1"));
    obj.sample_positon_2 = decodeURI(getQueryString("sample_positon_2"));
    obj.sample_positon_3 = decodeURI(getQueryString("sample_positon_3"));
    obj.sample_positon_4 = decodeURI(getQueryString("sample_positon_4"));
    obj.sample_positon_5 = decodeURI(getQueryString("sample_positon_5"));
    obj.sample_positon_6 = decodeURI(getQueryString("sample_positon_6"));


    ShowPrintValue(obj);
}

function ShowPrintValue(obj)
{

    if (obj == undefined || JSON.stringify(obj) != "{}") {
        var myDate = new Date();
        $("#label_data").html("Date: "+ myDate.toLocaleDateString());
        $("#label_id").html("样品编码: "+ obj.sample_id);
        $("#label_face").html("地形地貌: "+ obj.sample_soil_face);
        $("#label_using").html("土地利用类型: "+ obj.sample_use_type);
        $("#label_type").html("土壤类型: "+ obj.sample_soil_type);
        $("#label_texture").html("土壤质地: "+ obj.sample_soil_texture);
        $("#label_time").html("采样时间: "+ obj.sample_time);
        $("#label_place").html("采样地点: 南京"+ obj.sample_area + obj.sample_village);
        $("#label_localize1").html("存放信息: "+ "区-" + obj.sample_positon_1 + "|列-" +obj.sample_positon_2+ "|架-"+obj.sample_positon_3);
        $("#label_localize2").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ "层-" +obj.sample_positon_4+ "|行-"+obj.sample_positon_5 +"|排-"+obj.sample_positon_6);
        $("#barcode").JsBarcode(obj.sample_id,{displayValue:false, width:1,height:45,margin:0});
        /*$("#label_barcode").html(obj.sample_id);*/

    }
}




/*
 打印信息
 */
function PrintInfo()
{
    if (JSON.stringify(PrintObj) != "{}") {
        var html_value = basePath + "/invoice-print.html?sample_id=" + encodeURI(PrintObj.sample_id);
        html_value = html_value + "&sample_soil_face=" + encodeURI(PrintObj.sample_soil_face);
        html_value = html_value + "&sample_use_type=" + encodeURI(PrintObj.sample_use_type);
        html_value = html_value + "&sample_soil_type=" + encodeURI(PrintObj.sample_soil_type);
        html_value = html_value + "&sample_soil_texture=" + encodeURI(PrintObj.sample_soil_texture);
        html_value = html_value + "&sample_time=" + encodeURI(PrintObj.sample_time);
        html_value = html_value + "&sample_area=" + encodeURI(PrintObj.sample_area);
        html_value = html_value + "&sample_towns=" + encodeURI(PrintObj.sample_towns);
        html_value = html_value + "&sample_village=" + encodeURI(PrintObj.sample_village);
        html_value = html_value + "&sample_positon_1=" + encodeURI(PrintObj.sample_positon_1);
        html_value = html_value + "&sample_positon_2=" + encodeURI(PrintObj.sample_positon_2);
        html_value = html_value + "&sample_positon_3=" + encodeURI(PrintObj.sample_positon_3);
        html_value = html_value + "&sample_positon_4=" + encodeURI(PrintObj.sample_positon_4);
        html_value = html_value + "&sample_positon_5=" + encodeURI(PrintObj.sample_positon_5);
        html_value = html_value + "&sample_positon_6=" + encodeURI(PrintObj.sample_positon_6);

        window.open(encodeURI(html_value));
    }
}

/*
 刷新列表
 */
function ShowTableList(obj){

    console.log(obj);

    if (obj != undefined && JSON.stringify(obj) != "{}") {

        if (obj.sampleInfoList.length>0) {

            console.log(obj.sampleInfoList);

            sampleInfoList = obj.sampleInfoList;

            $("#table_list").jqGrid('clearGridData');

            $("#table_list").jqGrid('setGridParam',{

                datatype:'local',

                data:obj.sampleInfoList,//newData是符合格式要求的重新加载的数据

                page:1//哪一页的值

            }).trigger("reloadGrid");

        }
    }
}


function init() {

    var myDate = new Date();

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
        caption: "打印样品信息",
        hidegrid: false,
        onSelectRow: function(id){
            var obj = $("#table_list").jqGrid("getRowData", id);
            for(var i = 0; i< sampleInfoList.length;++i){
                if(obj.sample_id == sampleInfoList[i].sample_id){

                    console.log(sampleInfoList[i]);

                    PrintObj = sampleInfoList[i];

                    var html = ' <section class="invoice" ><div class="row"><div class="col-sm-12"><h2 class="page-header"><i class="fa fa-globe"></i> 土壤样品信息<small class="pull-right">';
                    html = html + "Date: "+ myDate.toLocaleDateString();
                    html = html + '</small></h2></div></div>';

                    html = html + '<p class="h_p">样品编码: '+ sampleInfoList[i].sample_id + '</p>';
                    html = html + '<p class="h_p">地形地貌: '+ sampleInfoList[i].sample_soil_face + '</p>';
                    html = html + '<p class="h_p">土地利用类型: '+ sampleInfoList[i].sample_use_type + '</p>';
                    html = html + '<p class="h_p">土壤类型: '+ sampleInfoList[i].sample_soil_type + '</p>';
                    html = html + '<p class="h_p">土壤质地: '+ sampleInfoList[i].sample_soil_texture + '</p>';
                    html = html + '<p class="h_p">采样时间: '+ sampleInfoList[i].sample_time + '</p>';
                    html = html + '<p class="h_p">采样地点: 南京'+ sampleInfoList[i].sample_area + sampleInfoList[i].sample_village + '</p>';
                    html = html + '<p class="h_p">存放信息: '+ "区-" + sampleInfoList[i].sample_positon_1 + "|列-" +sampleInfoList[i].sample_positon_2+ "|架-"+sampleInfoList[i].sample_positon_3  + '</p>';
                    html = html + '<p class="h_p"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ "层-" +sampleInfoList[i].sample_positon_4+ "|行-"+sampleInfoList[i].sample_positon_5 +"|排-"+sampleInfoList[i].sample_positon_6 +  '</p>';


                    html = html + '<img id="barcode" height="80px" />\
                    <div class="row no-print">\
                        <div class="col-xs-12">\
                         <a  target="_blank" class="btn btn-primary" onclick="PrintInfo()"><i class="fa fa-print"></i> Print</a>\
                        </div>\
                     </div>\
                    </section>'


                    //在这里面输入任何合法的js语句
                    var index = layer.open({
                        type: 1 //Page层类型
                        ,area: ['30%', '90%']
                        ,title: '样品信息'
                        ,shade: 0.6 //遮罩透明度
                        ,maxmin: false //允许全屏最小化
                        ,shadeClose:true
                        ,anim: 1 //0-6的动画形式，-1不开启
                        ,content: html

                    });


                    $("#barcode").JsBarcode(sampleInfoList[i].sample_id);
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
        search: true,
    }, {
        height: 200,
        reloadAfterSubmit: true
    });


    // Add responsive to jqGrid
    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
        $('#table_list').setGridWidth(width);
    });

    QueryDataToService(10000,ShowTableList);

}



