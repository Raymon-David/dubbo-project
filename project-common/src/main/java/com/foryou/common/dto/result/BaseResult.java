package com.foryou.common.dto.result;

import java.io.Serializable;

/**
 * 基础结果类
 */
public class BaseResult implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 请求标识号
     */
    private String ssid;

    /**
     * 成功标志
     */
    private boolean success;

    /**
     * 信息码
     */
    private String code;

    /**
     * 描述
     */
    private String description;

    public BaseResult() {
    }

    public String getSsid() {
        return ssid;
    }

    public void setSsid(String ssid) {
        this.ssid = ssid;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
