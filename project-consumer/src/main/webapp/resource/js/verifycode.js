
/*
 * 获取手机验证码
 */
var countdown=60;
var timeShow; 
function getVerifyCode(val,url,phoneText){
	var _data = {
        'mobile' : phoneText
         };
    var dt = {
            json : JSON.stringify(_data)
        };
	$.ajax({
		type : "post",
		async : false,
		url : url,
		data : dt,
		dataType : "json",
		success : function(data) {
			$("#token").val(data.modifyPhone.token);
			val.setAttribute("disabled", true); 
	 		$('#'+val.id).css('background', '#ccc');
	 		clearInterval(timeShow);
	 		countdown=60;
	 		val.value="重新发送(" + countdown + ")"; 
	 		jump(val.id);
		},
		error : function() {
			alert("获取验证码出错！");
		}
	});
}
function getVerifyCode1(val,url,phoneText,text){
	var _data = {
        'mobile' : phoneText,
        'mobileCode' : text
         };
    var dt = {
            json : JSON.stringify(_data)
        };
	$.ajax({
		type : "post",
		async : false,
		url : url,
		data : dt,
		dataType : "json",
		success : function(data) {
			if(data.error){
				$('#errorbox_img').html("");
                $("#errorbox_img").append("<label class='error'>" + data.error.errDesc.message + "</label>");
                reflashImage();
                $("#imgCode").val("");
			}else{
				$("#token").val(data.modifyPhone.token);
				val.setAttribute("disabled", true); 
		 		$('#'+val.id).css('background', '#ccc');
		 		clearInterval(timeShow);
		 		countdown=60;
		 		val.value="重新发送(" + countdown + ")"; 
		 		jump(val.id);	
			}
			
		},
		error : function() {
			alert("获取验证码出错！");
		}
	});
}

/*
 * 验证码限时，每60秒可点击一次获取手机验证码
 */
function jump(id) {    
    timeShow = setTimeout(function(){    
    	countdown--; 
        if(countdown > 0) {
            $('#'+id).val("重新发送(" + countdown + ")") ;  
            jump(id);
        } else {
        	jQuery('#'+id).removeAttr("disabled");  
        	$('#'+id).css('background', '#f39801');
        	$('#'+id).val("获取验证码") ;   
        	countdown=60;
        }    
    }, 1000);
}

