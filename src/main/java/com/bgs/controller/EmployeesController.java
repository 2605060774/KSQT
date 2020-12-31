package com.bgs.controller;

import com.bgs.pojo.UserPaper;
import com.bgs.service.EmployeesService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Employees")
public class EmployeesController {

    @Resource
    private EmployeesService employeesService;

    @RequestMapping("/userpapeInfo")
    @ResponseBody
    public List<UserPaper> userpapeInfo(String startTime,String endTime){
        System.out.println(startTime);
        System.out.println(endTime);
    return employeesService.userpapeInfo(startTime,endTime);
}





}
