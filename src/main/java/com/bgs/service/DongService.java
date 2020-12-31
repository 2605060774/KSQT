package com.bgs.service;

import com.bgs.mapper.DongMapper;
import com.bgs.pojo.AccessTokenDto;
import com.bgs.pojo.PaperQuestions;
import com.bgs.pojo.User;
import com.bgs.pojo.UserPaper;
import com.bgs.util.BaseResponse;
import com.bgs.util.Constant;
import com.bgs.util.EncryptUtil;
import com.bgs.util.StatusCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DongService {
    @Autowired
    private DongMapper dongMapper;

    @Autowired
    private ObjectMapper objectMapper;


    public List<String> authUserAndCreateToken(User user1) throws Exception {
        User user = authUser(user1);
        if (user != null){
            List<String> list=new ArrayList<>();
            //失效掉以前仍然可以使用的accessToken
            //创建token对象
            AccessTokenDto accessTokenDto =
                    new AccessTokenDto(user.getId(),user.getUsername(),System.currentTimeMillis(), Constant.snowFlake.nextId().toString(),Constant.ACCESS_TOKEN_EXPIRE);
            //将对象转为字符串
            String accessTokenDtoJsonStr = objectMapper.writeValueAsString(accessTokenDto);
            //给定一个秘钥给字符串加密
            String accessToken = EncryptUtil.aesEncrypt(accessTokenDtoJsonStr, Constant.TOKEN_AUTH_KEY);
            //将token对象存储到redis中
//            stringRedisTemplate.opsForValue().set(accessToken, JSON.toJSONString(user));
//            stringRedisTemplate.expire(accessToken,1440, TimeUnit.MINUTES);

            list.add(user.getUsername());
            list.add(accessToken);
            return list;
        }
        return null;
    }

    //    用户登录验证
    public User authUser(User user)  {
        User user1 = dongMapper.selUserInfoByName(user);
        return user1;
    }

    //    验证token
    public BaseResponse validateToken(String accessToken) {
        BaseResponse response = new BaseResponse(StatusCode.Success);

        try {
            if (StringUtils.isBlank(accessToken)) {
                return new BaseResponse(StatusCode.AccessTokenNotBlank);
            }
            //为了防止token伪造,会额外做异步操作解析token
            AccessTokenDto accessTokenDto;
            try {
                accessTokenDto = parseAccessToken(accessToken);
            } catch (Exception e) {
                return new BaseResponse(StatusCode.AccessTokenInvalidate);
            }
            if (accessTokenDto != null) {
                //判断token是否过期
                if (System.currentTimeMillis() - accessTokenDto.getTimestamp() > accessTokenDto.getExpire()) {
                    //失效token
//                    this.invalidateByAccessToken(accessToken);
                    return new BaseResponse(StatusCode.TokenValidateExpireToken);
                }
            }
        } catch (Exception e) {
            return new BaseResponse(StatusCode.Fail, e.getMessage());
        }
        return response;
    }

    // 解析token
    public AccessTokenDto parseAccessToken(String accessToken) throws Exception {
        String tokenJsonStr = EncryptUtil.aesDecrypt(accessToken, Constant.TOKEN_AUTH_KEY);
        return objectMapper.readValue(tokenJsonStr, AccessTokenDto.class);
    }

    public List<UserPaper> listPaper(Integer userId) {
        return dongMapper.listPaper(userId);
    }

    public List<PaperQuestions> listPaperQuestions(int paperId) {
        return dongMapper.listPaperQuestions(paperId);
    }
    //失效Token
/* public void invalidateByAccessToken(String accessToken) {
        if (StringUtils.isNotBlank(accessToken)){
            stringRedisTemplate.delete(accessToken);
        }
    }*/
}
