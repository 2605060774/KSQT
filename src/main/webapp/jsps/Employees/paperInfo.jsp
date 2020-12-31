<%--
  Created by IntelliJ IDEA.
  User: dell
  Date: 2020/12/30
  Time: 13:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
        <script type="text/javascript" src="/js/jquery-3.4.1.min.js"></script>
        <script src="/bootstrap/table/bootstrap-table.js"></script>
        <script src="/bootstrap/js/bootstrap-tab.js"></script>
        <script src="/bootstrap/js/bootstrap.js"></script>
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="/bootstrap/css/bootstrap-tab.css">
</head>
<body>
        <%--<%if (session.getAttribute("name")==null){%>--%>
        <%--<h1>用户还没有登录</h1>--%>
        <%--<%}else {%>--%>
        <%--<h1>欢迎<%= session.getAttribute("name")%>登录本系统</h1>--%>
        <%--<h2>准考证号：<%= session.getAttribute("pwd")%></h2>--%>
        <%--<a href="loginout.jsp">注销登录</a>--%>
        <div class="container">
                <div class="row">
                        <div class="col-md-6">
        <form action="examplecheck.jsp" method="post">
        <h3>一,单项选择题(每题2分)</h3>
        <br>
        1.下列哪个方法是获取 session中关键字是key的对象(    ) <br>
        <input type="radio" class="level_select" checked name="r1" value="A">A. public void setAttribute(String key, Object obj) <br>
        <input type="radio" name="r1" value="B"> B. public void removeAttribute(String key)<br>
        <input type="radio" name="r1" value="C">C. publie Enuneration getAttributeNanes<br>
        <input type="radio" name="r1" value="D">D. public 0bject getAttibute(String key)<br>

        <h3>二、判断题(每题2分)</h3><br>

        1.同一客户在多个wb服务目录中,所对应的 session对象是互不相同的 <br>
        <input type="radio" name="r2" value="True ">True
        <input type="radio" class="level_select" checked name="r2" value="False">False<br>

        <h3>三、多选题(每题3分)</h3><br>

        1.以下属于JSP的内置对象有哪些<br>

        <input type="checkbox" class="level_select" checked name="r3" value="A">A.request
        <input type="checkbox" class="level_select" checked name="r3" value="B">B.response
        <input type="checkbox" name="r3" value="C">C.session
        <input type="checkbox" name="r3" value="D">D.JavaScript
        <br>
                        </div>
                        <div class="col-md-6">
                                <form action="examplecheck1.jsp" method="post">
                                        <h3>一,单项选择题(每题2分)</h3>
                                        <br>
                                        1.下列哪个方法是获取 session中关键字是key的对象(    ) <br>
                                        <input type="radio" name="r1" value="A">A. public void setAttribute(String key, Object obj) <br>
                                        <input type="radio" name="r1" value="B"> B. public void removeAttribute(String key)<br>
                                        <input type="radio" name="r1" value="C">C. publie Enuneration getAttributeNanes<br>
                                        <input type="radio" class="level_select" checked name="r1" value="D">D. public 0bject getAttibute(String key)<br>

                                        <h3>二、判断题(每题2分)</h3><br>

                                        1.同一客户在多个wb服务目录中,所对应的 session对象是互不相同的 <br>
                                        <input type="radio"  class="level_select" checked  name="r2" value="True ">True
                                        <input type="radio" name="r2" value="False">False<br>

                                        <h3>三、多选题(每题3分)</h3><br>

                                        1.以下属于JSP的内置对象有哪些<br>

                                        <input type="checkbox" class="level_select" checked name="r3" value="A">A.request
                                        <input type="checkbox" class="level_select" checked name="r3" value="B">B.response
                                        <input type="checkbox" class="level_select" checked name="r3" value="C">C.session
                                        <input type="checkbox" name="r3" value="D">D.JavaScript
                                        <br>
                        </div>
            </div>
        </div>
        <%--<input type="submit" name="sub" value="提交"  >--%>
        <%--<input type="reset" name="res" value="重置">--%>
        <%--<%}%>--%>
</body>
</html>

