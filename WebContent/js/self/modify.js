/**
 * Created by Sam on 2018/4/14.
 */

var sampleInfoList = [];

var nSearchID = "";

var sampleInfo = {};


function formUpdate(){
    var obj = {};
    var x=document.getElementById("myForm");
    var arr =[];
    for (var i=0;i<x.length;i++) {
        if(x.elements[i].tagName == "SELECT"){
            var ops = x.elements[i].options;
            for(var j=0; j<ops.length; j++) {
                if (ops[j].selected == true) {
                    if(ops[j].text == '' || ops[j].text == undefined){
                        MyAlter($("#"+ x.elements[i].id).data("placeholder"),x.elements[i].id);
                        return;
                    }
                    console.log(ops[j].text);
                    obj[x.elements[i].id] = ops[j].text;
                    break;
                }
            }
        } else if (x.elements[i].tagName == "INPUT"){

            if(x.elements[i].type.toLowerCase() == "radio"){
                arr.push(x.elements[i].name);
            }

            if(x.elements[i].type.toLowerCase() == "file"){

                console.log(FileName.length);

                for (var a = 0; a < FileName.length; a++) {
                    if(FileName[a].id == x.elements[i].id){

                        console.log(FileName[a].name);

                        var imgname = FileName[a].name;
                        if (imgname  ==null ||imgname  == "" || imgname  == undefined) {
                            MyAlter(x.elements[i].placeholder,x.elements[i].id);
                            return;
                        }

                        obj[x.elements[i].id] = imgname;

                        break;
                    }
                }
                continue;
            }

            if(x.elements[i].id == '' || x.elements[i].id == undefined){
                continue;
            }

            if(x.elements[i].value == '' || x.elements[i].value == undefined){
                if(arr.length > 0){
                    var name = arr[arr.length - 1];
                    if(x.elements[i].name != '' && x.elements[i].name != undefined){
                        if(x.elements[i].name == name){
                            var soil = getValue(name);
                            if (soil == undefined || soil == 'on') {
                                soil = $("#sample_" + name).val();
                            }

                            if (soil ==null ||soil == "" || soil == undefined) {
                                MyAlter(x.elements[i].placeholder,x.elements[i].id);
                                return;
                            }else{
                                console.log(soil);
                                obj[x.elements[i].id] = soil;
                                continue;
                            }
                        }
                    }
                }
                MyAlter(x.elements[i].placeholder,x.elements[i].id);
                return;
            }

            console.log(x.elements[i].value);
            obj[x.elements[i].id] = x.elements[i].value;

        }else{
            console.log(x.elements[i].tagName);
        }
    }

    obj.r = Math.random();

    obj.sample_id = sampleInfo.sample_id;
    UpdateDataToService(obj,function () {
        location.reload();
    });

    console.log(obj);
};

$.fn.populateForm = function(data){
    FileName = [];
    console.log(data);
    return this.each(function(){
        var formElem, name;
        if(data == null){this.reset(); return; }
        for(var i = 0; i < this.length; i++){
            formElem = this.elements[i];
            //checkbox的name可能是name[]数组形式

           // console.log(formElem.id);

            name = (formElem.type == "checkbox")? formElem.name.replace(/(.+)\[\]$/, "$1") : formElem.name;

            //if(data[name] == undefined) continue;
            switch(formElem.type){
                case "checkbox":
                    if(data[name] == ""){
                        formElem.checked = false;
                    }else{
                        //数组查找元素
                        if(data[name].indexOf(formElem.value) > -1){
                            formElem.checked = true;
                        }else{
                            formElem.checked = false;
                        }
                    }
                    break;
                case "radio":
                    if(data["sample_" + formElem.name] == ""){

                        $(formElem).iCheck('uncheck');

                    }else if(formElem.value == data["sample_" + formElem.name]){

                        $(formElem).iCheck('check');
                    }else{
                        $(formElem).iCheck('uncheck');
                    }

                    break;
                case "button": break;
                case "file" :
                    var imageID = formElem.id + "_img";
                    var imageURl = formElem.id +"_url";
                    document.getElementById(imageID).src = ServerPath + data[formElem.id];
                    document.getElementById(imageURl).href = ServerPath + data[formElem.id];
                    var obj = {"id":formElem.id,"name": data[formElem.id]};
                    FileName.push(obj);
                    break;
                case "select-one":
                    if(formElem.name == formElem.id){
                        $("#"+formElem.id).append('<option value="'+ data[formElem.id] +'" data-code="' + data[formElem.id] +'">'+ data[formElem.id] +'</option>');
                    }
                    else{
                        formElem.value = data[formElem.id];
                    }

                    break;
                default: {
                    if(formElem.name == '' || formElem.name == undefined || formElem.name == null){
                        formElem.value = data[formElem.id];
                    }
                    else
                    {
                        var soil = getValue(formElem.name);
                        console.log(soil);
                        if (soil == undefined || soil == 'on') {
                            formElem.value = data[formElem.id];
                        }
                    }

                }
            }
        }
    });
};


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

            sampleInfo = obj.sampleInfoList[0];

            $("#myForm").populateForm(obj.sampleInfoList[0]);


            var codeobj = {};
            codeobj.valueType = 'name';
            codeobj.province =obj.sampleInfoList[0].sample_provice;
            codeobj.city =obj.sampleInfoList[0].sample_city;
            codeobj.area =obj.sampleInfoList[0].sample_area;
            $('#citymodel').citys(codeobj);

        }
    }
}

/*
 查询样品编号
 */
function SearchID()
{
    var sample_id = $('#SampleID').val();

    nSearchID = sample_id;

    QuerySampleIDToService(sample_id,function (obj) {
        $("#myFormSearch").populateForm(obj.sampleInfo);
        var codeobj = {};
        codeobj.valueType = 'name';
        codeobj.province =obj.sampleInfo.sample_provice;
        codeobj.city =obj.sampleInfo.sample_city;
        codeobj.area =obj.sampleInfo.sample_area;
        $('#citymodelSearch').citys(codeobj);
    });
}


/*
 查询样品编号
 */
function SearchSampleId()
{
    var sample_id = $('#sample_id').val();

    QuerySampleIDToService(sample_id,function (obj) {

        $("#commitHouse").css("display","block");
        $("#reason").css("display","none");

        console.log(obj);

        var head = '<p class="lead" align="center">样品统一编码: ' + obj.sampleInfo.sample_id + '</p>';

        var html1 =  '<div class="col-sm-2">' + "<address><strong>省：     "+  obj.sampleInfo
                .sample_provice+ "</strong><br>";
        html1 = html1 + "<strong>市：    "+  obj.sampleInfo.sample_city+ "</strong><br>";
        html1 = html1 + "<strong>县：    "+  obj.sampleInfo.sample_area+ "</strong><br>";
        html1 = html1 + "<strong>乡镇：  "+  obj.sampleInfo.sample_towns+ "</strong><br>";
        html1 = html1 + "<strong>村/街道:"+  obj.sampleInfo.sample_village+ "</strong><br>";
        html1 = html1 + '</address></div>';


        html1 = html1 +  '<div class="col-sm-2">' + "<address><strong>采样人："+  obj.sampleInfo.sample_operator+ "</strong><br>";
        html1 = html1 + "<strong>记录人：</strong>"+  obj.sampleInfo.sample_recorder+ "<br>";
        html1 = html1 + "<strong>校准人：</strong>"+  obj.sampleInfo.sample_checker+ "<br>";
        html1 = html1 + "<strong>制表日期：</strong>"+  obj.sampleInfo.sample_date+ "<br>";
        html1 = html1 + "<strong>采样日期：</strong>"+  obj.sampleInfo.sample_time+ "</b><br>";
        html1 = html1 + "<strong>样品属性：</strong>"+  obj.sampleInfo.sample_attribute+ "</b><br>";
        html1 = html1 + '</address></div>';

        html1 = html1 +  '<div class="col-sm-2">' + "<address><strong>采样深度："+  obj.sampleInfo.sample_depth+ "</strong><br>";
        html1 = html1 + "<strong>采样重量：</strong>"+  obj.sampleInfo.take_weight+ "kg</b><br>";
        html1 = html1 + "<strong>海拔：</strong>"+  obj.sampleInfo.sample_altitude+ " m<br>";
        html1 = html1 + "<strong>天气：</strong>"+  obj.sampleInfo.sample_weather+ "<br>";
        html1 = html1 + "<strong>样品重量：</strong>"+  obj.sampleInfo.sample_weight+ " kg<br>";
        html1 = html1 + "<strong>位置：</strong>"+ "E[" + obj.sampleInfo.sample_lon +"] N[" + obj.sampleInfo.sample_lat +"]<br>";
        html1 = html1 + '</address></div>';



        html1 = html1 + '<div class="col-sm-2">' + "<address><strong>采样点周边信息（1Km 内）</strong><br>";
        html1 = html1 + "<strong>正东：</strong>"+  obj.sampleInfo.sample_env_info_east+ "<br>";
        html1 = html1 + "<strong>正南：</strong>"+  obj.sampleInfo.sample_env_info_south+ "<br>";
        html1 = html1 + "<strong>正西：</strong>"+  obj.sampleInfo.sample_env_info_west+ "<br>";
        html1 = html1 + "<strong>正北：</strong>" + obj.sampleInfo.sample_env_info_north + "<br>";
        html1 = html1 + '</address></div>';


        var Positon  = '<p class="h4" align="center">';
        Positon = Positon + "区-" + obj.sampleInfo.sample_positon_1 + "|列-" +obj.sampleInfo.sample_positon_2+ "|架-"+obj.sampleInfo.sample_positon_3 + "|层-" +obj.sampleInfo.sample_positon_4+ " |行-"+obj.sampleInfo.sample_positon_5 +" |排-"+ obj.sampleInfo.sample_positon_6;
        Positon = Positon + '</p>';



        var html2 =  '<div class="col-sm-2">' + "<address><strong>土地利用类型："+  obj.sampleInfo.sample_using+ "</strong><br>";
        html2 = html2 + "<strong>作物类型：</strong>"+  obj.sampleInfo.sample_use_type+ "<br>";
        html2 = html2 + "<strong>地形地貌：</strong>"+  obj.sampleInfo.sample_soil_face+ "<br>";
        html2 = html2 + '</address></div>';

        html2 = html2 +  '<div class="col-sm-2">' + "<address><strong>土壤类型："+  obj.sampleInfo.sample_soil_type+ "</strong><br>";
        html2 = html2 + "<strong>土壤质地：</strong>"+  obj.sampleInfo.sample_soil_texture+ "<br>";
        html2 = html2 + "<strong>土壤颜色：</strong>"+  obj.sampleInfo.sample_soil_color+ "<br>";
        html2 = html2 + '</address></div>';


        html1 = html1 + html2;


        var html3 = '<a class="fancybox" title="采样前" href=';
        html3 = html3 + ServerPath +obj.sampleInfo.sample_pic_before;
        html3 = html3 + '><img  src=';
        html3 = html3 + ServerPath +obj.sampleInfo.sample_pic_before;
        html3 = html3 + '></a>';


        html3 = html3 + '<a class="fancybox" title="采样后" href=';
        html3 = html3 + ServerPath + obj.sampleInfo.sample_pic_after;
        html3 = html3 + '><img src=';
        html3 = html3 + ServerPath + obj.sampleInfo.sample_pic_after;
        html3 = html3 + '></a>';


        html3 = html3 + '<a class="fancybox" title="东侧" href=';
        html3 = html3 + ServerPath + obj.sampleInfo.sample_pic_east;
        html3 = html3 + '><img  src=';
        html3 = html3 + ServerPath + obj.sampleInfo.sample_pic_east;
        html3 = html3 + '></a>';

        html3 = html3 + '<a class="fancybox" title="西侧" href=';
        html3 = html3 + ServerPath + obj.sampleInfo.sample_pic_south;
        html3 = html3 + '><img src=';
        html3 = html3 + ServerPath + obj.sampleInfo.sample_pic_south;
        html3 = html3 + '></a>';

        html3 = html3 + '<a class="fancybox" title="南侧" href=';
        html3 = html3 + ServerPath + obj.sampleInfo.sample_pic_west;
        html3 = html3 + '><img src=';
        html3 = html3 + ServerPath + obj.sampleInfo.sample_pic_west;
        html3 = html3 + '></a>';

        html3 = html3 + '<a class="fancybox" title="北侧" href=';
        html3 = html3 + ServerPath + obj.sampleInfo.sample_pic_north;
        html3 = html3 + '><img src=';
        html3 = html3 + ServerPath + obj.sampleInfo.sample_pic_north;
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

        // html = html + '</div><div class="row">';
        //
        // html = html + html2;

        html = html + '</div></div><div class="col-sm-12"><div class="ibox float-e-margins"><div class="ibox-content">'

        html = html + html3;

        html = html + '</div></div></div></div></div>';


        document.getElementById("ResumeID").innerHTML= html;

        $(document).ready(function () {
            $('.fancybox').fancybox({
                openEffect: 'none',
                closeEffect: 'none',
            });
        });


    });
}

/*
 删除按钮
 */
function DeleteData()
{
    var temp = [];

    var index = 0;

    swal({
            title: "您确定要删除这条记录吗",
            text: "删除后将无法恢复，请谨慎操作！",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的，我要删除！",
            cancelButtonText: "让我再考虑一下…",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {

                DeleteToService(nSearchID,function () {
                    location.reload();
                    swal("删除成功！", "您已经删除了这条记录。", "success");
                });
            } else {
                swal("已取消", "您取消了删除操作！", "error");
            }
        });
}


function initModify() {

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

                    sampleInfo = sampleInfoList[i];

                    $("#myForm").populateForm(sampleInfoList[i]);

                    var codeobj = {};
                    codeobj.valueType = 'name';
                    codeobj.province =sampleInfoList[i].sample_provice;
                    codeobj.city =sampleInfoList[i].sample_city;
                    codeobj.area =sampleInfoList[i].sample_area;
                    $('#citymodel').citys(codeobj);
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

    QueryDataToService(10000,ShowTableList);


}

function SampleIn(type) {

    var obj = {};
    obj.sample_id = $("#sample_id").val();
    obj.sample_in_type = type;
    obj.sample_in_operator = $("#sample_operator").val();

    if(obj.sample_in_operator == ''){
        swal("信息填写不全");
        return;
    }

    if(type == 2){
        obj.sample_in_weight = $("#sample_weight").val();
        obj.sample_in_status = $("#status").val();
        if(obj.sample_in_status == "1"){
            obj.sample_in_error_reason = $("#error_reason").val();
            if(obj.sample_in_error_reason == '' || obj.sample_in_error_reason == ''){
                swal("信息填写不全");
                return;
            }
        }

        if(obj.sample_in_weight == '' || obj.sample_in_status == ''){
            swal("信息填写不全");
            return;
        }
    }

    obj.r = Math.random();

    console.log(obj);

    SetSamplein(obj,function (data) {
        if (data == undefined || JSON.stringify(data) == "{}" || data.code == 0) {
            swal("失败！", "入库失败，请确认信息是否正确。", "error");
        }else{
            swal("入库成功！", "您已经完成本次入库。", "success");
            $("#commitHouse").css("display","none");
            document.getElementById("sample_id").innerHTML= "";

        }
    })

}