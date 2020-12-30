package com.bgs.controller;

import com.bgs.pojo.AccessTokenDto;
import com.bgs.pojo.PaperQuestions;
import com.bgs.pojo.User;
import com.bgs.pojo.UserPaper;
import com.bgs.service.DongService;
import com.bgs.util.VerifyCodeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/dong")
public class DongController {

    @Autowired
    private DongService dongService;


    //登录__生成图片验证码
    @RequestMapping("/autoImage")
    public void autoImage(String image, HttpServletResponse response, HttpSession session) throws IOException {
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setContentType("image/jpeg");
        //生成随机字符串
        String verifyCode = VerifyCodeUtils.generateVerifyCode(4);
        //存入会话session
        //删除以前的
        session.removeAttribute("verCode");
        session.setAttribute("verCode", verifyCode.toLowerCase());
        //生成图片
        int w = 100, h = 38;
        VerifyCodeUtils.outputImage(w, h, response.getOutputStream(), verifyCode);
    }


    //登录__验证图片验证码
    @ResponseBody
    @RequestMapping("/checkCodestext")
    public String checkCodestext(HttpSession session) {
        String verCode = (String) session.getAttribute("verCode");
        return verCode;
    }


    @ResponseBody
    @RequestMapping("/login")
    public List<String> login(@RequestBody User user) throws Exception  {
        List<String> list= dongService.authUserAndCreateToken(user);
        return list;
    }

    @ResponseBody
    @RequestMapping("/listPaper")
    public List<UserPaper> listPaper(@RequestBody Map<String,String> map) throws Exception {
//        dongService.invalidateByAccessToken(map.get("Token"));
        AccessTokenDto token = dongService.parseAccessToken(map.get("Token"));
        List<UserPaper> userPaper=dongService.listPaper(token.getUserId());
        return userPaper;
    }


    @ResponseBody
    @RequestMapping("/listPaperQuestions")
    public List<PaperQuestions> listPaperQuestions(@RequestBody Map<String,String> map) {
//        dongService.invalidateByAccessToken(map.get("Token"));
        int paperId = Integer.parseInt(map.get("paperId"));
        List<PaperQuestions> paperQuestions=dongService.listPaperQuestions(paperId);
        return paperQuestions;
    }


}
