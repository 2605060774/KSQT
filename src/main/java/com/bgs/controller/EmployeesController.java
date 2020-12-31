package com.bgs.controller;

import com.bgs.pojo.PaperQuestions;
import com.bgs.pojo.UserPaper;
import com.bgs.service.EmployeesService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/Employees")
public class EmployeesController {

    @Resource
    private EmployeesService employeesService;

//成绩列表展示
    @RequestMapping("/userpapeInfo")
    @ResponseBody
    public List<UserPaper> userpapeInfo(String startTime,String endTime){
        System.out.println(startTime);
        System.out.println(endTime);
    return employeesService.userpapeInfo(startTime,endTime);
}

//正确答案展示1
    @ResponseBody
    @RequestMapping("/infoPaperQuestions")
    public List<PaperQuestions> infoPaperQuestions(@RequestBody Map<String,String> map) {

        int paperId = Integer.parseInt(map.get("paperId"));
        List<PaperQuestions> paperQuestions=employeesService.infoPaperQuestions(paperId);
        return paperQuestions;
    }



}
