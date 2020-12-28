<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>视频资料库</title>
    <script src="/vue/vue.js"></script>
    <script src="/vue/element/index.js"></script>
    <script src="/vue/axios.js"></script>
    <script src="/vue/qs.js"></script>
    <script src="/js/jquery.js"></script>
    <link rel="stylesheet" href="/vue/element/index.css">
</head>
<style type="text/css">
    .el-dialog__body{
        height: 200px;overflow: auto;
    }
</style>
<body>
<div>
<input type="file">
<embed src="/video/haha.mp4" width="300" height="300">
</div>

<div id="app">
    <template>
        <el-button @click="search=true"size="medium" type="primary">新增视频</el-button>
        <el-dialog title="" :visible.sync="search">
            <el-form :model="form">
                <el-col :span="10">
                    <el-form-item label="视频标题" :label-width="formLabelWidth">
                        <el-input v-model="form.serialCode" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="订单编号" :label-width="formLabelWidth">
                        <el-input v-model="form.orderCode" autocomplete="off" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="会员手机号" :label-width="formLabelWidth">
                        <el-input v-model="form.mobile" autocomplete="off" ></el-input>
                    </el-form-item>
                </el-col>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="search = false">取 消</el-button>
                <el-button type="primary" @click="searchfind">确 定</el-button>
            </div>
        </el-dialog>
        <el-table
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                border
                style="width: 100%;">
            <el-table-column
                    align="center"
                    prop=""
                    label="序号">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop=""
                    label="视频标题">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop=""
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作">
                <template slot-scope="scope" style="align-content: center">
                    <el-button @click="findId(scope.$index,scope.row)"size="small" type="danger" round>查看</el-button>
                    <el-button @click="upd(scope.$index,scope.row)"size="small" type="danger" round>编辑</el-button>
                    <el-button @click="delId(scope.$index,scope.row)"size="small" type="danger" round>删除</el-button>
                </template>
            </el-table-column>

            </el-table-column>
        </el-table>


        <%--分页--%>
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length">
        </el-pagination>
    </template>
</div>
</body>
<script type="text/javascript">
    new Vue({
        el: '#app',
        mounted() {
            var _this=this;
            axios.post('/work/findAll',{
            }).then(function (res)  {
                //console.log(res.data);
                _this.tableData=res.data;
            }).catch(function (error) {
            });

        },

        data (){
            return{
                currentPage:1, //初始页
                pagesize:5,
                tableData: [],
                handleClick:false,
                dialogTableVisible: false,
                search: false,
                form: {
                    serialCode:'',
                    orderCode:'',
                    mobile:'',
                    name: '',
                    nickname:'',
                    workOrderStatus:''
                },
                formLabelWidth: '120px'
            }
        },
        methods : {
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
            },
            //模糊查询
            searchfind:function () {
                var _this=this;
                var serialCode=_this.form.serialCode;
                var orderCode=_this.form.orderCode;
                var mobile=_this.form.mobile;
                var name=_this.form.name;
                var nickname=_this.form.nickname;
                var workOrderStatus=_this.form.workOrderStatus;
                axios.post('/work/findAll',{
                    serialCode:serialCode,
                    orderCode:orderCode,
                    mobile:mobile,
                    name:name,
                    nickname:nickname,
                    workOrderStatus:workOrderStatus,
                }).then(function (res)  {
                    console.log(res.data)
                    _this.tableData=res.data;
                    _this.search=false
                }).catch(function (error) {
                });
            },

            //删除
            delid:function (index,row) {
                var workOrderId=row.workOrderId
                alert(workOrderId)
                /*this.tableData.splice(index,1);*/
                axios.post('/work/delid?workOrderId='+workOrderId,{
                }).then(function (res)  {
                    location.reload();
                }).catch(function (error) {
                });
            }

        }

    });

</script>
</html>
