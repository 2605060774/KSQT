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
    <title>展示</title>

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
    <div id="app" class="main" style="height: 20000px">
        <div class="test_main">
            <div class="nr_left">
                <div class="test">
                    <form action="" method="post">
                        <%--<div class="test_title">
                            <p class="test_time">
                                <i class="icon iconfont">&#xe6fb;</i><b class="alt-1">01:40</b>
                            </p>
                            <font><input type="button" name="test_jiaojuan" value="交卷"></font>
                        </div>--%>

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
                                            <i>1</i><span>({{item.questionsScore}}分)</span><font>{{item.allQuestions.questions}}</font><b class="icon iconfont">&#xe881;</b>
                                        </div>

                                        <div class="test_content_nr_main">
                                            <ul @click="huoqu(1,$event,i+1,item.questionsScore,item.allQuestions.answer,item.index,item.questionsId)">

                                                <li class="option" v-for="(answer,a) in item.allQuestions.allAnswers">

                                                    <input type="radio" :value="answer.answerId" class="radioOrCheck" :name="answer.questionsId"
                                                           :id="answer.answerId" />


                                                    <label :for="answer.answerId">
                                                        {{biaoshi[a]}}
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
                                            <i>1</i><span>({{item.questionsScore}}分)</span><font>{{item.allQuestions.questions}}</font><b class="icon iconfont">&#xe881;</b>
                                        </div>

                                        <div class="test_content_nr_main">
                                            <ul>

                                                <li @click="huoqu(2,$event,a,item.questionsScore,item.allQuestions.answer,item.index,item.questionsId)" class="option" v-for="(answer,a) in item.allQuestions.allAnswers">

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
                                            <i>1</i><span>({{item.questionsScore}}分)</span><font>{{item.allQuestions.questions}}</font><b class="icon iconfont">&#xe881;</b>
                                        </div>

                                        <div class="test_content_nr_main">
                                            <ul @click="huoqu(3,$event,i+1,item.questionsScore,item.allQuestions.answer,item.index,item.questionsId)">

                                                <li class="option" v-for="(answer,a) in item.allQuestions.allAnswers">

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
                                            <i>1</i><span>({{item.questionsScore}}分)</span><font>{{item.allQuestions.questions}}</font><b class="icon iconfont">&#xe881;</b>
                                        </div>

                                        <div class="test_content_nr_main">
                                            <ul<%-- @click="huoqu($event,i+1)"--%>>

                                                <li style="line-height: 35px" v-for="(answer,a) in item.allQuestions.quantity">

                                                    <label :for="answer.answerId">
                                                        {{a+1}}、

                                                        <input  @blur="keguan($event,a,item.questionsScore,item.allQuestions.answer,item.index,item.questionsId)" type="text" :name="item.questionsId"
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
                                            <i>1</i><span>({{item.questionsScore}}分)</span><font>{{item.allQuestions.questions}}</font><b class="icon iconfont">&#xe881;</b>
                                        </div>

                                        <div class="test_content_nr_main">
                                            <ul @click="huoqu($event,i+1)">

                                                <li class="option" v-for="(answer,a) in item.allQuestions.allAnswers">

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
                    </form>
                </div>
            </div>
            <div class="nr_right">
                <div class="nr_rt_main">
                    <div class="rt_nr1">
                        <%--<div class="rt_nr1_title">
                            <h1>
                                <i class="icon iconfont">&#xe692;</i>答题卡
                            </h1>
                            <p class="test_time">
                                <i class="icon iconfont">&#xe6fb;</i><b class="alt-1">01:40</b>
                            </p>
                        </div>--%>

                        <%--<div class="rt_content"  v-if="MultipleChoiceLength > 0">
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
                        </div>--%>


                        <%--<div class="rt_content"  v-if="MultiSelectLength > 0">
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
                        </div>--%>


                        <%--<div class="rt_content"  v-if="estimateLength > 0">
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
                        </div>--%>


                       <%-- <div class="rt_content"  v-if="GapFillingLength > 0">
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
                        </div>--%>


                       <%-- <div class="rt_content"  v-if="ShortAnswerLength > 0">
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
                        </div>--%>
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
                axios.post('/Employees/infoPaperQuestions',
                    {
                        "paperId":id,
                    }
                )
                    .then(function (response) {
                        _this.allQuestions=response.data;
                        console.log(response.data);
                        for (var i=0;i<_this.allQuestions.length;i++){
                            response.data[i].index=i;
                            response.data[i].href="#"+i;
                            if(response.data[i].allQuestions.type==1){
                                _this.MultipleChoice[_this.MultipleChoice.length]=response.data[i];
                            }else if(response.data[i].allQuestions.type==2){
                                _this.MultiSelect[_this.MultiSelect.length]=response.data[i]
                            }else if(response.data[i].allQuestions.type==3){
                                _this.estimate[_this.estimate.length]=response.data[i]
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

            huoqu(type,e,index,questionsScore,answer,examId,questionsId){
                if (e.target.tagName === 'LABEL'|| e.target.tagName === 'P') return; // 因为原生click事件会执行两次，第一次在label标签上，第二次在input标签上，故此处理
                var _this=this;
                // var examId = e.currentTarget.parentElement.parentElement.id; /*得到题目下标*/
                var cardLi = $('a[href=#' + examId + ']'); /*根据题目ID找到对应答题卡*/
                /*设置已答题*/
                if (!cardLi.hasClass('hasBeenAnswer')) {
                    cardLi.addClass('hasBeenAnswer');
                }
                // var questionsId=e.currentTarget.firstElementChild.firstElementChild.name; /*得到题目ID*/
                // var questionsScore = e.currentTarget.parentElement.parentElement.firstElementChild.value; /*得到题目下标*/
                // var answer = e.currentTarget.parentElement.parentElement.firstElementChild.nextElementSibling.value; /*得到题目答案id*/
                var radioVal = $('input:radio[name='+questionsId+']:checked').val();
                var radioVal1 = $('input[name='+questionsId+']:checked');
                // var radioVal1 = document.getElementsByName(questionsId)[0].value;
                _this.userPaper[examId].choiceAnswerIds=[];
                for (let i = 0; i < radioVal1.length; i++) {
                    _this.userPaper[examId].choiceAnswerIds[i]=radioVal1[i].value;
                }
                if(_this.userPaper[examId].choiceBiaoshi.indexOf(_this.biaoshi[index])==-1){
                    console.log(index)
                    _this.userPaper[examId].choiceBiaoshi.splice(index,0,_this.biaoshi[index]);
                }else{
                    _this.userPaper[examId].choiceBiaoshi.splice(_this.userPaper[examId].choiceBiaoshi.indexOf(_this.biaoshi[index]),1)
                }
                console.log(_this.userPaper[examId].choiceBiaoshi);
                var defen=0;
                if(radioVal==answer){
                    defen=questionsScore;
                }
                _this.userPaper[examId].questionsId=questionsId;
                _this.userPaper[examId].choiceAnswerIds=radioVal;
                _this.userPaper[examId].score=defen;
            },
            keguan(e,index,questionsScore,answer,examId,questionsId){
                var _this=this;
                var t=$('input[name='+questionsId+']');
                var cardLi = $('a[href=#' + examId + ']'); /*根据题目ID找到对应答题卡*/
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
                console.log(_this.userPaper[examId].fillAnswers);
            }

        },
        mounted(){
            var paper=this.getQueryString("pa");
            if(paper!=null && paper!=''){
                this.paper=paper;
                this.PaperQuestions(paper);
            }else{
                // window.location.href = "http://localhost:8080/jsps/JingJiaDaTing/DaTing.jsp"
            }

        }


    })
</script>
</html>
