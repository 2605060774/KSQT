package com.bgs.service;

import com.bgs.pojo.Articles;
import com.bgs.pojo.LayuiUtil;
import com.bgs.pojo.SharingArticle;

import java.util.List;

public interface PcService {


    LayuiUtil<List<Articles>> AllArticles(Integer page, Integer limit);

    LayuiUtil<List<SharingArticle>> AllSharingArticle(Integer page, Integer limit);
}
