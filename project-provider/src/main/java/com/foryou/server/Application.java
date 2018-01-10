package com.foryou.server;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * 程序启动入口
 */
@SpringBootApplication
@EnableTransactionManagement
@MapperScan("com.foryou.server.dao.mapper")
public class Application {

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }
}
