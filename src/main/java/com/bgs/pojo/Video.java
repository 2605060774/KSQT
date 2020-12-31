package com.bgs.pojo;


import java.text.SimpleDateFormat;
import java.util.Date;

public class Video {

  private Integer videoId;
  private String videoTitle;

  private Date videoCreateTime;
  private String videoFile;
  private String videoCover;
  private String videoStatus;

  private String beginTime;
  private String endTime;


  private String creatTimeStr;
  private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");


  public String getBeginTime() {
    return beginTime;
  }

  public void setBeginTime(String beginTime) {
    this.beginTime = beginTime;
  }

  public String getEndTime() {
    return endTime;
  }

  public void setEndTime(String endTime) {
    this.endTime = endTime;
  }

  public Integer getVideoId() {
    return videoId;
  }

  public void setVideoId(Integer videoId) {
    this.videoId = videoId;
  }


  public String getVideoTitle() {
    return videoTitle;
  }

  public void setVideoTitle(String videoTitle) {
    this.videoTitle = videoTitle;
  }


  public Date getVideoCreateTime() {
    return videoCreateTime;
  }

  public void setVideoCreateTime(Date videoCreateTime) {

    this.videoCreateTime = videoCreateTime;
    String time=sdf.format(videoCreateTime);
    setCreatTimeStr(time);
  }

  public String getCreatTimeStr() {
    return creatTimeStr;
  }

  public void setCreatTimeStr(String creatTimeStr) {
    this.creatTimeStr = creatTimeStr;
  }

  public String getVideoFile() {
    return videoFile;
  }

  public void setVideoFile(String videoFile) {
    this.videoFile = videoFile;
  }


  public String getVideoCover() {
    return videoCover;
  }

  public void setVideoCover(String videoCover) {
    this.videoCover = videoCover;
  }


  public String getVideoStatus() {
    return videoStatus;
  }

  public void setVideoStatus(String videoStatus) {
    this.videoStatus = videoStatus;
  }

}
