//jq结束
var headMain = function () {};
headMain.prototype = {
	bind: function () {
		this.bindEvent();//绑定事件
		this.goTopFun();//置顶
		this.ewmFun();//顶部及右侧掌上黄金二维码切换
	},
	bindEvent: function () {
		var _this =  this;
		// 置顶文字与icon切换
		$('.hjb-btop-item').hover(function (argument) {
			$(this).find('.hjb-btop-scp').show();
			$(this).find('.hjb-btop-icon').hide();
		}, function () {
			$(this).find('.hjb-btop-scp').hide();
			$(this).find('.hjb-btop-icon').show();
		});
		// 顶部的下拉菜单
		$('.hjb-top-dropdown').hover(function () {
			var _elem = $(this);
			dropdownTimer = setTimeout(function () {
				_this.dropdownFun(_elem);
			},200);
		}, function () {
			$(this).find('.hjb-dropdown-box,.hjb-top-right-arrowb').hide().siblings('.hjb-top-right-arrowt').show();
			clearTimeout(dropdownTimer);
		});
	},
	//置顶
	goTopFun: function () {
		//置顶滚动一屏显示
		if ($(window).scrollTop() > 500) {
			$('#hjbGoTop').show();
		}
		$(window).scroll(function () {
			if ($(window).scrollTop() > 500) {
				$('#hjbGoTop').show();
			} else {
				$('#hjbGoTop').hide();
			}
		});
		//置顶返回顶部
		$('#hjbGoTop').bind('click', function () {
			$("html,body").animate({scrollTop:0},1000);
		});
	},
	// 顶部的下拉菜单
	dropdownFun: function (elem) {
		elem.find('.hjb-dropdown-box,.hjb-top-right-arrowb').show().siblings('.hjb-top-right-arrowt').hide();
		elem.find('img[data-src]').each(function () {
			$(this).gLoad({e:function(){
				$(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
		  	}});
		});
	},
	//顶部及右侧掌上黄金二维码切换
	ewmFun: function () {
		$('.hjb-app .hjb-app-handler-btn').bind('click', function () {
			var appFather = $(this).parents('.hjb-app');
			var appIndex = $(this).index();
			appFather.find('.hjb-app-ewm').eq(appIndex).show().siblings('.hjb-app-ewm').hide();
		});
	}
};
var headMainInfo = new headMain();
headMainInfo.bind()