window.uaTrack = function(v) {
    try { SUDA._S_uaTrack('finance_money_index', v); }
    catch (e) { }
};

/* HDPAD setting */
jsLoader({ url: ARTICLE_JSS.$ }).jsLoader({ url: ARTICLE_JSS.cookie, callback: function() {
    var cooname = 'HLPAD',
		padcname = 'HLPAD',
		coo = cookie.get(cooname),
		b = $(document.body);
    if (window.isPad) {
        if (!coo) { b.removeClass(padcname); }
        else { b.addClass(padcname); }
        b.delegate('.searcher_ldpad', 'click', function() {
            cookie.set(cooname, 1, -24, 'finance.sina.com.cn');
            b.removeClass(padcname);
        });
        b.delegate('.searcher_hdpad', 'click', function() {
            cookie.set(cooname, 1, 24 * 365, 'finance.sina.com.cn');
            b.addClass(padcname);
        });
    } else {
        if (!coo) { b.addClass(padcname); }
        else { b.removeClass(padcname); }
        b.delegate('.searcher_ldpad', 'click', function() {
            cookie.set(cooname, 1, 24 * 365, 'finance.sina.com.cn');
            b.removeClass(padcname);
        });
        b.delegate('.searcher_hdpad', 'click', function() {
            cookie.set(cooname, 1, -24, 'finance.sina.com.cn');
            b.addClass(padcname);
        });
    }
} 
});

/* searcher_sel */
jsLoader({ url: ARTICLE_JSS.common, callback: function() {
    new DivSelect('searcher_sel');
} 
});

/* suggest */
jsLoader({ url: ARTICLE_JSS.suggestServer, callback: function() {
    var ss = new SuggestServer(),
		form = document.getElementById('searcher_form'),
		sel = document.getElementById('searcher_sel'),
		txt = document.getElementById('searcher_txt');
    ss.bind({
        'input': 'searcher_txt',
        'default': '',
        'type': '',
        'width': 240,
        'link': 'http://biz.finance.sina.com.cn/suggest/lookup_n.php?country=@type@&q=@code@',
        'head': ['选项', '类型', '代码', '中文名称'],
        'body': [-1, -2, 2, 4],
        'callback': null
    });
    sel.onchange = function() {
        uaTrack('search_change');
        form['c'].value = 'all';
        form['t'].value = 'keyword';
        switch (sel.selectedIndex) {
            case 0:
                ss.changeLink('http://biz.finance.sina.com.cn/suggest/lookup_n.php?country=@type@&q=@code@');
                ss._objectConfig['value'] = '@2@';
                ss._stringOriginalValue = '简称/代码/拼音';
                if (ss._elementInput.value === '请输入关键字') {
                    ss._elementInput.value = '简称/代码/拼音';
                }
                form.action = 'http://biz.finance.sina.com.cn/suggest/lookup_n.php';
                break;
            case 1:
                ss.changeLink('http://guba.sina.com.cn/?s=bar&name=@code@');
                ss._objectConfig['value'] = '@2@';
                ss._stringOriginalValue = '简称/代码/拼音';
                if (ss._elementInput.value === '请输入关键字') {
                    ss._elementInput.value = '简称/代码/拼音';
                }
                form.action = 'http://guba.sina.com.cn/bar.php';
                break;
            case 2:
                ss.changeLink('http://search.sina.com.cn/?range=all&c=news&col=1_7&q=@4@');
                ss._objectConfig['value'] = '@4@';
                ss._stringOriginalValue = '请输入关键字';
                if (ss._elementInput.value == '简称/代码/拼音') {
                    ss._elementInput.value = '请输入关键字';
                }
                form.action = 'http://search.sina.com.cn/';
                form['c'].value = 'news';
                form['t'].value = '';
                break;
            default: break;
        }
        txt.value = '';
    };
    form.onsubmit = function(e) {
        var vtxt = txt.value;
        if (vtxt && vtxt !== '简称/代码/拼音' && vtxt !== '请输入关键字') {
            form['name'].value = vtxt;
            form['k'].value = '';
        } else {
            try {
                txt.value = '';
                txt.focus();
            } catch (e) { }
            return false;
        }

        if (ss._elementContainer !== null) {
            if (ss._elementContainer.innerHTML !== '') {
                var table = this.getElementsByTagName('tbody')[0];
                var fanchenElementLineCurrent = ss._elementLineCurrent;
                if (fanchenElementLineCurrent == null) {
                    var s = ss._fill();
                    form['q'].value = ss._getFullCode(s);
                } else {
                    var s = fanchenElementLineCurrent.id.split(',');
                    form['q'].value = ss._getFullCode(s);
                }
            }
        }
        uaTrack('search');
    };
} 
});

/* searcher_l_menu */
jsLoader({ url: ARTICLE_JSS.$, callback: function() {
    var menu = $('#searcher_l_menu');
    $(document.body).on('click', function(e) {
        var t = e.target;
        if (!t.nodeName) { t = t.parentNode; }
        if ($(t).attr('id') === 'searcher_l_btn') {
            menu.toggle();
            return;
        }
        if (!$.contains(menu[0], t) || t.nodeName.toLowerCase() === 'a') {
            menu.hide();
            return;
        }
    });
} 
});

/* menu */
jsLoader({ url: ARTICLE_JSS.$, callback: function() {
    var menu = $('.menu');
    menu.delegate('.menu_main_span', 'mouseenter', function(e) {
        $(this).parent('li').addClass('menu_main_li_open');
    });
    menu.delegate('.menu_main_span', 'mouseleave', function(e) {
        $(this).parent('li').removeClass('menu_main_li_open');
    });
    menu.delegate('.menu_sub', 'mouseenter', function(e) {
        $(this).parent('li').addClass('menu_main_li_open');
    });
    menu.delegate('.menu_sub', 'mouseleave', function(e) {
        $(this).parent('li').removeClass('menu_main_li_open');
    });
} 
});

/* topdata_slide */
jsLoader({ url: ARTICLE_JSS.common, callback: function() {
    var sp = new ScrollPic();
    sp.scrollContId = 'topdata_slide';
    sp.arrRightId = 'topdata_slide_btn';
    sp.frameWidth = 48;
    sp.pageWidth = 48;
    sp.upright = true;
    sp.circularly = true;
    sp.autoPlay = true;
    sp.autoPlayTime = 5;
    sp.space = 10;
    sp.speed = 50;
    sp.initialize();
} 
});

/* p01_l_slide */
jsLoader({ url: ARTICLE_JSS.common, callback: function() {
    var dots = document.getElementById('p01_l_slide_dots'),
		slider = new Slider({
		    wrapId: 'p01_l_slide',
		    itemClass: 'p01_slide_items',
		    sameSize: true,
		    startOn: 0,
		    scrollBy: 1,
		    speed: 6,
		    wrapSize: 200,
		    isVertical: false,
		    isLoop: true,
		    autoPlay: true,
		    autoInterval: 5,
		    absoluteAni: true,
		    onReady: function(s) {
		        var str = '';
		        for (var i = 0, l = this.states.total / 2; i < l; i++) {
		            str += '<span' + (i === 0 ? ' class="selected"' : '') + ' onmouseover="sliderP01l.slideTo(' + i + ')"></span>';
		        }
		        dots.innerHTML = str;
		    },
		    onIndexChanged: function(n) {
		        var edots = dots.getElementsByTagName('span'),
				l = edots.length,
				ni = n % (this.states.total / 2),
				i;
		        for (i = 0; i < l; i++) {
		            if (i === ni) { edots[i].className = 'selected'; }
		            else { edots[i].className = ''; }
		        }
		    },
		    onAniStart: function() { },
		    onAniEnd: function() { },
		    onEdge: function() { }
		});
    window.sliderP01l = slider;
} 
});

/* slide */
jsLoader({ url: ARTICLE_JSS.$, callback: function() {
    $(document.body).delegate('.btn_slide', 'click', function(e) {
        var t = $(this),
			c = $('.slide_cont', t.parent().parent());
        if (t.hasClass('btn_slide_opend')) {
            t.removeClass('btn_slide_opend');
            c.slideUp(400);
        } else {
            t.addClass('btn_slide_opend');
            c.slideDown(400);
        }
    });
} 
});

/* hqLoader */
window.hqLoader = {
    api: 'http://hq.sinajs.cn/',
    map: {},
    register: function(cname, delay) {
        var that = this;
        if (!that.map[cname]) {
            that.map[cname] = {
                cname: cname,
                delay: delay,
                inited: false,
                interval: null
            };
        }
        that.init(cname);
    },
    init: function(cname) {
        var that = this,
			map = that.map,
			d = map[cname];
        d['interval'] && clearInterval(d['interval']);
        d['interval'] = setInterval(function() {
            that.start && that.start(d);
        }, d['delay']);
        that.start && that.start(d);
    }
};
jsLoader({ url: ARTICLE_JSS.finCodeFormater2 }).jsLoader({ url: ARTICLE_JSS.$, callback: function() {
    hqLoader.start = function(o) {
        if (!o) { return; }
        o['inited'] = true;
        var that = this,
			cname = o['cname'],
			es = $('.' + cname),
			lists = [],
			alists = [],
			olists = {},
			i = 0,
			t = Math.floor(new Date().getTime() / 1000),
			l, n, dcode;
        es.each(function() {
            dcode = (finCodeFormater2($(this).attr('dcode')) || { hqstr: '' })['hqstr'];
            if (dcode && !olists[dcode]) {
                n = Math.floor(i / 40);
                if (i % 40 === 0) {
                    alists[n] = [];
                }
                lists.push(dcode);
                alists[n].push(dcode);
                olists[dcode] = 1;
                i++;
            }
        });
        for (i = 0, l = alists.length; i < l; i++) {
            $.ajax({
                url: that.api + '_=' + t + '&list=' + alists[i].join(','),
                dataType: 'script',
                cache: true
            }).done(function() {
                that.paint(cname, lists);
            });
        }
    };
    hqLoader.paint = function(cname, lists) {
        var that = this,
			es = $('.' + cname);
        es.each(function() {
            var t = $(this),
				dcode = finCodeFormater2(t.attr('dcode')) || {
				    hqstr: '',
				    type: 'Na',
				    gData: function() { return {}; }
				},
				d = dcode.gData(),
				type = dcode['type'],
				dtype = t.attr('dtype'),
				dcolor = t.attr('dcolor'),
				dlength = t.attr('dlength') || 2,
				price, ochg;
            if (dcode && dtype) {
                ochg = d['chg'] === 'Na' ? 'Na' : d['chg'] * 100;
                if (ochg !== 'Na') {
                    chg = ochg.toFixed(dlength) + '%';
                    if (dcode.type !== 'of') { chg = ochg > 0 ? '+' + chg : chg; }
                } else {
                    chg = '--.--';
                }
                if (dcolor) {
                    t.addClass(d['ctag']);
                }
                if (dtype === 'price') {
                    price = d['price'] === 'Na' ? '--.--' : (d['price'] || 0).toFixed(dlength);
                    t.html(price);
                } else if (dtype === 'chg') {
                    t.html(chg);
                }
            }
        });
    };
} 
});

/* HKBKLoader */
window.HKBKLoader = {
    api: 'http://stock.finance.sina.com.cn/stock/api/jsonp.php/HKBKLoader.paint/StockService.getLicai?type=hk',
    tli: '<p class="clearfix"><a href="http://vip.stock.finance.sina.com.cn/mkt/#hk_hshy%scode%" target="_blank" class="ppa_datablk01_cname fl" title="">%sname%</a><span class="ppa_datablk01_chg %c%">%chg%</span></p>',
    interval: null,
    init: function(wid, delay, n) {
        var that = this;
        that.wid = wid;
        that.n = n || 5;
        that.interval && clearInterval(that.interval);
        if (that.get) {
            that.get();
            that.interval = setInterval(function() {
                that.get();
            }, delay || 5000);
        }
    }
};
jsLoader({ url: ARTICLE_JSS.$, callback: function() {
    HKBKLoader.get = function() {
        var that = this,
			w = $('#' + that.wid),
			api = that.api;
        if (!w.length) { return; }
        that.w = w;
        $.ajax({
            url: api,
            dataType: 'script',
            cache: true
        });
    };
    HKBKLoader.paint = function(s) {
        if (!s) { return; }
        var that = this,
			w = that.w,
			n = that.n || 5,
			tli = that.tli,
			l = Math.min(s.length, n),
			i, d, scode, sname, c, chg, ochg,
			h = [];
        for (i = 0; i < l; i++) {
            d = s[i];
            scode = d['sector_code'] || '',
			sname = d['industryName'] || '',
			ochg = d['risePercent'] || '--.--',
			chg = ochg === '--.--' ? '--.--' : ochg > 0 ? '+' + ochg + '%' : ochg + '%';
            c = ochg === '--.--' ? '' : ochg > 0 ? 'coup' : ochg < 0 ? 'codown' : '';
            h.push(tli.replace(/%scode%/g, scode).replace(/%sname%/g, sname).replace(/%c%/g, c).replace(/%chg%/g, chg));
        }
        w.html(h.join(''));
    }
} 
});

/* HotFTLoader */
window.HotFTLoader = {
    api: 'http://stock2.finance.sina.com.cn/futures/api/jsonp.php/HotFTLoader.paint/HotFuturesService.getHotDominantlist',
    tli: '<a href="%url%" target="_blank" class="fl" style="background:%color%;"><span class="ppa_metro_cname">%cname%</span><span class="ppa_metro_chg">%chg%</span></a>',
    colors: ['#e73511', '#cd5109', '#b2690a', '#9c8213', '#819c1b', '#67b61f', '#55aa29', '#349f2b', '#1d9732'],
    interval: null,
    init: function(wid, delay) {
        var that = this;
        that.wid = wid;
        that.interval && clearInterval(that.interval);
        if (that.get) {
            that.get();
            that.interval = setInterval(function() {
                that.get();
            }, delay || 5000);
        }
    }
};
jsLoader({ url: ARTICLE_JSS.$, callback: function() {
    HotFTLoader.get = function() {
        var that = this,
			w = $('#' + that.wid),
			api = that.api;
        if (!w.length) { return; }
        that.w = w;
        $.ajax({
            url: api,
            dataType: 'script',
            cache: true
        });
    };
    HotFTLoader.paint = function(s) {
        if (!s) { return; }
        var that = this,
			w = that.w,
			tli = that.tli,
			l = Math.min(s.length, 9),
			colors = that.colors,
			h = [],
			i, d, url, code, color, cname, chg;
        for (i = 0; i < l; i++) {
            d = s[i];
            code = d['code'] || '';
            url = d['url'] || 'http://finance.sina.com.cn/futures/quotes/%code%.shtml'.replace(/%code%/, code);
            color = colors[i] || colors[Math.floor(Math.random() * colors.length)];
            cname = d['cname'] || '';
            chg = d['chg'] || '--.--';
            h.push(tli.replace(/%url%/g, url).replace(/%color%/g, color).replace(/%cname%/g, cname).replace(/%chg%/g, chg));
        }
        that.w.html(h.join(''));
    }
} 
});

/* Poll */
window.Poll = {
    api: 'http://data.mix.sina.com.cn/?p=mix&s=finance_suvery&a=getInfo&format=json&poll_id=%pid%',
    map: {},
    colors: ['#c21d18', '#cccccc', '#1b9451'],
    eventInited: false,
    tc: '<span class="%pre%_zpd_cc" style="width:%per%%;background-color:%color%;"></span>',
    tt: '<span class="%pre%_zpd_tt" pid="%pid%" qid="%qid%"><s style="background:%color%;"></s>%st%<cite style="color:%color%;">%per%%</cite></span>',
    init: function(wid) {
        var that = this,
			wid = wid,
			w = document.getElementById(wid),
			pid, interval;
        if (!w) { return; }
        pid = w.getAttribute('pid');
        if (!pid) { return; }
        that.map[pid] = null;
        interval && clearInterval(interval);
        interval = setInterval(function() {
            if (that.start) {
                interval && clearInterval(interval);
                interval = null;
                that.start(wid, pid);
            }
        }, 100);
        if (that.start) {
            interval && clearInterval(interval);
            interval = null;
            that.start(wid, pid);
        }
    }
};
jsLoader({ url: ARTICLE_JSS.$, callback: function() {
    Poll.wm = $('#layer_mask');
    Poll.ww = $('#layer_poll');
    Poll.wTitle = $('.layer_poll_h span', Poll.ww);
    Poll.wDescp = $('.layer_poll_s p', Poll.ww);
    Poll.wTab = $('.layer_poll_t', Poll.ww);
    Poll.wCont = $('.layer_poll_c', Poll.ww);
    Poll.wZpdId = 'layer_zpd';
    Poll.tTab = '<th><a href="javascript:;" pid="%pid%" qid="%qid%"><span>%title%</span><sup>(%num%)</sup></a></th>';
    Poll.tCont = '<li class="%ff%"><div class="layer_poll_ct.clearfix1"><div class="layer_poll_tp fl"><a href="http://weibo.com/u/%uid%" target="_blank"><img src="%img%" alt="%uname%" title="%uname%" /></a></div><div class="layer_poll_tt clearsub"><h3><a href="http://weibo.com/u/%uid%" target="_blank" title="%uname%">%uname%</a>%vip%</h3><p>%vreason%</p></div></div><div class="layer_poll_cp">%descp%</div></li>';
    Poll.tVip = '<a href="http://blog.sina.com.cn/v/verify" target="_blank" class="icon_vip%isv%"><img src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15px" height="15px" title="微博认证" /></a>';
    Poll.initEvent = function() {
        var that = this,
			ww = that.ww;
        $(document.body).delegate('.ppa_zpd_tt', 'click', function(e) {
            var t = $(this),
				pid = t.attr('pid'),
				qid = t.attr('qid');
            if (!pid || !qid) { return; }
            that.show(pid, qid);
        });
        ww.delegate('.layer_poll_t a', 'click', function(e) {
            var t = $(this),
				pid = t.attr('pid'),
				qid = t.attr('qid');
            if (!pid || !qid) { return; }
            that.tab(pid, qid);
        }).delegate('.layer_poll_close', 'click', function(e) {
            that.wm.hide();
            that.ww.fadeOut();
        });
        that.eventInited = true;
    };
    Poll.show = function(pid, qid) {
        var that = this;
        that.paintLayerSuvery(pid);
        that.paintLayerTab(pid, qid);
        that.tab(pid, qid);
        that.wm.show();
        that.ww.fadeIn();
    };
    Poll.paintLayerSuvery = function(pid) {
        var that = this,
			datas = that.map[pid],
			setime = function(st) {
			    if (!st) { return '--'; }
			    var dt = new Date(st * 1000),
					m = dt.getMonth() + 1,
					d = dt.getDate();
			    return m + '月' + d + '日';
			},
			s = (datas || {}).suvery || {},
			stime = setime(s['start_time']),
			etime = setime(s['end_time']),
			oetime = stime === etime ? stime : stime + '-' + etime;
        that.wTitle.html((s.title || '无法获取该调查的标题').slice(0, 18));
        that.wDescp.html([oetime, s['summary']].join(',').slice(0, 28));
        that.paintZpd(that.wZpdId, pid, 'layer');
    };
    Poll.paintLayerTab = function(pid, qid) {
        var that = this,
			wTab = that.wTab,
			tTab = that.tTab,
			datas = that.map[pid],
			s = (datas || {}).question || [],
			l = s.length,
			qInfo = datas['qInfo'],
			qPer = datas['qPer'],
			h = [],
			i, d, per, qid, title, num;
        if (!qInfo) {
            qInfo = {};
            datas['qInfo'] = {};
        }
        h.push('<table><tr>');
        for (i = 0; i < l; i++) {
            d = s[i];
            qid = d['qid'];
            per = qPer[qid];
            title = d['title'] || d['short_title'] || '';
            num = d['poll_num'] || 0;
            if (!qInfo[qid]) { datas['qInfo'][qid] = d['userlog']; }
            h.push(tTab.replace(/%pid%/g, pid).replace(/%qid%/g, qid).replace(/%title%/g, title).replace(/%num%/g, num));
        }
        h.push('</tr></table>');
        wTab.html(h.join(''));
    };
    Poll.paintLayerCont = function(pid, qid) {
        var that = this,
			wCont = that.wCont,
			datas = that.map[pid],
			s = ((datas || {}).qInfo || {})[qid],
			tcont = that.tCont,
			tvip = that.tVip,
			h = [],
			d, i, l, ff, uid, uname, img, v, vip, vreason, descp;
        wCont.html('');
        if (!s) { return; }
        h.push('<ul class="clearfix">');
        for (i = 0, l = s.length; i < l; i++) {
            d = s[i];
            ff = i % 2 === 0 ? 'fl' : 'fr';
            uid = d['uid'] || '';
            uname = d['screen_name'] || d['name'] || '';
            img = d['profile_image_url'] || 'http://tp2.sinaimg.cn/%uid%/180/5672194171/1'.replace(/%uid%/g, uid);
            v = d['verified_type'] || -1;
            vip = v < 0 ? '' : v > 0 && v < 8 ? tvip.replace(/%isv%/, 'b') : tvip.replace(/%isv%/, 'y');
            vreason = d['verified_reson'] || d['description'] || '';
            descp = d['desc'] || '';
            h.push(tcont.replace(/%ff%/g, ff).replace(/%uid%/g, uid).replace(/%uname%/g, uname).replace(/%img%/g, img).replace(/%vip%/g, vip).replace(/%vreason%/g, vreason).replace(/%descp%/g, descp));
        }
        h.push('</ul>');
        wCont.html(h.join(''));
    };
    Poll.tab = function(pid, qid) {
        var that = this,
			wTab = that.wTab,
			wTabs = $('a', wTab),
			wNTab = wTabs.filter('a[qid="' + qid + '"]'),
			wCont = that.wCont;
        if (wNTab.hasClass('selected')) { return; }
        wTabs.removeClass('selected');
        wNTab.addClass('selected');
        that.paintLayerCont(pid, qid);
    };
    Poll.start = function(wid, pid) {
        var that = this,
			api = that.api;
        if (!that.eventInited) {
            that.initEvent();
        }
        $.ajax({
            url: api.replace(/%pid%/, pid),
            dataType: 'jsonp',
            cache: true,
            jsonpCallback: 'PollCallback'
        }).done(function(s) {
            if (!s || !s.result || !s.result.data) { return; }
            that.map[pid] = s.result.data;
            that.paintZpd(wid, pid, 'ppa');
        });
    };
    Poll.paintZpd = function(wid, pid, pre) {
        if (!this.map[pid]) { return; }
        var that = this,
			w = $('#' + wid),
			wc = $('.' + pre + '_zpd_c', w),
			wt = $('.' + pre + '_zpd_t', w),
			datas = that.map[pid],
			colors = that.colors,
			tc = that.tc.replace(/%pre%/g, pre),
			tt = that.tt.replace(/%pre%/g, pre),
			question = datas['question'],
			persent = datas['persent'],
			qPer = datas['qPer'],
			total = datas['total'] || 0,
			h1 = [],
			h2 = [],
			m = 0,
			l = question.length,
			i, qid, per, color, st, d;
        if (!question || !l || !total) { return; }
        if (!qPer) {
            qPer = {};
            datas['qPer'] = {};
        }
        for (i = 0; i < l; i++) {
            d = question[i];
            qid = d['qid'];
            st = d['short_title'] || d['title'];
            per = qPer[qid] || Math.round(persent[qid] / total * 100);
            color = colors[m];
            h1.push(tc.replace(/%per%/g, per).replace(/%color%/g, color));
            h2.push(tt.replace(/%pid%/g, pid).replace(/%qid%/g, qid).replace(/%st%/g, st).replace(/%color%/g, color).replace(/%per%/g, per));
            m++;
            if (!qPer[qid]) { datas['qPer'][qid] = per; }
        }
        wc.html(h1.join(''));
        wt.html(h2.join(''));
    }
} 
});

/* topdata_data */
(function() {
    hqLoader.register('topdata_data', 5e3);
})();

/* mine & recent */
jsLoader({ url: ARTICLE_JSS.finCodeFormater2 }).jsLoader({ url: ARTICLE_JSS.suggestServer }).jsLoader({ url: ARTICLE_JSS.SFP }).jsLoader({ url: ARTICLE_JSS.$ }).jsLoader({ url: ARTICLE_JSS.cookie, callback: function() {
    var apiHq = 'http://hq.sinajs.cn/',
		apiList = 'http://stock.finance.sina.com.cn/portfolio/api/json.php/HoldService.getSymbolListByPid',
		apiAdd = 'http://stock.finance.sina.com.cn/portfolio/api/json.php/HoldService.appendAttentionSymbol',
		apiDel = 'http://stock.finance.sina.com.cn/portfolio/api/json.php/HoldService.delAttentionSymbol',
		temp = '<p class="datablk01_p.clearfix1"><a href="%url%" target="_blank" title="%title%" class="datablk01_cname fl">%stitle%</a><span class="datablk01_price %cud%" dcode="%scode%" dtype="price" dcolor="1">%price%</span><span class="datablk01_chg %cud%" dcode="%scode%" dtype="chg" dcolor="1">%chg%</span><a href="javascript:;" class="datablk01_del" title="删除" scode="%scode%" pid="%pid%"></a></p>',
		sfp = new SFP('stock'),
		ss = new SuggestServer(),
		wMine = $('#mine'),
		wMineTab = $('.mine_tab', wMine),
		tabs = $('a', wMineTab),
		wMineCont = $('.datablk01_c', wMine),
		wRecent = $('#recent'),
		wRecentCont = $('.datablk01_c', wRecent),
		wTxt = $('#mine_searcher_txt'),
		cooname = 'FIN_ALL_VISITED',
		stitlelen = 6,
		mStocks = {},
		add = function() {
		    var v = wTxt.val(),
				stype = $('.selected', wMineTab).attr('stype'),
				ftype, type;
		    if (!v) {
		        wTxt.focus();
		        return;
		    }
		    ftype = finCodeFormater2(v)['type'];
		    switch (ftype) {
		        case 'us':
		            type = 'us';
		            break;
		        case 'hk':
		            type = 'hk';
		            break;
		        case 'sz':
		        case 'sh':
		            type = 'cn';
		            break;
		        case 'of':
		        case 'cf':
		        case 'gf':
		            type = 'fund';
		            break;
		        default:
		            type = 'cn';
		            break;
		    }
		    sfp.parseCMD('post', {
		        url: apiAdd,
		        data: {
		            slist: v,
		            type: type
		        }
		    }, addCallback);
		    if (stype === type) {
		        setTimeout(function() {
		            paintMine(type);
		        }, 400);
		    }
		}
    paintRecent = function() {
        var coo = cookie.get(cooname),
				btn = $('.btn_slide', wRecent),
				c = $('.slide_cont', wRecent);
        if (!coo) {
            coo = [];
            wRecent.hide();
            return;
        } else {
            coo = coo.split(',');
            wRecent.show();
            getList(wRecentCont, coo, 20);
        }
    },
		paintMine = function(type) {
		    wMineCont.html('');
		    sfp.parseCMD('get', {
		        url: apiList,
		        data: {
		            type: type || 'cn'
		        }
		    }, getCallback
			);
		},
		getList = function(w, s, n) {
		    var fcodes = finCodeFormater2(s),
				l = fcodes.length,
				i,
				scodes = [];
		    if (l === 0) { return; }
		    for (i = 0; i < l; i++) {
		        scodes.push(fcodes[i]['hqstr']);
		    }
		    $.ajax({
		        url: apiHq + 'list=' + scodes.join(','),
		        dataType: 'script',
		        cache: true
		    }).done(function() {
		        paintList(w, fcodes, n);
		    });
		},
		paintList = function(w, s, n) {
		    var l = s.length,
				i, d, t,
				h = [],
				scode, title, stitle, dcode, price, chg, pid, cud, url,
				k = 0;
		    n = n || 20;
		    for (i = 0; i < l && k < n; i++) {
		        t = s[i];
		        d = t.gData();
		        scode = t['code'];
		        dcode = t['hqstr'];
		        url = t['url'] || '';
		        title = d['cname'] || '';
		        if (!title || !url) { continue; }
		        price = d['price'] === 'Na' ? '--.--' : d['price'].toFixed(2);
		        chg = d['chg'] === 'Na' ? 'Na' : d['chg'] * 100;
		        k++;
		        pid = mStocks[scode] || '';
		        stitle = title.slice(0, stitlelen);
		        if (chg !== 'Na') {
		            cud = chg > 0 ? 'c_up' : chg < 0 ? 'c_down' : '';
		            chg = chg.toFixed(2) + '%';
		        } else {
		            cud = '';
		            chg = '--.--';
		        }
		        h.push(temp.replace(/%scode%/g, scode).replace(/%title%/g, title).replace(/%stitle%/g, stitle).replace(/%dcode%/g, dcode).replace(/%price%/g, price).replace(/%chg%/g, chg).replace(/%pid%/g, pid).replace(/%cud%/g, cud).replace(/%url%/g, url));
		    }
		    w.html(h.join(''));

		    if (window.hqLoader) {
		        hqLoader.register('datablk01_price', 5e3);
		        hqLoader.register('datablk01_chg', 5e3);
		    }
		},
		getCallback = function(s) {
		    s = eval('(' + s + ')');
		    if (!s) { return; }
		    mStocks = {};
		    var codes = [],
				l = s.length,
				ocode = {},
				i, code, d, m, pid;
		    for (i = 0; i < l; i++) {
		        d = s[i];
		        m = d['market'];
		        switch (m) {
		            case 'us':
		                code = d['code'].toLowerCase();
		                break;
		            case 'sz':
		            case 'sh':
		            case 'of':
		            case 'cf':
		            case 'gf':
		                code = m + d['code'];
		                break;
		            default:
		                code = d['code'];
		                break;
		        }
		        mStocks[code] = d['portfolio_id'];
		        if (!ocode[code]) {
		            ocode[code] = 1;
		            codes.push(code);
		        }
		    }
		    getList(wMineCont, codes, 20);
		},
		addCallback = function(s) {
		    //s = eval('(' + s + ')');
		},
		delCallback = function(s) {
		    //s = eval('(' + s + ')');
		};

    paintRecent();
    paintMine();

    window.MineRecent = {
        paintRecent: paintRecent,
        paintMine: paintMine
    };

    if (cookie.get('SUP')) {
        wMine.show();
    } else {
        wMine.hide();
    }

    ss.bind({
        'input': 'mine_searcher_txt',
        'default': '',
        'type': '',
        'target': '',
        'width': 200,
        'link': 'javascript:;',
        'head': ['选项', '类型', '代码', '中文名称'],
        'body': [-1, -2, 2, 4],
        'callback': function() {
            add();
        }
    });

    $(document.body).delegate('.datablk01_p', 'mouseenter', function() {
        $(this).addClass('datablk01_p_hover');
    });
    $(document.body).delegate('.datablk01_p', 'mouseleave', function() {
        $(this).removeClass('datablk01_p_hover');
    });
    $(document.body).delegate('.datablk01_h .datablk01_price', 'click', function(e) {
        $(this).parents('.datablk01').addClass('datablk01_pp');
    });
    $(document.body).delegate('.datablk01_h .datablk01_chg', 'click', function(e) {
        $(this).parents('.datablk01').removeClass('datablk01_pp');
    });
    $(document.body).delegate('.mine_searcher_btn', 'click', function(e) {
        e.preventDefault();
        add();
    })
    wMineTab.delegate('a', 'click', function(e) {
        var t = $(this),
			stype = t.attr('stype');
        if (!stype) { return; }
        tabs.removeClass('selected');
        t.addClass('selected');
        paintMine(stype);
    });
    wMineCont.delegate('.datablk01_del', 'click', function(e) {
        e.preventDefault();
        var t = $(this),
			scode = t.attr('scode'),
			pid = t.attr('pid'),
			fcode, ftype;
        if (!scode) { return; }
        fcode = finCodeFormater2(scode);
        switch (fcode['type']) {
            case 'us':
                ftype = 'us';
                break;
            case 'sz':
            case 'sh':
                ftype = 'cn';
                break;
            case 'of':
            case 'cf':
                ftype = 'fund';
                break;
            case 'hk':
                ftype = 'hk';
                break;
            default:
                ftype = 'cn';
                break;
        }
        sfp.parseCMD('post', {
            url: apiDel,
            data: {
                slist: scode,
                type: ftype,
                pid: pid
            }
        }, delCallback
		);
        t.parents('.datablk01_p').remove();
    });
    wRecentCont.delegate('.datablk01_del', 'click', function(e) {
        e.preventDefault();
        var t = $(this),
			scode = t.attr('scode'),
			coo, i, l;
        t.parent().remove();
        if (wRecentCont.html() === '') { wRecent.hide(); }
        if (!scode) { return; }
        coo = cookie.get(cooname);
        if (!coo) { return; }
        coo = coo.split(',');
        for (i = 0, l = coo.length; i < l; i++) {
            if (coo[i] === scode) {
                coo.splice(i, 1);
                break;
            }
        }
        cookie.set(cooname, coo.join(','), 24 * 30, 'finance.sina.com.cn');
    });
} 
});

/* list */
window.seajs && seajs.use('water_news');

/* bookmark */
jsLoader({ url: ARTICLE_JSS.$, callback: function() {
    var addToBookmark = (function() {
        try {
            if (window.sidebar && sidebar.addPanel) {
                return function(title, url) {
                    window.sidebar.addPanel(title || document.title, url || location.href, '');
                }
            }
            if (window.external && external.addFavorite) {
                return function(title, url) {
                    window.external.addFavorite(url, title);
                }
            }
            return function() {
                alert('请同时按住Ctrl + D 将本页面设为书签，以便快速了解最新资讯');
            }
        } catch (e) {
            return function() {
                alert('请同时按住Ctrl + D 将本页面设为书签，以便快速了解最新资讯');
            }
        }
    })();
    $(document.body).delegate('.btn_bookmark', 'click', function(e) {
        e.preventDefault();
        var t = $(this);
        addToBookmark(t.attr('bookmarktitle'), t.attr('bookmarkurl'));
    });
} 
});

/* myurl */
jsLoader({ url: ARTICLE_JSS.SFP }).jsLoader({ url: ARTICLE_JSS.$, callback: function() {
    var w = $('#myurl'),
		c = $('#myurl_c'),
		y = $('#myurl_layer'),
		f = $('#myurl_layer_form'),
		fu = $('#myurl_url'),
		fc = $('#myurl_name'),
		rUrl = /^https?\:\/\/[^\.]+\.[^\.]+/i,
		api = 'http://stock.finance.sina.com.cn/portfolio/api/json.php/PortfolioInterfaceService.userColManage',
		temp = '<p><a href="%url%" target="_blank" title="%cname%">%scname%</a><a href="javascript:;" title="删除" class="myurl_del" url="%url%" cname="%cname%"></a></p>',
		sfp = new SFP('stock'),
		add = function(cname, url) {
		    sfp.parseCMD('post', {
		        url: api,
		        data: {
		            action: 'ins',
		            name: cname,
		            url: url
		        }
		    }, MYURL.addCallback);
		},
		del = function(cname, url) {
		    sfp.parseCMD('post', {
		        url: api,
		        data: {
		            action: 'del',
		            name: cname,
		            url: url
		        }
		    }, MYURL.delCallback);
		},
		get = function() {
		    sfp.parseCMD('get', {
		        url: api,
		        data: {}
		    }, MYURL.getCallback);
		};
    window.MYURL = {
        reload: get,
        addCallback: function(s) {
            s = eval('(' + s + ')');
            if (s && s.result === 1100) {
                get();
            }
        },
        delCallback: function(s) {
            s = eval('(' + s + ')');
            if (s && s.result === 1100) {
                get();
            }
        },
        getCallback: function(s) {
            s = eval('(' + s + ')');
            c.html('');
            if (!s || !s.data || s.data.splice) {
                $('.icon_del', w).hide();
                return;
            }
            $('.icon_del', w).show();
            var datas = s.data,
				f = document.createDocumentFragment(),
				p, ac, ad, k,
				n = 0,
				d, url, cname, scname;
            for (k in datas) {
                d = datas[k];
                cname = d['name'];
                scname = cname.slice(0, 8);
                url = d['url'];
                if (n < 20 && cname && url) {
                    p = document.createElement('p');
                    ac = document.createElement('a');
                    ad = document.createElement('a');
                    ac.href = url;
                    ac.target = 'blank';
                    ac.title = cname;
                    ac.appendChild(document.createTextNode(scname));
                    ad.href = 'javascript:;';
                    ad.title = '删除';
                    ad.className = 'myurl_del';
                    ad.setAttribute('url', url);
                    ad.setAttribute('cname', cname);
                    p.appendChild(ac);
                    p.appendChild(ad);
                    f.appendChild(p);
                    n++;
                }
            }
            c.append(f);
        }
    };

    w.delegate('.icon_del', 'click', function(e) {
        var p;
        if (window.SINA_OUTLOGIN_LAYER && SINA_OUTLOGIN_LAYER.isLogin()) {
            c.toggleClass('myurl_c_open');
        } else {
            p = $(this).offset();
            c.removeClass('myurl_c_open');
            SINA_OUTLOGIN_LAYER.set('plugin', {
                parentNode: document.body,
                position: 'custom'
            }).set('styles', {
                top: p.top - 40 + 'px',
                left: p.left + 'px'
            }).init().show();
        }
    });

    w.delegate('.icon_edit', 'click', function(e) {
        if ($('p', c).length >= 20) {
            alert('最多添加20个网址');
            return false;
        }
        var p;
        if (window.SINA_OUTLOGIN_LAYER && SINA_OUTLOGIN_LAYER.isLogin()) {
            w.toggleClass('myurl_open');
            fu.val('');
            fc.val('');
        } else {
            p = $(this).offset();
            w.removeClass('myurl_open');
            SINA_OUTLOGIN_LAYER.set('plugin', {
                parentNode: document.body,
                position: 'custom'
            }).set('styles', {
                top: p.top - 40 + 'px',
                left: p.left + 'px'
            }).init().show();
        }
    });

    $(document.body).on('click', function(e) {
        var t = e.target;
        if (!t.nodeName) { t = t.parentNode; }
        if ($(t).hasClass('icon_edit')) {
            c.toggleClass('myurl_open');
            return;
        }
        if (!$.contains(y[0], t)) {
            w.removeClass('myurl_open');
        }
    });

    y.delegate('.myurl_layer_h a', 'click', function(e) {
        w.removeClass('myurl_open');
    });

    c.delegate('.myurl_del', 'click', function(e) {
        var t = $(this),
			cname = t.attr('cname'),
			url = t.attr('url');
        del(cname, url);
    });

    f.on('submit', function(e) {
        var url = $.trim(fu.val()),
			cname = $.trim(fc.val());
        if (!url) {
            fu.focus();
            return false;
        }
        if (!rUrl.test(url)) {
            alert('请以 http:// 或者 https:// 开头输入完整的网址');
            fu.focus();
            return false;
        }
        if (!cname) {
            fc.focus();
            return false;
        }
        add(cname, url);

        w.removeClass('myurl_open');

        return false;
    });

    get();
} 
});

/* catenav & setting */
jsLoader({ url: ARTICLE_JSS.cookie }).jsLoader({ url: ARTICLE_JSS.$, callback: function() {

    var w = $('#layer_setting'),
		wm = $('#layer_mask'),
		wTipbtn = $('#p01_r00_lab_add_close'),
		wNav = $('#p01_r00_lab_l'),
		wNavmore = $('#p01_r00_lab_more'),
		wNavmored = $('div', wNavmore),
		wCont = $('.p01_r00_cont'),
		wLeft = $('#p01_r00_cont_l'),
		wMid = $('#p01_r00_cont_m'),
		wRight = $('#p01_r00_cont_r'),
		FINCates = window.FINCates || {},
		wChoice = $('.layer_setting_choice', w),
		wChoosed = $('.layer_setting_choosed div', w),
		tItem = '<span><a href="javascript:;" class="layer_setting_items" cateid="%cateid%">%catetitle%</a></span>',
		tNavitem = '<a href="javascript:;" class="catenavitem risk_lvl%catelvl%" cateid="%cateid%">%catetitle%</a>',
		tNavmore = '<a href="javascript:;" class="p01_r00_lab_more_a" cateid="%cateid%">%catetitle%</a>',
		defaultCateid = '11,5,6,13,4,18,9,1,2',
		select = function(cateid) {
		    var s = FINCates[cateid] || [],
				d, catetitle;
		    $('.layer_setting_items[cateid="' + cateid + '"]', wChoice).addClass('selected');
		    catetitle = s[0];
		    if (!catetitle) { return; }
		    d = $(tItem.replace(/%cateid%/, cateid).replace(/%catetitle%/, catetitle));
		    wChoosed.append(d);
		},
		unselect = function(cateid) {
		    var s = FINCates[cateid] || [],
				d, catetitle;
		    if ($('.selected', wChoice).length <= 1) { return; }
		    $('.layer_setting_items[cateid="' + cateid + '"]', wChoice).removeClass('selected');
		    $('.layer_setting_items[cateid="' + cateid + '"]', wChoosed).parent().remove();
		},
		paint = function() {
		    var fincates = cookie.get('fincates'),
				l, i;
		    wChoosed.empty();
		    $('.layer_setting_items', wChoice).removeClass('selected');
		    if (!fincates) { fincates = defaultCateid; }
		    fincates = fincates.split(',');
		    fincates.sort(function(a, b) {
		        var at = FINCates[a][1] || 0,
					bt = FINCates[b][1] || 0;
		        return at - bt;
		    });
		    l = fincates.length;
		    for (i = 0; i < l; i++) {
		        select(fincates[i]);
		    }
		},
		show = function() {
		    paint();
		    w.fadeIn();
		    wm.show();
		},
		hide = function() {
		    w.fadeOut();
		    wm.hide();
		},
		paintCatenav = function() {
		    paintCont(11);
		    uaTrack(11);
		    var cates = (cookie.get('fincates') || defaultCateid).split(','),
				l = cates.length,
				h = [],
				i, d, cateid, catelvl, catetitle;
		    cates.sort(function(a, b) {
		        var at = FINCates[a][1] || 0,
					bt = FINCates[b][1] || 0;
		        return at - bt;
		    });
		    wNav.addClass('p01_r00_lab_l_withwidth');
		    for (i = 0; i < l; i++) {
		        cateid = cates[i];
		        d = FINCates[cateid];
		        if (d && d[0]) {
		            h.push(tNavitem.replace(/%cateid%/, cateid).replace(/%catetitle%/, d[0]).replace(/%catelvl%/, parseInt(d[1] || '1')));
		        }
		    }
		    wNav.html(h.join(''));
		    wNavmore.hide();
		    var as = $('.catenavitem', wNav),
				al = as.length,
				ah = [],
				wh = [],
				awww = w.clientWidth,
				aww = as[0].offsetWidth,
				af = as[0].offsetTop,
				ak, an, asw, aow;
		    for (ak = 1; ak < al; ak++) {
		        if (as[ak].offsetTop > af) {
		            an = ak;
		            asw = aow = as[ak - 1].offsetWidth;
		            break;
		        }
		        aww = aww + as[ak].offsetWidth;
		    }
		    if (!an) {
		        tab($($('.catenavitem', wNav)[0]));
		        return;
		    }
		    for (ak = an; ak < al; ak++) {
		        asw = Math.max(asw, as[ak].offsetWidth);
		    }
		    if (asw && aow && awww < aww - aow + asw) {
		        an = an - 1;
		    }
		    if (an && an > 0) {
		        for (ak = 0; ak < an; ak++) {
		            c = cates[ak];
		            d = FINCates[c];
		            if (d && d[0]) {
		                ah.push(tNavitem.replace(/%cateid%/, c).replace(/%catetitle%/, d[0]).replace(/%catelvl%/, parseInt(d[1] || '1')));
		            }
		        }
		        for (ak = an; ak < al; ak++) {
		            c = cates[ak];
		            d = FINCates[c];
		            if (d && d[0]) {
		                wh.push(tNavmore.replace(/%cateid%/, c).replace(/%catetitle%/, d[0]));
		            }
		        }
		        wNav.html(ah.join(''));
		        wNavmored.html(wh.join(''));
		        wNavmore.show();
		        wNav.removeClass('p01_r00_lab_l_withwidth');
		    }
		    tab($($('.catenavitem', wNav)[0]));
		},
		tab = function(t) {
		    var cateid = t.attr('cateid');
		    if (!cateid) { return; }
		    $('.catenavitem', wNav).removeClass('selected');
		    t.addClass('selected');
		    if (window.ppaslide) {
		        ppaslide.autoPlay = false;
		        ppaslide.disableAuto();
		        ppaslide = null;
		    }
		    paintCont(cateid);
		    uaTrack(cateid);
		},
		paintCont = function(cateid) {
		    var data = (FINCates[cateid] || ['', '', false])[2];
		    if (!data) { return; }
		    wLeft.attr('data-sudaclick', cateid + '_leftdiv');
		    wMid.attr('data-sudaclick', cateid + '_centerdiv');
		    wRight.attr('data-sudaclick', cateid + '_rightdiv');
		    wLeft.html(data['dataLeft']) || '';
		    wMid.html(data['dataMid'] || '');
		    wRight.html(data['dataRight'] || '');
		    hqLoader && hqLoader.register('ppa_datablk01_dcode', 5e3);
		    if (typeof data['callback'] === 'function') {
		        data.callback();
		    }
		};
    wChoice.delegate('.layer_setting_items', 'click', function(e) {
        var t = $(this),
			cateid = t.attr('cateid');
        if (t.hasClass('selected')) {
            unselect(cateid);
        } else {
            select(cateid);
        }
    });
    wChoosed.delegate('.layer_setting_items', 'click', function(e) {
        var t = $(this),
			cateid = t.attr('cateid');
        unselect(cateid);
    });
    w.delegate('.layer_setting_cancel', 'click', function(e) {
        hide();
    });
    w.delegate('.layer_setting_save', 'click', function(e) {
        var es = $('.layer_setting_items', wChoosed),
			cates = [];
        es.each(function() {
            var cateid = $(this).attr('cateid');
            cates.push(cateid);
        });
        cookie.set('fincates', cates.join(','), 24 * 365, 'finance.sina.com.cn');
        hide();
        paintCatenav();
    });
    $(document.body).delegate('.p01_r00_lab_btn', 'click', function(e) {
        if (w.is(':visible')) { hide(); }
        else { show(); }
    });
    wNav.delegate('.catenavitem', 'click', function(e) {
        e.preventDefault();
        var t = $(this);
        if (t.hasClass('selected')) { return; }
        tab(t);
    });
    wCont.delegate('.ppa_datablk01_t .ppa_datablk01_chg', 'click', function(e) {
        var t = $(this).parents('.ppa_datablk01');
        if (t) { t.removeClass('ppa_datablk01_t_price'); }
    });
    wCont.delegate('.ppa_datablk01_t .ppa_datablk01_price', 'click', function(e) {
        var t = $(this).parents('.ppa_datablk01');
        if (t) { t.addClass('ppa_datablk01_t_price'); }
    });
    wCont.delegate('.ppa_tab a', 'click', function(e) {
        var t = $(this),
			labs = $('.ppa_tab a', wCont),
			conts = $('.ppa_cont'),
			index = labs.index(t);
        labs.removeClass('selected');
        conts.hide();
        t.addClass('selected');
        $(conts[index]).show();
    });
    $(document.body).on('click', function(e) {
        var t = $(e.target);
        if (t[0] === wNavmore[0] || $.contains(wNavmore[0], t[0]) && !wNavmore.hasClass('p01_r00_lab_more_open')) {
            wNavmore.addClass('p01_r00_lab_more_open');
        } else {
            wNavmore.removeClass('p01_r00_lab_more_open');
        }
    });
    wNavmore.delegate('.p01_r00_lab_more_a', 'click', function() {
        var t = $(this),
			cateid = t.attr('cateid'),
			catetitle = (FINCates[cateid] || ['', ''])[0],
			nts = $('.catenavitem', wNav),
			ntl = nts.length,
			nt = $(nts[ntl - 1]),
			isSelected = nt.hasClass('selected'),
			ncateid = nt.attr('cateid'),
			ncatetitle = (FINCates[ncateid] || ['', ''])[0],
			p = t.parent(),
			nn, aa, i;
        if (catetitle && ncatetitle) {
            nt.attr('cateid', cateid);
            nt.html(catetitle);
            t.remove();
            na = $(tNavmore.replace(/%cateid%/, ncateid).replace(/%catetitle%/, ncatetitle));
            p.prepend(na);
        }
        wNavmore.removeClass('p01_r00_lab_more_open');
        tab(nt);
    });
    (function() {
        var coo = cookie.get('isaddtipclosed'),
			p;
        if (coo) { return; }
        p = wTipbtn.parents('p');
        p.show();
        wTipbtn.on('click', function() {
            p.hide();
            cookie.set('isaddtipclosed', 1, 24 * 365, 'finance.sina.com.cn');
        });
    })();
    paintCatenav();
}
});

