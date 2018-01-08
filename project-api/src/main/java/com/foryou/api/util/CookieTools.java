package com.foryou.api.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieTools {
    /**写cookie*/
    public static void setCookie(String key,String value,HttpServletResponse response){
        setCookie(key,value,null,response);
    }
    public static void setCookie(String key,String value,Integer time,HttpServletResponse response){
        Cookie cookie = new Cookie(key,value);
        cookie.setPath("/");
        if(time!=null) {
            cookie.setMaxAge(time);
        }
        response.addCookie(cookie);
    }

    public static void setCookie(String key,String value,Integer time,String path,HttpServletResponse response){
        Cookie cookie = new Cookie(key,value);
        cookie.setPath(path+"/");
        if(time!=null) {
            cookie.setMaxAge(time);
        }
        response.addCookie(cookie);
    }
    public static void setCookie(String key,String value,Integer time,String path,String domain,HttpServletResponse response){
        Cookie cookie = new Cookie(key,value);
        cookie.setPath(path+"/");
        cookie.setDomain(domain);
        if(time!=null) {
            cookie.setMaxAge(time);
        }
        response.addCookie(cookie);
    }
    /**获取cookie*/
    public static String getCookieValue(String key,HttpServletRequest request){
        if( request.getCookies() != null){
            for(Cookie cookie : request.getCookies()){
                if(cookie.getName().equals(key)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    /**删除cookie*/
    public static void deleteCooke(String key,HttpServletResponse response){
        Cookie cookie = new Cookie(key,null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    /**
     * 删除cookie
     * @author
     * @date 2015-6-23
     */
    public static void deleteCooke(String key,String doMain,HttpServletResponse response){
        Cookie cookie = new Cookie(key,null);
        cookie.setMaxAge(0);//设置生命周期
        cookie.setPath("/");//可在同一应用服务器内共享cookie
        cookie.setDomain(doMain);//跨域共享cookie
        response.addCookie(cookie);
    }
}
