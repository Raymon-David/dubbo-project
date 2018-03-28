package com.foryou.consumer.controller.charts;

import com.foryou.consumer.process.user.UserProcess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping(value = "/charts")
public class ContractCountController {

    @Autowired
    private UserProcess userProcess;


    @RequestMapping(value ="/contractCount", method = RequestMethod.GET)
    @ResponseBody
    public void hello(HttpServletRequest request, HttpServletResponse response){
        System.out.println("contractCount");
    }
}
