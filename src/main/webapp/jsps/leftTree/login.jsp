
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录</title>
    <script src="${pageContext.request.contextPath}/vue/vue.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/vue/element/index.css">
    <script src="${pageContext.request.contextPath}/vue/element/index.js"></script>
    <script src="${pageContext.request.contextPath}/js/jquery-3.4.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/vue/axios.js"></script>
</head>
<body>
    <div id="login">
        <div id="bgd">
            <canvas
                    id='myCanvas'
                    :width='width'
                    :height='height'
            >
            </canvas>
        </div>
        <div id="loginBox" style="width: 250px;height: 400px">
            <h4>登录</h4>
            <el-form
                    :model="loginForm"
                    :rules="loginRules"
                    ref="loginForm"
                    style="width: 180px"
                    label-width="0px"
            >
                <el-form-item
                        label=""
                        prop="username"
                        style="margin-top:40px;"
                >
                    <el-row>
                        <el-col :span='4' >
                            <span style="font-size: 25px;margin-top: 10px" class="el-icon-user"></span>
                        </el-col>
                        <el-col :span='20'>
                            <el-input
                                    class="inps"
                                    placeholder='用户名'
                                    style="width: 225px"
                                    v-model="loginForm.username"
                            ></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                        label=""
                        prop="password"
                >
                    <el-row>
                        <el-col :span='4'>
                            <span style="font-size: 25px;margin-top: 10px"  class="el-icon-lock"></span>
                        </el-col>
                        <el-col :span='20'>
                            <el-input
                                    class="inps"
                                    placeholder='密码'
                                    type="password"
                                    style="width: 225px"
                                    v-model="loginForm.password"
                            ></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item
                        label=""
                        prop="smscode"
                >
                    <el-row>
                        <el-col :span='4'>
                            <span style="font-size: 25px;margin-top: 10px"  class="el-icon-key"></span>
                        </el-col>

                        <el-col :span='17'>
                            <el-input
                                    class="inps"
                                    placeholder='验证码'
                                    v-model="loginForm.smscode"
                            ></el-input>
                        </el-col>
                        <el-col :span='3'>

                            <img  @click="smscodeImg()" :src="autoImage"></img>
                        </el-col>
                    </el-row>
                </el-form-item>


                <el-form-item style="margin-top:55px;margin-left:30px;">
                    <el-button
                            type="primary"
                            round
                            class="submitBtn"
                            @click="submitForm"
                    >登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

<script>
    new Vue ({
        el:"#login",
        data() {
            //  <!--验证码是否为空-->
            let checkSmscode = (rule, value, callback) => {
                var _this=this;
                if (value === '') {
                    callback(new Error('请输入验证码'))
                } else if(value.toLowerCase() !== this.checkSmscode.toLowerCase()) {
                    callback(new Error('验证码错误'))
                }else{
                    callback();
                }
            };
            return {
                canvas: null,
                context: null,
                stars: [], //星星数组
                shadowColorList: [
                    "#39f",
                    "#ec5707",
                    "#b031d4",
                    "#22e6c7",
                    "#92d819",
                    "#14d7f1",
                    "#e23c66"
                ], //阴影颜色列表
                directionList: ["leftTop", "leftBottom", "rightTop", "rightBottom"], //星星运行方向
                speed: 50, //星星运行速度
                last_star_created_time: new Date(), //上次重绘星星时间
                autoImage: "",
                Ball: class Ball {
                    constructor(radius) {
                        this.x = 0;
                        this.y = 0;
                        this.radius = radius;
                        this.color = "";
                        this.shadowColor = "";
                        this.direction = "";
                    }

                    draw(context) {
                        context.save();
                        context.translate(this.x, this.y);
                        context.lineWidth = this.lineWidth;
                        var my_gradient = context.createLinearGradient(0, 0, 0, 8);
                        my_gradient.addColorStop(0, this.color);
                        my_gradient.addColorStop(1, this.shadowColor);
                        context.fillStyle = my_gradient;
                        context.beginPath();
                        context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
                        context.closePath();

                        context.shadowColor = this.shadowColor;
                        context.shadowOffsetX = 0;
                        context.shadowOffsetY = 0;
                        context.shadowBlur = 10;

                        context.fill();
                        context.restore();
                    }
                }, //工厂模式定义Ball类
                width: window.innerWidth,
                height: window.innerHeight,
                checkSmscode:"",
                loginForm: {
                    username: "",
                    password: "",
                    smscode: ""
                },
                loginRules: {
                    username: [
                        { required: true, message: "请输入用户名", trigger: "blur" }
                    ],
                    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                    smscode: [{ validator: checkSmscode,required: true, trigger: "blur" }]
                }
            };
        },
        methods: {
            smscodeImg(){
                this.autoImage="/dong/autoImage?date="+new Date().getTime();
                setTimeout(() => {
                    this.checkCodestext();
                },100);
            },
            checkCodestext(){
                var _this=this;
                axios
                    .get("/dong/checkCodestext")
                    .then(res => {
                        console.log(res.data);
                        _this.checkSmscode = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //提交登录
            submitForm() {
                var _this=this;
                this.$refs['loginForm'].validate(valid => {
                    if (valid) {
                        _this.login();
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                })
            },



            login(){
                var _this=this;
                axios.post('/dong/login',_this.loginForm)
                    .then(function (response) {
                        // location.reload();
                        if(response.data==''){
                            _this.$message({
                                showClose: true,
                                message: '用户名或密码输入错误',
                                type: 'error'
                            });
                        }else{
                            sessionStorage.removeItem("Token");
                            sessionStorage.removeItem("userName");
                            sessionStorage.setItem("Token",response.data[1]);
                            sessionStorage.setItem("userName",response.data[0]);
                            window.location.href = "${pageContext.request.contextPath}/jsps/leftTree/Tree.jsp";
                            _this.$refs['loginForm'].resetFields();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },


            //重复动画
            drawFrame() {
                let animation = requestAnimationFrame(this.drawFrame);
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.createStar(false);
                this.stars.forEach(this.moveStar);
            },
            //展示所有的星星
            createStar(params) {
                let now = new Date();
                if (params) {
                    //初始化星星
                    for (var i = 0; i < 50; i++) {
                        const radius = Math.random() * 3 + 2;
                        let star = new this.Ball(radius);
                        star.x = Math.random() * this.canvas.width + 1;
                        star.y = Math.random() * this.canvas.height + 1;
                        star.color = "#ffffff";
                        star.shadowColor = this.shadowColorList[
                            Math.floor(Math.random() * this.shadowColorList.length)
                            ];
                        star.direction = this.directionList[
                            Math.floor(Math.random() * this.directionList.length)
                            ];
                        this.stars.push(star);
                    }
                } else if (!params && now - this.last_star_created_time > 3000) {
                    //每隔3秒重绘修改颜色其中30个球阴影颜色
                    for (var i = 0; i < 30; i++) {
                        this.stars[i].shadowColor = this.shadowColorList[
                            Math.floor(Math.random() * this.shadowColorList.length)
                            ];
                    }
                    this.last_star_created_time = now;
                }
            },
            //移动
            moveStar(star, index) {
                if (star.y - this.canvas.height > 0) {
                    //触底
                    if (Math.floor(Math.random() * 2) === 1) {
                        star.direction = "leftTop";
                    } else {
                        star.direction = "rightTop";
                    }
                } else if (star.y < 2) {
                    //触顶
                    if (Math.floor(Math.random() * 2) === 1) {
                        star.direction = "rightBottom";
                    } else {
                        star.direction = "leftBottom";
                    }
                } else if (star.x < 2) {
                    //左边
                    if (Math.floor(Math.random() * 2) === 1) {
                        star.direction = "rightTop";
                    } else {
                        star.direction = "rightBottom";
                    }
                } else if (star.x - this.canvas.width > 0) {
                    //右边
                    if (Math.floor(Math.random() * 2) === 1) {
                        star.direction = "leftBottom";
                    } else {
                        star.direction = "leftTop";
                    }
                }
                if (star.direction === "leftTop") {
                    star.y -= star.radius / this.speed;
                    star.x -= star.radius / this.speed;
                } else if (star.direction === "rightBottom") {
                    star.y += star.radius / this.speed;
                    star.x += star.radius / this.speed;
                } else if (star.direction === "leftBottom") {
                    star.y += star.radius / this.speed;
                    star.x -= star.radius / this.speed;
                } else if (star.direction === "rightTop") {
                    star.y -= star.radius / this.speed;
                    star.x += star.radius / this.speed;
                }
                star.draw(this.context);
            }
        },
        mounted() {
            this.canvas = document.getElementById("myCanvas");
            this.context = this.canvas.getContext("2d");
            this.smscodeImg();

            this.createStar(true);
            this.drawFrame();
        }
    });
</script>

<style lang='less' scoped>
    body{
        background-image:url(${pageContext.request.contextPath}/images/Starry.jpg);
        background-position:center;
        background-size: cover;
        background-repeat:no-repeat;
        background-attachment: fixed;
    }
    #login {

        font-size: 20px;
        background-position:center;
        background-size: cover;
        background-repeat:no-repeat;
        background-attachment: fixed;
        color: #fff;
        font-family: "Source Sans Pro";
        position: relative;
    }
    #bgd {
        height: 98vh;
        width: 98vw;
        overflow: hidden;
    }
    #loginBox {
        width: 240px;
        height: 280px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        padding: 50px 40px 40px 40px;
        box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
        opacity: 1;
        background: linear-gradient(
                230deg,
                rgba(53, 57, 74, 0) 0%,
                rgb(0, 0, 0) 100%
        );
    }
    /deep/ .inps input {
        border: none;
        color: #fff;
        background-color: transparent;
        font-size: 12px;
    }
    .submitBtn {
        background-color: transparent;
        color: #39f;
        width: 200px;
    }
    .iconfont {
        color: #fff;
    }
    .J_codeimg {
        width: 85px;
        height: 36px;
        padding: 3px;
        z-index: 0;
        color: #fff;
    }
</style>
</body>
</html>
