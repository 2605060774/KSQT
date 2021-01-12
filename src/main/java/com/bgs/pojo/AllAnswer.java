package com.bgs.pojo;

import lombok.Data;

import java.util.List;

@Data
public class AllAnswer {

  private String answerId;
  private String content;
  private Integer answerIndex;
  private String questionsId;
  private Integer userId;
  private String createTime;

}
