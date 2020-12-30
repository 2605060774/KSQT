package com.bgs.util;

import com.bgs.util.SnowFlake;

/**
 * 常量
 */
public class Constant {

    public static final String TOKEN_AUTH_KEY="e2bd6cee47e0402db80862a09ff4dfd6";

    //token
    public static final int RESCODE_REFTOKEN_MSG = 1006;		//刷新TOKEN(有返回数据)
    public static final int RESCODE_REFTOKEN = 1007;			//刷新TOKEN

    public static final int JWT_ERRCODE_NULL = 4000;			//Token不存在
    public static final int JWT_ERRCODE_EXPIRE = 4001;			//Token过期
    public static final int JWT_ERRCODE_FAIL = 4002;			//验证不通过

    //密匙
    public static final String JWT_SECRET = "8677df7fc3a34e26a61c034d5ec8245d";

    //token失效的时间：ms为单位
    public static final Long ACCESS_TOKEN_EXPIRE=60000L;
    public static final Long REFRESH_TOKEN_EXPIRE=60000L;

    public static final SnowFlake snowFlake=new SnowFlake(3,2);

}
