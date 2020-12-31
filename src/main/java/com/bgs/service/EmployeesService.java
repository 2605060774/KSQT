package com.bgs.service;

import com.bgs.pojo.PaperQuestions;
import com.bgs.pojo.UserPaper;

import java.util.List;
import java.util.Map;

public interface EmployeesService {
    List<UserPaper> userpapeInfo(String startTime,String endTime);
/*展示*/
    List<PaperQuestions> infoPaperQuestions(int paperId);
}
