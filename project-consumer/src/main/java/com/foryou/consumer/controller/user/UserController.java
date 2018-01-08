package com.foryou.consumer.controller.user;

import com.foryou.consumer.process.user.UserProcess;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping(value = "/user")
public class UserController {

 private UserProcess userProcess;
    @RequestMapping("/login")
    public void UserLogin(HttpServletRequest request, HttpServletResponse response, String callback,
                          @RequestParam String json) throws Exception{
        userProcess.login(request, response, callback, json);
    }
}
