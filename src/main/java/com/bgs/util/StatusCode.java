package com.bgs.util;

public enum StatusCode {

    Success(0,"成功"),
    Fail(-1,"失败"),
    InvalidParams(201,"非法的参数!"),
    UserMobileNotBlank(5002,"手机号不能为空"),

    UserNamePasswordNotBlank(50000,"账户密码不能为空!"),
    AccessTokenNotBlank(50001,"accessToken必填，请在请求头header中塞入该字段"),

    TokenValidateExpireToken(60001,"Token已过期"),
    TokenValidateCheckFail(60002,"Token验证失败"),

    AccessTokenNotExist(70001,"Token不存在-请重新登录!"),
    AccessTokenInvalidate(70002,"无效的Token!"),

    AccessTokenNotExistRedis(80001,"Token不存在或已经过期-请重新登录!"),

    AccessSessionNotExist(90001,"用户没登录或登录Session已经过期-请重新登录!"),

    LoginFail(100000,"登录失败！"),
    CurrUserHasNotPermission(100001,"当前用户没有权限访问该资源或者操作！"),
    CurrUserNotLogin(100002,"当前用户没有登录，请先进行登录！");

    private Integer code;//响应码
    private String msg;//响应消息

    StatusCode(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
