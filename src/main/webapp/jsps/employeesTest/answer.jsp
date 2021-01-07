<%--
  Created by IntelliJ IDEA.
  User: 1
  Date: 2020/12/28
  Time: 16:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link href="${pageContext.request.contextPath}/kao/main.css" rel="stylesheet" type="text/css" />
    <link href="${pageContext.request.contextPath}/kao/test.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/vue/element/index.css">
    <script src="${pageContext.request.contextPath}/vue/vue.js"></script>
    <script src="${pageContext.request.contextPath}/vue/element/index.js"></script>
    <script src="${pageContext.request.contextPath}/vue/axios.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/taizhou/bidhall/resource/commonBaseResource/js/jquery-1.8.3.min.js"></script>
    <script src="${pageContext.request.contextPath}/kao/jquery-1.11.3.min.js"></script>
    <script src="${pageContext.request.contextPath}/kao/jquery.easy-pie-chart.js"></script>
    <!--时间js-->
    <script src="${pageContext.request.contextPath}/kao/time/jquery.countdown.js"></script>
    <title>答题页面</title>

    <style>
        .hasBeenAnswer {
            background: #5d9cec;
            color: #fff;
        }

        .reading h2 {
            width: 100%;
            margin: 20px 0 70px;
            text-align: center;
            line-height: 2;
            font-size: 20px;
            color: #59595b;
        }

        .reading h2 a {
            text-decoration: none;
            color: #59595b;
            font-size: 20px;
        }

        .reading h2 a:hover {
            color: #2183f1;
        }
    </style>
</head>
<body>
    <div id="app" class="main">
        <div class="test_main">
            <div class="nr_left">
                <div class="test">
                    <form action="" method="post">
                        <div class="test_title">
                            <p class="test_time">
                                <i class="icon iconfont">&#xe6fb;</i><b class="alt-1">{{h}}时:{{m}}分:{{s}}秒</b>
                            </p>
                            <font><input type="button" @click="jiaojuan()" value="交卷"></font>
                        </div>

                        <div class="test_content" v-if="MultipleChoiceLength > 0">
                            <div class="test_content_title">
                                <h2>单选题</h2>
                                <p>
                                    <span>共</span><i class="content_lit">{{MultipleChoiceLength}}</i><span>题，</span><span>合计</span><i class="content_fs">{{MultipleChoiceLength*MultipleChoice[0].questionsScore}}</i><span>分</span>
                                </p>
                            </div>
                            <div class="test_content_nr">
                                <ul>
                                    <li :id="item.index" v-for="(item,i) in MultipleChoice">
                                        <%--<input type="hidden" :value="item.questionsScore">
                                        <input type="hidden" :value="item.allQuestions.answer">--%>
                                        <div class="test_content_nr_tt">
                                            <i>{{i+1}}</i><span>({{item.questionsScore}}分)</span><font>{{item.allQuestions.questions}}</font><b class="icon iconfont">&#xe881;</b>
                                        </div>

                                        <div class="test_content_nr_main">
                                            <ul>

                                                <li @click="huoqu(1,$event,a,item.questionsScore,item.allQuestions.answer,item.index,item.questionsId)" class="option" v-for="(answer,a) in item.allQuestions.allAnswers">

                                                    <input type="radio" :value="answer.answerId" class="radioOrCheck" :name="answer.questionsId"
                                                           :id="answer.answerId" />


                                                    <label :for="answer.answerId">
                                                        {{biaoshi[a]}}、
                                                        <p class="ue" style="display: inline;">{{answer.content}}</p>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>


                        <div class="test_content" v-if="MultiSelectLength > 0">
                            <div class="test_content_title">
                                <h2>多选题</h2>
                                <p>
                                    <span>共</span><i class="content_lit">{{MultiSelectLength}}</i><span>题，</span><span>合计</span><i class="content_fs">{{MultiSelectLength*MultiSelect[0].questionsScore}}</i><span>分</span>
                                </p>
                            </div>
                            <div class="test_content_nr">
                                <ul>
                                    <li :id="item.index" v-for="(item,i) in MultiSelect">
                                        <input type="hidden" :value="item.questionsScore">
                                        <input type="hidden" :value="item.allQuestions.answer">
                                        <div class="test_content_nr_tt">
                                            <i>{{i+1}}</i><span>({{item.questionsScore}}分)</span><font>{{item.allQuestions.questions}}</font><b class="icon iconfont">&#xe881;</b>
                                        </div>

                                        <div class="test_content_nr_main">
                                            <ul>

                                                <li @click="huoqu(2,$event,a,item.questionsScore,item.allQuestions.answerIds,item.index,item.questionsId)" class="option" v-for="(answer,a) in item.allQuestions.allAnswers">

                                                    <input type="checkbox" :value="answer.answerId" class="radioOrCheck" :name="answer.questionsId"
                                                           :id="answer.answerId" />


                                                    <label :for="answer.answerId">
                                                        {{biaoshi[a]}}、
                                                        <p class="ue" style="display: inline;">{{answer.content}}</p>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>


                        <div class="test_content" v-if="estimateLength > 0">
                            <div class="test_content_title">
                                <h2>判断题</h2>
                                <p>
                                    <span>共</span><i class="content_lit">{{estimateLength}}</i><span>题，</span><span>合计</span><i class="content_fs">{{estimateLength*estimate[0].questionsScore}}</i><span>分</span>
                                </p>
                            </div>
                            <div class="test_content_nr">
                                <ul>
                                    <li :id="item.index" v-for="(item,i) in estimate">
                                        <input type="hidden" :value="item.questionsScore">
                                        <input type="hidden" :value="item.allQuestions.answer">
                                        <div class="test_content_nr_tt">
                                            <i>{{i+1}}</i><span>({{item.questionsScore}}分)</span><font>{{item.allQuestions.questions}}</font><b class="icon iconfont">&#xe881;</b>
                                        </div>

                                        <div class="test_content_nr_main">
                                            <ul @click="huoqu(3,$event,i+1,item.questionsScore,item.allQuestions.judgeAnswer,item.index,item.questionsId)">

                                                <li class="option">

                                                    <input type="radio" value="2" class="radioOrCheck" :name="item.questionsId"
                                                    :id="item.allQuestions.allAnswers[0]"/>


                                                    <label :for="item.allQuestions.allAnswers[0]">
                                                        <p class="ue" style="display: inline;">对</p>
                                                    </label>
                                                </li>

                                                <li class="option">

                                                    <input type="radio" value="1" class="radioOrCheck" :name="item.questionsId"
                                                     :id="item.allQuestions.allAnswers[1]"/>


                                                    <label :for="item.allQuestions.allAnswers[1]">
                                                        <p class="ue" style="display: inline;">错</p>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>


                        <div class="test_content" v-if="GapFillingLength > 0">
                            <div class="test_content_title">
                                <h2>填空题</h2>
                                <p>
                                    <span>共</span><i class="content_lit">{{GapFillingLength}}</i><span>题，</span><span>合计</span><i class="content_fs">{{GapFillingLength*GapFilling[0].questionsScore}}</i><span>分</span>
                                </p>
                            </div>
                            <div class="test_content_nr">
                                <ul>
                                    <li :id="item.index" v-for="(item,i) in GapFilling">
                                        <input type="hidden" :value="item.questionsScore">
                                        <input type="hidden" :value="item.allQuestions.answer">
                                        <div class="test_content_nr_tt">
                                            <i>{{i+1}}</i><span>({{item.questionsScore}}分)</span><font>{{item.allQuestions.questions}}</font><b class="icon iconfont">&#xe881;</b>
                                        </div>

                                        <div class="test_content_nr_main">
                                            <ul<%-- @click="huoqu($event,i+1)"--%>>

                                                <li style="line-height: 35px" v-for="(answer,a) in item.allQuestions.quantity">

                                                    <label :for="answer.answerId">
                                                        {{a+1}}、

                                                        <input  @blur="keguan(4,$event,a,item.questionsScore,item.allQuestions.answer,item.index,item.questionsId)" type="text" :name="item.questionsId"
                                                               style="border-bottom: 1px solid #000;border-top: 0px;border-left: 0px;border-right: 0px;outline: none"/>


                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>


                        <div class="test_content" v-if="ShortAnswerLength > 0">
                            <div class="test_content_title">
                                <h2>简答题</h2>
                                <p>
                                    <span>共</span><i class="content_lit">{{ShortAnswerLength}}</i><span>题，</span><span>合计</span><i class="content_fs">{{ShortAnswerLength*ShortAnswer[0].questionsScore}}</i><span>分</span>
                                </p>
                            </div>
                            <div class="test_content_nr">
                                <ul>
                                    <li :id="item.index" v-for="(item,i) in ShortAnswer">
                                        <input type="hidden" :value="item.questionsScore">
                                        <input type="hidden" :value="item.allQuestions.answer">
                                        <div class="test_content_nr_tt">
                                            <i>{{i+1}}</i><span>({{item.questionsScore}}分)</span><font>{{item.allQuestions.questions}}</font><b class="icon iconfont">&#xe881;</b>
                                        </div>

                                        <div class="test_content_nr_main">
                                            <ul >

                                                <li class="option" v-for="(answer,a) in item.allQuestions.allAnswers">
                                                    <el-input
                                                            @blur="keguan(5,$event,a,item.questionsScore,answer[0],item.index,item.questionsId)"
                                                            type="textarea"
                                                            autosize
                                                            placeholder="请输入内容"
                                                            v-model="answer[0]">
                                                    </el-input>

                                                    <%--<input type="radio" :value="answer.answerId" class="radioOrCheck" :name="answer.questionsId"
                                                           :id="answer.answerId" />--%>


                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div  style="height: 45px"></div>
                    </form>
                </div>
            </div>
            <div class="nr_right">
                <div class="nr_rt_main">
                    <div class="rt_nr1">
                        <div class="rt_nr1_title">
                            <h1>
                                <i class="icon iconfont">&#xe692;</i>答题卡
                            </h1>
                            <p class="test_time" style="">
                                <b class="alt-1">{{h}}时:{{m}}分:{{s}}秒</b>
                            </p>
                        </div>

                        <div class="rt_content"  v-if="MultipleChoiceLength > 0">
                            <div class="rt_content_tt">
                                <h2>单选题</h2>
                                <p>
                                    <span>共</span><i class="content_lit">{{MultipleChoiceLength}}</i><span>题</span>
                                </p>
                            </div>
                            <div class="rt_content_nr answerSheet">
                                <ul>
                                    <li v-for="(item,i) in MultipleChoice"><a :href="item.href">{{i+1}}</a></li>
                                </ul>
                            </div>
                        </div>


                        <div class="rt_content"  v-if="MultiSelectLength > 0">
                            <div class="rt_content_tt">
                                <h2>多选题</h2>
                                <p>
                                    <span>共</span><i class="content_lit">{{MultiSelectLength}}</i><span>题</span>
                                </p>
                            </div>
                            <div class="rt_content_nr answerSheet">
                                <ul>
                                    <li v-for="(item,i) in MultiSelect"><a :href="item.href">{{i+1}}</a></li>
                                </ul>
                            </div>
                        </div>


                        <div class="rt_content"  v-if="estimateLength > 0">
                            <div class="rt_content_tt">
                                <h2>判断</h2>
                                <p>
                                    <span>共</span><i class="content_lit">{{estimateLength}}</i><span>题</span>
                                </p>
                            </div>
                            <div class="rt_content_nr answerSheet">
                                <ul>
                                    <li v-for="(item,i) in estimate"><a :href="item.href">{{i+1}}</a></li>
                                </ul>
                            </div>
                        </div>


                        <div class="rt_content"  v-if="GapFillingLength > 0">
                            <div class="rt_content_tt">
                                <h2>填空</h2>
                                <p>
                                    <span>共</span><i class="content_lit">{{GapFillingLength}}</i><span>题</span>
                                </p>
                            </div>
                            <div class="rt_content_nr answerSheet">
                                <ul>
                                    <li v-for="(item,i) in GapFilling"><a :href="item.href">{{i+1}}</a></li>
                                </ul>
                            </div>
                        </div>


                        <div class="rt_content"  v-if="ShortAnswerLength > 0">
                            <div class="rt_content_tt">
                                <h2>简答</h2>
                                <p>
                                    <span>共</span><i class="content_lit">{{ShortAnswerLength}}</i><span>题</span>
                                </p>
                            </div>
                            <div class="rt_content_nr answerSheet">
                                <ul>
                                    <li v-for="(item,i) in ShortAnswer"><a :href="item.href">{{i+1}}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script>
    new Vue({
        el:"#app",
        data(){
            return{
                allQuestions:[],//总题目
                MultipleChoice:[],//单选
                MultipleChoiceLength:'',//单选数量
                MultiSelectLength:'',//多选数量
                estimateLength:'',//判断数量
                GapFillingLength:'',//填空数量
                ShortAnswerLength:'',//简答数量
                MultiSelect:[],   //多选
                estimate:[],      //判断
                GapFilling:[],    //填空
                ShortAnswer:[],    //简答
                biaoshi:["A","B","C","D","E","F","G"],    //标识
                userPaper: [],//提交给后台的真题数据
                paper:'',
                d:'',
                h:'',
                m:'',
                s:'',
                endt:Date.parse(new Date())+7200000,
            }
        },
        methods:{
            getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            },

            PaperQuestions(id){
                var _this=this;
                axios.post('/dong/listPaperQuestions',
                    {
                        "paperId":id,
                    }
                )
                    .then(function (response) {
                        _this.allQuestions=response.data;
                        console.log(response.data);
                        for (var i=0;i<_this.allQuestions.length;i++){
                            response.data[i].index="qu_"+i;
                            response.data[i].href="#"+"qu_"+i;
                            if(response.data[i].allQuestions.type==1){
                                _this.MultipleChoice[_this.MultipleChoice.length]=response.data[i];
                            }else if(response.data[i].allQuestions.type==2){
                                _this.MultiSelect[_this.MultiSelect.length]=response.data[i]
                            }else if(response.data[i].allQuestions.type==3){
                                response.data[i].allQuestions.allAnswers[0]="ju_"+i+"0";
                                response.data[i].allQuestions.allAnswers[1]="ju_"+i+"1";
                                _this.estimate[_this.estimate.length]=response.data[i];
                                console.log(response.data[i].allQuestions.allAnswers[0]);
                            }else if(response.data[i].allQuestions.type==4){
                                response.data[i].allQuestions.quantity=response.data[i].allQuestions.allAnswers[0].content.split(",");
                                _this.GapFilling[_this.GapFilling.length]=response.data[i];
                            }else if(response.data[i].allQuestions.type==5){
                                _this.ShortAnswer[_this.ShortAnswer.length]=response.data[i]
                            }
                            _this.userPaper[i]={paperId: response.data[i].paperId,questionsId:response.data[i].allQuestions.questionsId,choiceAnswerIds:[],choiceBiaoshi:[],fillAnswers:[],shortAnswer:'',judgeAnswer:'',score:0};
                        }
                        console.log(_this.userPaper);
                        _this.MultipleChoiceLength=_this.MultipleChoice.length;
                        _this.MultiSelectLength=_this.MultiSelect.length;
                        _this.estimateLength=_this.estimate.length;
                        _this.GapFillingLength=_this.GapFilling.length;
                        _this.ShortAnswerLength=_this.ShortAnswer.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                /*setTimeout(function () {
                    console.log(_this.PbObjectInfoId);
                }, 1000)*/
            },

            remove(val){
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            },


                judgeResultFun(arr1, arr2) {
                    let flag = true;
                    if (arr1.length !== arr2.length) {
                        flag = false
                    } else {
                        arr1.forEach(item => {
                            if (arr2.indexOf(item) === -1) {
                                flag = false
                            }
                        })
                    }
                    return flag;
                },

                huoqu(type,e,index,questionsScore,answer,examId,questionsId){
                if (e.target.tagName === 'LABEL'|| e.target.tagName === 'P') return; // 因为原生click事件会执行两次，第一次在label标签上，第二次在input标签上，故此处理
                var _this=this;
                examId=examId.substring(examId.indexOf("_")+1,examId.length);
                console.log(examId)
                // var examId = e.currentTarget.parentElement.parentElement.id; /*得到题目下标*/
                var cardLi = $('a[href=#' + "qu_"+examId + ']'); /*根据题目ID找到对应答题卡*/
                /*设置已答题*/
                if (!cardLi.hasClass('hasBeenAnswer')) {
                    cardLi.addClass('hasBeenAnswer');
                }
                // var questionsId=e.currentTarget.firstElementChild.firstElementChild.name; /*得到题目ID*/
                // var questionsScore = e.currentTarget.parentElement.parentElement.firstElementChild.value; /*得到题目下标*/
                // var answer = e.currentTarget.parentElement.parentElement.firstElementChild.nextElementSibling.value; /*得到题目答案id*/
                var defen=0;
                var aa=[];
                var AnswerIds=[];
                if(type==1){
                    var radioVal = $('input:radio[name='+questionsId+']:checked').val();
                    if(radioVal==answer){
                        defen=questionsScore;
                    }
                    aa.push(_this.biaoshi[index]);
                    AnswerIds.push(radioVal);
                }else if(type==2){
                    var radioVal1 = $('input[name='+questionsId+']:checked');
                    _this.userPaper[examId].choiceAnswerIds=[];
                    for (let i = 0; i < radioVal1.length; i++) {
                        _this.userPaper[examId].choiceAnswerIds[i]=radioVal1[i].value;
                    }
                    if(_this.userPaper[examId].choiceBiaoshi.indexOf(_this.biaoshi[index])==-1){
                        _this.userPaper[examId].choiceBiaoshi.splice(index,0,_this.biaoshi[index]);
                    }else{
                        _this.userPaper[examId].choiceBiaoshi.splice(_this.userPaper[examId].choiceBiaoshi.indexOf(_this.biaoshi[index]),1)
                    }
                    for (let i = 0; i < _this.biaoshi.length; i++) {
                        for (let a = 0; a < _this.userPaper[examId].choiceBiaoshi.length; a++) {
                            if(_this.biaoshi[i]==_this.userPaper[examId].choiceBiaoshi[a]){
                                aa.push(_this.biaoshi[i]);
                            }
                        }
                    }
                    if(aa.length==0){
                        if (cardLi.hasClass('hasBeenAnswer')) {
                            cardLi.removeClass('hasBeenAnswer');
                        }
                    }
                    if(_this.judgeResultFun(_this.userPaper[examId].choiceAnswerIds,answer.split(","))){
                        defen=questionsScore;
                    }
                    AnswerIds=_this.userPaper[examId].choiceAnswerIds;
                }else if(type==3){
                    var radioVal = $('input:radio[name='+questionsId+']:checked').val();
                    if(radioVal==answer){
                        defen=questionsScore;
                    }
                    _this.userPaper[examId].judgeAnswer=radioVal;

                }
                // var radioVal1 = document.getElementsByName(questionsId)[0].value;


                _this.userPaper[examId].questionsId=questionsId;
                _this.userPaper[examId].choiceAnswerIds=AnswerIds;
                _this.userPaper[examId].choiceBiaoshi=aa;
                _this.userPaper[examId].score=defen;
                console.log(_this.userPaper[examId]);
            },
            keguan(type,e,index,questionsScore,answer,examId,questionsId){
                var _this=this;
                examId=examId.substring(examId.indexOf("_")+1,examId.length);
                var t=$('input[name='+questionsId+']');
                var cardLi = $('a[href=#' + "qu_"+examId + ']'); /*根据题目ID找到对应答题卡*/
                if(type==4){
                    _this.userPaper[examId].fillAnswers[index]=t[index].value;

                    /*if(t[i].value!=''){
                        if (!cardLi.hasClass('hasBeenAnswer')) {
                            cardLi.addClass('hasBeenAnswer');
                        }
                    }*/
                    var a=0;
                    for (let i = 0; i < _this.userPaper[examId].fillAnswers.length; i++) {
                        if(_this.userPaper[examId].fillAnswers[i]=='' || _this.userPaper[examId].fillAnswers[i]==null){
                            a++;
                        }
                    }
                    if(a==_this.userPaper[examId].fillAnswers.length){
                        if (cardLi.hasClass('hasBeenAnswer')) {
                            cardLi.removeClass('hasBeenAnswer');
                        }
                    }else{
                        if (!cardLi.hasClass('hasBeenAnswer')) {
                            cardLi.addClass('hasBeenAnswer');
                        }
                    }
                }else if(type==5){
                    console.log(answer);
                    _this.userPaper[examId].shortAnswer=answer;

                    if(answer=='' || answer==null){
                        if (cardLi.hasClass('hasBeenAnswer')) {
                            cardLi.removeClass('hasBeenAnswer');
                        }
                    }else{
                        if (!cardLi.hasClass('hasBeenAnswer')) {
                            cardLi.addClass('hasBeenAnswer');
                        }
                    }
                }

                console.log(_this.userPaper);
            },
            jiaojuan(){
                var _this=this;
                this.$confirm('此操作将交卷, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    axios.post('/dong/jiaojuan',{
                        userPaper:JSON.stringify(_this.userPaper),
                        user:sessionStorage.getItem("Token")
                    })
                        .then(function (response) {
                            _this.$message({
                                type: 'success',
                                message: '交卷成功!'
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消交卷'
                    });
                });
            },
            countTime() {
                // 定义当前时间戳
                const now = Date.parse(new Date());
                // 做判断当倒计时结束时都为0
                if (now >= this.endt) {
                    this.d = 0;
                    this.h = 0;
                    this.m = 0;
                    this.s = 0;
                    return
                }
                // 用结束时间减去当前时间获得倒计时时间戳
                const msec = this.endt - now;
                let d = parseInt(msec / 1000 / 60 / 60 / 24); //算出天数
                let h = parseInt(msec / 1000 / 60 / 60 % 24);//算出小时数
                let m = parseInt(msec / 1000 / 60 % 60);//算出分钟数
                let s = parseInt(msec / 1000 % 60);//算出秒数
                //给数据赋值
                this.d = d;
                this.h = h > 9 ? h : '0' + h;
                this.m = m > 9 ? m : '0' + m;
                this.s = s > 9 ? s : '0' + s;
                //定义this指向
                const that = this;
                // 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
                setTimeout(function () {
                    that.countTime()
                }, 1000);
            },

        },
        mounted(){
            var paper=this.getQueryString("pa");
            if(paper!=null && paper!=''){
                this.paper=paper;
                this.PaperQuestions(paper);
                this.countTime();
            }else{
                // window.location.href = "http://localhost:8080/jsps/JingJiaDaTing/DaTing.jsp"
            }

        }


    })
</script>
</html>
