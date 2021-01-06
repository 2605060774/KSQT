package com.bgs.pojo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import lombok.Data;

import java.util.Arrays;


@Data
public class UserQuestions {

  private Integer id;
  private Integer userId;
  private Integer paperId;
  private String questionsId;
  private String choiceAnswerIds;
  private String choiceBiaoshi;
  private String fillAnswers;
  private String shortAnswer;
  private String judgeAnswer;
  private Integer score;
  private String createTime;

  public void setChoiceAnswerIds(String[] choiceAnswerIds) {
    StringBuffer sb = new StringBuffer();
    for (int i = 0; i < choiceAnswerIds.length; i++) {
      sb.append(choiceAnswerIds[i]);
      if ((i + 1) != choiceAnswerIds.length) {
        sb.append(",");
      }
    }
    this.choiceAnswerIds = sb.toString();
  }


  public void setChoiceBiaoshi(String[] choiceBiaoshi) {
    StringBuffer sb = new StringBuffer();
    for (int i = 0; i < choiceBiaoshi.length; i++) {
      sb.append(choiceBiaoshi[i]);
      if ((i + 1) != choiceBiaoshi.length) {
        sb.append(",");
      }
    }

    this.choiceBiaoshi = sb.toString();
  }

  public void setFillAnswers(String[] fillAnswers) {
    StringBuffer sb = new StringBuffer();
    for (int i = 0; i < fillAnswers.length; i++) {
      sb.append(fillAnswers[i]);
      if ((i + 1) != fillAnswers.length) {
        sb.append(",");
      }
    }
    this.fillAnswers = sb.toString();
  }
}
