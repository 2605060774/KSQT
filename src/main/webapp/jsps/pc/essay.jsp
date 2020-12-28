<%--
  Created by IntelliJ IDEA.
  User: 潘帅帅
  Date: 2020/12/27
  Time: 18:50
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
    .layui-row{
        align:'center'
    }
</style>
<body>
<div class="layui-row">
    <div class="layui-col-xs12 layui-col-md11">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">文章标题</label>
                <div class="layui-input-inline">
                    <input type="tel" name="phone" lay-verify="required|phone" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">创建时间</label>
                <div class="layui-input-inline">
                    <input type="text" name="date" id="date1" lay-verify="date" placeholder="开始时间" autocomplete="off" class="layui-input">
                </div>
                <div class="layui-form-mid">-----</div>
                <div class="layui-input-inline">
                    <input type="text" name="date" id="date2" lay-verify="date" placeholder="结束时间" autocomplete="off" class="layui-input">
                </div>
            </div>
        </div>
    </div>
    <div class="layui-col-xs12 layui-col-md5">
            <div>
                <button data-method="offset" data-type="auto" onclick="tianjia()" class="layui-btn layui-btn-normal">新增文章</button>
                <button type="button2" class="layui-btn">查询</button>
                <button type="button3" class="layui-btn">重置</button>
            </div>
    </div>
</div>
<div class="layui-tab">
    <ul class="layui-tab-title">
        <li class="layui-this">我的文章库</li>
        <li>共享文章库</li>
    </ul>
    <div class="layui-tab-content">
        <div class="layui-tab-item layui-show">
            <table class="layui-hide" id="my"></table>
        </div>
        <div class="layui-tab-item">
            <table class="layui-hide" id="share"></table>
        </div>
    </div>
</div>
</body>
</html>
<script>
layui.use(['form', 'layedit', 'laydate','element','table','layer'], function(){
var form = layui.form
,laydate = layui.laydate;

//日期
laydate.render({
elem: '#date1'
});
laydate.render({
elem: '#date2'
});
//--------------------------------------------------
    var $ = layui.jquery
        ,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    //触发事件
    var active = {
        tabAdd: function(){
            //新增一个Tab项
            element.tabAdd('demo', {
                title: '新选项'+ (Math.random()*1000|0) //用于演示
                ,content: '内容'+ (Math.random()*1000|0)
                ,id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
            })
        }
        ,tabDelete: function(othis){
            //删除指定Tab项
            element.tabDelete('demo', '44'); //删除：“商品管理”


            othis.addClass('layui-btn-disabled');
        }
        ,tabChange: function(){
            //切换到指定Tab项
            element.tabChange('demo', '22'); //切换到：用户管理
        }
    };

    $('.site-demo-active').on('click', function(){
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });

    //Hash地址的定位
    var layid = location.hash.replace(/^#test=/, '');
    element.tabChange('test', layid);

    element.on('tab(test)', function(elem){
        location.hash = 'test='+ $(this).attr('lay-id');
    });

    //---------------------------------------------------------------------
    var table = layui.table;

    table.render({
        elem: '#my'
        ,url:'/pc/AllArticles'
        ,align:'center'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
            {field:'id', width:211, title: '序号', sort: true,align:'center'}
            ,{field:'headline', width:211, title: '文章标题',align:'center'}
            ,{field:'creationTime', width:211, title: '创建时间', sort: true,align:'center'}
            ,{field:'city', width:211, title: '操作',toolbar:'#cz',align:'center'}
        ]]
    });

    //监听工具条
    table.on('tool(cha)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

        if(layEvent === 'detail'){ //查看
            alert(data.featuredServicesId)
            var seqId =data.seqId;
            layer.open({
                area: ['800px', '800px'],

                type: 2,
                content: './AlterPbObjectInfo.html?seqId='+data.seqId //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
            });
        } else if(layEvent === 'OnePbObjectInfo'){ //编辑
            //do something

            //同步更新缓存对应的值
            layer.open({
                area: ['800px', '800px'],
                type: 2,
                content: "./OnePbObjectInfo.html?seqId="+data.seqId
            });
        }
    });

    //---------------------------------------------------------------------
    var table = layui.table;

    table.render({
        elem: '#share'
        ,align:'center'
        ,url:'/pc/AllSharingArticle'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
            {field:'id', width:211, title: '序号', sort: true,align:'center'}
            ,{field:'headline', width:211,title: '文章标题',align:'center'}
            ,{field:'creationTime', width:211, title: '创建时间', sort: true,align:'center'}
            ,{field:'city', width:211, title: '操作', toolbar:'#gx',align:'center'}
        ]]
    });
    //监听工具条
    table.on('tool(cha)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

        if(layEvent === 'detail'){ //查看
            alert(data.featuredServicesId)
            var seqId =data.seqId;
            layer.open({
                area: ['800px', '800px'],

                type: 2,
                content: './AlterPbObjectInfo.html?seqId='+data.seqId //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
            });
        } else if(layEvent === 'OnePbObjectInfo'){ //编辑
            //do something

            //同步更新缓存对应的值
            layer.open({
                area: ['800px', '800px'],
                type: 2,
                content: "./OnePbObjectInfo.html?seqId="+data.seqId
            });
        }
    });
    //-----------------------------------------------------------------------

});
</script>
<script>
    function tianjia(){
        layui.use(['layer'],function () {
            var layer = layui.layer,$=layui.$;
            layer.open({
                type:2,//类型
                area:['700px','700px'],//定义宽和高
                title:'新增文章',//题目
                shadeClose:false,//点击遮罩层关闭
                    content: 'addarticle.jsp',//打开的内容  "{:url('addarticle')}"
        });
        })
    }
</script>
<script type="text/html" id="cz">
    <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>
    <a class="layui-btn layui-btn-xs" lay-event="OnePbObjectInfo">编辑</a>
    <a class="layui-btn layui-btn-xs" lay-event="OnePbObjectInfo">删除</a>
</script>
<script type="text/html" id="gx">
    <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>
    <a class="layui-btn layui-btn-xs" lay-event="OnePbObjectInfo">编辑</a>
    <a class="layui-btn layui-btn-xs" lay-event="OnePbObjectInfo">删除</a>
</script>