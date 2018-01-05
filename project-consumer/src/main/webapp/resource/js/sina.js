//js异步加载管理 v1.1.0
eval(function(p, a, c, k, e, r) { e = function(c) { return (c < 62 ? '' : e(parseInt(c / 62))) + ((c = c % 62) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function(e) { return r[e] || e } ]; e = function() { return '[4-9abfgj-vx-zA-R]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p } ('(9(){b w=g,d=document,u=\'1.1.0\',7={},j=0,cbkLen=0;5(w.k){5(w.k.u>=u){o};7=w.k.K();j=7.j};b addEvent=9(x,B,C){5(x.L){x.L("on"+B,C)}m{x.addEventListener(B,C,false)}};9 M(a,D,s){b l=d.createElement("script");l.type="text/javascript";5(s){l.s=s};l.N=l.y=9(){5(!g.E||g.E=="loaded"||g.E=="complete"){5(D){D()};l.N=l.y=null;l.parentNode.removeChild(l)}};l.src=a;b h=d.getElementsByTagName("head")[0];h.insertBefore(l,h.firstChild)};b v=9(4,a){g.4=4;g.a=a;g.6=[]};v.prototype={f:\'O\',y:9(){g.f=\'F\';b z=[];P(b i=0;i<g.6.j;i++){5(n g.6[i]==\'9\'){try{g.6[i]()}catch(e){z.A(e)}}};g.6=[];5(z.j!=0){throw z[0]}}};b k=9(q,t){b 8={};5(p.j==3){8.4=p[0];8.a=p[1];8.6=p[2]}m 5(n q===\'Q\'){8.a=q;5(n t===\'9\'){8.6=t}}m{8=q};b a=8.a||"",4=8.4||"",6=8.6||"",s=8.s||"";b r={4:4,k:9(q,t){b agms=p;b 8={};5(p.j==3){8.4=p[0];8.a=p[1];8.6=p[2]}m 5(n q===\'Q\'){8.a=q;5(n t===\'9\'){8.6=t}}m{8=q};5(!8.4){8.4=\'R\'+j;j++};b c=k({4:g.4,6:9(){k(8)}});c.4=8.4;o c}};5(4){5(!7[4]){5(!a){7[4]=G v(4);7[4].f=\'H\'}m{7[4]=G v(4,a)};j++}m 5(7[4].f==\'H\'&&a){7[4].f=\'O\'};5(8.f){7[4].f=8.f};5(7[4].f==\'I\'||7[4].f==\'H\'){5(n 6==\'9\'){7[4].6.A(6)};o r}m 5(7[4].f==\'F\'){5(n 6==\'9\'){6()};o r}}m{5(!a){o r};P(b J in 7){5(7[J].a==a){4=J;break}};5(!4){4=\'R\'+j;7[4]=G v(4,a);j++};r.4=4;5(7[4].f==\'I\'){5(n 6==\'9\'){7[4].6.A(6)};o r}m 5(7[4].f==\'F\'){5(n 6==\'9\'){6()};o r}};5(n 6==\'9\'){7[4].6.A(6)};M(a,9(){7[4].y()},s);7[4].f=\'I\';o r};w.k=k;w.k.u=u;w.k.K=9(){o 7}})();', [], 54, '||||name|if|callback|data|cfg|function|url|var||||status|this|||length|jsLoader|scriptNode|else|typeof|return|arguments|op|chain|charset|fn|version|JsObj||obj|onload|errors|push|eventType|func|dispose|readyState|ok|new|waiting|loading|item|getData|attachEvent|getScript|onreadystatechange|init|for|string|noname'.split('|'), 0, {}))

try { document.domain = "sina.com.cn"; } catch (e) { }
var ARTICLE_JSS = {
    $: 'http://i0.sinaimg.cn/dy/js/jquery/jquery-1.7.2.min.js',
    common: 'http://finance.sina.com.cn/js/689/2014/0618/lcindex/common.js',
    suggest: 'http://news.sina.com.cn/js/87/20140330/search_suggest.js',
    user_panel: 'http://i.sso.sina.com.cn/js/user_panel.js',
    suggestServer: 'http://finance.sina.com.cn/js/689/2014/0618/lcindex/SuggestServer_gb.js',
    SFP: 'http://finance.sina.com.cn/basejs/proxy_v1.2.js',
    cookie: 'http://finance.sina.com.cn/js/689/2014/0425/lcindex/cookie.js',
    finCodeFormater2: 'http://finance.sina.com.cn/js/689/2014/0506/finCodeFormater2.js',
    abigail: 'http://finance.sina.com.cn/xuan/js/abigail.js',
    flashCanvas: 'http://i1.sinaimg.cn/cj/hsuan/flashcanvas/flashcanvas.js'
};
var FINCates = {
    '11': ['黄金', 3, {
        dataLeft:
       '',
        dataMid:
       '<div class="ppa_datablk01">' +
//              '<div class="ppa_datablk01_c">' + '<p class="clearfix"><a href="#" target="_blank" class="ppa_datablk01_cname fl" title="">&nbsp;</a><span class="ppa_datablk01_chg ppa_datablk01_dcode" >涨幅</span><span class="ppa_datablk01_price ppa_datablk01_dcode">报价</span></p><div class="hxline"></div></div>' +
              '<div class="ppa_datablk01_c">' + '<p class="clearfix"><a href="http://finance.sina.com.cn/money/gold/AUTD/quote.shtml" target="_blank" class="ppa_datablk01_cname fl" title="黄金TD">黄金TD</a><span class="ppa_datablk01_chg ppa_datablk01_dcode" dcode="AUTD" dtype="chg" dcolor="1">--.--</span><span class="ppa_datablk01_price ppa_datablk01_dcode" dcode="AUTD" dtype="price" dcolor="1">--.--</span></p><div class="hxline"></div><p class="clearfix"><a href="http://finance.sina.com.cn/money/gold/AGTD/quote.shtml" target="_blank" class="ppa_datablk01_cname fl" title="白银TD">白银TD</a><span class="ppa_datablk01_chg ppa_datablk01_dcode" dcode="AGTD" dtype="chg" dcolor="1">--.--</span><span class="ppa_datablk01_price ppa_datablk01_dcode" dcode="AGTD" dtype="price" dcolor="1">--.--</span></p><div class="hxline"></div><p class="clearfix"><a href="http://finance.sina.com.cn/futures/quotes/AU0.shtml" target="_blank" class="ppa_datablk01_cname fl" title="黄金期货">黄金期货</a><span class="ppa_datablk01_chg ppa_datablk01_dcode" dcode="AU0" dtype="chg" dcolor="1">--.--</span><span class="ppa_datablk01_price ppa_datablk01_dcode" dcode="AU0" dtype="price" dcolor="1">--.--</span></p><div class="hxline"></div><p class="clearfix"><a href="http://finance.sina.com.cn/futures/quotes/AG0.shtml" target="_blank" class="ppa_datablk01_cname fl" title="白银期货">白银期货</a><span class="ppa_datablk01_chg ppa_datablk01_dcode" dcode="AG0" dtype="chg" dcolor="1">--.--</span><span class="ppa_datablk01_price ppa_datablk01_dcode" dcode="AG0" dtype="price" dcolor="1">--.--</span></p><div class="hxline"></div><p class="clearfix"><a href="http://finance.sina.com.cn/futures/quotes/XAU.shtml" target="_blank" class="ppa_datablk01_cname fl" title="伦敦金">伦敦金</a><span class="ppa_datablk01_chg ppa_datablk01_dcode" dcode="XAU" dtype="chg" dcolor="1">--.--</span><span class="ppa_datablk01_price ppa_datablk01_dcode" dcode="XAU" dtype="price" dcolor="1">--.--</span></p>' +
              '</div>' +
       '</div>',
        dataRight:
       '<div class="ppa_hqimg">' +
              '<div class="ppa_hqimg_p" id="ppa_hqimg_p11"></div>' +
              '<div class="ppa_hqimg_t" id="ppa_hqimg_t11"></div>' +
       '</div>',
        callback: function () {
            window.Poll && Poll.init('ppa_zpd');
            jsLoader(ARTICLE_JSS.abigail, function() {
                new AbiGAil(function(o) {
                    if (o && o.domids && o.domids.main) { document.getElementById(o.domids.main).innerHTML = '您的浏览器不支持相关功能，请使用<a href="http://www.google.cn/intl/zh-CN/chrome/browser/" target="_blank" class="cred">chrome</a> 进行浏览' };
                }, {
                    w: 904,
                    h: 160,
                    initrange: 30,
                    pctonly: true,
                    symbols: [{
                        code: 'hf_AUTD',
                        color: '#c11a4d',
                        name: '黄金TD'
                    }, {
                        code: 'hf_AGTD',
                        color: '#00C1EB',
                        name: '白银TD'
}],
                        commondataurl: 'http://stock2.finance.sina.com.cn/futures/api/jsonp_v2.php/$cb/FuturesHtml5DataService.goldHomePageApiData?symbol=$symbol&dataType=$dataType&dataKind=$dataKind&startTradedate=$from&_=$rn',
                        domids: {
                            main: 'ppa_hqimg_p11',
                            legend: 'ppa_hqimg_t11'
                        }
                    });
                });
            }
}]
        };