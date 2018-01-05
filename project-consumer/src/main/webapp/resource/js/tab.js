/**
 * tab切换
 * @authors Your Name (you@example.org)
 * @date    2015-10-08 12:11:32
 * @version $Id$
 */

(function($){
    $.fn.myTab = function(config){
        var defultes = {
        	tab_tit : ".my_tab_tit h2",
        	tab_con : ".my_tab_con_box",
        	classname : "active1"
        }        
        var configs = $.extend(defultes,config || {});
        return this.each(function(){
        	var that = $(this);
        	var tit = that.find(configs.tab_tit),
        	    con = that.find(configs.tab_con),
        	    classname = configs.classname;
        	tit.click(function(){
        		var index = $(this).index();
        		$(this).addClass(classname).siblings().removeClass(classname);
        		con.eq(index).show().siblings().hide();
        	})
        })
    }
})(jQuery)




















