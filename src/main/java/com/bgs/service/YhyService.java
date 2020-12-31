package com.bgs.service;

import com.bgs.pojo.Video;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface YhyService {

    List<Video> findVideo(Video video);

    Video findById(Integer videoId);

    int delVideo(Integer videoId);

    int updVideo(Video video);

    int updShareVideo(Video video);

    int addVideo(Video video);
}
