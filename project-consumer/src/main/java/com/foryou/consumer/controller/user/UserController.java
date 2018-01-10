package com.foryou.consumer.controller.user;

import com.foryou.consumer.process.user.UserProcess;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping(value = "/user")
public class UserController {

//    @Resource(name = "UserProcess")
//    private UserProcess userProcess;


    @RequestMapping(value = "/login")
    public void UserLogin(HttpServletRequest request, HttpServletResponse response, String callback,
                          @RequestParam String json
    ) throws Exception{
        System.out.println("sdafadsf");
//        userProcess.login(request, response, callback, json);
    }
}
