package com.bgs.pojo;

import lombok.Data;

@Data
public class PaperQuestions {

  private Integer id;
  private Integer paperId;
  private String questionsId;
  private Integer questionsScore;
  private Integer userId;
  private Integer index;
  private String href;
  private String createTime;
  private AllQuestions allQuestions;

}
