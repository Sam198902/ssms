/**
 * Created by Sam on 2018/4/17.
 */


var PrintObj = {};

/*
 开柜
 */

function OpenContainer()
{
    var obj = {};
    obj.sample_positon_1 = PrintObj.sample_positon_1;
    obj.sample_positon_2 = PrintObj.sample_positon_2;
    obj.sample_positon_3 = PrintObj.sample_positon_3;
    obj.sample_positon_4 = PrintObj.sample_positon_4;
    obj.sample_positon_5 = PrintObj.sample_positon_5;
    obj.sample_positon_6 = PrintObj.sample_positon_6;

    var str = "区-" + obj.sample_positon_1 + "|列-" +obj.sample_positon_2+ "|架-"+obj.sample_positon_3 + "|层-" +obj.sample_positon_4+ " |行-"+obj.sample_positon_5 +" |排-"+obj.sample_positon_6;


    swal({
            title: "是否开始远程开柜",
            text: str,
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认！",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {

                document.getElementById("loadingSpiner").style.visibility = "visible";

                funcOpen(obj);

                document.getElementById("loadingSpiner").style.visibility = "hidden";

            } else {
                swal("已取消", "您取消了删除操作！", "error");
            }
        });

}

/*
 关柜
 */

function CloseContainer()
{
    var obj = {};
    obj.sample_positon_1 = PrintObj.sample_positon_1;
    obj.sample_positon_2 = PrintObj.sample_positon_2;
    obj.sample_positon_3 = PrintObj.sample_positon_3;
    obj.sample_positon_4 = PrintObj.sample_positon_4;
    obj.sample_positon_5 = PrintObj.sample_positon_5;
    obj.sample_positon_6 = PrintObj.sample_positon_6;

    var str = "区-" + obj.sample_positon_1 + "|列-" +obj.sample_positon_2+ "|架-"+obj.sample_positon_3 + "|层-" +obj.sample_positon_4+ " |行-"+obj.sample_positon_5 +" |排-"+obj.sample_positon_6;

    swal({
                    title: "是否开始远程关柜",
                    text: str,
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "是的，马上关柜！",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {

                        swal("马上处理！");

                        document.getElementById("loadingSpiner").style.visibility = "visible";

                        funcClose(obj);

                        document.getElementById("loadingSpiner").style.visibility = "hidden";

                    } else {
                        swal("已取消", "您取消了删除操作！", "error");
                    }
        });

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

            PrintObj = obj.sampleInfoList[0];
            var data = "./map/map_gdTag.html?x=" + obj.sampleInfoList[0].sample_lon;
            data = data + "&y=" + obj.sampleInfoList[0].sample_lat;
            document.getElementById("mapID").innerHTML = "<object type=\"text/html\" data="+data+ " width=\"100%\" height=\"550px\"></object>";



        }
        else
        {
            var data = "./map/map_gdTag.html";
            document.getElementById("mapID").innerHTML = "<object type=\"text/html\" data="+data+ " width=\"100%\" height=\"550px\"></object>";

        }
    }
}


$(function () {

    document.getElementById("loadingSpiner").style.visibility = "hidden";

    $.jgrid.defaults.styleUI = 'Bootstrap';
    $("#table_list").jqGrid({
        data: [],
        datatype: "local",
        height: 450,
        autowidth: true,
        shrinkToFit: true,
        rowNum: 20,
        rowList: [10, 20, 30],
        colNames: ['样品编号', '村/街道'],
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
                name: 'sample_village',
                index: 'sample_village',
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

                    PrintObj = sampleInfoList[i];

                    var data = "./map/map_gdTag.html?x=" + sampleInfoList[i].sample_lon;
                    data = data + "&y=" + sampleInfoList[i].sample_lat;
                    document.getElementById("mapID").innerHTML = "<object type=\"text/html\" data="+data+ " width=\"100%\" height=\"550px\"></object>";

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

    QueryDataToService(21,ShowTableList);

});
