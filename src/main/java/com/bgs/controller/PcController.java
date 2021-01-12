package com.bgs.controller;

import com.bgs.pojo.Articles;
import com.bgs.pojo.LayuiUtil;
import com.bgs.pojo.SharingArticle;
import com.bgs.service.PcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pc")
public class PcController {

    @Autowired
    private PcService pcService;

    @RequestMapping("/AllArticles")
    public LayuiUtil<List<Articles>> AllArticles(@RequestParam(name = "page",required = false) Integer page,
           @RequestParam(name = "limit",required = false) Integer limit){
        LayuiUtil<List<Articles>> listLayuiUtil=pcService.AllArticles(page,limit);
        return listLayuiUtil;
    }

    @RequestMapping("/AllSharingArticle")
    public LayuiUtil<List<SharingArticle>> AllSharingArticle(@RequestParam(name = "page",required = false) Integer page,
           @RequestParam(name = "limit",required = false) Integer limit){
        LayuiUtil<List<SharingArticle>> listLayuiUtil=pcService.AllSharingArticle(page,limit);
        return listLayuiUtil;
    }
}
