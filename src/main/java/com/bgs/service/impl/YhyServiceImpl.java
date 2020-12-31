package com.bgs.service.impl;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.bgs.mapper.YhyMapper;
import com.bgs.pojo.Video;
import com.bgs.service.YhyService;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Service
public class YhyServiceImpl implements YhyService {

    @Resource
    private YhyMapper yhyMapper;

    @Override
    public List<Video> findVideo(Video video) {
        return yhyMapper.findVideo(video);
    }



    @Override
    public Video findById(Integer videoId) {
        return yhyMapper.findById(videoId);
    }

    @Override
    public int delVideo(Integer videoId) {
        return yhyMapper.delVideo(videoId);
    }

    @Override
    public int updVideo(Video video) {
        return yhyMapper.updVideo(video);
    }

    @Override
    public int updShareVideo(Video video) {
        return yhyMapper.updShareVideo(video);
    }

    @Override
    public int addVideo(Video video) {

        return yhyMapper.addVideo(video);
    }

}
