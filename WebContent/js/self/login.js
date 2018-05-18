/**
 * Created by Sam on 2018/3/26.
 */

function login()
{

    var username = $('#UserName').val();

    var userpwd = $('#UserWord').val();

    if (username ==null || username == "" || username == undefined) {
        swalAlert("登录失败！","请输入用户名");
        return;
    }

    if (userpwd ==null || userpwd == "" || userpwd == undefined) {
        swalAlert("登录失败！","请输入密码");
        return;
    }


    $.ajax({
        url: basePath + "/admin/login",
        dataType: 'json',
        //传送请求数据
        type:"post",
        data: {user_name:username,user_pwd:userpwd,r:Math.random() },
        success: function (data)
        {

            if (data.code == 0)
            {
                swalAlert("登录失败！",data.message);
            }
            else
            {
                location.href = "index.html?username=" + $('#UserName').val();
            }
        },
        error: function (data) {
            swalAlert("登录失败！","登录失败:" + data.statusText);
        }
    });
}

/*
 登出
 */
function logout(){

    $.ajax({
        url: basePath + "/admin/logout",
        dataType: 'json',
        type:"post",
        data: {user_name:$('#username').val(),r:Math.random()},
        success: function (data) {
            if (data.code == 0) {
                swalAlert("提示！",data.message);
            }
            else {
                window.location.href = "login.html";
            }
        },
        error: function (data) {
            swalAlert("提示！", data.statusText,function () {
                window.location.href = "login.html";
            });
        }
    });
}

