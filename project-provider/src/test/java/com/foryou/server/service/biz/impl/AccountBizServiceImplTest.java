package com.foryou.server.service.biz.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.foryou.api.account.AccountQueryPageRequest;
import com.foryou.common.dto.request.Request;
import com.foryou.common.dto.result.PagedResult;
import com.foryou.common.dto.result.Result;
import com.foryou.server.ApplicationTests;
import com.foryou.server.dao.entity.Account;
import com.foryou.server.service.biz.AccountBizService;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

import static org.junit.Assert.*;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class AccountBizServiceImplTest extends ApplicationTests {

    private static int id = 0;
    @Autowired
    private AccountBizService accountBizService;

    @Test
    public void test01_insert() throws Exception {
        Account account = new Account();
        account.setName(UUID.randomUUID().toString());

        int insertCount = accountBizService.insert(account);
        assertTrue(insertCount > 0);
        id = account.getId();
    }

    @Test
    public void test02_queryNameById() throws Exception {
        Request<Integer> request = Request.create();
        request.setSsid(UUID.randomUUID().toString());
        request.setData(id);

        Result<String> result = accountBizService.queryNameById(request);
        assertTrue(result.getDescription(), result.isSuccess());
        logger.info("\nresult = {}", JSON.toJSONString(result, SerializerFeature.PrettyFormat, SerializerFeature.WriteMapNullValue));
    }

    @Test
    public void test03_queryNamesPaging() throws Exception {
        AccountQueryPageRequest pagedRequest = new AccountQueryPageRequest();
        pagedRequest.setSsid(UUID.randomUUID().toString());
        pagedRequest.setFetchAll(true);
        pagedRequest.setId(id);

        PagedResult<String> pagedResult = accountBizService.queryNamesPaging(pagedRequest);
        assertTrue(pagedResult.getDescription(), pagedResult.isSuccess());
        logger.info("\npagedResult = {}", JSON.toJSONString(pagedResult, SerializerFeature.PrettyFormat, SerializerFeature.WriteMapNullValue));
    }
}