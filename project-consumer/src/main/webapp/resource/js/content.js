$(function(){
 
    //左侧的导航树
    /*$(".left_nav a").click(function(){
	    var nav_list = $(this).parent();
		$(this).addClass("now");
        nav_list.siblings().find("a").removeClass("now");
	});*/	
    //问号hover事件
    $(".problem").hover(function(){
    	var that = $(this);
    	if($(this).find(".sanjiao").css("display") == "none"){   		
    			that.find(".sanjiao").show();
    			that.find(".text_cont").show();    		
    	}else{
            that.find(".sanjiao").hide();
            that.find(".text_cont").hide();           
    	}   	
    });
    //模拟下拉菜单
    $(".select_fr h4").click(function(){
    	var ul = $(this).parent().find("ul");
    	if(ul.css("display") == "none"){
    	    ul.slideDown(300);
    	    $(this).find("span").html("&#xe602;");
    	}else{
    		ul.slideUp(300);
    		$(this).find("span").html("&#xe60a;");
    	}
    });
    $(".option_se li").click(function(){
    	var par = $(this).parents(".detail_select");
    	var attr = $(this).attr("attr");
    	$("#select_fr").attr("attr",attr);
        par.find(".select_fr font").html($(this).html());
        par.find(".select_fr font").attr("attr",attr);
        par.find(".option_se").slideUp(300);
        par.find(".select_fr h4 span").html("&#xe60a;");
    });
    //表格的奇数颜色
    $(".my_table").find("tr:even td").addClass("color");

   //选择支付方式模拟下拉菜单
    $(".mn_select h3").click(function(){
    	var p = $(this).parent().find("p");
    	if(p.css("display") == "none"){
    	    p.slideDown(300);
    	    $(this).find("span").html("&#xe602;");
    	}else{
    		p.slideUp(300);
    		$(this).find("span").html("&#xe60a;");
    	}
    });
    $(".mn_select p").click(function(){
    	var text = $(".mn_select h3 font").html();
    	var par = $(this).parents(".mn_select");
        par.find("h3 font").html($(this).html());
        par.find("p").slideUp(300);
        par.find("h3 span").html("&#xe60a;");
    	if($(this).html() == "现金账户支付"){$(".cash_pay").show();$("#bank_pay").show(); $(".quick_pay").hide();}else if($(this).html() == "快捷支付"){$(".cash_pay").hide();$("#bank_pay").show();$(".quick_pay").show();}else{$(".cash_pay").hide();$(".quick_pay").hide();$("#bank_pay").hide();}
        $(this).html(text);
    });


    //选择周期
    var flag = true;
    $(".click_load").click(function(){
    	if(flag){
    		flag=false;
	    	$(".open_ul li:gt(1)").hide();
	        var li_num  = $(".open_ul li").length;
	        var hide_li = $(".open_ul li:hidden");  
	        $(".open_ul a").click(function(){
	        	if($(this).find("font").html() == "更多周期"){
	        		hide_li.slideDown(300);
	        		$(this).find("span").html("&#xe63e;");
	        		$(this).find("font").html(" 收 起");
	        	}else{
	        		hide_li.slideUp(300);
	        		$(this).find("span").html("&#xe602;");
	        		$(this).find("font").html("更多周期");
	        	}
	        });
	        $(".open_ul li").click(function(){
	            
	            if($(".open_ul li").length != li_num){
	            	$(".open_ul li").first().remove();
	            };
	        	$(this).find("input").attr("checked","true");
	        	$(this).clone().prependTo($(this).parent()).siblings().hide();
	            $(".open_ul a").find("font").html("更多周期");
	            $(".open_ul a").find("span").html("&#xe602;");
	            hide_li = $(".open_ul li:hidden");
	
	        });
    	}
    })
    
    //其他银行卡下拉菜单
    var flag2 = true;
    $(".click_load2").click(function(){
    	if(flag2){
    		flag2 =false;
		    $(".bankSelect").click(function(){
		        var ul = $(this).parent().find(".bankSelecTab");
		        if(ul.css("display") == "none"){
		            ul.slideDown(200);
		            
		        }else{
		            ul.slideUp(200);
		            
		        }
		    });
		    $(".bankSelecTab li").click(function(){
		        var par = $(this).parents(".divCon");
		        $(this).find("input").attr('checked','checked');
		        par.find(".bankCardList").html($(this).html());
		        par.find(".bankSelecTab").slideUp(300);
		       
		    });
    	}
    });

    //协议弹出框
    $(".popup").click(function() {
        $(".shade1").show();
        $(".popBox").show();
    });
    $(".popBoxClose").click(function() {
        $(".popBox").hide();
        $(".shade1").hide();
    });
    $(".popBtnStyle").click(function(){

        var inp = $(".agree").parents("form").find(".sub_btn");
        $(".agree").attr('checked','checked');
        $(".popBox").hide();
        $(".shade1").hide();
        if($(".agree").attr("checked") == 'checked'){
          
            inp.removeClass("ban");
            inp.removeAttr("disabled");
        }
    });
    if($(".agree").attr("checked") == "checked"){
        $("#go_submit").removeClass("ban");
        $(".sub_btn").removeAttr("disabled");
    }
    $(".agree").click(function(){
        var next_inp = $(this).parents("form").find(".sub_btn");
        if($(this).attr("checked") == "checked"){
            next_inp.removeClass("ban");
            next_inp.removeAttr("disabled");
        }else{
            next_inp.addClass("ban");
            next_inp.attr("disabled","disabled");
        }
    });
    //
    $(".closeIcon,.popTxtBtn").click(function(){
        $(".popUpBox").hide();
        $(".shade1").hide();
    });
    $.fn.numeral1 = function()  {     
            $(this).css("ime-mode", "disabled");     
            this.bind("keypress",function(e) {     
            var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE      
                if(!$.browser.msie&&(e.keyCode==0x8))  //火狐下不能使用退格键     
                {     
                     return ;     
                    }     
                    return code >= 48 && code<= 57;     
            });     
            this.bind("blur", function() {     
                if (this.value.lastIndexOf(".") == (this.value.length - 1)) {     
                    this.value = this.value.substr(0, this.value.length - 1);     
                }
            });     
            this.bind("paste", function() {     
                var s = clipboardData.getData('text');     
                if (!/\D/.test(s));     
                value = s.replace(/^0*/, '');     
                return false;     
            });     
            this.bind("dragenter", function() {     
                return false;     
            });     
            this.bind("keyup", function() {     
                return false;
            });     
        };    
        $(".Wdate").numeral1();

})






    




























