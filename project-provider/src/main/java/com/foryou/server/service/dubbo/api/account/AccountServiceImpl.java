package com.foryou.server.service.dubbo.api.account;

import com.alibaba.dubbo.config.annotation.Service;
import com.foryou.api.account.AccountQueryPageRequest;
import com.foryou.api.account.AccountService;
import com.foryou.common.dto.request.Request;
import com.foryou.common.dto.result.PagedResult;
import com.foryou.common.dto.result.Result;
import com.foryou.server.service.biz.AccountBizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountBizService accountBizService;

    /**
     * 通过id查询名称
     *
     * @param request
     * @return
     */
    @Override
    public Result<String> queryNameById(Request<Integer> request) {
        // TODO 参数校验
        return accountBizService.queryNameById(request);
    }

    /**
     * 分页查询名字
     *
     * @param pagedRequest
     * @return
     */
    @Override
    public PagedResult<String> queryNamesPaging(AccountQueryPageRequest pagedRequest) {
        // TODO 参数校验
        return accountBizService.queryNamesPaging(pagedRequest);
    }
}
