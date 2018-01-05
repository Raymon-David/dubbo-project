package com.foryou.server.web;

import com.foryou.server.service.biz.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
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

    @Autowired
    private DatabaseService databaseService;

    @Override
    @RequestMapping("/state")
    public void handleRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (StringUtils.isEmpty(databaseService.getDatabaseName())) {
            response.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
        } else {
            response.getWriter().append("success");
        }
    }
}
