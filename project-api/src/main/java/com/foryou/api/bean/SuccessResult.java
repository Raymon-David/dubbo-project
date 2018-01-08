package com.foryou.api.bean;

import com.foryou.api.bean.success.StatusBean;

public class SuccessResult {
    private StatusBean status;

    public StatusBean getStatus() {
        return status;
    }

    public void setStatus(StatusBean status) {
        this.status = status;
    }
}
