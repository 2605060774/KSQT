package com.bgs.pojo;


public class TestPaper {

  private long paperId;
  private String paperName;
  private String paperType;
  private long totalScore;
  private long passScore;
  private String entries;
  private java.sql.Timestamp startTime;
  private java.sql.Timestamp endTime;
  private long status;
  private long isPublish;
  private String scoreUserIds;
  private long isScoreFinish;
  private long userId;
  private java.sql.Timestamp createTime;


  public long getPaperId() {
    return paperId;
  }

  public void setPaperId(long paperId) {
    this.paperId = paperId;
  }


  public String getPaperName() {
    return paperName;
  }

  public void setPaperName(String paperName) {
    this.paperName = paperName;
  }


  public String getPaperType() {
    return paperType;
  }

  public void setPaperType(String paperType) {
    this.paperType = paperType;
  }


  public long getTotalScore() {
    return totalScore;
  }

  public void setTotalScore(long totalScore) {
    this.totalScore = totalScore;
  }


  public long getPassScore() {
    return passScore;
  }

  public void setPassScore(long passScore) {
    this.passScore = passScore;
  }


  public String getEntries() {
    return entries;
  }

  public void setEntries(String entries) {
    this.entries = entries;
  }


  public java.sql.Timestamp getStartTime() {
    return startTime;
  }

  public void setStartTime(java.sql.Timestamp startTime) {
    this.startTime = startTime;
  }


  public java.sql.Timestamp getEndTime() {
    return endTime;
  }

  public void setEndTime(java.sql.Timestamp endTime) {
    this.endTime = endTime;
  }


  public long getStatus() {
    return status;
  }

  public void setStatus(long status) {
    this.status = status;
  }


  public long getIsPublish() {
    return isPublish;
  }

  public void setIsPublish(long isPublish) {
    this.isPublish = isPublish;
  }


  public String getScoreUserIds() {
    return scoreUserIds;
  }

  public void setScoreUserIds(String scoreUserIds) {
    this.scoreUserIds = scoreUserIds;
  }


  public long getIsScoreFinish() {
    return isScoreFinish;
  }

  public void setIsScoreFinish(long isScoreFinish) {
    this.isScoreFinish = isScoreFinish;
  }


  public long getUserId() {
    return userId;
  }

  public void setUserId(long userId) {
    this.userId = userId;
  }


  public java.sql.Timestamp getCreateTime() {
    return createTime;
  }

  public void setCreateTime(java.sql.Timestamp createTime) {
    this.createTime = createTime;
  }

}
