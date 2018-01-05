package com.foryou.common.dto.result;

/**
 * 结果类
 *
 * @param <T>
 */
public class Result<T> extends BaseResult {

    private static final long serialVersionUID = 1L;

    /**
     * 返回数据，可为基本类型（包装类），可以为其它可序列化对象
     */
    private T data;

    public static <T> Result<T> create() {
        Result<T> result = new Result<>();
        result.setSuccess(false);
        return result;
    }

    public Result<T> success() {
        success(null);
        return this;
    }

    public Result<T> success(T data) {
        setSuccess(true);
        setData(data);
        return this;
    }

    public Result<T> fail(String code, String description) {
        setSuccess(false);
        setCode(code);
        setDescription(description);
        return this;
    }

    public Result<T> ssid(String sid) {
        setSsid(sid);
        return this;
    }

    public Result<T> code(String code) {
        setCode(code);
        return this;
    }

    public Result<T> description(String description) {
        setDescription(description);
        return this;
    }

    public Result<T> data(T data) {
        setData(data);
        return this;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
