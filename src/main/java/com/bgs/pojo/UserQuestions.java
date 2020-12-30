package com.bgs.pojo;

import lombok.Data;

@Data
public class UserQuestions {

  private Integer id;
  private Integer userId;
  private Integer paperId;
  private String questionsId;
  private String choiceAnswerIds;
  private String fillAnswers;
  private String shortAnswer;
  private String judgeAnswer;
  private Integer score;
  private String createTime;

}
