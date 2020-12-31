<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/vue/element/index.css">
    <script src="${pageContext.request.contextPath}/vue/vue.js"></script>
    <script src="${pageContext.request.contextPath}/vue/element/index.js"></script>
    <script src="${pageContext.request.contextPath}/vue/axios.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/taizhou/bidhall/resource/commonBaseResource/js/jquery-1.8.3.min.js"></script>
    <title>左树菜单栏</title>
</head>
<body>
<div id="app">
        <el-menu
                default-active="2"
                class="el-menu-demo"
                mode="horizontal"
                style="width: 100%;height: 7%"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="" style="color:#fff;opacity:1;margin-right: 100px" disabled>员工培训考试系统</el-menu-item>
            <el-menu-item style="margin-left: 100px" index="${pageContext.request.contextPath}/jsps/employeesTest/list.jsp">员工考试</el-menu-item>
            <el-menu-item style="margin-left: 100px" index="${pageContext.request.contextPath}/jsps/Employees/EmployeesTab.jsp">成绩列表</el-menu-item>
            <el-menu-item style="margin-left: 100px" index="${pageContext.request.contextPath}/jsps/pc/essay.jsp">我的文章资料</el-menu-item>
            <el-menu-item style="margin-left: 100px" index="${pageContext.request.contextPath}/jsps/yhy/Shipin.jsp">我的视频资料</el-menu-item>
            <el-menu-item @click="loginOut()" style="float:right;margin-right: 100px">注销</el-menu-item>
            <el-menu-item index="" style="color:#fff;opacity:1;float:right;" disabled>欢迎登录！{{username}}</el-menu-item>
        </el-menu>
        <iframe :src="tree" width="100%" height="93%"></iframe>
</div>

<script>
    new Vue ({
        el:"#app",
        data(){
            return{
                tree:"",
                username:"",
            }
        },
        methods: {
            loginOut(){
                sessionStorage.removeItem("Token");
                sessionStorage.removeItem("userName");
                location.reload();
            },
            handleSelect(key, keyPath) {
                this.tree=key
            },
        },
        mounted() {
            if(sessionStorage.getItem("Token") != null){
                this.username=sessionStorage.getItem("userName");
                sessionStorage.getItem("id");
            }else{
                window.location.href = "http://localhost:8080/jsps/leftTree/login.jsp"
            }
        },
        computed: {

        }

    })
</script>
<style lang="less" scoped>
    *{
        box-sizing: border-box;
        margin: 0;padding: 0;
    }
    *:before,*:after{
        box-sizing: border-box;
    }
    ul,
    li {
        list-style: none;
    }
    .current{
        color: #e9c309 !important
    }
    .l_tree_container {
        width: 100%;
        height: 100%;
        box-shadow: 0 0 3px #ccc;
        margin: 13px;
        position: relative;
    }

    .l_tree {
        width: calc(100%);
        padding-left: 15px;
    }
    .l_tree_branch {
        width: 100%;
        height: 100%;
        display: block;
        padding: 13px;
        position: relative;
    }

    .l_tree_branch .l_tree_children_btn {
        width: 12px;
        height: 12px;
        background-color: #515a68;
        font-size: 8px;
        text-align: center;
        color: #bbbec1;
        outline: none;
        border: 0;
        cursor: pointer;
        border: 1px solid #bbbec1;
        line-height: 11px;
        margin-left: 5px;
    }

    ul.l_tree:before {
        content: '';
        border-left: 1px dashed #999999;
        height: calc(100% - 24px);
        position: absolute;
        left: 10px;
        top: 0px;
    }
    .l_tree,
    .l_tree_branch {
        position: relative;
    }

    .l_tree_branch::after {
        content: '';
        width: 18px;
        height: 0;
        border-bottom: 1px dashed #bbbec1;
        position: absolute;
        right: calc(100% - 10px);
        top: 24px;
        left: -5px;
    }

    .l_tree_container>.l_tree::before,
    .l_tree_container>.l_tree>.l_tree_branch::after {
        display: none;
    }
    .l_folder {
        font-size:11px;
        margin-left: 5px;
        display: inline;
        color: #bbbec1;
        cursor: pointer;
    }
</style>
</body>
</html>
