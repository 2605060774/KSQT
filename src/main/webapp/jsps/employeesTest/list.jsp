<%--
  Created by IntelliJ IDEA.
  User: 1
  Date: 2020/12/28
  Time: 8:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/vue/element/index.css">
    <script src="${pageContext.request.contextPath}/vue/vue.js"></script>
    <script src="${pageContext.request.contextPath}/vue/element/index.js"></script>
    <script src="${pageContext.request.contextPath}/vue/axios.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/taizhou/bidhall/resource/commonBaseResource/js/jquery-1.8.3.min.js"></script>
    <title>员工考试</title>
</head>
<body>
<h1>我的考试</h1>
<div id="app">
    <template>
        <el-table
                :data="userPaper.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%;margin:0 auto; height: 85%">
            <el-table-column
                    prop="paperName"
                    label="考试科目">
            </el-table-column>

            <el-table-column
                    prop="paperId"
                    label="试卷id"
                    v-if="false">
            </el-table-column>

            <el-table-column
                    prop="totalScore"
                    label="总分">
            </el-table-column>

            <el-table-column
                    prop="passScore"
                    label="及格分">
            </el-table-column>

            <el-table-column
                    prop="entries"
                    label="剩余考试进入次数">
            </el-table-column>

            <el-table-column
                    prop="status"
                    label="考试状态">
                <template scope="scope">
                    <p v-if="scope.row.status=='0'">未开始</p>
                    <p v-if="scope.row.status=='1'">考试中</p>
                    <p v-if="scope.row.status=='2'">已结束</p>
                    <p v-if="scope.row.status=='3'">已删除</p>
                </template>
            </el-table-column>

            <el-table-column
                    prop="startTime"
                    label="考试开始时间">
            </el-table-column>

            <el-table-column
                    prop="endTime"
                    label="考试结束时间">
        </el-table-column>

            <el-table-column label="开始考试">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="startKao(scope.row)">开始考试</el-button>

                </template>
            </el-table-column>

        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 15]"
                :page-size="pagesize"
                :current-page="currentPage"
                layout="total, sizes, prev, pager, next, jumper"
                style="text-align:center"
                :total="userPaper.length">
        </el-pagination>


    </template>
</div>
</body>
<script>
    new Vue({
        el:"#app",
        data(){
            return{
                userPaper:[],
                pagesize: 5,
                currentPage: 1,
            }
        },
        methods:{
            startKao(row){
                if(row.status==0){
                    this.$message.error('考试未开始');
                }else if(row.status==1){
                    window.open("${pageContext.request.contextPath}/jsps/employeesTest/answer.jsp?pa="+row.paperId)
                }else if(row.status==2){
                    this.$message.error('考试已结束');
                }else if(row.status==3){
                    this.$message.error('考试已删除');
                }
            },
            list(){
                var _this=this;
                axios.post('/dong/listPaper', {
                    Token: sessionStorage.getItem("Token"),
                })
                    .then(function (response) {
                        console.log(response.data);
                        var newdate = new Date(Date().replace(/\-/g, "\/"));
                        _this.userPaper = response.data;
                        for(let i=0;i<_this.userPaper.length;i++){
                            response.data[i].startTime;
                            var startdate = new Date(_this.userPaper[i].startTime.replace(/\-/g, "\/"));
                            var enddate = new Date(_this.userPaper[i].endTime.replace(/\-/g, "\/"));
                            if(startdate>=newdate){
                                _this.userPaper[i].status=0;
                                _this.countTime(i);
                            }else if(enddate<=newdate){
                                _this.userPaper[i].status=2;
                            }else{
                                _this.userPaper[i].status=1;
                                _this.countTime1(i);
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleCurrentChange(cpage) {
                this.currentPage = cpage;
            },
            handleSizeChange(psize) {
                this.pagesize = psize;
            },
            countTime(index) {
                // 定义结束时间戳
                const end = Date.parse(new Date(this.userPaper[index].startTime));
                // 定义当前时间戳
                const now = Date.parse(new Date());
                // 做判断当倒计时结束时都为0
                if (now >= end) {
                    this.userPaper[index].status=1;
                    this.countTime1(index);
                    return
                }
                var that=this;
                // 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
                setTimeout(function () {
                    that.countTime(index)
                }, 1000);
            },

            countTime1(index) {
                // 定义结束时间戳
                const end = Date.parse(new Date(this.userPaper[index].endTime));
                // 定义当前时间戳
                const now = Date.parse(new Date());
                // 做判断当倒计时结束时都为0
                if (now >= end) {
                    this.userPaper[index].status=2;
                    return
                }
                var that=this;
                // 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
                setTimeout(function () {
                    that.countTime(index)
                }, 1000);
            },
        },
        mounted(){
            this.list();
        }
    })
</script>
</html>
