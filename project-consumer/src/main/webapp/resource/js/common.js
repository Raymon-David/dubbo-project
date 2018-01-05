function ajaxPost(url, dataParam, callback) {
	$(":submit").addClass("no_click").attr("disabled","disabled");
	var retData = null;
	$.ajax({
		type : "post",
		url : url,
		async : false,
		data : {
			json : JSON.stringify(dataParam)
		},
		dataType : "json",
		success : function(data, status) {
			//恢复submit状态
			$(":submit").removeClass("no_click").removeAttr("disabled");
			// alert(data);
			retData = data;
			if (callback != null && callback != "" && callback != undefined)
				callback(data, status);
		},
		error : function(err, err1, err2) {
			/*alert("调用方法发生异常:" + JSON.stringify(err) + "err1"
					+ JSON.stringify(err1) + "err2:" + JSON.stringify(err2));*/
			//恢复submit状态
			$(":submit").removeClass("no_click").removeAttr("disabled");
			alert("系统错误!");
		}
	});
	return retData;
}
function ajaxPostText(url, dataParam, callback) {
	var retData = null;
	$.ajax({
		type : "post",
		url : url,
		async : false,
		data : dataParam,
		dataType : "text",
		success : function(data, status) {
			//恢复submit状态
			$(":submit").removeClass("no_click").removeAttr("disabled");
			// alert(data);
			retData = data;
			if (callback != null && callback != "" && callback != undefined)
				callback(data, status);
		},
		error : function(err, err1, err2) {
			$(":submit").removeClass("no_click").removeAttr("disabled");
			alert("系统错误!");
		}
	});
	return retData;
}
//只能输入数字和两位小数
function numRule(obj,byte) {
	//先判断下是否为空，否则会死循环
	if(obj.value!='' && isNaN(parseFloat(obj.value)) && obj.value>0){
		var rex2 = /^\d+(\.{0,1}\d+){0,1}$/;//非负数
		var rex=/^-?\d+\.?\d{0,2}$/ ; //两位
		if(byte == 3){
			rex=/^-?\d+\.?\d{0,3}$/ ; //三位
		}
		//负数或不符合小数任一个即进入调整
		if(!rex.test(obj.value) || !rex2.test(obj.value)){
		    obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
		    obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
		    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
		    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		    
		    if(byte==2){
		    	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
		    }
		    if(byte==3){
		    	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'); //只能输入3个小数
		    }
		}
	}
}



