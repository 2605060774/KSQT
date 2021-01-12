package com.bgs.controller;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.bgs.pojo.AccessTokenDto;
import com.bgs.pojo.Video;
import com.bgs.service.DongService;
import com.bgs.service.YhyService;
import com.bgs.util.Constant;
import com.bgs.util.EncryptUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("yhy")
public class YhyController {

    @Autowired
    private YhyService yhyService;

    @RequestMapping("findVideo")
    @ResponseBody
    public List<Video> findVideo(@RequestBody Video video){
        List<Video> list=yhyService.findVideo(video);
        return list;
    }

    /*新增视频（图片上传到oss，视频上传到本地）*/
    private String realPath="D:/java/IDEA/TrainingExamination/src/main/webapp";
    @RequestMapping("addVideo")
    @ResponseBody
    public int addVideo(MultipartFile file,MultipartFile file2, Video video) throws IOException {
       /*上传视频*/
        long currTime = System.currentTimeMillis();//获取当前系统时间
        String uniqueName = file.getOriginalFilename();//得到文件名
        String suffix = uniqueName.substring(uniqueName.lastIndexOf(".")+1);//截取文件名
        String newname = uniqueName.substring(0, uniqueName.lastIndexOf("."))+"_"+currTime+"."+suffix; //得到文件路径
        String fpath = "/video/"+ newname;
        String filePath = realPath  + fpath;
        file.transferTo(new File(filePath));
        video.setVideoFile(fpath);

        /*上传图片*/
        String endpoint = "oss-cn-beijing.aliyuncs.com";
        String accessKeyId = "LTAI4G1nYnfaNTzWkfi5AZGi";
        String accessKeySecret = "wDj3hBIYARosupiyPEHMIRdv5Ttpep";
        String bucketName = "yhy-ksxt";


        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        InputStream inputStream = null;
        try {
            //获取文件流
            inputStream = file2.getInputStream();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //获取文件名称
        String filename = file2.getOriginalFilename();
        //1.在文件名称中添加随机唯一的值
        String uuid = UUID.randomUUID().toString().replaceAll("-","");
        filename = uuid+filename;

        //2.把文件按日期分类
        /*String datePath = new DateTime().toString("yyyy/MM/dd");*/
        filename = "yhy/"+filename;

        //调用OSS方法实现上传
        ossClient.putObject(bucketName, filename, inputStream);
        ossClient.shutdown();

        String url = "https://"+bucketName+"."+endpoint+"/"+filename;
        video.setVideoCover(url);
        int i=yhyService.addVideo(video);
        return i;
    }

    /*查看*/
    @RequestMapping("findById")
    @ResponseBody
    public Video findById(Integer videoId){
        Video video=yhyService.findById(videoId);
        return video;
    }

    /*删除*/
    @RequestMapping("delVideo")
    @ResponseBody
    public int delVideo(Integer videoId){
        int i=yhyService.delVideo(videoId);
        return i;
    }

    /*添加到我的视频库*/
    @RequestMapping("updShareVideo")
    @ResponseBody
    public int updShareVideo(@RequestBody Video video){
        int i=yhyService.updShareVideo(video);
        return i;
    }

    /*编辑*/
    @RequestMapping("updVideo")
    @ResponseBody
    public int updVideo(MultipartFile file,MultipartFile file2, Video video) throws IOException {
        if (file==null && file2!=null){
            /*上传图片*/
            String endpoint = "oss-cn-beijing.aliyuncs.com";
            String accessKeyId = "LTAI4G1nYnfaNTzWkfi5AZGi";
            String accessKeySecret = "wDj3hBIYARosupiyPEHMIRdv5Ttpep";
            String bucketName = "yhy-ksxt";


            OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
            InputStream inputStream = null;
            try {
                //获取文件流
                inputStream = file2.getInputStream();
            } catch (IOException e) {
                e.printStackTrace();
            }
            //获取文件名称
            String filename = file2.getOriginalFilename();
            //1.在文件名称中添加随机唯一的值
            String uuid = UUID.randomUUID().toString().replaceAll("-","");
            filename = uuid+filename;

            //2.把文件按日期分类
            /*String datePath = new DateTime().toString("yyyy/MM/dd");*/
            filename = "yhy/"+filename;

            //调用OSS方法实现上传
            ossClient.putObject(bucketName, filename, inputStream);
            ossClient.shutdown();

            String url = "https://"+bucketName+"."+endpoint+"/"+filename;
            video.setVideoCover(url);
        }else if(file!=null && file2==null){
            /*上传视频*/
            long currTime = System.currentTimeMillis();//获取当前系统时间
            String uniqueName = file.getOriginalFilename();//得到文件名
            String suffix = uniqueName.substring(uniqueName.lastIndexOf(".")+1);//截取文件名
            String newname = uniqueName.substring(0, uniqueName.lastIndexOf("."))+"_"+currTime+"."+suffix; //得到文件路径
            String fpath = "/video/"+ newname;
            String filePath = realPath  + fpath;
            file.transferTo(new File(filePath));
            video.setVideoFile(fpath);
        }else {
            /*上传视频*/
            long currTime = System.currentTimeMillis();//获取当前系统时间
            String uniqueName = file.getOriginalFilename();//得到文件名
            String suffix = uniqueName.substring(uniqueName.lastIndexOf(".") + 1);//截取文件名
            String newname = uniqueName.substring(0, uniqueName.lastIndexOf(".")) + "_" + currTime + "." + suffix; //得到文件路径
            String fpath = "/video/" + newname;
            String filePath = realPath + fpath;
            file.transferTo(new File(filePath));
            video.setVideoFile(fpath);

            /*上传图片*/
            String endpoint = "oss-cn-beijing.aliyuncs.com";
            String accessKeyId = "LTAI4G1nYnfaNTzWkfi5AZGi";
            String accessKeySecret = "wDj3hBIYARosupiyPEHMIRdv5Ttpep";
            String bucketName = "yhy-ksxt";

            OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
            InputStream inputStream = null;
            try {
                //获取文件流
                inputStream = file2.getInputStream();
            } catch (IOException e) {
                e.printStackTrace();
            }
            //获取文件名称
            String filename = file2.getOriginalFilename();
            //1.在文件名称中添加随机唯一的值
            String uuid = UUID.randomUUID().toString().replaceAll("-", "");
            filename = uuid + filename;

            //2.把文件按日期分类
            /*String datePath = new DateTime().toString("yyyy/MM/dd");*/
            filename = "yhy/" + filename;

            //调用OSS方法实现上传
            ossClient.putObject(bucketName, filename, inputStream);
            ossClient.shutdown();

            String url = "https://" + bucketName + "." + endpoint + "/" + filename;
            video.setVideoCover(url);
        }
        int i=yhyService.updVideo(video);
        return i;
    }

}
