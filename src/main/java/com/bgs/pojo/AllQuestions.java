package com.bgs.pojo;

import lombok.Data;

import java.util.List;

@Data
public class AllQuestions {

  private String questionsId;
  private String questions;
  private String answer;
  private Integer type;
  private Integer judgeAnswer;
  private String answerIds;
  private Integer difficulty;
  private Integer isShare;
  private Integer userId;
  private Integer quantity;
  private String createTime;
  private List<AllAnswer> allAnswers;

}
