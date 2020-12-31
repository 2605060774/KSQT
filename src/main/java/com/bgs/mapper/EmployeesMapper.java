package com.bgs.mapper;

import com.bgs.pojo.PaperQuestions;
import com.bgs.pojo.UserPaper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface EmployeesMapper {

    List<UserPaper> userpapeInfo(@Param("startTime") String startTime,@Param("endTime") String endTime);


    List<PaperQuestions> infoPaperQuestions(@Param("id") int paperId);
}
