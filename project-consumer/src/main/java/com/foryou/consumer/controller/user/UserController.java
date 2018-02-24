package com.foryou.consumer.controller.user;

import com.foryou.consumer.process.user.UserProcess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping(value = "/user")
public class UserController {

//    @Resource(name = "UserProcess")
    @Autowired
    private UserProcess userProcess;


    @RequestMapping(value ="/hello", method = RequestMethod.GET)
    @ResponseBody
    public String hello(){
        System.out.println("sdafadsf675878745784876");
        return "hello world";
    }

    @RequestMapping(value = "/login")
    public void UserLogin(HttpServletRequest request, HttpServletResponse response, String callback,
                          @RequestParam String json
    ) throws Exception{
        System.out.println("sdafadsf66666666666666");
        System.out.printf("json is : %s", json);
        userProcess.login(request, response, callback, json);
    }
}
