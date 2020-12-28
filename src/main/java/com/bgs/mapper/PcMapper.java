package com.bgs.mapper;

import com.bgs.pojo.Articles;
import com.bgs.pojo.SharingArticle;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PcMapper {


    List<Articles> AllArticles();

    List<SharingArticle> AllSharingArticle();

}
