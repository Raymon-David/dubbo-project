// JavaScript Document
(function($){
    $.fn.myScroll = function(config){
		var defultes = {
			    img_box: '.scroll_pic',       // 轮播图片的父层
				num_box: '.scroll_num',       // 圆点儿li的父层
				className: 'on',              // 当前圆点儿特殊的class
				Isauto: true,                 // 是否自动执行
				index: 0,                     // 起始索引值
				fadeIn: false,                // 是淡入淡出还是左右滚动（false）
				events: 'hover',              // 圆点儿事件（hover/click）
				times: 3000,                  // 自动执行间隔时间
				_times:1000,                  // 每一帧图片的滚动时间
				isFullScreen:true,            // 是否是全屏轮播图
				left_btn: null || '.pre',     // 向左的按钮
				right_btn: null || '.next'    // 向右的按钮
			}
		var configs = $.extend(defultes,config || {});
		return this.each(function(){
		    var that = $(this);
			var img_box = that.find(configs.img_box),
			    img_li = img_box.children(),
				num_box = that.find(configs.num_box),
				num_li = num_box.children(),
				maxnum = img_li.length,
				className = configs.className,
				left_btn = that.find(configs.left_btn),
				right_btn = that.find(configs.right_btn),
				index = configs.index,
				w = img_li.width(),
				show;
			
				num_li.first().addClass(className);
			// 是否是全屏轮播图
				if(configs.isFullScreen){
					img_li.width($(window).width());
					w = $(window).width();
				}
		    // 数字坐标（圆点儿）居中 
			    num_box.css({left:(w - num_box.width())/2 + 'px'})	
			//判断是否自动执行
				if(configs.Isauto){
					that.hover(function(){
						clearInterval(show);
					},function(){
						show = setInterval(function(){
							index++;						
							Isfadein();	
						},configs.times)	
					}).trigger("mouseleave");	
				}
			//淡入淡出效果
				function fade_in(obj){
					obj.fadeIn(1000).siblings().fadeOut(1000);
					num_li.eq(index).addClass(className).siblings().removeClass(className);
					
				};
			//左右滚动效果
				function scroll_lf(len){
					img_box.stop(true,false).animate({left:len + 'px'},configs._times);
					num_li.eq(index).addClass(className).siblings().removeClass(className);
				};
			//向右执行到最后一帧时
				function last_one(){
					img_box.append(img_li.first().clone());
					var nowleft = -w * index;
					img_box.animate({left:nowleft},configs._times,function(){
						img_box.css({left:0});
						img_li.last().remove();
						num_li.eq(0).addClass(className).siblings().removeClass(className);
					})
				};
			//向左执行到第一针时
				function first_one(){
					img_box.append(img_li.last().clone());
					var nowleft = w * maxnum;
					img_box.animate({left:nowleft + 'px'},configs.times,function(){
						img_box.css({left:0});
						img_li.last().remove();
					})
				};
			//判断是淡入淡出还是左右滚动
				function Isfadein(){
					if(configs.fadeIn){
						img_li.css({position:'absolute'});
						img_li.first().show().siblings().hide();
						if(index == maxnum){ index = 0};
						fade_in(img_li.eq(index)); 
					}else{
						img_box.css({width:w*(img_li.length) + 'px',position:'absolute'});
						if(index == maxnum){index = 0};
						scroll_lf(-w*index);
					}
				}
			//判断数字坐标执行 click or hover 事件
				switch(configs.events){
					case 'click':
						 num_li.click(function(){
							index = $(this).index();
							Isfadein()
						 });
						 break;
					case 'hover':
						 num_li.stop(true,false).hover(function(){
							index = $(this).index();
							Isfadein()
						 });
						 break;
				};
			//如果有向左按钮
				if(left_btn){
					left_btn.click(function(){
						index--;
						if(configs.fadeIn){
							if(index < 0){index = maxnum-1};
							fade_in(img_li.eq(index));
						}else{
							if(index < 0){index = maxnum-1};
							scroll_lf(-w*index);
						}
					})
				};
            //如果有向右按钮
				if(right_btn){
					right_btn.click(function(){
						index++;
						Isfadein();
					})
				};
		})
	}
})(jQuery)


