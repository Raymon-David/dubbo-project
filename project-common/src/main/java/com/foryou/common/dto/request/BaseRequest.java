package com.foryou.common.dto.request;

import java.io.Serializable;

/**
 * 基础请求类
 */
public class BaseRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 请求标识号
     */
    private String ssid;

    /**
     * 请求来源ip
     */
    private String sourceIp;

    public BaseRequest() {
    }

    public String getSsid() {
        return ssid;
    }

    public void setSsid(String ssid) {
        this.ssid = ssid;
    }

    public String getSourceIp() {
        return sourceIp;
    }

    public void setSourceIp(String sourceIp) {
        this.sourceIp = sourceIp;
    }
}
