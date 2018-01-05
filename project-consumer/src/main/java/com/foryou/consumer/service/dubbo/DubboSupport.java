package com.foryou.consumer.service.dubbo;

import com.alibaba.dubbo.config.annotation.Reference;
import com.foryou.api.account.AccountService;
import org.springframework.stereotype.Component;

/**
 * dubbo 消费者调用支持
 */
@Component
public class DubboSupport {

    @Reference(interfaceName = "com.foryou.api.account.AccountService")
    public AccountService accountService;
}
