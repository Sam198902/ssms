/**
 * Created by Sam on 2018/4/11.
 */

/*
 保存数据
 */
function SaveDataToService(obj,func)
{
    $.ajax({
        url: basePath + "/sample/add",
        dataType: 'json',
        type:'POST',
        data: obj,
        success: function (data)
        {
            swalAlert("保存提示！",data.message,function () {
                if (data.code == 1) {
                    if (func != undefined && func != null) {
                        func();
                    }
                }
            });
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}


/*
 更新数据
 */
function UpdateDataToService(obj,func)
{

    console.log(obj);

    $.ajax({
        url: basePath + "/sample/update",
        dataType: 'json',
        type:'POST',
        data: obj,
        success: function (data)
        {
            console.log(data);
            swalAlert("保存提示！",data.message,function () {
                if (data.code == 1) {
                    if (func != undefined && func != null) {
                        func();
                    }
                }
            });
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}



/*
 查询数据
 */
function QueryDataToService(num,func)
{
    $.ajax({
        url: basePath + "/sample/get/list",
        dataType: 'json',
        //传送请求数据
        type:"GET",
        data: {pageSize:num,r:Math.random()},
        success: function (data)
        {
            if (data.code == 1) {
                if (func != undefined && func != null) {
                    func(data);
                }
            }else{
                swalAlert("提示！",data.message);

            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });

}


/*
 根据样品编号查询数据
 */
function QuerySampleIDToService(id,func){

    $.ajax({
        url: basePath + "/sample/get",
        dataType: 'json',
        type:"GET",
        data: {sample_id:id,r:Math.random()},
        success: function (data)
        {
            if (data.code == 1) {
                if (func != undefined && func != null){
                    func(data);
                }
            }else{
                swalAlert("提示！",data.message);
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });

}

/*
 删除数据
 */

function DeleteToService(id,func)
{
    $.ajax({
        url: basePath + "/sample/delete",
        dataType: 'json',
        type:"POST",
        data: {sample_id:id,r:Math.random()},
        success: function (data)
        {
            if (data.code == 1) {

                if (func != undefined && func != null) {
                    func();
                }
            }else{
                swal("删除失败",data.message, "error");
            }

        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}


/*
 上传文件
 */
function ajaxFileUpload(id) {
    console.log(id);
    var imageID = id + "_img";
    var imageURl = id +"_url";
    $.ajaxFileUpload({
        url: basePath + "/upload/pic", //服务器端请求地址
        secureuri: false, //是否需要安全协议，一般设置为false
        fileElementId: id, //文件上传域的ID
        dataType: 'json', //返回值类型 一般设置为json
        enctype:'multipart/form-data',//注意一定要有该参数
        success: function (data, status)  //服务器成功响应处理函数
        {
            console.log(data);

            if (data.code == 1) {

                var bFind = false;
                for (var i = 0; i < FileName.length; i++) {
                    if (FileName[i].id == id) {
                        FileName[i].name = data.img_url;
                        document.getElementById(imageID).src = ServerPath + data.img_url;
                        document.getElementById(imageURl).href = ServerPath + data.img_url;
                        bFind = true;
                    }
                }

                if (!bFind) {
                    var obj = {"id":id,"name": data.img_url};
                    document.getElementById(imageID).src = ServerPath + data.img_url;
                    document.getElementById(imageURl).href = ServerPath + data.img_url;
                    FileName.push(obj);
                }
            }
            else
            {
                swalAlert("提示！",data.message);

            }

        },
        error: function (data, status, e)//服务器响应失败处理函数
        {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}


/*
 根据信息查询数据
 */
function QuerySomethingToService(obj,func){


    $.ajax({
        url: basePath + "/sample/get/list/search",
        dataType: 'json',
        type:"POST",
        data: obj,
        success: function (data)
        {
            console.log(data);
            if (data.code == 1) {
                if (func != undefined && func != null){
                    func(data);
                }
            }else{
                swalAlert("提示！",data.message);
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });

}

/*
 远程开柜
 */
function funcOpen(obj)
{
    console.log(obj);
    $.ajax({
        url: basePath + "/func/open",
        dataType: 'json',
        type:"POST",
        data: obj,
        success: function (data)
        {
            if(data == 1){
                swal("提示！", "远程开柜成功", "success");
            }else{
                swalAlert("提示！",data.message);
            }

        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}

/*
 远程关柜
 */
function funcClose(obj)
{
    console.log(obj);
    $.ajax({
        url: basePath + "/func/close",
        dataType: 'json',
        type:"POST",
        data: obj,
        success: function (data)
        {
            if(data == 1){
                swal("提示！", "远程关柜成功", "success");
            }else{
                swalAlert("提示！",data.message);
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}

/*
 查询用户列表
 */
function QueryUserList(func)
{
    console.log(basePath);
    $.ajax({
        url: basePath + "/user/list",
        dataType: 'json',
        type:"POST",
        success: function (data)
        {
            if (data.code == 1) {
                if (func != undefined && func != null) {
                    func(data);
                }
            }else{
                swalAlert("提示！",data.message);
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}

/*
 新增用户
 */
function SaveUserToService(func)
{

    layer.closeAll();

    var x=document.getElementById("addForm");

    console.log(x);

    var obj = {};

    for (var i=0;i<x.length;i++) {
        if (x.elements[i].tagName == "INPUT"){
            if(x.elements[i].value == "")
            {

                swalAlert("信息输入不全");
                return;
            }

            obj[x.elements[i].id] = x.elements[i].value;
        }
    }

    obj.r = Math.random();

    console.log(obj);


    $.ajax({
        url: basePath + "/user/add",
        dataType: 'json',
        //传送请求数据
        type:'POST',
        data: obj,
        success: function (data)
        {
            swalAlert("提示！",data.message);
            if (data.code == 1) {
                if (func != undefined && func != null) {
                    func();
                }
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}

/*
 删除用户
 */

function DeleteUserToService(id,func)
{
    console.log(id);
    $.ajax({
        url: basePath + "/user/delete",
        dataType: 'json',
        //传送请求数据
        type:"POST",
        data: {user_id:id,r:Math.random()},
        success: function (data)
        {
            if (data.code == 1) {
                if (func != undefined && func != null){
                    func();
                }
            };
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}


/*
 获取区
 */

function QueryPost1(id,func)
{
    $.ajax({
        url: basePath + "/locate/getPos1",
        dataType: 'json',
        type:"POST",
        success: function (data)
        {
            if (data == undefined || JSON.stringify(data) == "{}" || data.all_position1.length == 0) {
                swalAlert("提示！","架柜-区号没有配置数据");
            }else{
                if (func != undefined && func != null){
                    func(id,data);
                }
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}

/*
 获取列
 */

function QueryPost2(id,obj,func)
{
    $.ajax({
        url: basePath + "/locate/getPos2",
        dataType: 'json',
        type:"POST",
        data: obj,
        success: function (data)
        {
            if (data == undefined || JSON.stringify(data) == "{}" || data.all_position2.length == 0) {
                swalAlert("提示！","架柜-列号没有配置数据");
            }else{
                if (func != undefined && func != null){
                    func(id,data);
                }
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}


/*
 获取架
 */

function QueryPost3(id,obj,func)
{
    $.ajax({
        url: basePath + "/locate/getPos3",
        dataType: 'json',
        type:"POST",
        data: obj,
        success: function (data)
        {
            if (data == undefined || JSON.stringify(data) == "{}" || data.all_position3.length == 0) {
                swalAlert("提示！","架柜-架号没有配置数据");
            }else{
                if (func != undefined && func != null){
                    func(id,data);
                }
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}


/*
 获取层
 */

function QueryPost4(id,obj,func)
{
    $.ajax({
        url: basePath + "/locate/getPos4",
        dataType: 'json',
        type:"POST",
        data: obj,
        success: function (data)
        {
            if (data == undefined || JSON.stringify(data) == "{}" || data.all_position4.length == 0) {
                swalAlert("提示！","架柜-层号没有配置数据");
            }else{
                if (func != undefined && func != null){
                    func(id,data);
                }
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}


/*
 获取行
 */

function QueryPost5(id,obj,func)
{
    $.ajax({
        url: basePath + "/locate/getPos5",
        dataType: 'json',
        type:"POST",
        data: obj,
        success: function (data)
        {
            if (data == undefined || JSON.stringify(data) == "{}" || data.all_position5.length == 0) {
                swalAlert("提示！","架柜-行号没有配置数据");
            }else{
                if (func != undefined && func != null){
                    func(id,data);
                }
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}

/*
 获取排
 */

function QueryPost6(id,obj,func)
{
    $.ajax({
        url: basePath + "/locate/getPos6",
        dataType: 'json',
        type:"POST",
        data: obj,
        success: function (data)
        {
            if (data == undefined || JSON.stringify(data) == "{}" || data.all_position6.length == 0) {
                swalAlert("提示！","架柜-排号没有配置数据");
            }else{
                if (func != undefined && func != null){
                    func(id,data);
                }
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}


/*
 设置货柜
 */

function SetLocation(obj,func)
{
    $.ajax({
        url: basePath + "/config/location/set",
        dataType: 'json',
        type:"POST",
        data: obj,
        success: function (data)
        {
            console.log(data);
            if (func != undefined && func != null){
                func(data);
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}

/*
 入库登记
 */
function SetSamplein(obj,func)
{
    $.ajax({
        url: basePath + "/sample/in",
        dataType: 'json',
        type:"POST",
        data: obj,
        success: function (data)
        {
            console.log(data);
            if (func != undefined && func != null){
                func(data);
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });
}


/*
 设置默认显示位置
 */
function SetPosition(obj,func)
{
    $.ajax({
        url: basePath + "/config/position/simpleSet",
        dataType: 'json',
        type:"POST",
        data: obj,
        success: function (data)
        {
            if (func != undefined && func != null){
                func(data);
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });

}


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


/*
 设置配置
 */
function SetConfig(obj,func)
{
    $.ajax({
        url: basePath + "/config/api/setIp",
        dataType: 'json',
        type:"POST",
        data: obj,
        success: function (data)
        {
            console.log(data);
            if(data.code == 0){
                swal("失败", "异常:" + data.message, "error");
            }else{
                if (func != undefined && func != null){
                    func(data);
                }
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });

}



/*
 设置配置
 */
function QueryConfig(func)
{
    $.ajax({
        url: basePath + "/config/api/getIp",
        dataType: 'json',
        type:"POST",
        data: {},
        success: function (data)
        {
            console.log(data);
            if(data.code == 0){
                swal("失败", "异常:" + data.message, "error");
            }else{
                if (func != undefined && func != null){
                    func(data);
                }
            }
        },
        error: function (data) {
            swal("失败", "异常:" + data.statusText, "error");
        }
    });

}



