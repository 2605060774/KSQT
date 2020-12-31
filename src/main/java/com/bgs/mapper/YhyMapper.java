package com.bgs.mapper;

import com.bgs.pojo.Video;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface YhyMapper {

    List<Video> findVideo(Video video);

    int addVideo(Video video);

    Video findById(Integer videoId);

    int delVideo(Integer videoId);

    int updVideo(Video video);

    int updShareVideo(Video video);



}
