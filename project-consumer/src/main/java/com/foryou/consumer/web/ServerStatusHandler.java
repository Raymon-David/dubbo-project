package com.foryou.consumer.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 服务状态
 */
@Controller
public class ServerStatusHandler implements HttpRequestHandler {

    @Override
    @RequestMapping(value = "/state")
    public void handleRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("asdfdasfa");
        response.getWriter().append("success");
    }
}
