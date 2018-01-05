// JavaScript Document
// top_num  窗口固定后，距离顶部的距离
(function($){
    $.fn.xuanfu = function(obj){
	    var defaults = {
			    top_num: null || 10+'px',
				totop: '.totop'
			}
		var objs = $.extend(defaults,obj);
		var that = $(this);
		var to_top = that.find(objs.totop)
		var offsetTop = that.offset().top - parseInt(objs.top_num,10);
		_scroll($(document).scrollTop() > offsetTop);
		$(window).scroll(function(){
		    _scroll($(document).scrollTop() > offsetTop);
		});
		function _scroll(isChange){
		    if(isChange){
			    if($.browser.msie && ($.browser.version == 6.0)){
				    that.css({position:'absolute',top:$(document).scrollTop() + parseInt(objs.top_num,10)})
				}else{
				    that.css({position:'fixed',top:objs.top_num})
				}	
			}else{
			    that.css({position:'',top:''})
			}
		}
        if(to_top){
			to_top.click(function(){
				$('html,body').animate({scrollTop:0},500)	
			})
		}
	}	
})(jQuery)

/*(function($) {
    var _options = {};
    jQuery.fn.fiexd = function(options) {
        var id = $(this).attr("id");
        _options[id] = $.extend({}, $.fn.fiexd.defaults, options);
        var obj = $(this);
        var offsetTop = this.offset().top - parseInt(_options[id].top);
        _scroll($(document).scrollTop() > offsetTop);
        $(window).scroll( function() {
            _scroll($(document).scrollTop() > offsetTop);
        });
        function _scroll(isChange){
            if(isChange){
                if($.browser.msie && ($.browser.version == 6.0)){
                    obj.css({"position":"absolute", "top":$(document).scrollTop()+parseInt(_options[id].top)});
                }else{
                    obj.css({"position":"fixed", "top":_options[id].top});
                }
            }else{
                obj.css({"position":"", "top":""});
            }
        }
    }
    jQuery.fn.fiexd.defaults = {
        top: '100px'
    };
})(jQuery);
*/






