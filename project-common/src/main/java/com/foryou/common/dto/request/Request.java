package com.foryou.common.dto.request;

/**
 * 请求类
 *
 * @param <T>
 */
public class Request<T> extends BaseRequest {

    private static final long serialVersionUID = 1L;

    /**
     * 请求数据，可为基本类型（包装类），可以为其它可序列化对象
     */
    private T data;

    public Request() {
    }

    public Request(T data) {
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Request<T> ssid(String sid) {
        super.setSsid(sid);
        return this;
    }

    public Request<T> sourceIp(String sourceIp) {
        super.setSourceIp(sourceIp);
        return this;
    }

    public Request<T> data(T data) {
        this.setData(data);
        return this;
    }

    public static <T> Request<T> create() {
        Request<T> result = new Request<>();
        return result;
    }
}
