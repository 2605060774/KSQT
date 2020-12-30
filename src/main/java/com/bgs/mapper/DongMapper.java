package com.bgs.mapper;

import com.bgs.pojo.PaperQuestions;
import com.bgs.pojo.User;
import com.bgs.pojo.UserPaper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DongMapper {
    User selUserInfoByName(User user);

    List<UserPaper> listPaper(@Param("id")Integer userId);

    List<PaperQuestions> listPaperQuestions(@Param("id")int paperId);
}
