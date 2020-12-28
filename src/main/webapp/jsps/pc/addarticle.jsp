<%--
  Created by IntelliJ IDEA.
  User: 潘帅帅
  Date: 2020/12/28
  Time: 9:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="../../layuiadmin/layui/css/layui.css" media="all">
    <link rel="stylesheet" href="../../layuiadmin/style/admin.css" media="all">
    <script src="../../layuiadmin/layui/layui.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/taizhou/bidhall/resource/commonBaseResource/js/jquery-1.8.3.min.js"></script>
</head>
<style>
    .layui-inline{
        width: 600px;
    }
    .layui-form{
        align:'center';
    }
</style>
<body>
<form class="layui-form" lay-filter="form-filters">
<div class="layui-form-item">
    <div class="layui-inline">
        <label class="layui-form-label">文章标题</label>
        <div class="layui-input-inline">
            <input type="tel" name="phone" lay-verify="required|phone" autocomplete="off" class="layui-input">
        </div>
    </div>
</div>
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">文章内容</label>
            <div class="layui-input-inline">
                <textarea id="demo" style="display: none;"></textarea>
            </div>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">是否同步至共享库</label>
        <div class="layui-input-block">
            <input type="checkbox" name="close" lay-skin="switch" lay-text="ON|OFF">
        </div>
    </div>
    <div class="layui-col-xs12 layui-col-md5">
        <div>
            <button data-method="offset" data-type="auto" class="layui-btn layui-btn-normal">提交</button>
            <button type="button2" class="layui-btn">返回</button>
        </div>
    </div>
</form>
</body>
</html>
<script>
    layui.use(['form','layedit', 'laydate'], function(){
        var layedit = layui.layedit;
        var form = layui.form;
        layedit.build('demo'); //建立编辑器
        //监听指定开关
        form.on('switch(switchTest)', function(data){
            layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
                offset: '6px'
            });
            layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
        });
    });
</script>