package com.foryou.server.service.biz;

import com.foryou.api.account.AccountQueryPageRequest;
import com.foryou.common.dto.request.Request;
import com.foryou.common.dto.result.PagedResult;
import com.foryou.common.dto.result.Result;
import com.foryou.server.dao.entity.Account;

/**
 * 服务接口业务逻辑
 */
public interface AccountBizService {

    int insert(Account account);

    Result<String> queryNameById(Request<Integer> request);

    PagedResult<String> queryNamesPaging(AccountQueryPageRequest pagedRequest);
}
