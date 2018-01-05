package com.foryou.consumer.service.biz.impl;

import com.foryou.api.account.AccountQueryPageRequest;
import com.foryou.common.dto.request.Request;
import com.foryou.common.dto.result.PagedResult;
import com.foryou.common.dto.result.Result;
import com.foryou.consumer.service.biz.AccountBizService;
import com.foryou.consumer.service.dubbo.DubboSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountBizServiceImpl implements AccountBizService {

    @Autowired
    private DubboSupport dubboSupport;

    @Override
    public Result<String> queryNameById(Request<Integer> request) {
        return dubboSupport.accountService.queryNameById(request);
    }

    @Override
    public PagedResult<String> queryNamesPaging(AccountQueryPageRequest pagedRequest) {
        return dubboSupport.accountService.queryNamesPaging(pagedRequest);
    }
}
