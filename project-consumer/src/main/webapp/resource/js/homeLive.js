var homeMain = function () {
	this.capital = false;//是否打开大写锁定
	this.mobelTest = '';
	this.emailTest = '';
	this.numberTest = /^[0-9]*$/;
	this.notNumberTest = /[A-Za-z\u4e00-\u9fa5-_`~!@#$%^&*+=￥（）()<>?:"{},.\/;'[\]！。......，…——、‘；【】|？》《“：\\\”]/g;
	this.floatTest = /^[0-9]+(.[0-9]{1,})?$/;
	this.notFloatTest = /[A-Za-z\u4e00-\u9fa5-_`~!@#$%^&*+=￥（）()<>?:"{},\/;'[\]！。，——、‘；【】|？》《“：\\\”]/g;
	this.numType = 'isFalse';
};
homeMain.prototype = {
	bind: function () {
		
		this.animateFun();// 楼层动画效果
		this.imgGloadFun();// 当滚动到图片时加载图片gLoad
		//this.bannerTabFun(); banner
		this.newbannerTabFun();// 改版banner
	},	
	// 楼层动画效果
	animateFun: function () {
		$('.hjb-jload').each(function () {
			$(this).gLoad({e:function(){
				$(this).siblings('.hjb-whait').addClass('hjb-animate');
		  	}});
		});
	},
	// 当滚动到图片时加载图片gLoad
	imgGloadFun:function (argument) {
		$('img[data-src]').gLoad({e:function(){
			$(this).each(function () {
				$(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
			});
	  	}});
	},
	// banner
	bannerTabFun: function () {
		var bannerIndex = 0; //当先展示图的index
		var bannerLen = $('.hjb-banner-handler-btn').length;//轮播图数量
		var bannerTab = function (index) {
			$('.hjb-banner-handler-btn').eq(index).addClass('hjb-banner-handler-active').siblings('.hjb-banner-handler-btn').removeClass('hjb-banner-handler-active');
			$('.hjb-banner-item').eq(index).fadeIn().siblings('.hjb-banner-item').fadeOut();
			$('.hjb-banner-item').eq(index).gLoad({e:function(){
				$(this).find('img[banner-src]').each(function () {
					$(this).attr('src', $(this).attr('banner-src')).removeAttr('banner-src');
				});
		  	}});
		}
		bannerTab(bannerIndex);
		var bannerAuto = function () {
			bannerIndex++;
			if (bannerIndex >= bannerLen) {
				bannerIndex = 0;
			}
			bannerTab(bannerIndex);
		};
		var bannerTimer = setInterval(bannerAuto, 4000);
		$('.hjb-banner-handler-btn').hover(function () {
			bannerIndex = $(this).index();
			bannerTab(bannerIndex);
		});
		$('.hjb-banner').hover(function () {
			clearInterval(bannerTimer);
		},function () {
			bannerIndex = $('.hjb-banner-handler-active').index();
			bannerTimer = setInterval(bannerAuto, 4000);
		});
		$('.hjb-banner-handler').css('marginLeft',-$('.hjb-banner-handler').width()/2)//控制按钮的位置
	},
	newbannerTabFun: function () {
		var imgNum = $('#banner-box li').length;
		var oneWidth = $('#banner-box').parent().width();
		$('#banner-box').css('width',oneWidth*imgNum+'px');
		$('#banner-box li').css('width',oneWidth+'px');
		//$('#banner-box li img').css('width',$('.hjb-banner').width());
		//var img = $('#banner-box li').eq(0).find('img').get(0);
		/*img.onload = function(){
			$('#banner-box').parent('div.banner-wrap').css('height',$('#banner-box li').eq(0).find('img').height());
		}*/
		//$('#banner-box').parent('div.banner-wrap').css('height',$('#banner-box li').eq(0).find('img').height());
		//$('#banner-box').parent('div').css({'height':$('#banner-box li img').eq(0).height()});
		var iNow = 0;
		var iNow2 = 0
		var Slider = function()
		{
			if(iNow == 0)
			{
			
				$('#banner-box li').eq(0).css('position','static');
				$('#banner-box li').eq(0).css('left',0);
				$('#banner-box').css('left',0);
				iNow2 = 0;
			
			}/*一定要放在这里，放在自增的前面*/
			if(iNow == imgNum-1)
			{
				iNow = 0;
				$('#banner-box li').eq(0).css('position','relative');
				$('#banner-box li').eq(0).css('left',imgNum*oneWidth);
			}
			else
			{
				iNow++;
			}
			iNow2++;
			startMove($('#banner-box').get(0),{left:-iNow2*oneWidth});
			if(iNow!=0)
			{
			  $('#banner-box li').eq(iNow).gLoad({e:function(){
				  $(this).find('img[banner-src]').each(function () {
					  $(this).attr('src', $(this).attr('banner-src')).removeAttr('banner-src');
				  });
			  }});
			}
			//$('#banner-box').parent('div').css({'height':$('#banner-box li img').eq(1).height()});
			$('#banner-box').next('div').find('a').removeClass('active');
			$('#banner-box').next('div').find('a').eq(iNow).addClass('active');			
		}
		var t = setInterval(Slider,4000);
		if(imgNum==1)
		{
			clearInterval(t);
			$('#banner-box').next('div').css('display','none');
			//$('#banner-box img').get(0).onmouseout = null;
		}
		$('#banner-box img').mouseover(function(){
			iNow=$(this).parents('li').index();
			clearInterval(t);
		})
		$('#banner-box img').mouseout(function(){
			
			t = setInterval(Slider,4000);
			if(imgNum==1)
			{
				clearInterval(t);
			}
		})
		$('.banner-panel').mouseover(function(ev){
			ev = ev||window.event;
			var targetE = ev.target||ev.srcElement;
			if(targetE.tagName.toLowerCase()=='a') 
			{
				iNow = $(targetE).index();
				iNow2 = iNow; 
				startMove($('#banner-box').get(0),{left:-iNow*oneWidth});
				$('#banner-box li').eq(iNow).gLoad({e:function(){
				  $(this).find('img[banner-src]').each(function () {
					  $(this).attr('src', $(this).attr('banner-src')).removeAttr('banner-src');
				  });
			    }});
				$('#banner-box').next('div').find('a').removeClass('active');
				$(targetE).addClass('active');
				clearInterval(t);
			}
		})
		$(window).resize(function(){
			oneWidth = $('.hjb-banner').width();
			$('#banner-box').css('width',oneWidth*imgNum+'px');
			$('#banner-box li').css('width',oneWidth+'px');
		})
		function startMove(obj,json,endFn){
	
		clearInterval(obj.timer);
		
		obj.timer = setInterval(function(){
			
			var bBtn = true;
			
			for(var attr in json){
				
				var iCur = 0;
			
				if(attr == 'opacity'){
					if(Math.round(parseFloat(getStyle(obj,attr))*100)==0){
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
					
					}
					else{
						iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
					}	
				}
				else{
					iCur = parseInt(getStyle(obj,attr)) || 0;
				}
				
				var iSpeed = (json[attr] - iCur)/8;
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur!=json[attr]){
					bBtn = false;
				}
				
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
					obj.style.opacity = (iCur + iSpeed)/100;
					
				}
				else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
				
				
			}
			
			if(bBtn){
				clearInterval(obj.timer);
				
				if(endFn){
					endFn.call(obj);
				}
			}
			
		},30);
	
	}
	
	
	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}
		else{
			return getComputedStyle(obj,false)[attr];
		}
	}
	
	function stopMove(obj){
		clearInterval(obj.timer);
	}
	}

};
var homeMainInfo = new homeMain();
homeMainInfo.bind()