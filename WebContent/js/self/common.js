/**
 * Created by Sam on 2018/3/26.
 */


var weburl = window.location.href;

//Server地址
var basePath = weburl.substring(0,weburl.indexOf("ssms")) + "ssms";

//Server地址
var ServerPath = weburl.substring(0,weburl.indexOf("/ssms"));

var FileName = [];


var request = {
    QueryString : function(val) {
        var uri = window.location.search;
        var re = new RegExp("" +val+ "=([^&?]*)", "ig");
        return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
    }
}

function MyAlter(str,id) {
    swal({
        title: "信息填写不全！",
        text: "\"" + str + "\"未填写..." ,
    },function () {
        $("html,body").animate({scrollTop: $("#"+ id).offset().top-100}, 500);

    });
}

function swalAlert(title,str,func) {
    swal({
        title: title,
        text: str ,
    },function () {
        if(func != undefined){
            func();
        }
    });
}

function getValue(type){
    // method 1
    var radio = document.getElementsByName(type);
    for (var i=0; i<radio.length; i++) {
        if (radio[i].checked) {
            return radio[i].value;
        }
    }
}

function getQueryString(name){

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);

    return null;
}