package com.bgs.mapper;

import com.bgs.pojo.PaperQuestions;
import com.bgs.pojo.User;
import com.bgs.pojo.UserPaper;
import com.bgs.pojo.UserQuestions;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DongMapper {
    User selUserInfoByName(User user);

    List<UserPaper> listPaper(@Param("id")Integer userId);

    List<PaperQuestions> listPaperQuestions(@Param("id")int paperId);

    void addUserQuestions(List<UserQuestions> ts);

    void updPaper(@Param("score")Integer score,@Param("userId") Integer userId,@Param("paperId") Integer paperId);
}
