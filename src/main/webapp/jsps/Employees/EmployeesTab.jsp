<%--
  Created by IntelliJ IDEA.
  User: dell
  Date: 2020/12/28
  Time: 9:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>员工考试详情</title>
    <script type="text/javascript" src="/js/jquery-3.4.1.min.js"></script>
    <script src="/bootstrap/table/bootstrap-table.js"></script>
    <script src="/bootstrap/js/bootstrap-tab.js"></script>
    <script src="/bootstrap/js/bootstrap.js"></script>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/bootstrap/css/bootstrap-tab.css">
</head>
<body>


<%--查询--%>
开始时间：<input type="datetime-local" id="startTime" name="startTime" style="border:none;"/>
结束时间：<input type="datetime-local" id="endTime" name="endTime" style="border:none;"/>
<input type="button" id="chaxun" class="btn btn-primary" value="搜索">


<%--表单--%>
<table id="EmployeesInfo"></table>
<script>
    $("#chaxun").click(function () {
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();

        $("#EmployeesInfo").bootstrapTable("destroy")//销毁全局的，展示查询的
        $("#EmployeesInfo").bootstrapTable({
            url: '/Employees/userpapeInfo',
            method: 'post',//提交方式
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",//发送到服务器的编码类型
            striped: true,
            search: true,
            sidePagination: "client",//分页方式 'client'为客户端分页
            cache: false,//是否使用缓存
            queryParams: function (param) {//请求参数 封装的表格对象
                return{
                    startTime:startTime,
                    endTime:endTime
                }
            },
            columns: [
                {
                    field: 'paperId',
                    title: '序号'
                }, {
                    field: 'paperName',
                    title: '试卷名称'
                }, {
                    field: 'subjectiveScores',
                    title: '主观分'
                },{
                    field: 'objectiveScore',
                    title: '客观分'
                },{
                    field: 'statusUser',
                    title: '是否通过',
                    formatter: function (value, row, index) {
                        if (value==1){
                            return "通过";
                        }else if(value==0) {
                            return "未通过";
                        }
                    }
                },{
                    field: 'startTime',
                    title: '开始时间'
                },{
                    field: 'endTime',
                    title: '结束时间'
                },{

                    title: '操作',
                    formatter: function (value, row, index) {
                        return "<a href='javascript:paper("+row.paperId+")'>查看答卷</a> "

    }
                }
            ]
        });
    })

    //表格
    $(function () {
        employeestab()
    })

//查看正确答案案
    function paper(paperId) {
        window.location.href = "http://localhost:8080/jsps/Employees/infoShow.jsp?pa="+paperId
    }


    function employeestab() {
        $("#EmployeesInfo").bootstrapTable({
            url: '/Employees/userpapeInfo',
            method: 'post',//提交方式
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",//发送到服务器的编码类型
            striped: true,
            search: true,
            sidePagination: "client",//分页方式 'client'为客户端分页
            cache: false,//是否使用缓存
            queryParams: function (param) {//请求参数 封装的表格对象
            },
            columns: [
                {
                    field: 'paperId',
                    title: '序号'
                }, {
                    field: 'paperName',
                    title: '试卷名称'
                }, {
                    field: 'subjectiveScores',
                    title: '主观分'
                },{
                    field: 'objectiveScore',
                    title: '客观分'
                },{
                    field: 'statusUser',
                    title: '是否通过',
                    formatter: function (value, row, index) {
                        if(value==1) {
                            return "通过";
                        }else if(value==0){
                            return "未通过";
                        }
                    }
                },{
                    field: 'startTime',
                    title: '开始时间'
                },{
                    field: 'endTime',
                    title: '结束时间'
                }, {
                    field: 'paperId',
                    title: '操作',
                    formatter: function (value, row, index) {
                        return "<a href='javascript:paper("+row.paperId+")'>查看答卷</a> "

                    }
                }
            ]
        });
    }



</script>
</body>
</html>
