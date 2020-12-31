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
        height: 400px;overflow: auto;
    }
</style>
<body>
<div id="app">

    <el-form :model="form">视频标题： <input type="text" v-model="form.videoTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建时间：<input type="date" value="开始日期" v-model="form.beginTime">——<input type="date" value="结束日期" v-model="form.endTime"></el-form></br>
        <el-button @click="search=true"size="medium" type="primary">新增视频</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click="searchfind"size="medium" type="primary">查询</el-button>

        <el-divider></el-divider>
        <el-link @click="myVideo"size="medium" type="success">我的视频库</el-link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-link @click="shareVideo"size="medium" type="success">共享视频库</el-link>

    <%--新增视频--%>
    <el-dialog title="" :visible.sync="search">
            <el-form :model="vi">
                <el-col :span="10">
                    <el-form-item label="视频标题" :label-width="formLabelWidth">
                        <el-input v-model="vi.videoTitle" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="视频内容" :label-width="formLabelWidth">
                        <input type="file" class="file" name="file">
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="视频封面" :label-width="formLabelWidth">
                        <input type="file" class="file2" name="file2">
                    </el-form-item>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="是否同步至共享库："  :label-width="formLabelWidth">
                        <el-switch
                                style="display: block;margin-top: 15px"
                                v-model="vi.videoStatus"
                                active-color="#ff4949"
                                inactive-color="#13ce66"
                                active-text="不同步"
                                inactive-text="">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="search = false">取 消</el-button>
                <el-button type="primary" @click="addVideo">确 定</el-button>
            </div>
        </el-dialog>

     <%--查看--%>
    <el-dialog title="" :visible.sync="search2">
        <el-form :model="video">
            <el-col :span="10">
                <el-form-item label="视频标题" :label-width="formLabelWidth">
                    <el-input v-model="video.videoTitle" autocomplete="off" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="20">
                <el-form-item label="视频内容" :label-width="formLabelWidth">
                    <embed :src="video.videoFile" width="300" height="300">
                </el-form-item>
            </el-col>
            <el-col :span="20">
                <el-form-item label="视频封面" :label-width="formLabelWidth">
                   <img :src="video.videoCover" width="300" height="300">
                </el-form-item>
            </el-col>
            <el-col :span="20">
                <el-form-item label="是否同步至共享库："  :label-width="formLabelWidth">
                        <span v-if="video.videoStatus=='1'">不同步</span>
                        <span v-if="video.videoStatus=='2'">同步</span>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item label="创建时间："  :label-width="formLabelWidth">
                    <el-input v-model="video.creatTimeStr" autocomplete="off" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="search2 = false">关闭</el-button>
        </div>
    </el-dialog>

    <%--编辑--%>
    <el-dialog title="" :visible.sync="search4">
        <el-form :model="vide">
            <el-input type="hidden" v-model="vide.videoId"></el-input>
            <el-col :span="10">
                <el-form-item label="视频标题" :label-width="formLabelWidth">
                    <el-input v-model="vide.videoTitle" autocomplete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="20">
                <el-form-item label="视频内容" :label-width="formLabelWidth">
                    <input type="file" name="file">
                    <embed :src="vide.videoFile" width="300" height="300">
                </el-form-item>
            </el-col>
            <el-col :span="20">
                <el-form-item label="视频封面" :label-width="formLabelWidth">
                    <input type="file" name="file2">
                    <img :src="vide.videoCover" width="300" height="300">
                </el-form-item>
            </el-col>
            <el-col :span="20">
                <el-form-item label="是否同步至共享库："  :label-width="formLabelWidth">
                    <span v-if="vide.videoStatus=='1'">不同步</span>
                    <span v-if="vide.videoStatus=='2'">同步</span>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item label="创建时间："  :label-width="formLabelWidth">
                    <el-input v-model="vide.creatTimeStr" autocomplete="off" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="search4 = false">取 消</el-button>
            <el-button type="primary" @click="updVideo">确 定</el-button>
        </div>
    </el-dialog>

    <%--添加到我的视频库--%>
    <el-dialog title="" :visible.sync="search3" v-model="c">
        <el-form :model="vid">
        <h1 style="margin-left: 300px;margin-top: 150px">是否添加到我的视频库</h1>
            <el-input type="hidden" v-model="vid.videoId"></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="search3 = false">否</el-button>
            <el-button type="primary" @click="updShareVideo">是</el-button>
        </div>
    </el-dialog>

        <%--视频库表格--%>
        <el-table
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                border
                style="width: 100%;">
            <el-table-column
                    align="center"
                    prop="videoId"
                    label="序号">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="videoTitle"
                    label="视频标题">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="creatTimeStr"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作">
                <template slot-scope="scope" style="align-content: center">
                    <el-button @click="findById(scope.row)"size="small" type="danger" round>查看</el-button>
                    <el-button v-show="scope.row.videoStatus == '1'" @click="findById3(scope.row)"size="small" type="danger" round>编辑</el-button>
                    <el-button v-show="scope.row.videoStatus == '1'" @click="delId(scope.$index,scope.row)"size="small" type="danger" round>删除</el-button>
                    <el-button v-show="scope.row.videoStatus == '2'" @click="findById2(scope.row)"size="small" type="danger" round>添加至我的视频库</el-button>
                </template>
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
    var formData = new window.FormData();

    new Vue({
        el: '#app',
        mounted() {
            var _this=this;
            var videoStatus=1;
            axios.post('/yhy/findVideo',{
                videoStatus:videoStatus
            }).then(function (res)  {
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
                search2: false,
                search3:false,
                search4:false,
                videoCover: '',
                form: {
                   videoTitle:'',
                   beginTime:'',
                   endTime:''
                },
                vi:{
                    videoTitle:'',
                    file:'',
                    videoStatus:true
                },
                video:{
                    videoTitle:'',
                    videoStatus:''
                },
                vid:{
                    videoId:''
                },
                vide:{
                    videoId:'',
                    videoTitle:''
                },
                formLabelWidth: '200px'
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
            searchfind: function () {
                var _this = this;
                var videoTitle = _this.form.videoTitle;
                var beginTime = _this.form.beginTime;
                var endTime = _this.form.endTime;
                axios.post('/yhy/findVideo', {
                    videoTitle: videoTitle,
                    beginTime: beginTime,
                    endTime: endTime
                }).then(function (res) {
                    console.log(res.data)
                    _this.tableData = res.data;
                }).catch(function (error) {
                });
            },



            //我的视频库
            myVideo:function () {
                var _this=this;
                var videoStatus=1;
                axios.post('/yhy/findVideo',{
                    videoStatus:videoStatus
                }).then(function (res)  {
                    console.log(res.data);
                    _this.tableData=res.data;
                }).catch(function (error) {
                });
            },

            //共享视频库
            shareVideo() {
                var _this=this;
                var videoStatus=2;
                axios.post('/yhy/findVideo',{
                    videoStatus:videoStatus
                }).then(function (res)  {
                    console.log(res.data);
                    _this.tableData=res.data;
                }).catch(function (error) {
                });
            },


            /*新增视频*/
            addVideo:function () {
                var _this=this;
                if(_this.vi.videoStatus==false){
                    _this.vi.videoStatus=2
                }else{
                    _this.vi.videoStatus=1
                }
                formData.append("file",document.querySelector('input[name=file]').files[0]);
                formData.append("file2",document.querySelector('input[name=file2]').files[0]);
                formData.append("videoTitle",_this.vi.videoTitle);
                formData.append("videoStatus",_this.vi.videoStatus);
                console.log(formData.get("file"))
                console.log(formData.get("file2"))
                let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
                axios.post('/yhy/addVideo',formData,{
                }).then(function (res)  {
                    alert("上传成功！")
                    location.reload();
                }).catch(function (error) {
                });
            },

           /*查看*/
            findById:function (row) {
                this.search2=true;
                var videoId=row.videoId;
                this.video=row;
                axios.post('/yhy/findById?videoId='+videoId,{
                }).then(function (res)  {
                }).catch(function (error) {
                });
            },
            findById2:function (row) {
                this.search3=true;
                var videoId=row.videoId;
                this.vid=row;
                axios.post('/yhy/findById?videoId='+videoId,{
                }).then(function (res)  {
                }).catch(function (error) {
                });
            },
            findById3:function (row) {
                this.search4=true;
                var videoId=row.videoId;
                this.vide=row;
                axios.post('/yhy/findById?videoId='+videoId,{
                }).then(function (res)  {
                }).catch(function (error) {
                });
            },

             //删除
             delId:function (index,row) {
                 var videoId=row.videoId
                 /*this.tableData.splice(index,1);*/
                 axios.post('/yhy/delVideo?videoId='+videoId,{
                 }).then(function (res)  {
                     location.reload();
                 }).catch(function (error) {
                 });
             },

            /*添加到我的数据库*/
            updShareVideo:function (row) {
                var data=this.vid;
                axios.post('/yhy/updShareVideo',data,{
                }).then(function (res)  {
                    location.reload();
                }).catch(function (error) {
                });
            },

            /*编辑*/
            updVideo:function () {
                var _this=this;
                formData.append("file",document.querySelector('input[name=file]').files[0]);
                formData.append("file2",document.querySelector('input[name=file2]').files[0]);
                formData.append("videoTitle",_this.vide.videoTitle);
                formData.append("videoId",_this.vide.videoId);
                console.log(formData.get("file"))
                console.log(formData.get("file2"))
                let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
                axios.post('/yhy/updVideo',formData,{
                }).then(function (res)  {
                    alert("修改成功！")
                    location.reload();
                }).catch(function (error) {
                });
            },
        }
    });

</script>
</html>
