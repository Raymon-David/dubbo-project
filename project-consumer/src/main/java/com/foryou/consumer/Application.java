package com.foryou.consumer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * 程序启动入口
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.foryou.consumer.process" , "com.foryou.consumer.controller"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
