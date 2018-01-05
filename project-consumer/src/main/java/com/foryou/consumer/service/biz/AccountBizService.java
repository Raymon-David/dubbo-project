package com.foryou.consumer.service.biz;

import com.foryou.api.account.AccountQueryPageRequest;
import com.foryou.common.dto.request.Request;
import com.foryou.common.dto.result.PagedResult;
import com.foryou.common.dto.result.Result;

public interface AccountBizService {

    Result<String> queryNameById(Request<Integer> request);

    PagedResult<String> queryNamesPaging(AccountQueryPageRequest pagedRequest);
}
