/**
 * Created by Sam on 2018/4/12.
 */


var status = 0;

/*
 设置货柜
 */
function Set_Location() {

    if(status != 0){
        var obj = {};
        obj.location_type = status;

        if (status < 7){

            if($("#location").val() == '' || $("#location").val() == undefined){
                swal("信息填写不全");
                return;
            }

        }



        if(status == 1){
            obj.sample_positon_1 = $("#location").val();
        }else if (status == 2){

            obj.sample_positon_1 = $("#sample_positon_1 option:selected").text();;
            obj.sample_positon_2 = $("#location").val();
        }
        else if (status == 3){
            obj.sample_positon_1 = $("#sample_positon_1 option:selected").text();
            obj.sample_positon_2 = $("#sample_positon_2 option:selected").text();
            obj.sample_positon_3 = $("#location").val();
        }else if (status == 4){
            obj.sample_positon_1 = $("#sample_positon_1 option:selected").text();
            obj.sample_positon_2 = $("#sample_positon_2 option:selected").text();
            obj.sample_positon_3 = $("#sample_positon_3 option:selected").text();
            obj.sample_positon_4 = $("#location").val();
        }else if (status == 5){
            obj.sample_positon_1 = $("#sample_positon_1 option:selected").text();
            obj.sample_positon_2 = $("#sample_positon_2 option:selected").text();
            obj.sample_positon_3 = $("#sample_positon_3 option:selected").text();
            obj.sample_positon_4 = $("#sample_positon_4 option:selected").text();
            obj.sample_positon_5 = $("#location").val();
        }else if (status == 6){
            obj.sample_positon_1 = $("#sample_positon_1 option:selected").text();
            obj.sample_positon_2 = $("#sample_positon_2 option:selected").text();
            obj.sample_positon_3 = $("#sample_positon_3 option:selected").text();
            obj.sample_positon_4 = $("#sample_positon_4 option:selected").text();
            obj.sample_positon_5 = $("#sample_positon_5 option:selected").text();
            obj.sample_positon_6 = $("#location").val();
        }else if (status == 7){
            obj.location_type = 1;
            obj.sample_positon_1 =   $("#location1").val();
        }else if (status == 8){
            obj.location_type = 2;
            obj.sample_positon_1 =   $("#location1").val();
            obj.sample_positon_2 =   $("#location2").val();
        }else if (status == 9){
            obj.location_type = 3;
            obj.sample_positon_1 =   $("#location1").val();
            obj.sample_positon_2 =   $("#location2").val();
            obj.sample_positon_3 =   $("#location3").val();
        }else if (status == 10){
            obj.location_type = 4;
            obj.sample_positon_1 =   $("#location1").val();
            obj.sample_positon_2 =   $("#location2").val();
            obj.sample_positon_3 =   $("#location3").val();
            obj.sample_positon_4 =   $("#location4").val();
        }else if (status == 11){
            obj.location_type = 5;
            obj.sample_positon_1 =   $("#location1").val();
            obj.sample_positon_2 =   $("#location2").val();
            obj.sample_positon_3 =   $("#location3").val();
            obj.sample_positon_4 =   $("#location4").val();
            obj.sample_positon_5 =   $("#location5").val();
        }else if (status == 12){
            obj.location_type = 6;
            obj.sample_positon_1 =   $("#location1").val();
            obj.sample_positon_2 =   $("#location2").val();
            obj.sample_positon_3 =   $("#location3").val();
            obj.sample_positon_4 =   $("#location4").val();
            obj.sample_positon_5 =   $("#location5").val();
            obj.sample_positon_6 =   $("#location6").val();
        }

        //
        // if(status == 1){
        //     obj.location_up_value = 0;
        // }else{
        //     var pos = "#sample_positon_" + (status-1);
        //     obj.location_up_value = $(pos+" option:selected").text();
        //
        //     if(obj.location_up_value == '' || obj.location_up_value == undefined){
        //         swal("信息填写不全");
        //         return;
        //     }
        // }

        obj.location_max_node = $("#maxNum").val();

        if(obj.location_max_node == '' || obj.location_max_node == undefined){
            swal("信息填写不全");
            return;
        }

        obj.r = Math.random();

        console.log(obj);

        swal("正在保存中....");


        SetLocation(obj,function (data) {


            if (data == undefined || JSON.stringify(data) == "{}" || data.code == 0) {
                swal("失败", "设置货柜失败！", "error");
            }else{
                swal("设置成功！", "您已经完成本次设置。", "success");
                $("#positon1").css("display","none");
                $("#positon2").css("display","none");
                $("#positon3").css("display","none");
                $("#positon4").css("display","none");
                $("#positon5").css("display","none");
                $("#positon6").css("display","none");
                $("#positon7").css("display","none");
                $("#sample_positon_1").empty();
                $("#sample_positon_2").empty();
                $("#sample_positon_3").empty();
                $("#sample_positon_4").empty();
                $("#sample_positon_5").empty();
                $("#location").val("");
                $("#maxNum").val("");



            }

        })

    }

}


function SetInputValue(id,data){

    if(id == 1){
        $("#sample_positon_1").empty();
        for(var i in data.all_position1){
            $("#sample_positon_1").append('<option value="'+ data.all_position1[i] +'" data-code="' + data.all_position1[i] +'">'+ data.all_position1[i] +'</option>');
        }
        for(var i in data.used_position1){
            $("#sample_positon_1").append('<option value="'+ data.all_position1[i] +'" data-code="' + data.all_position1[i] +'">'+ data.used_position1[i] +'</option>');
        }
    }else if(id == 2){
        $("#sample_positon_2").empty();
        for(var i in data.all_position2){
            $("#sample_positon_2").append('<option value="'+ data.all_position2[i] +'" data-code="' + data.all_position2[i] +'">'+ data.all_position2[i] +'</option>');
        }
        for(var i in data.used_position2){
            $("#sample_positon_2").append('<option value="'+ data.used_position2[i] +'" data-code="' + data.used_position2[i] +'">'+ data.used_position2[i] +'</option>');
        }
    }else if(id == 3){
        $("#sample_positon_3").empty();
        for(var i in data.all_position3){
            $("#sample_positon_3").append('<option value="'+ data.all_position3[i] +'" data-code="' + data.all_position3[i] +'">'+ data.all_position3[i] +'</option>');
        }
        for(var i in data.used_position3){
            $("#sample_positon_3").append('<option value="'+ data.used_position3[i] +'" data-code="' + data.used_position3[i] +'">'+ data.used_position3[i] +'</option>');
        }
    }else if(id == 4){
        $("#sample_positon_4").empty();
        for(var i in data.all_position4){
            $("#sample_positon_4").append('<option value="'+ data.all_position4[i] +'" data-code="' + data.all_position4[i] +'">'+ data.all_position4[i] +'</option>');
        }
        for(var i in data.used_position4){
            $("#sample_positon_4").append('<option value="'+ data.used_position4[i] +'" data-code="' + data.used_position4[i] +'">'+ data.used_position4[i] +'</option>');
        }
    }else if(id == 5){
        $("#sample_positon_5").empty();
        for(var i in data.all_position5){
            $("#sample_positon_5").append('<option value="'+ data.all_position5[i] +'" data-code="' + data.all_position5[i] +'">'+ data.all_position5[i] +'</option>');
        }
        for(var i in data.used_position5){
            $("#sample_positon_5").append('<option value="'+ data.used_position5[i] +'" data-code="' + data.used_position5[i] +'">'+ data.used_position5[i] +'</option>');
        }
    }else if(id == 6){
        $("#sample_positon_6").empty();
        for(var i in data.all_position6){
            $("#sample_positon_6").append('<option value="'+ data.all_position6[i] +'" data-code="' + data.all_position6[i] +'">'+ data.all_position6[i] +'</option>');
        }
        for(var i in data.used_position6){
            $("#sample_positon_6").append('<option value="'+ data.used_position6[i] +'" data-code="' + data.used_position6[i] +'">'+ data.used_position6[i] +'</option>');
        }
    }
}

function InputClick(id){

    if(1 == id || 7 == id){
        var length = document.getElementById("sample_positon_1").length;
        if(7 == id){
            QueryPost1(1,SetInputValue);
        }else{
            if(length < 1){
                QueryPost1(1,SetInputValue);
            }
        }

    }else if(id == 2 || 8 == id){
        var length = document.getElementById("sample_positon_2").length;
        if(8 == id){
            length = 0;
        }
        if(length < 1){
            var obj = {};
            obj.sample_positon_1 = $("#sample_positon_1 option:selected").text();
            if(obj.sample_positon_1 == "" || obj.sample_positon_1 == null){
                return;
            }
            QueryPost2(2,obj,SetInputValue);
        }
    }else if(id == 3 || id == 9){
        var length = document.getElementById("sample_positon_3").length;
        if(9 == id){
            length = 0;
        }
        if(length < 1){
            var obj = {};
            obj.sample_positon_1 = $("#sample_positon_1 option:selected").text();
            obj.sample_positon_2 = $("#sample_positon_2 option:selected").text();
            if(obj.sample_positon_1 == "" || obj.sample_positon_1 == null){
                return;
            }
            if(obj.sample_positon_2 == "" || obj.sample_positon_2 == null){
                return;
            }
            QueryPost3(3,obj,SetInputValue);
        }

    }else if(id == 4 || 10 == id){
        var length = document.getElementById("sample_positon_4").length;
        if(10 == id){
            length = 0;
        }
        if(length < 1){
            var obj = {};
            obj.sample_positon_1 = $("#sample_positon_1 option:selected").text();
            obj.sample_positon_2 = $("#sample_positon_2 option:selected").text();
            obj.sample_positon_3 = $("#sample_positon_3 option:selected").text();
            if(obj.sample_positon_1 == "" || obj.sample_positon_1 == null){
                return;
            }
            if(obj.sample_positon_2 == "" || obj.sample_positon_2 == null){
                return;
            }
            if(obj.sample_positon_3 == "" || obj.sample_positon_3 == null){
                return;
            }
            QueryPost4(4,obj,SetInputValue);
        }

    }else if(id == 5 || 11 == id){
        var length = document.getElementById("sample_positon_5").length;
        if(11 == id){
            length = 0;
        }
        if(length < 1){
            var obj = {};
            obj.sample_positon_1 = $("#sample_positon_1 option:selected").text();
            obj.sample_positon_2 = $("#sample_positon_2 option:selected").text();
            obj.sample_positon_3 = $("#sample_positon_3 option:selected").text();
            obj.sample_positon_4 = $("#sample_positon_4 option:selected").text();
            if(obj.sample_positon_1 == "" || obj.sample_positon_1 == null){
                return;
            }
            if(obj.sample_positon_2 == "" || obj.sample_positon_2 == null){
                return;
            }
            if(obj.sample_positon_3 == "" || obj.sample_positon_3 == null){
                return;
            }
            if(obj.sample_positon_4 == "" || obj.sample_positon_4 == null){
                return;
            }
            QueryPost5(5,obj,SetInputValue);
        }
    }else if(id == 6 || 12 == id){
        var length = document.getElementById("sample_positon_6").length;
        if(12 == id){
            length = 0;
        }
        if(length < 1){
            var obj = {};
            obj.sample_positon_1 = $("#sample_positon_1 option:selected").text();
            obj.sample_positon_2 = $("#sample_positon_2 option:selected").text();
            obj.sample_positon_3 = $("#sample_positon_3 option:selected").text();
            obj.sample_positon_4 = $("#sample_positon_4 option:selected").text();
            obj.sample_positon_5 = $("#sample_positon_5 option:selected").text();
            if(obj.sample_positon_1 == "" || obj.sample_positon_1 == null){
                return;
            }
            if(obj.sample_positon_2 == "" || obj.sample_positon_2 == null){
                return;
            }
            if(obj.sample_positon_3 == "" || obj.sample_positon_3 == null){
                return;
            }
            if(obj.sample_positon_4 == "" || obj.sample_positon_4 == null){
                return;
            }
            if(obj.sample_positon_5 == "" || obj.sample_positon_5 == null){
                return;
            }
            QueryPost6(6,obj,SetInputValue);
        }

    }
}


$(function () {


    $("#positon1").css("display","none");
    $("#positon2").css("display","none");
    $("#positon3").css("display","none");
    $("#positon4").css("display","none");
    $("#positon5").css("display","none");
    $("#positon6").css("display","none");
    $("#positon7").css("display","none");
    $("#positon8").css("display","none");
    $("#positon9").css("display","none");
    $("#positon10").css("display","none");
    $("#positon11").css("display","none");
    $("#positon12").css("display","none");
    $("#positon13").css("display","none");

    $("select[name='sample_positon_1']").change(function(){
        $("#sample_positon_2").empty();
        $("#sample_positon_3").empty();
        $("#sample_positon_4").empty();
        $("#sample_positon_5").empty();

    });

    $("select[name='sample_positon_2']").change(function(){
        $("#sample_positon_3").empty();
        $("#sample_positon_4").empty();
        $("#sample_positon_5").empty();

    });

    $("select[name='sample_positon_3']").change(function(){
        $("#sample_positon_4").empty();
        $("#sample_positon_5").empty();

    });

    $("select[name='sample_positon_4']").change(function(){
        $("#sample_positon_5").empty();

    });

    status = 0;

    $("select#status").change(function(){
        console.log($(this).val());
        status = $(this).val();
        if(status == 1) {
            $("#positon1").css("display","none");
            $("#positon2").css("display","none");
            $("#positon3").css("display","none");
            $("#positon4").css("display","none");
            $("#positon5").css("display","none");
            $("#positon6").css("display","block");
            $("#positon7").css("display","block");
            $("#positon8").css("display","none");
            $("#positon9").css("display","none");
            $("#positon10").css("display","none");
            $("#positon11").css("display","none");
            $("#positon12").css("display","none");
            $("#positon13").css("display","none");
            document.getElementById("label").innerHTML= "设置区号";
        }
        else if(status == 2){
            $("#positon1").css("display","block");
            $("#positon2").css("display","none");
            $("#positon3").css("display","none");
            $("#positon4").css("display","none");
            $("#positon5").css("display","none");
            $("#positon6").css("display","block");
            $("#positon7").css("display","block");
            $("#positon8").css("display","none");
            $("#positon9").css("display","none");
            $("#positon10").css("display","none");
            $("#positon11").css("display","none");
            $("#positon12").css("display","none");
            $("#positon13").css("display","none");
            document.getElementById("label").innerHTML= "设置列号";
        }else if(status == 3){
            $("#positon1").css("display","block");
            $("#positon2").css("display","block");
            $("#positon3").css("display","none");
            $("#positon4").css("display","none");
            $("#positon5").css("display","none");
            $("#positon6").css("display","block");
            $("#positon7").css("display","block");
            $("#positon8").css("display","none");
            $("#positon9").css("display","none");
            $("#positon10").css("display","none");
            $("#positon11").css("display","none");
            $("#positon12").css("display","none");
            $("#positon13").css("display","none");
            document.getElementById("label").innerHTML= "设置架号";
        }else if(status == 4){
            $("#positon1").css("display","block");
            $("#positon2").css("display","block");
            $("#positon3").css("display","block");
            $("#positon4").css("display","none");
            $("#positon5").css("display","none");
            $("#positon6").css("display","block");
            $("#positon7").css("display","block");
            document.getElementById("label").innerHTML= "设置层号";
        }else if(status == 5){
            $("#positon1").css("display","block");
            $("#positon2").css("display","block");
            $("#positon3").css("display","block");
            $("#positon4").css("display","block");
            $("#positon5").css("display","none");
            $("#positon6").css("display","block");
            $("#positon7").css("display","block");
            $("#positon8").css("display","none");
            $("#positon9").css("display","none");
            $("#positon10").css("display","none");
            $("#positon11").css("display","none");
            $("#positon12").css("display","none");
            $("#positon13").css("display","none");
            document.getElementById("label").innerHTML= "设置行号";
        }else if(status == 6){
            $("#positon1").css("display","block");
            $("#positon2").css("display","block");
            $("#positon3").css("display","block");
            $("#positon4").css("display","block");
            $("#positon5").css("display","block");
            $("#positon6").css("display","block");
            $("#positon7").css("display","block");
            $("#positon8").css("display","none");
            $("#positon9").css("display","none");
            $("#positon10").css("display","none");
            $("#positon11").css("display","none");
            $("#positon12").css("display","none");
            $("#positon13").css("display","none");
            document.getElementById("label").innerHTML= "设置排号";
        }else if(status == 7){
            $("#positon1").css("display","none");
            $("#positon2").css("display","none");
            $("#positon3").css("display","none");
            $("#positon4").css("display","none");
            $("#positon5").css("display","none");
            $("#positon6").css("display","none");
            $("#positon7").css("display","block");
            $("#positon8").css("display","block");
            $("#positon9").css("display","none");
            $("#positon10").css("display","none");
            $("#positon11").css("display","none");
            $("#positon12").css("display","none");
            $("#positon13").css("display","none");
            document.getElementById("label").innerHTML= "设置排号";
        }else if(status == 8){
            $("#positon1").css("display","none");
            $("#positon2").css("display","none");
            $("#positon3").css("display","none");
            $("#positon4").css("display","none");
            $("#positon5").css("display","none");
            $("#positon6").css("display","none");
            $("#positon7").css("display","block");
            $("#positon8").css("display","block");
            $("#positon9").css("display","block");
            $("#positon10").css("display","none");
            $("#positon11").css("display","none");
            $("#positon12").css("display","none");
            $("#positon13").css("display","none");
            document.getElementById("label").innerHTML= "设置排号";
        }else if(status == 9){
            $("#positon1").css("display","none");
            $("#positon2").css("display","none");
            $("#positon3").css("display","none");
            $("#positon4").css("display","none");
            $("#positon5").css("display","none");
            $("#positon6").css("display","none");
            $("#positon7").css("display","block");
            $("#positon8").css("display","block");
            $("#positon9").css("display","block");
            $("#positon10").css("display","block");
            $("#positon11").css("display","none");
            $("#positon12").css("display","none");
            $("#positon13").css("display","none");
            document.getElementById("label").innerHTML= "设置排号";
        }else if(status == 10){
            $("#positon1").css("display","none");
            $("#positon2").css("display","none");
            $("#positon3").css("display","none");
            $("#positon4").css("display","none");
            $("#positon5").css("display","none");
            $("#positon6").css("display","none");
            $("#positon7").css("display","block");
            $("#positon8").css("display","block");
            $("#positon9").css("display","block");
            $("#positon10").css("display","block");
            $("#positon11").css("display","block");
            $("#positon12").css("display","none");
            $("#positon13").css("display","none");
            document.getElementById("label").innerHTML= "设置排号";
        }else if(status == 11){
            $("#positon1").css("display","none");
            $("#positon2").css("display","none");
            $("#positon3").css("display","none");
            $("#positon4").css("display","none");
            $("#positon5").css("display","none");
            $("#positon6").css("display","none");
            $("#positon7").css("display","block");
            $("#positon8").css("display","block");
            $("#positon9").css("display","block");
            $("#positon10").css("display","block");
            $("#positon11").css("display","block");
            $("#positon12").css("display","block");
            $("#positon13").css("display","none");
            document.getElementById("label").innerHTML= "设置排号";
        }else if(status == 12){
            $("#positon1").css("display","none");
            $("#positon2").css("display","none");
            $("#positon3").css("display","none");
            $("#positon4").css("display","none");
            $("#positon5").css("display","none");
            $("#positon6").css("display","none");
            $("#positon7").css("display","block");
            $("#positon8").css("display","block");
            $("#positon9").css("display","block");
            $("#positon10").css("display","block");
            $("#positon11").css("display","block");
            $("#positon12").css("display","block");
            $("#positon13").css("display","block");
            document.getElementById("label").innerHTML= "设置排号";
        }

    });

    QueryUser();

    QueryPosition(function (data) {
        $('#citymodel').citys({code:data.position});
        $("#sample_lon").val(data.sample_lon);
        $("#sample_lat").val(data.sample_lat);
    });

    $.jgrid.defaults.styleUI = 'Bootstrap';
    // Configuration for jqGrid Example 2
    $("#table_list").jqGrid({
        data: [],
        datatype: "local",
        height: 450,
        autowidth: true,
        shrinkToFit: true,
        rowNum: 20,
        rowList: [10, 20, 30],
        colNames: ['用户编号', '用户名称','密码'],
        colModel: [
            {
                name: 'user_id',
                index: 'user_id',
                editable: true,
                width: 60,
                sorttype: "int",
                search: true
            },
            {
                name: 'user_name',
                index: 'user_name',
                editable: true,
                width: 90
            },
            {
                name: 'user_pwd',
                index: 'user_pwd',
                editable: true,
                width: 90
            }
        ],
        pager: "#pager_list",
        viewrecords: true,
        caption: "用户管理",
        hidegrid: false
    });

    // Add selection
    $("#table_list").setSelection(1, true);

    // Setup buttons
    $("#table_list").jqGrid('navGrid', '#pager_list', {
        edit: false,
        add: true,
        del: true,
        search: true,
        addfunc:add,
        delfunc:del,
    }, {
        height: 200,
        reloadAfterSubmit: true
    });


    // Add responsive to jqGrid
    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
        $('#table_list').setGridWidth(width);
    });


    QueryConfig(function (data) {

        console.log(data);
        if(data.code == 1){
            $("#RoadURL").val(data.url);
        }

    });




});




/*
 显示用户列表
 */
function ShowUserList(obj){

    console.log(obj);
    if (obj != undefined && JSON.stringify(obj) != "{}") {

        console.log(obj.userInfoList);

        $("#table_list").jqGrid('clearGridData');

        $("#table_list").jqGrid('setGridParam',{

            datatype:'local',

            data:obj.userInfoList,//newData是符合格式要求的重新加载的数据

            page:1//哪一页的值

        }).trigger("reloadGrid");
    }
}

/*
 新增用户
 */
function add() {

    //在这里面输入任何合法的js语句
    var index = layer.open({
        type: 1 //Page层类型
        ,area: ['500px', '300px']
        ,title: '新增用户'
        ,shade: 0.6 //遮罩透明度
        ,maxmin: false //允许全屏最小化
        ,shadeClose:true
        ,anim: 1 //0-6的动画形式，-1不开启
        ,content: '<div style="padding:50px;"><form role="form" id="addForm">\
            <div class="form-group">\
                <input type="text" placeholder="请输入用户名" id="user_name" class="form-control">\
            </div>\
            <div class="form-group">\
                <input type="password" placeholder="请输入密码" id="user_pwd" class="form-control">\
            </div>\
            <div>\
                <button class="btn btn-sm btn-primary pull-right m-t-n-xs" type="button" onclick="SaveUserToService(QueryUser)" align="center"><strong>确定</strong></button>\
            </div>\
        </form></div>'

    });




}

/*
 删除用户
 */
function del(id) {


    console.log(id);

    if (id != null) {

        var obj = $("#table_list").jqGrid("getRowData", id);

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

                    swal("删除成功！", "您已经删除了这条记录。", "success");

                    DeleteUserToService(obj.user_id,QueryUser);

                } else {
                    swal("已取消", "您取消了删除操作！", "error");
                }
            });
    }
    else
        swalAlert("提示！","未选择数据");

}

/*
 查询用户列表
 */
function QueryUser(){
    QueryUserList(ShowUserList);
}

function Set_Position() {

    var obj = {};
    obj.sample_provice = $("#sample_provice option:selected").text();
    obj.sample_city = $("#sample_city option:selected").text();
    obj.sample_area = $("#sample_area option:selected").text();
    obj.position = $("#sample_area").val();
    obj.sample_lon = $("#sample_lon").val();
    obj.sample_lat = $("#sample_lat").val();
    obj.r = Math.random();

    console.log(obj);

    SetPosition(obj,function (data) {

        if (data == undefined || JSON.stringify(data) == "{}" || data.code == 0) {
            swal("失败！", "请确认信息是否正确。", "error");
        }else{
            swal("设置成功！", data.message, "success");
        }

    })
}

function getData(data,level) {
    var bounds = data.boundaries;
    if (bounds) {
        for (var i = 0, l = bounds.length; i < l; i++) {
            var polygon = new AMap.Polygon({
                map: map,
                strokeWeight: 1,
                strokeColor: '#CC66CC',
                fillColor: '#CCF3FF',
                fillOpacity: 0.5,
                path: bounds[i]
            });
            polygons.push(polygon);
        }
        map.setFitView();//地图自适应
    }


    //清空下一级别的下拉列表
    if (level === 'province') {
        citySelect.innerHTML = '';
        districtSelect.innerHTML = '';
        areaSelect.innerHTML = '';
    } else if (level === 'city') {
        districtSelect.innerHTML = '';
        areaSelect.innerHTML = '';
    } else if (level === 'district') {
        areaSelect.innerHTML = '';
    }

    var subList = data.districtList;
    if (subList) {
        var contentSub = new Option('--请选择--');
        var curlevel = subList[0].level;
        var curList =  document.querySelector('#' + curlevel);
        curList.add(contentSub);
        for (var i = 0, l = subList.length; i < l; i++) {
            var name = subList[i].name;
            var levelSub = subList[i].level;
            var cityCode = subList[i].citycode;
            contentSub = new Option(name);
            contentSub.setAttribute("value", levelSub);
            contentSub.center = subList[i].center;
            contentSub.adcode = subList[i].adcode;
            curList.add(contentSub);
        }
    }

}
function search(obj) {
    //清除地图上所有覆盖物
    for (var i = 0, l = polygons.length; i < l; i++) {
        polygons[i].setMap(null);
    }
    var option = obj[obj.options.selectedIndex];
    var keyword = option.text; //关键字
    var adcode = option.adcode;
    district.setLevel(option.value); //行政区级别
    district.setExtensions('all');
    //行政区查询
    //按照adcode进行查询可以保证数据返回的唯一性
    district.search(adcode, function(status, result) {
        if(status === 'complete'){
            getData(result.districtList[0],obj.id);
        }
    });
}
function setCenter(obj){
    map.setCenter(obj[obj.options.selectedIndex].center)
}


function Set_URL() {

    var obj = {};

    obj.ssms_key = "url";

    obj.ssms_value = $("#RoadURL").val();


    SetConfig(obj,function(data){

        if(data.code == 1){

            swal("保存成功！", data.message, "success");

        }

    })



}