function check_code2(){
    if($("#vertyCode2").css("display") == "block"){
        $("#divA2").addClass("login_btnStyle2");
    }else{
        $("#divA2").removeClass("login_btnStyle2");
    }
}

function set_password2(){
    var phone = $("#user_code2").val();
    window.location.href = dynUrl + "/static/set_password.html?phone_set=" + phone
}

function isMySubmit2(){
    $('#errorboxFlag2').val('登录金库');   
}
var flug2 = false;
$("#user_code2").bind("input propertychange", function() {
    var ze = /^[0-9]*$/;
    var goldMember = $(this).val();
    if(!ze.test(goldMember))
    {
        $(this).val("");
    }

})

$("#user_code2").blur(function(){
	var goldMember = $(this).val();
	var length = goldMember.length;   
    var mobile =  /^[\d]{19}$/; 
   if(length=0)
   {
	   $('#user_code2').next('span').css('display','block').removeClass('success').addClass('fail');
       $('#errorbox4').html("");
       $('#errorbox4').append("<label class='error'><font class='iconfont error_ico'>&#xe66b;</font>黄金卡号不能为空</label>");
	   return false;
   }
   else if(!mobile.test(goldMember))
   {
	   $('#user_code2').next('span').css('display','block').removeClass('success').addClass('fail');
       $('#errorbox4').html("");
       $('#errorbox4').append("<label class='error'><font class='iconfont error_ico'>&#xe66b;</font>请输入正确的黄金卡号</label>");
	   return false;
   }
   else
   {
	    $.ajax({
        type : "post",
        url : dynUrl + "/validation/checkUser",
        data : {
            json:function(){
                var _data = {
                    'username' :$("#user_code2").val(),
                    'userType' : '01',
                    'type' : '2',
                    'toUrl':'',
                    'time' : new Date().getTime()
                };
                return JSON.stringify(_data);
            }
        },
        dataType : "json",       
        success : function(data) {
            if(data.error){
                if(data.error.type == '990007'){
                    $('#errorbox4').html("");
                    $("#pass_bon2").hide();
                    $("#no_pay_pwd2").show();
                    $("#small_tit2").show();
					$('.login_a_position').eq(0).children('a').not(':last').css('display','none');
                }else{
					$('#user_code2').next('span').css('display','block').removeClass('success').addClass('fail');
                    $('#errorbox4').html("");
                    $('#errorbox4').append("<label class='error'><font class='iconfont error_ico'>&#xe66b;</font>"+data.error.errDesc.message+"</label>"); 
                }
            }else{
                   if(data.result.status.code == "1"){
                    $("#pass_bon2").show();
                    $("#no_pay_pwd2").hide();
                    $("#small_tit2").hide();
                    $('#errorbox4').html("");
                    flug2 = true;
                    $('.login_a_position').eq(0).children('a').not(':visible').css('display','');
                    $('#user_code2').next('span').css('display','block').removeClass('fail').addClass('success');
                } 
                if(data.result.status.toUrl == "imgcode"){
                    changeImageCode2();
                    $('.login_tab').css('height',482);
                }  
            } 
            
        },
        error : function(err, err1, err2) {
        }
    });
   }
   
});
//验证密码
$("#password2").blur(function(){
    var pwd_ze = /^(?!\d+$)(?![A-Za-z_]+$)[a-zA-Z_0-9]{8,16}$/; 
    if(!pwd_ze.test($(this).val())){
        $('#errorbox5').html("");
        $('#errorbox5').append("<label class='error'><font class='iconfont error_ico'>&#xe66b;</font>密码必须8-16位的字母,数字的组合</label>");
        $(this).next('span').css('display','block').removeClass('success').addClass('fail');
        return false;
    }
    else
    {
        $(this).next('span').css('display','block').removeClass('fail').addClass('success');
        $('#errorbox5').html("");
    }
})
//刷新验证码
function reflashImage2(){
    $("#verifyCode2").val("");   
    var url = dynUrl + "/base/common/createChkcode?t="+new Date().getTime();
    $("#verifyCode_true2").attr("src",url);   
}
//显示验证码
function changeImageCode2(){
    $("#vertyCode2").css('display', 'block');
    $("#verifyCode2").removeAttr("disabled");
    reflashImage2();
    check_code2();
}
//禁用验证码
function shadownImageCode2(){
    $("#vertyCode2").css('display', 'none');
    $("#verifyCode2").attr("disabled","disabled");
    check_code2();
}
$(function(){
       jQuery.validator.addMethod("isMycard", function(value, element) {       
        var length = value.length;   
        var mobile =  /^[\d]{19}$/;   
        return this.optional(element) || (length == 19 && mobile.test(value));       
    }, "此账号不存在，请核对后重新输入或免费注册"); 
    $("#submitForm2").validate({
        rules:{
            userName:{
                required:true,
                isMycard:true
            },
            passWord:{
                required:true
            },
            verifyCode:{
                required:true,
                minlength:6
            }
        },
        messages: {
            userName:{
                required:"请输入用户名"
            },
            passWord:"请输入密码",
            verifyCode:{
                required:"输入验证码",
                minlength:"验证码错误"    
            }
        },
        errorPlacement: function(error, element) {
            if(element.is("#user_code2") && $('#errorboxFlag2').val()=='登录金库'){
                //清除错误信息并清除唯一提示标识
                $('#errorbox4').children('label').remove(); 
                $('#errorbox4').html("");
                $('#errorboxFlag2').val("");
                error.appendTo($('#errorbox4'));
                $('#errorbox4').children('label').prepend("<font class='iconfont error_ico'>&#xe66b;</font>");
            }
            if(element.is("#password2") && $('#errorboxFlag2').val()=='登录金库'){
                //延迟0.1秒执行,否则出现闪顿
                setTimeout(function(){
                    if(element.is("#password2") && $('#errorboxFlag2').val()=='登录金库'){
                        $('#errorbox5').children('label').remove(); 
                        $('#errorbox5').html("");
                        $('#errorboxFlag2').val("");
                        error.appendTo($('#errorbox5'));
                        $('#errorbox5').children('label').prepend("<font class='iconfont error_ico'>&#xe66b;</font>");
                    }
                },100);
            }
            //延迟0.2秒执行--先验证密码，再验证验证码
            if(element.is("#verifyCode2") && $('#errorboxFlag2').val()=='登录金库'){
                setTimeout(function(){
                    if(element.is("#verifyCode2") && $('#errorboxFlag2').val()=='登录金库'){
                        $('#errorbox6').children('label').remove(); 
                        $('#errorbox6').html("");
                        $('#errorboxFlag2').val("");
                        error.appendTo($('#errorbox6'));
                        $('#errorbox6').children('label').prepend("<font class='iconfont error_ico'>&#xe66b;</font>");
                    }
                },200);
            }
            
        },
        //取消其他校验-为了只让确认触发，确认会清除错误信息
        onsubmit:true ,
        //提交时验证. 设置唯false就用其他方法去验证
        onfocusout:false ,
        //失去焦点是验证(不包括checkboxes/radio buttons)
        onkeyup:false,
        //在keyup时验证.
        onclick:false,
        //在checkboxes 和 radio 点击时验证
        focusInvalid:false,
        //提交表单后，未通过验证的表单(第一个或提交之前获得焦点的未通过验证的表单)会获得焦点
        submitHandler: function() {
       /* if(flug2 == false){return false;}*/
            var username = $("#user_code2").val();
            var password = $("#password2").val();
            var verifyCode = $("#verifyCode2").val();
            var _data = {
                    'username' : username,
                    'password' : password,
                    'mobileCode' : verifyCode,
                    'userType' : '01',
                    'type' : '2',
                    'toUrl':'',
                    'time' : new Date().getTime()
                };
                var dt = {
                    json : JSON.stringify(_data)
                };
            $.ajax({
                type : "post",
                url : dynUrl + "/user/login",
                data :dt,
                dataType : "json",
                success : function(data) {
                    if(data.error){
                    	if(data.error.type == "10038" || data.error.type == "990005" || data.error.type == "2"){
                            //如果错误次数达到，则显示验证码框
                            changeImageCode2();
							$('.login_tab').css('height',482);
							$('#errorbox9').html("");
                            $('#errorbox9').append("<label class='error'><font class='iconfont error_ico'>&#xe66b;</font><span>"+data.error.errDesc.message+"</span></label>");
	                    }else{
                            $('#errorbox6').html("");
                            $('#errorbox6').append("<label class='error'><font class='iconfont error_ico'>&#xe66b;</font>"+data.error.errDesc.message+"</label>"); 
	                    }
                    }else if(data.result.status.code == "1"){
                        window.location.href = dynUrl + data.result.status.toUrl;
                    } 
                },
                error : function(err, err1, err2) {
                }
            });
        }
    }); 
});