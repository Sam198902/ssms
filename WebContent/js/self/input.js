/**
 * Created by Sam on 2018/4/14.
 */



function SetInputValue(id,data){

    if(id == 1){
        $("#sample_positon_1").empty();
        for(var i in data.all_position1){
            $("#sample_positon_1").append('<option value="'+ data.all_position1[i] +'" data-code="' + data.all_position1[i] +'">'+ data.all_position1[i] +'</option>');
        }
        for(var i in data.used_position1){
            $("#sample_positon_1").append('<option disabled="disabled" value="'+ data.all_position1[i] +'" data-code="' + data.all_position1[i] +'(已满)">'+ data.used_position1[i] +'</option>');
        }
    }else if(id == 2){
        $("#sample_positon_2").empty();
        for(var i in data.all_position2){
            $("#sample_positon_2").append('<option value="'+ data.all_position2[i] +'" data-code="' + data.all_position2[i] +'">'+ data.all_position2[i] +'</option>');
        }
        for(var i in data.used_position2){
            $("#sample_positon_2").append('<option disabled="disabled" value="'+ data.used_position2[i] +'" data-code="' + data.used_position2[i] +'(已满)">'+ data.used_position2[i] +'</option>');
        }
    }else if(id == 3){
        $("#sample_positon_3").empty();
        for(var i in data.all_position3){
            $("#sample_positon_3").append('<option value="'+ data.all_position3[i] +'" data-code="' + data.all_position3[i] +'">'+ data.all_position3[i] +'</option>');
        }
        for(var i in data.used_position3){
            $("#sample_positon_3").append('<option disabled="disabled" value="'+ data.used_position3[i] +'" data-code="' + data.used_position3[i] +'(已满)">'+ data.used_position3[i] +'</option>');
        }
    }else if(id == 4){
        $("#sample_positon_4").empty();
        for(var i in data.all_position4){
            $("#sample_positon_4").append('<option value="'+ data.all_position4[i] +'" data-code="' + data.all_position4[i] +'">'+ data.all_position4[i] +'</option>');
        }
        for(var i in data.used_position4){
            $("#sample_positon_4").append('<option disabled="disabled" value="'+ data.used_position4[i] +'" data-code="' + data.used_position4[i] +'(已满)">'+ data.used_position4[i] +'</option>');
        }
    }else if(id == 5){
        $("#sample_positon_5").empty();
        for(var i in data.all_position5){
            $("#sample_positon_5").append('<option value="'+ data.all_position5[i] +'" data-code="' + data.all_position5[i] +'">'+ data.all_position5[i] +'</option>');
        }
        for(var i in data.used_position5){
            $("#sample_positon_5").append('<option disabled="disabled" value="'+ data.used_position5[i] +'" data-code="' + data.used_position5[i] +'(已满)">'+ data.used_position5[i] +'</option>');
        }
    }else if(id == 6){
        $("#sample_positon_6").empty();
        for(var i in data.all_position6){
            $("#sample_positon_6").append('<option value="'+ data.all_position6[i] +'" data-code="' + data.all_position6[i] +'">'+ data.all_position6[i] +'</option>');
        }
        for(var i in data.used_position6){
            $("#sample_positon_6").append('<option disabled="disabled" value="'+ data.used_position6[i] +'" data-code="' + data.used_position6[i] +'(已满)">'+ data.used_position6[i] +'</option>');
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


function formSubmit(){
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

                            if(x.elements[i].id == 'sample_remark' || x.elements[i].id == 'sample_attribute' ){
                                console.log(soil);
                                obj[x.elements[i].id] = soil;
                                continue;
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
                
                if(x.elements[i].id = 'sample_remark'){
                    obj[x.elements[i].id] = x.elements[i].value;
                    continue;
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

    SaveDataToService(obj,function () {
        document.body.scrollTop!==0?document.body.scrollTop=0:null;
        location.reload();
    });


    console.log(obj);
};

function init() {

    $("input[type='file']").change(function(){

        // 可以传递图片框id，用于显示图片
        ajaxFileUpload($(this).attr('id'));

    });

    $( 'input[type="file"]' ).prettyFile();

    QueryPosition(function (data) {
        $('#citymodel').citys({code:data.position});
    });



    $("select[name='sample_positon_1']").change(function(){
        $("#sample_positon_2").empty();
        $("#sample_positon_3").empty();
        $("#sample_positon_4").empty();
        $("#sample_positon_5").empty();
        $("#sample_positon_6").empty();

    });

    $("select[name='sample_positon_2']").change(function(){
        $("#sample_positon_3").empty();
        $("#sample_positon_4").empty();
        $("#sample_positon_5").empty();
        $("#sample_positon_6").empty();

    });

    $("select[name='sample_positon_3']").change(function(){
        $("#sample_positon_4").empty();
        $("#sample_positon_5").empty();
        $("#sample_positon_6").empty();

    });

    $("select[name='sample_positon_4']").change(function(){
        $("#sample_positon_5").empty();
        $("#sample_positon_6").empty();

    });

    $("select[name='sample_positon_5']").change(function(){
        $("#sample_positon_6").empty();
    });

    $(document).ready(function () {
        $('.fancybox').fancybox({
            openEffect: 'none',
            closeEffect: 'none',
        });
    });


}
