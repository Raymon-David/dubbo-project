package com.foryou.consumer.util;

import ch.qos.logback.classic.gaffer.PropertyUtil;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

public class PropertyMapUtil {

    private static PropertyMapUtil mapUtil = new PropertyMapUtil();
    private static String fileName = "systemConfig.properties";
    /**
     * 属性文件内存map缓存
     */
    private static Map<String,String> proMap =null;

    private static void init(){
        proMap = new HashMap<String,String>();
        if(null == fileName){
            return;
        }
        if(fileName.indexOf(".properties")<0){
            fileName = fileName + ".properties";
        }
        InputStream in = null;
        try {
            in = PropertyUtil.class.getResourceAsStream("/"+fileName);
            Properties pro = new Properties();
            pro.load(in);
            Set<Object> proSetKey = pro.keySet();
            if(null!=proSetKey){
                Iterator<Object> it = proSetKey.iterator();
                while(it.hasNext()){
                    String key = it.next().toString();
                    String value = pro.getProperty(key);
                    proMap.put(key, value);
                }
            }
        } catch (FileNotFoundException ex) {
            ex.printStackTrace();
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            try {
                in.close();
            } catch (IOException ex1) {
                ex1.printStackTrace();
            }
        }
    }


    /**
     * 私有化默认构造函数
     */
    private PropertyMapUtil(){}
    /**
     *
     * @return
     */
    public static PropertyMapUtil getInstance(){
        if(null==proMap){
            init();
        }
        return mapUtil;
    }

    public Map<String,String> getProMap(){
        return proMap;
    }
}
