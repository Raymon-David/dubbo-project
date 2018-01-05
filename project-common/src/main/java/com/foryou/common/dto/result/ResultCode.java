package com.foryou.common.dto.result;

/**
 * 通用请求返回码
 */
public enum ResultCode {

    SUCCESS("0000", "成功"),

    UNKNOWN_ERROR("0001", "未知错误"),

    ACCESS_DENID("0002", "访问受限"),

    PARAM_ERROR("0003", "参数错误"),

    DATA_NOT_EXIST("0011", "数据不存在"),

    DATA_ERROR("0012", "数据异常"),

    SYSTEM_ERROR("9999", "系统错误");

    private String code;

    private String message;

    ResultCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public static ResultCode errorOf(String code) {
        for (ResultCode en : values()) {
            if (en.getCode().equals(code)) {
                return en;
            }
        }
        return null;
    }
}
