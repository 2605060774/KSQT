package com.bgs.pojo;

import lombok.Data;

@Data
public class UserPaper {

  private Integer id;
  private Integer userId;
  private Integer paperId;
  private String paperName;
  private Integer totalScore;
  private Integer passScore;
  private Integer entries;
  private Integer status;
  private String subjectiveScores;
  private String objectiveScore;
  private String startTime;
  private String endTime;
  private String createTime;


}
