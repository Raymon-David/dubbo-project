$(function () {
	$("#hjbLoginBtn").click(function() {
		var username = $("#hjbUsername").val();
		var password = $("#hjbPassword").val();
		var _data = {
			'username' : username,
			'password' : password,
			'userType' : '01',
			'type' : '1',
			'toUrl':'',
			'time' : new Date().getTime()
		};
		var dt = {
			json : JSON.stringify(_data)
		};
		$.ajax({
			type : "POST",
			url : dynUrl + "/user/login",
			dataType : "json",
			data : dt,
			success : function(msg) {
				if (msg.error) {
					alert(msg.error.errDesc.message);
				} else {
					window.location.href = dynUrl + "/views/capital/myCapital.html";
				}
			}
		});
	});
});