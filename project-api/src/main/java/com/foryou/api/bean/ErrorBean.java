package com.foryou.api.bean;

import com.foryou.api.bean.error.ErrorInfo;

public class ErrorBean {
    private ErrorInfo error;

    public ErrorInfo getError() {
        return error;
    }

    public void setError(ErrorInfo error) {
        this.error = error;
    }
}
