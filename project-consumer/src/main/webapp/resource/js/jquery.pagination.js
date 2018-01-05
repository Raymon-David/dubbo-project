jQuery.fn.pagination = function(opts, callbackopts){
	opts = jQuery.extend({
		maxentries: 1,
		items_per_page:10,
		num_display_entries:6,
		current_page:1,
		div_id:'page',
		content_txt:'content_txt',
		jumppage:0,
		num_edge_entries:2,
		link_to:"#",
		prev_text:"&lt",
		next_text:"&gt",
		ellipse_text:"&#133;",
		prev_show_always:false,
		next_show_always:false,
		_data:'{}',
		dataStore: null,
		callback:function(){return false;}
	},opts||{});
	
	callbackopts = jQuery.extend({
		content_txt:"#content_txt"+opts.div_id,
		template_jst: "template_jst"+opts.div_id,
		url : ""
	}, callbackopts||{});

	return this.each(function() {
		/**
		 * Calculate the maximum number of pages
		 */
		function numPages() {
			return Math.ceil(opts.maxentries/opts.items_per_page);
		}
		
		/**
		 * Calculate start and end point of pagination links depending on 
		 * current_page and num_display_entries.
		 * @return {Array}
		 */
		function getInterval()  {
			var ne_half = Math.ceil(opts.num_display_entries/2);
			var np = numPages();
			var upper_limit = np-opts.num_display_entries;
			var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
			var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
			return [start+1,end];
		}
		
		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function pageSelected(page_id, evt){
			current_page = page_id;

			var continuePropagation = pageselectCallback(callbackopts.url, page_id, panel);
			
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}
		function pageselectCallback(url ,page_id, jq){
			if( page_id >= 1 && (numPages() == 1 || page_id <= numPages())){
				$(callbackopts.content_txt).show();
				panel.hide();
				$(callbackopts.content_txt).html("<div id='TB_load'><img src='/resource/images/images/loadingAnimation.gif' /></div>");
				_data.pageNo=page_id;
				_data.pageSize=opts.items_per_page;
				_data.time=new Date().getTime();
				var dt = {
						json : JSON.stringify(_data)
					};
				$.ajax({
					type: "POST",
					url: url,
					//data: {pageid:page_id, pagesize:opts.items_per_page},
					dataType : "json",
					data : dt,
					timeout: "300000",
					complete: function() {
					},
					success: function(json){
						//出错数据暂元
						var total = 0;
						var res;
						if(json.error){
							opts.maxentries=0;
						}else{
							total = json.content.page.totalRecords;
							res= json.content.recordArray;
						}
					    if(opts.maxentries >total  || opts.maxentries <= 1) {
							opts.maxentries = total;
						}
						$(callbackopts.content_txt).html(TrimPath.processDOMTemplate(callbackopts.template_jst,res));
						$(callbackopts.content_txt).show();
						jq.show();
						 	//$('a.thickbox').unbind('click');//取消a中class="thickbox"的绑定  
						 	//tb_init('a.thickbox, area.thickbox, input.thickbox');//重新绑定页面中class="thickbox"的
						jq.empty();
						if(total>0 && numPages() > 1 ){		
							drawLink(url,opts.items_per_page,_data);
						}
						opts.callback();
					 }
				});
			 }
		}
		
		function drawLink(url,items_per_page,_data){
			var np = numPages();
			var getClickHandler = function(page_id) {
				return function(evt){ 
					return pageSelected(page_id, evt); };
			};
			var preClass="pre_page";
			var nextClass="pre_page";
			var toPage="";
			if(opts.jumppage==current_page){
				toPage=current_page;
			}
			opts.jumppage=0;
			if(current_page>1){
				preClass ="next_page isPre";
			}
			if(current_page<np){
				nextClass="next_page isPre";
			}
			var div_topage =opts.div_id;
			var result ="<a class='"+preClass+"' href='javascript:void(0);' id='"+div_topage+"pre'><span class='iconfont'>&#xe604;</span>上一页</a>";
			result+="<span class='currentPage'>"+current_page+"</span>";
			result+="<a class='"+nextClass+"' href='javascript:void(0);' id='"+div_topage+"next'>下一页<span class='iconfont'>&#xe609;</span></a>";
			result+="<div class='pageNum'><span>"+current_page+"</span>/<span>"+np+"</span>页</div>";
			result+="<input type='text' class='selectPage' value='"+toPage+"' id='to"+div_topage+"'><a class='jump' href='javascript:void(0);' onclick=\""+div_topage+"("+np+",'"+div_topage+"')\">跳转</a>";
			panel.append(result);
			$("#"+div_topage+"pre").unbind("click");
			$("#"+div_topage+"next").unbind("click");
			if(current_page>1){
				$("#"+div_topage+"pre").bind("click",getClickHandler(current_page-1));
			}
			if(current_page<np && toPage==""){
				$("#"+div_topage+"next").bind("click",getClickHandler(current_page+1));
			}else if(current_page<np && toPage!=""){
				$("#"+div_topage+"next").bind("click",getClickHandler(parseInt(current_page)+1));
			}
		}
		/**
		 * This function inserts the pagination links into the container element
		 */
		var current_page = opts.current_page==0?1:opts.current_page;
		// Create a sane value for maxentries and items_per_page
		opts.maxentries = (!opts.maxentries || opts.maxentries < 0)?1:opts.maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		// Store DOM element for easy access from all inner functions
		var panel = jQuery(this);
		if(current_page > 0) {
			pageselectCallback(callbackopts.url, current_page, panel);
		}
	});
};


