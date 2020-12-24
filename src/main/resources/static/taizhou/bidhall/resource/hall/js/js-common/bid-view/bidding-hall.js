var carousel;//轮播模块
var layer;//弹窗
var table;//表格
var priceText ;//出价
var multiple;//出价倍数
var num ;
var objectId = getUrlParam("objectId");//标的id
var enterpriseId = getUrlParam("enterpriseId");//企业id
var applyId ;
var timer;//定时器
var countVal;//倒计时时间
var startPrice;//底价
var bidStatus;//状态
var bidState;//竞价模式
var bidStatus0;//初始化状态
var maxPrice;//最高价
var maxMultiple;//最高倍数
var element;
var unitP;//单位
var marginPrice;//保证金
var tradName;//竞价模式
var trad;//报价模式
var bidStartTime;//竞价开始时间
var myMark;//当前竞价人的牌号
var isPriorityEnter; //优先权
var pauseTime; //中止时间
var htmlBOX;
var isPause;//中止
var isPause0;//中止初始
var bidder;//竞得人
var noBidderReason;//无竞得人原因
var bidType ;//标的规定竞价人
var priorityMark;//有优先权竞价人的牌号
var priorityCount;//优先权点击次数
var bidArea;//地区
var fileServerUrl;//文件服务地址
var reservePrice;//保留价
var bidQuotePrice;//中标价
$(function(){

    startPrice = $('#startPrice').html();//底价
    priceText = $('#priceText').val();//出价
    maxMultiple =parseFloat($("#maxMultiple").val() == "" ? 10 : $("#maxMultiple").val());//最高倍数
    marginPrice =$("#cmcostAmount").val();//保证金
    unitP =$("#unitP").html();//单位
    tradName =$("#tradName").html();//竞价模式
    trad =$("#trad").val();//报价模式
    bidStartTime =$("#bidStartTime").html();//竞价开始时间
    myMark =$("#myMark").val();//牌号
    priorityMark =$("#priorityMark").val();//牌号
    isPause0 =$("#isPause0").val();//中止
    isPriorityEnter = $('#isPriorityEnter').val();//优先权
    bidArea = $('#bidArea').val();// 地区
    fileServerUrl = $('#fileServerUrl').val();// 文件服务地址
    bidState = $('#bidState').val();//竞价模式
    reservePrice = $('#reservePrice').val();//保留价
    bidQuotePrice = $('#bidQuotePrice').val();// 中标价

    /*layui.config({
        base: contextPath+'/resource/commonBaseResource/plus/'
    }).extend({
        panel: 'panel/js/panel',
        toolbar: "toolbar/toolbar"
    });*/

    //轮播图渲染
    layui.use(['carousel','layer','table','element'], function(){
        table = layui.table;
        layer = layui.layer;
        carousel = layui.carousel;
        element = layui.element;
        carousel.render({
            elem:'#test',
            width:'404px',
            height:'320px',
            full:false,
            autoplay:true,
            arrow:'hover',
            indicator:'outside'
            ,done: function(res, curr, count){

            }
        });
        element.on('tab(docDemoTabBrief)', function(data){ //监听tab选项卡
            //console.log(this); //当前Tab标题所在的原始DOM元素
            //console.log(data.index); //得到当前Tab的所在下标
            //console.log(data.elem); //得到当前的Tab大容器
            if(data.index == 1){
                baseInformFn();
            };
            if(data.index == 2){
                $("#imgcrgg").attr("src",$("#imgcrgg").attr("imgurl"));
            }
            if(data.index == 4){
                if( $("#bidArea").val()=='fuy' && $("#businessType").val()=='1'){
                    if( $("#imgjjgz1").attr("src")==''){
                        $("#imgjjgz1").attr("src",$("#imgjjgz1").attr("imgurl"));
                    }

                }else if($("#bidArea").val()=='fuy' && $("#businessType").val()=='2'){
                    if( $("#imgjjgz2").attr("src")==''){
                        $("#imgjjgz2").attr("src",$("#imgjjgz2").attr("imgurl"));
                    }
                }else if($("#bidArea").val()=='tz' ){
                    if( $("#imgjjgz3").attr("src")==''){
                        $("#imgjjgz3").attr("src",$("#imgjjgz3").attr("imgurl"));
                    }

                }

            }
            if(data.index == 5){
                historyFn();
            };
        });
    });
    //竞价状态初始化
    bidStatus0 = $('#bidStatus0').val();
    setTimeout(function () {
        //若是标的名称为空,则提示
        if($('#objectName').html() == "无竞价信息"){
            layer.msg("没有该标的的竞价信息!");
        }else{
            if(bidStatus0 == 4){
                clearInterval(timer); //关闭计时器
                stopThread();
            }else{
                // timer = setInterval("counterDown()",1000);
            };
        }
    },100);

    //timer = setInterval("counterDown()",1000);
    //    减价点击
    $('#multipleRedu').on('click',function(){
        multipleReduce();
    });
    //    加价点击
    $('#multipleAdd').on('click',function(){
        multipleAdd();
    });

    if("" != bidQuotePrice && bidQuotePrice != null){
        var appreciatRate = (parseFloat(bidQuotePrice) - parseFloat(startPrice))/parseFloat(startPrice)*100;//升值率
        $('#appreciation').html(appreciatRate.toFixed(2));
    }

});

//倒计时
function show_time(count) {
    var time_distance = count;  // 结束时间减去当前时间
    var int_day, int_hour, int_minute, int_second,int_ms;
    if (time_distance >= 0) {
        // 天时分秒毫秒换算
        int_day = Math.floor(time_distance/ 60 / 60 / 24);//天
        int_hour = Math.floor(time_distance / 60 / 60 % 24);//小时
        int_minute = Math.floor(time_distance/ 60 % 60);//分钟
        int_second = Math.floor(time_distance% 60);//秒
        //int_ms = Math.floor(time_distance % 1000);
        //var second = (int_second+int_ms/1000).toFixed(1); //秒毫秒保留一位小数
        // 天时分秒为单数时、前面加零站位
        if(int_day < 10){
            int_day = "0" + int_day;
        }
        if (int_hour < 10){
            int_hour = "0" + int_hour;
        }
        if (int_minute < 10){
            int_minute = "0" + int_minute;
        }
        if(int_second >= 0 && int_second < 10){
            int_second = "0"+int_second;
        }
        //if(second < 10 && second > 0){
        //    second = "0"+second;
        //}
        // 显示时间
        $('#times_d').html(int_day);
        $('#times_h').html(int_hour);
        $('#times_m').html(int_minute);
        $('#times_s').html( int_second);
        //setTimeout("show_time(countVal)",50)

    } else {

        $('#time_d').html($('#time_d').html());
        $('#time_h').html($('#time_h').html());
        $('#time_m').html($('#time_m').html());
        $('#time_s').html($('#time_s').html());

    }
};

//加价倍数触发兼容性
function textFocus(field){
    if(document.addEventListener){  //判断是不是ie7、8
        //field.addEventListener('keydown',changePrice);
        field.addEventListener('keyup',changePrice);
    }else{
        //field.attachEvent('onkeydown',changePrice);
        field.attachEvent('onkeyup',changePrice);
    };
};


//加价
function multipleAdd(){
    multiple = $('#multiple').val();
    if(multiple == undefined || multiple == ''|| multiple == null || isNaN(multiple)){
        num = 1;//如果输入倍数为空，则将其赋值为1
    }else{
        if(parseFloat(multiple) >=0 && parseFloat(multiple) < maxMultiple){
            num ++;
        }else{
            layer.msg('加价倍数最高是'+maxMultiple);
        }
    }
    $('#multiple').val(num);
    priceFn();
    if($('#trad').val() == '1'){//加价
        $('#priceText').val(accAdd(parseFloat(maxPrice), accMul(parseFloat($('#increment').html()), num)));
    }else{//减价
        $('#priceText').val(accSub(parseFloat(maxPrice), accMul(parseFloat($('#increment').html()), num)));
        if(parseFloat($('#priceText').val()) < 0){
            layer.msg('出价值低于0');
            $('#priceText').val('0');
        };
    }

};

//减价
function multipleReduce(){
    multiple = $('#multiple').val();
    if(multiple == undefined || multiple == ''|| multiple == null){
        num = 0;   //如果倍数为空，则将其赋值为0
        layer.msg('已经是最低倍数了');
    }else{
        if(num >0){
            num --;
        }else{
            num = 0;
            layer.msg('已经是最低倍数了');
        }
    }
    $('#multiple').val(num);
    priceFn();
    if($('#trad').val() == '1'){//加价
        $('#priceText').val(accAdd(parseFloat(maxPrice), accMul(parseFloat($('#increment').html()), num)));
    }else{//减价
        $('#priceText').val(accSub(parseFloat(maxPrice), accMul(parseFloat($('#increment').html()), num)));
        if(parseFloat($('#priceText').val()) < 0){
            layer.msg('出价值低于0');
            $('#priceText').val('0');
        }
    }
};
//书写倍数
function changePrice(){
    if(! /^\d+$/.test(this.value)){
        this.value='';
    }
    multiple = parseFloat($('#multiple').val());
    num = parseFloat(multiple); //将输入的倍数赋予给num
    priceFn();
    if(!isNaN(num)){//判断是数字

        if(num >= 0 && num <= maxMultiple){

            if($('#trad').val() == '1'){ //判断模式是否为加价

                $('#priceText').val(accAdd(parseFloat(maxPrice), accMul(parseFloat($('#increment').html()), num)));
            }else{
                $('#priceText').val(accSub(parseFloat(maxPrice), accMul(parseFloat($('#increment').html()), num)));
                if(parseFloat($('#priceText').val()) < 0){
                    layer.msg('出价值低于0');
                    $('#priceText').val('0');
                };
            }
        }else{
            $('#multiple').val(maxMultiple);
            if($('#trad').val() == '1'){ //判断模式是否为加价
                $('#priceText').val(accAdd(parseFloat(maxPrice), accMul(parseFloat($('#increment').html()), maxMultiple)));
            }else{
                $('#priceText').val(accSub(parseFloat(maxPrice), accMul(parseFloat($('#increment').html()), maxMultiple)));
                if(parseFloat($('#priceText').val()) < 0){
                    layer.msg('出价值低于0');
                    $('#priceText').val('0');
                };
            }
            layer.msg('加价倍数最高是'+maxMultiple);
        }

    }else{
        layer.msg('请输入0-'+maxMultiple+'的数字！');
    }

};
//报价判断
function offerBox(priorityVal){//优先权
    applyId = $('#applyId').val();
    quotePrice = $('#priceText').val();//报价
    var multiple = $('#multiple').val();
    if(parseFloat(multiple) > maxMultiple){
        layer.msg('加价倍数最高是'+maxMultiple);
        return;
    }
    if(!isInteger(multiple) || multiple < 0 ){
        layer.msg('加价倍数必须为整数倍');
        return;
    }
    if(null == applyId || "" == applyId){
        layer.msg("报名ID不能为空!");
        return ;
    }
    if(null == objectId || "" == objectId){
        layer.msg("标的ID不能为空!");
        return ;
    }
    if(null == myMark || "" == myMark){
        layer.msg("牌号不能为空!");
        return ;
    }
    if(null == quotePrice || "" == quotePrice){
        layer.msg("报价金额不能为空!");
        return ;
    }
    var nameUrl = contextPath+"/bid/getApplyUserName.do";
    var applyUserName = "";
    $.ajaxSettings.async = false;
    $.post(nameUrl, {"objectId": objectId}, function (result) {
        var data = eval("(" + result + ")");
        if(data.success){
            var userName = data.result;
            applyUserName = userName + ":";
        }
    })
    $.ajaxSettings.async = true;

    layer.confirm(applyUserName+'确定要报价吗？', {
        btn: ['确定','取消'] //按钮
    }, function()
    {
        if(1 == priorityVal){
            quotePrice = $('#higPrice').html();
            $('#priceText').val(quotePrice);
        }
        layer.closeAll('dialog');
        var url = contextPath+"/bid/saveQuote.do";
        $.post(url,{"objectId":objectId,"applyId":applyId,"quotePrice":quotePrice,"priority":priorityVal,"mark":myMark,"multiple":multiple},function(result){
            var data = eval("("+result+")");
            if(data.success){
                var resultMap = data.result;
                var status = resultMap.resultStatus;
                var userId = resultMap.resultUser;
                var userInfoMsg = userId+":";
                if(status == 1 ){
                    layer.msg(userInfoMsg+'报价成功!');
                    //priorityVal = 1 行使优先权 priorityVal = 0 报价
                    if(priorityVal == 1){
                        //单次行使优先权
                        if( $('#priorityWay').val() == 3 && parseInt(priorityCount) >= 1){
                            $('#priorityBtn').attr('disabled','disabled');
                            $('#priorityBtn').parent('div').addClass('grey-button');
                            $('#priorityBtn').parent('div').removeClass('red-button');
                        };
                    };
                }else if(status == 2){
                    layer.msg(userInfoMsg+'报价失败，您的报价低于最新报价!');
                }else if(status == 3){
                    layer.msg(userInfoMsg+'报价失败，您的报价高于最新报价!');
                }else if(status == 4){
                    $('#priceText').val('');
                    layer.msg(userInfoMsg+'报价失败!报价金额必须是整数!');
                }else if(status == 5){
                    layer.msg(userInfoMsg+'您已是最新报价!');
                }else if(status == 6){
                    layer.msg(userInfoMsg+'您不是第一个报价,不能使用起始价报价!');
                }else if(status == 7){
                    layer.msg(userInfoMsg+'报价失败,系统原因!');
                }else if(status == 8){
                    layer.msg(userInfoMsg+'优先权使用次数不足!');
                }else if(status == 9){
                    layer.msg(userInfoMsg+'您的保证金金额不足，报价失败!');
                }else if(status == 10){
                    layer.msg(userInfoMsg+'您没有该标的的优先权报价权限!');
                }else if(status == 11){
                    layer.msg(userInfoMsg+'竞价已经结束，当前报价不能生效，请刷新页面!');
                }else if(status == 12){
                    layer.msg(userInfoMsg+'投标人未审核或审核不通过，不可报价!');
                }else if(status == 13){
                    layer.msg(userInfoMsg+'报价倍数超过最大倍数，报价无效!');
                }else if(status == 14){
                    layer.msg(userInfoMsg+'报价倍数异常，报价无效!');
                }else if(status == 15){
                    layer.msg(userInfoMsg+'报价倍数中带有小数点，报价无效!');
                }else if(status == 51){
                    window.location.reload();
                    alert(userInfoMsg+'投标人没有对应业务类型，不可报价!');
                }else{
                    layer.msg('您没有该标的的优先权报价权限!');
                }
                $('#multiple').val('');
                //priceFn();

            }else{

            }
        });
    });


};
//出价赋值判断
function priceFn(){
    if(maxPrice == undefined || maxPrice == '' || maxPrice == null){
        maxPrice = startPrice;
        // $('#priceText').val(startPrice);//出价值为初始值
    } else{
        $('#priceText').val(maxPrice);//出价值为最大值
    };

};

function counterDown(){
    var enterpriseId = $("#enterpriseId").val();
    applyId = $('#applyId').val();
    var url1 = contextPath+"/bid/dynamicBidInfo.do";
    $.post(url1,{"applyId":applyId,"objectId":objectId,"enterpriseId":enterpriseId},function(result){
        var data = eval("("+result+")");
        if(data.success){
            maxPrice = data.result.MaxPrice;//最高价
            countVal = data.result.count;//倒计时
            if(bidStatus0 != data.result.bidStatus || isPause0 != data.result.isPause ){  //判断初始状态和加载状态是否一致
                                                                                            //判断初始中止状态和加载中止状态是否一致
                window.location.reload();
            };
            //状态判断
            bidStatus = data.result.bidStatus;
            pauseTime = data.result.pauseTime;//中止时间
            isPause = data.result.isPause;//中止状态  1是中止 其他是不中止
            bidder = data.result.bidder;//竞得人
            noBidderReason = data.result.noBidderReason;//无竞得人原因
            priorityCount = data.result.priorityCount;//优先权点击次数
            var timeOut = data.result.timeOut;//报名是否截止
            var isLogin = $('#isLogin').val();//是否登入
            var signUp = $('#signUp').val();//是否报名
             //单次行使优先权
            if( $('#priorityWay').val() == 3 && parseInt(priorityCount) >= 1){
                $('#priorityBtn').attr('disabled','disabled');
                $('#priorityBtn').parent('div').addClass('grey-button');
                $('#priorityBtn').parent('div').removeClass('red-button');
            };

            if($('#higPrice').html() != maxPrice ){
                priceFn();
            }
            if(isLogin == 'true'){
                //已登入
                if(signUp == 'true'){
                    //    已登入已报名
                    var mark = data.result.mark;
                    statusFn(bidStatus,mark);
                }else{
                    //    已登入未报名
                    registra(timeOut ,status);
                }
            }else{
                //    未登入未报名
                if(signUp == 'false'){
                    //    未报名
                    registra(timeOut ,status);
                }
            };
            $('#forHall').html(htmlBOX);
            if(maxPrice == undefined || maxPrice == '' || maxPrice == null){
                $('#higPrice').html();//最高价
                $('#higPrice').siblings('span').hide();//出价人隐藏
                //$('#newPrice').html();//最新加价
                $('#appreciation').html('0');
            } else{
                $('#higPrice').html(maxPrice);//最高价
                $('#higPrice').siblings('span').show();//出价人出现
                //$('#newPrice').html((maxPrice-startPrice).toFixed(2));//最新加价
                var appreciatRate = (parseFloat(maxPrice) - parseFloat(startPrice))/parseFloat(startPrice)*100;//升值率
                $('#appreciation').html(appreciatRate.toFixed(2));
            }
            //优先权按钮判断
            // if(isPriorityEnter == "true"){
            //     $('#priorityBtn').show();
            // }else{
            //     $('#priorityBtn').hide();
            // };
            if( isPause == 1){
                //show_time(pauseTime);//调用计时器
                $('#pauseTime').html(pauseTime);
            }else{
                show_time(countVal);//调用计时器

            }
        }else{
            //关闭计时器并刷新页面
            clearInterval(timer);
            layer.msg(data.error);
            var url = window.location.href;
            if (url.indexOf('&enterpriseId') > -1) {
                url = url.replace('&enterpriseId='+enterpriseId, '');
            }
            window.location.href = url;
        }
    })

};
//状态判断
function statusFn(status,mark){
    if( status == 0){ //已报名但报名未截止
        htmlBOX = '  <span class="price" style="display: block;margin-bottom: 20px;">起始价：'+startPrice+unitP+'</span> <span class="price" style="display: block;margin-bottom: 20px;">保证金：'+marginPrice+'元</span> ';

    } else if(status == 1){  //待竞价
        if(isPause == 1) { //isPause0没有中止 1已经中止
            htmlBOX = '  <div><p class="clearfix"> <span class="pull-left price">起始价：'+startPrice+unitP+'</span><span class="sign-up pull-right">标的竞价状态：<strong id="bidStatus">中止竞价</strong></span></p> <p class="clearfix"> <span class="pull-left price">保证金：'+marginPrice+'元 </span> <span class="sign-up pull-right"  style="margin-right: 0;">标的竞价模式：<strong id="tradName">'+tradName+'</strong></span></p> </div> ';
        }else{
            htmlBOX = '  <div><p class="clearfix"> <span class="pull-left price">起始价：'+startPrice+unitP+'</span><span class="sign-up pull-right" >标的竞价状态：<strong id="bidStatus">待竞价</strong></span></p> <p class="clearfix"> <span class="pull-left price">保证金：'+marginPrice+'元</span> <span class="sign-up pull-right"  style="margin-right: 0;">标的竞价模式：<strong id="tradName">'+tradName+'</strong></span></p> </div> ';
        }
    }else if(status == 2){  //自由竞价

        if(isPause == 1) { //isPause0没有中止 1已经中止
            htmlBOX = '  <div class="clearfix"> <p class="price pull-left">最高报价：<strong id="higPrice"></strong> <em>'+unitP+'</em> <span id="markPerson">出价人：<b id="mark">'+mark+'</b></span> </p> <span class="sign-up pull-right">标的竞价状态：<strong id="bidStatus">中止竞价</strong></span> </div> <div class="clearfix"> <span class="sign-up pull-right"  style="margin-right: 0;">标的竞价模式：<strong id="tradName">'+tradName+'</strong></span> </div> ';

        }else{
            htmlBOX = '  <div class="clearfix"> <p class="price pull-left">最高报价：<strong id="higPrice"></strong> <em>'+unitP+'</em> <span id="markPerson">出价人：<b id="mark">'+mark+'</b></span> </p> <span class="sign-up pull-right">标的竞价状态：<strong id="bidStatus">自由竞价</strong></span> </div> <div class="clearfix"> <span class="sign-up pull-right"  style="margin-right: 0;">标的竞价模式：<strong id="tradName">'+tradName+'</strong></span> </div>';

            // 富阳地区没有资格预审、默认审核通过
            // 审核通过可点击报价和优先权按钮
            if (bidArea == 'fuy' || "审核通过" == $("#qualify1").val()) {
                $("#offerBtn").attr('disabled', false);
                $("#offerBtn").parent('div').removeClass('grey-button');
                $("#offerBtn").parent('div').addClass('red-button');
                $("#priorityBtn").attr('disabled',false);
                $("#priorityBtn").parent('div').removeClass('grey-button');
                $("#priorityBtn").parent('div').addClass('red-button');

            }else {
                $("#offerBtn").attr('disabled', true);
                $("#offerBtn").parent('div').removeClass('red-button');
                $("#offerBtn").parent('div').addClass('grey-button');
                $("#priorityBtn").attr('disabled',true);
                $("#priorityBtn").parent('div').removeClass('red-button');
                $("#priorityBtn").parent('div').addClass('grey-button');
            };

            //单次行使优先权
            if( $('#priorityWay').val() == 3 && parseInt(priorityCount) >= 1){
                $('#priorityBtn').attr('disabled','disabled');
                $('#priorityBtn').parent('div').addClass('grey-button');
                $('#priorityBtn').parent('div').removeClass('red-button');
            };
        };
    }else if(status == 3){ //延时竞价

        if(isPause == 1) { //isPause0没有中止 1已经中止
            htmlBOX = '  <div class="clearfix"> <p class="price pull-left">最高报价：<strong id="higPrice"></strong> <em>'+unitP+'</em> <span id="markPerson">出价人：<b id="mark">'+mark+'</b></span> </p> <span class="sign-up pull-right">标的竞价状态：<strong id="bidStatus">中止竞价</strong></span> </div> <div class="clearfix"> <span class="sign-up pull-right"  style="margin-right: 0;">标的竞价模式：<strong id="tradName">'+tradName+'</strong></span> </div> </div>';
        }else{
            htmlBOX = '  <div class="clearfix"> <p class="price pull-left">最高报价：<strong id="higPrice"></strong> <em>'+unitP+'</em> <span id="markPerson">出价人：<b id="mark">'+mark+'</b></span> </p> <span class="sign-up pull-right">标的竞价状态：<strong id="bidStatus">延时竞价</strong></span> </div> <div class="clearfix"> <span class="sign-up pull-right"  style="margin-right: 0;">标的竞价模式：<strong id="tradName">'+tradName+'</strong></span> </div>';

            // 富阳地区没有资格预审、默认审核通过
            // 审核通过可点击报价和优先权按钮
            if (bidArea == 'fuy' || "审核通过" == $("#qualify1").val()) {
                $("#offerBtn").attr('disabled', false);
                $("#offerBtn").parent('div').removeClass('grey-button');
                $("#offerBtn").parent('div').addClass('red-button');
                $("#priorityBtn").attr('disabled',false);
                $("#priorityBtn").parent('div').removeClass('grey-button');
                $("#priorityBtn").parent('div').addClass('red-button');

            }else {
                $("#offerBtn").attr('disabled', true);
                $("#offerBtn").parent('div').removeClass('red-button');
                $("#offerBtn").parent('div').addClass('grey-button');
                $("#priorityBtn").attr('disabled',true);
                $("#priorityBtn").parent('div').removeClass('red-button');
                $("#priorityBtn").parent('div').addClass('grey-button');
            };

            //单次行使优先权
            if( $('#priorityWay').val() == 3 && parseInt(priorityCount) >= 1){
                $('#priorityBtn').attr('disabled','disabled');
                $('#priorityBtn').parent('div').addClass('grey-button');
                $('#priorityBtn').parent('div').removeClass('red-button');
            };
        };
    }else if(status == 4){  //竞价结束
        clearInterval(timer); //关闭计时器
        if("noBidder" == bidder){
            htmlBox = '  <div class="win-person"> <p style="color: #ff0000;margin-top: 116px;">该标的无竞得人</p><p style="color: #ff0000;">'+noBidderReason+'</p> </div>'
        }else{
            htmlBox = '  <div class="win-person"> <p style="margin-top: 100px;">恭喜</p> <p style="color: #ff0000;">'+bidder+'</p> <p>成功获得成交资格！</p> </div>'
        }
        stopThread();
    }


};

//未报名显示的报名状态
function  registra(statusOne ,status){
    if(status == 4){//报名已截止且竞价已结束
        if("noBidder" == bidder){
            htmlBox = '  <div class="win-person"> <p style="color: #ff0000;margin-top: 116px;">该标的无竞得人</p><p style="color: #ff0000;">'+noBidderReason+'</p> </div>'
        }else{
            htmlBox = '  <div class="win-person"> <p style="margin-top: 100px;">恭喜</p> <p style="color: #ff0000;">'+bidder+'</p> <p>成功获得成交资格！</p> </div>'
        }
    }else if( statusOne == 0 && status == 0){
        //报名未截止竞价未开始
        htmlBOX = '  <span class="price" style="display: block;margin-bottom: 20px;">起始价：'+startPrice+unitP+'</span> <span class="price" style="display: block;margin-bottom: 20px;">保证金：'+marginPrice+'元</span> <div id="times_wrap" class="time_num clearfix"> <span class="pull-left price">距离报名截止：</span> <div class="time_w pull-left"> <b id="times_d" class="time"> 00</b>天 <b id="times_h" class="time"> 00</b>时 <b id="times_m" class="time"> 00</b>分 <b id="times_s" class="time"> 00.0</b>秒 </div> </div> <div class="clearfix red-button" style="margin-top: 70px;"> <button class="layui-button pull-left " id=""  type="button" style="background-position: -58px 16px;text-indent: 1em;"  onclick="loginWindow ();">报名申购</button> <button class="layui-button  pull-left" id="" onclick="helpFn();"  type="button" style="background-position: -58px -22px;text-indent: 1em;" >申购帮助</button> <span class="price-small">如需帮助，请点击阅读<strong style=" cursor: auto;">申购帮助</strong>。</span> </div>'

    }else if(statusOne == 1){//报名已截止
        htmlBOX = '   <span class="price" style="display: block;">起始价：'+startPrice+unitP+'</span> <span class="price" style="display: block;">保证金：'+marginPrice+'元</span> <div class="stop-end"></div> <div class="grey-button" style="display: inline-block"> <button class="layui-button" id="" disabled="disabled"  type="button" style="background-position: -58px 16px;text-indent: 1em;" >报名申购</button> </div> <div class="red-button" style="display: inline-block"> <button class="layui-button" id="" onclick="helpFn();"  type="button" style="background-position: -58px -22px;text-indent: 1em;" >申购帮助</button> </div> <span class="price-small">如已报名，请完成<strong onclick="loginWindow1();">登录</strong>即可进入竞价厅。</span>';
    }
}
function stopThread(){
    var url2 = contextPath+"/bid/stopObjectBid.do";
    $.post(url2,{"objectId":objectId,"applyId":applyId},function(){
        // var data = eval("("+result+")");
        // if(data.success){
        //
        // }else{
        //
        // }

    })
};


function historyFn(){
    var url5 = contextPath+"/bid/historyQuote.do";
    $.post(url5,{"objectId":objectId,"bidState":bidState, "trad":trad},function(result){
        var data = eval("("+result+")");
        var lengthVal = data.result.length;  //数据条数
        var str = '' ;
        var priority = '';
        for(var i = 0; i < lengthVal; i++){
            if(data.result[i].IS_PRIORITY ==1){
                priority ='是';
            }else{
                priority = '否';
            }
              // 富阳地区去掉 优先权竞买人<td width="20%">'+ priority+'</td>
            if(data.result[i].BIDDER == 'yes'){
                str+= '<tr><td width="20%" style="color: #ff0000;">领先</td><td width="20%" style="color: #ff0000;"> '+data.result[i].MARK+'</td><td width="20%" style="color: #ff0000;">'+data.result[i].QUOTE_PRICE+'</td><td width="20%" style="color: #ff0000;">'+data.result[i].QUOTE_TIME+'</td>';
                if (bidArea != 'fuy') {
                    str+= '<td width="20%" style="color: #ff0000;">'+ priority+'</td>';
                }
                str+= '</tr>';

            }else{
                str+= '<tr><td width="20%">出局</td><td width="20%">'+data.result[i].MARK+'</td><td width="20%">'+data.result[i].QUOTE_PRICE+'</td><td width="20%">'+data.result[i].QUOTE_TIME+'</td>';
                if (bidArea != 'fuy') {
                    str+= '<td width="20%">'+ priority+'</td>';
                }
                str+= '</tr>';

            }

        }
        $('#history tbody').html(str);
        $('.history tr:even').find('td').css('background','#e7f3ff');
        // $('.history tr').eq(1).find('td').css('color','#ff0000');


    })
};

//登入弹窗进入申购流程/报名申购
function loginWindow () {

    var isLogin = $('#isLogin').val();//是否登入
    if("true" == isLogin){
        var url = contextPath+"/toData/getSessionEnterId.do";
        $.post(url,{},function(result) {
            var data = eval("(" + result + ")");
            var enterId = data.result.enterId;
            var t9Url = $('#t9Url1').val();
            window.parent.location.href = t9Url +"subsys/pb/common/signPromise.jsp?objectId=" + objectId + "&enterId=" + enterId;
        });
    }else{
        // 判断登陆状态
        var loginStatus = checkLoginStatus();

        if("Y" == loginStatus){
            layer.open({
                //shade:0,
                type: 2,
                area: ['500px', '300px'],
                fix: false, //不固定
                resize:false,
                skin:'layer-ext-vitality',
                title: ['<em></em>', false],
                content:contextPath+'/page/loginWindow.do?&pageUrl=hall/bid-view/login-remind-window'
            });
            return ;
        }
        bidType = $("#bidType").val();
        var isSendSms  = $("#isSendSms").val();
        layer.open({
            //shade:0,
            type: 2,
            area: ['491px', '369px'],
            fix: false, //不固定
            resize:false,
            skin:'layer-ext-vitality',
            title: ['<em></em>', false],
            content:contextPath+'/page/loginWindow.do?&pageUrl=hall/bid-view/login-window-two&bidType='+bidType+'&isSendSms='+isSendSms
        });
    }

};
//登入
function loginWindow1 () {

    // 判断登陆状态
    var loginStatus = checkLoginStatus();

    if("Y" == loginStatus){
        layer.open({
            //shade:0,
            type: 2,
            area: ['500px', '300px'],
            fix: false, //不固定
            resize:false,
            skin:'layer-ext-vitality',
            title: ['<em></em>', false],
            content:contextPath+'/page/loginWindow.do?&pageUrl=hall/bid-view/login-remind-window'
        });
        return ;
    }
    var signUp = $("#signUp").val();
    //验证码
    var isSendSms  = $("#isSendSms").val();
    layer.open({
        //shade:0,
        type: 2,
        area: ['491px', '369px'],
        fix: false, //不固定
        resize:false,
        skin:'layer-ext-vitality',
        title: ['<em></em>', false],
        content:contextPath+'/page/loginWindow.do?&pageUrl=hall/bid-view/login-window&signUp='+signUp+'&isSendSms='+isSendSms
    });
};


//申购帮助
function helpFn(){
    var md5 = "";
    if (bidArea == 'fuy') {
        md5 = "EB7BE930047D18AE1E83129AD255BBD9";
    } else if (bidArea == 'tz') {
        //以前老模板
        //md5 = "D1CB6E07EDB2DAD4111DD4722888E635";
        md5 = "C1BCF999DE804214FB494E57A1C98B5C";
    }
    window.location.href = fileServerUrl+"down?md5="+md5+"&bucket=2";
}
//基础信息
function baseInformFn(){
    var url = contextPath+"/bid/objectBaseInfo.do";
    $.post(url,{"objectId":objectId},function(result){
        var data = eval("("+result+")");
        var json = data.result;
        var objectType = json.object_type;
        var objStateYear = nullToStrNum(json.objStateYear);
        var objStateMounth = nullToStrNum(json.objStateMounth);
        var objStateDay = nullToStrNum(json.objStateDay);
        var objStateStr1 = "使用至：" + objStateYear + " 年 " + objStateMounth + " 月 " + objStateDay + " 日 ";
        var objStateStr = nullToStrNum(json.objState) == "1" ? objStateStr1 : "空置";
        var fileServerUrl = nullToStr(json.fileServerUrl);
        var fileList = json.fileList;
        var remark =nullToStr(json.remark);
        var oldRemark =nullToStr(json.oldRemark);
        var carRemark =nullToStr(json.carRemark);
        var leaseRemark =nullToStr(json.leaseRemark);
        var transactionInfo =nullToStr(json.transactionInfo);
        console.log(fileServerUrl,fileList)
        var str12 = getFileInfoListStr(fileServerUrl,fileList);
        var str,str1,str2,str3,str4,str5,str6,str7,str8,str9,str10,str11;
        str = "<tr><td width='17%'>标的编号：</td><td width='33%'>" + nullToStr(json.objectCode) + "</td><td width='17%'>标的名称：</td><td width='33%'>"+nullToStr(json.objectName)+"</td></tr>" +
            "<tr><td width='17%'>标的状态：</td><td width='33%'>"+objStateStr+"</td><td width='17%'>权证信息：</td><td width='33%'>"+nullToStr(json.warrantInfo)+"</td></tr>" +
            "<tr><td width='17%'>挂牌价格：</td><td width='33%'>"+nullToStrNum(json.startPrice)+"</td><td width='17%'>优先权：</td><td width='33%'>"+nullToStr(json.isPriority)+"</td></tr>" +
            "<tr><td width='17%'>挂牌开始时间：</td><td width='33%'>"+nullToStr(json.noticeStartTime)+"</td><td width='17%'>挂牌截止时间：</td><td width='33%'>"+nullToStr(json.noticeEndTime)+"</td></tr>" ;
        if("" != remark && remark != null){
            str +=  "<tr><td width='17%'>其他说明：</td><td  width='83%' colspan = '3'>"+nullToStr(json.remark)+"</td></tr>"
        }
        str +=   "<tr><td width='17%'>标的位置：</td><td  width='82%' colspan = '3'>"+nullToStr(json.objectAddress)+"</td></tr>";

        str1 ="<tr><td width='17%'>租赁期限：</td><td width='33%'>"+nullToStr(json.leaseTime)+"</td><td width='17%'>出租类别：</td><td width='33%'>"+nullToStr(json.leaseType)+"</td></tr>" +
            "<tr><td width='17%'>出租用途：</td><td width='33%'>"+nullToStr(json.leaseWay)+"</td><td width='17%'>出租面积：</td><td width='33%'>"+nullToStrNum(json.leaseArea)+"</td></tr>" +
            "<tr><td width='17%'>出租方案：</td><td width='33%' colspan='3'>"+nullToStr(json.leasePlan)+"</td></tr>";

        if("" != leaseRemark && leaseRemark != null){
            str1 +="<tr><td width='17%'>其他说明：</td><td width='33%' colspan='3'>"+nullToStr(json.leaseRemark)+"</td></tr>";;
        }

        str2 ="<tr><td width='17%'>机动车品牌：</td><td width='33%'>" + nullToStr(json.carType) + "</td><td width='17%'>原车牌号码：</td><td width='33%'>"+nullToStr(json.carCode)+"</td></tr>" +
            "<tr><td width='17%'>车架号：</td><td width='33%'>"+nullToStr(json.carFrameNumber)+"</td><td width='17%'>注册日期：</td><td width='33%'>"+nullToStr(json.carRegistTime)+"</td></tr>" +
            "<tr><td width='17%'>发证日期：</td><td width='33%'>"+nullToStr(json.carIssuanceTime)+"</td><td width='17%'>使用年限：</td><td width='33%'>"+nullToStrNum(json.carServiceLife)+"</td></tr>" +
            "<tr><td width='17%'>排量：</td><td width='33%'>"+nullToStr(json.carDisplacement)+"</td><td width='17%'>颜色：</td><td width='33%'>"+nullToStr(json.carColor)+"</td></tr>" +
            "<tr><td width='17%'>行驶公里数：</td><td width='33%'>"+nullToStrNum(json.carDrivingKlim)+"</td><td width='17%'>年检至：</td><td width='33%'>"+nullToStr(json.carMot)+"</td></tr>" +
            "<tr><td width='17%'>交强险：</td><td width='33%'>"+nullToStr(json.carCompInsurance)+"</td><td width='17%'>商业险：</td><td width='33%'>"+nullToStr(json.carCommInsurance)+"</td></tr>";

        if("" != carRemark && carRemark != null){
            str2 += "<tr><td width='17%'>其他说明：</td><td width='33%'>"+nullToStr(json.carRemark)+"</td></tr>";
        }

        str3 ="<tr><td width='17%'>名称：</td><td width='33%'>" + nullToStr(json.oldName) + "</td><td width='17%'>规格型号：</td><td width='33%'>"+nullToStr(json.oldType)+"</td></tr>" +
            "<tr><td width='17%'>数量：</td><td width='33%'>"+nullToStrNum(json.oldNum)+"</td><td width='17%'>计量单位：</td><td width='33%'>"+nullToStr(json.oldUints)+"</td></tr>";

        if("" != oldRemark && oldRemark != null){
            str3 +=  "<tr><td width='17%'>其他说明：</td><td width='33%' colspan='3'>"+nullToStr(json.oldRemark)+"</td></tr>";;
        }

        str4 = "<tr><td width='17%'>地址：</td><td width='33%'>" + nullToStr(json.homeAddress) + "</td><td width='17%'>建筑面积：</td><td width='33%'>"+nullToStrNum(json.homeBuildArea)+"</td></tr>" +
            "<tr><td width='17%'>土地面积：</td><td width='33%'>"+nullToStrNum(json.homeLandArea)+"</td><td width='17%'>建筑结构：</td><td width='33%'>"+nullToStr(json.homeBuildStruct)+"</td></tr>" +
            "<tr><td width='17%'>土地类型：</td><td width='33%'>"+nullToStr(json.homeLandType)+"</td><td width='17%'>建成时间：</td><td width='33%'>"+nullToStr(json.homeBuiltTime)+"</td></tr>" +
            "<tr><td width='17%'>使用年限：</td><td width='33%'>"+nullToStr(json.homeServiceLife)+"</td><td width='17%'>已用年限：</td><td width='33%'>"+nullToStrNum(json.homeUsedTime)+"</td></tr>" +
            "<tr><td width='17%'>租赁情况：</td><td width='33%'>"+nullToStr(json.homeLeaseStatus)+"</td><td width='17%'>权证编号：</td><td width='33%'>"+nullToStr(json.homeWarrantNum)+"</td></tr>" +
            "<tr><td width='17%'>规划用途：</td><td width='33%'>"+nullToStr(json.homePlan)+"</td><td width='17%'>配套设施：</td><td width='33%'>"+nullToStr(json.homeSupportFacil)+"</td></tr>";

        str5 ="<tr><td width='17%'>重大事项及披露内容：</td><td width='83%'>" + nullToStr(json.majorOtherItem) + "</td></tr>"+
            "<tr class='trStyle'><td width='17%' ></td><td width='83%' ></td></tr>" +
            "</tr><td width='17%'>竞买人应提交的资料：</td><td width='83%'>"+nullToStr(json.bidderDataUpload)+"</td></tr>" +

            "<tr><td width='17%'>资料提交方式：</td><td width='83%'>"+nullToStr(json.dataUploadWay)+"</td></tr>";

        str6 ="<tr><td width='17%'>交易方式：</td><td width='33%'>" + nullToStr(json.transactionType) + "</td><td width='17%'>报价方式：</td><td width='33%'>"+nullToStr(json.offerType)+"</td></tr>" ;

        if("" != transactionInfo && transactionInfo != null){
            str6 += "<tr><td width='17%'>其他说明：</td><td width='33%' colspan='3'>"+nullToStr(json.transactionInfo)+"</td></tr>";
        }

        str7 ="<tr><td width='17%'>审核类型：</td><td width='33%'>" + nullToStr(json.qualExamWay) + "</td><td width='17%'>审核方式：</td><td width='33%'>"+nullToStr(json.reviewType)+"</td></tr>" +
            "<tr><td width='17%'>是否允许联合：</td><td width='33%'>"+nullToStr(json.isUnion)+"</td></tr>" +
            "<tr><td width='17%'>资格条件：</td><td width='33%' colspan='3'>"+nullToStr(json.condition)+"</td></tr>";

        str8 ="<tr><td width='17%'>交易保证金：</td><td width='33%'>" + nullToStrNum(json.cmcostAmount) + "</td><td width='17%'>履约保证金：</td><td width='33%'>"+nullToStrNum(json.prefbond)+"</td></tr>" +
            "<tr><td width='17%'>交纳截止时间：</td><td width='33%'>"+nullToStr(json.depositPayEndTime)+"</td><td width='17%'>交纳方式：</td><td width='33%'>"+nullToStr(json.payway)+"</td></tr>" +
            "<tr><td width='17%'>保证金退回说明：</td><td width='33%' colspan='3'>"+nullToStr(json.refundReason)+"</td></tr>";

        str9 ="<tr><td width='17%'>联系人：</td><td width='33%'>" + nullToStr(json.transferorMan) + "</td><td width='17%'>联系电话：</td><td width='33%'>"+nullToStr(json.transferorPhone)+"</td></tr>" +
            "<tr><td width='17%'>联系地址：</td><td width='33%'>"+nullToStr(json.transferorAddr)+"</td></tr>";

        str10 ="<tr><td width='17%'>联系人：</td><td width='33%'>" + nullToStr(json.linkName) + "</td><td width='17%'>联系电话/传真：</td><td width='33%'>"+nullToStr(json.linkPhone)+"</td></tr>" +
            "<tr><td width='17%'>联系地址：</td><td width='33%'>"+nullToStr(json.linkAddr)+"</td></tr>";

        str11 ="<tr><td width='17%'>重要提示：</td><td width='80%'>" + nullToStr(json.importantTips) + "</td></tr>";
        $('#informTable').html(str);
        if(objectType == 1){
            $("#projectType").html(str1)
        }else if(objectType == 2){
            $("#projectType").html(str2)
        }else if(objectType == 3){
            $("#projectType").html(str3)
        }else if(objectType == 4){
            $("#projectType").html(str4)
        }
        $("#termsOfExchange").html(str5);
        $("#disposalScheme").html(str6);
        $("#qualification").html(str7);
        $("#payTheRules").html(str8);
        $("#client").html(str9);
        $("#organizer").html(str10);
        $("#importantNote").html(str11);
        $("#fileDownLoad").html(str12);
        //基本信息表格样式
        //$('.inform-table tr:even').find('td').css('background','#e7f3ff');
        $('.inform-table tr td:odd').css({'color':'#000','font-size':'14px','font-family':'宋体','line-height':'22px'});
        $('.inform-table tr td:even').css({'color':'#333','font-size':'18px','font-family':'微软雅黑','font-weight':'bold'});
        $('.inform-table tr.trStyle td').css("cssText","height:10px")
    });
};

function nullToStr(str) {
    if (str == null || str == undefined) {
        return "";
    }
    if (str.indexOf('\r\n') > -1) {
        return str.replace(new RegExp('\r\n',"g") ,'</br>');
    }
    return str;
}

function nullToStrNum(str) {
    if (str == null || str == undefined) {
        return "0";
    }
    return str;
}

function accDiv(arg1,arg2){
    var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
    m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
    resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
    return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
}

function accAdd(arg1,arg2){
    try{
        arg1 = arg1.toString();
    } catch (e) {
        arg1 = "0";
    }
    try{
        arg2 = arg2.toString();
    } catch (e) {
        arg2 = "0";
    }
    var arg1Arr = arg1.split("."), arg2Arr = arg2.split("."), d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
        d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
    var maxLen = Math.max(d1.length, d2.length);
    var m = Math.pow(10, maxLen);
    var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
    var d = arguments[2];
    return typeof d === "number" ? Number((result).toFixed(d)) : result;
}

/**
 函数：减法函数，用来得到精确的减法结果
 说明：函数返回较为精确的减法结果。
 参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数
 调用：Calc.Sub(arg1,arg2)
 返回值：两数相减的结果
 */
function accSub(arg1, arg2) {
    return accAdd(arg1, -Number(arg2), arguments[2]);
}

function accMul(arg1,arg2)
{
    var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
    m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
    resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
    return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
}


//文件下载
function downfile(fileServerUri,md5){
    var url = window.location.href;
    try
    {
        window.location.href = fileServerUri+"down?md5="+md5+"&bucket=2";
    }catch(ex){
        alert(ex);
        window.location.href = url;
    }
}

function getFileInfoListStr(fileServerUri,list) {
    var str = "";
    if(list){
        for(var i = 0;i<list.length;i++){  //循环LIST
            var fileName = list[i].fileName;//获取LIST里面的对象
            var MD5 = list[i].MD5;//获取LIST里面的对象
            str +="<tr><td class='name-title' width='80%'>"+fileName+"</td>";
            str +="<td  width='17%' >";
            str +="<input class='download' type='button' value='下载' onclick=\"downfile('"+fileServerUri+"','"+MD5+"')\"/></td></tr>";
        }
    }
    return str;
}

function checkLoginStatus(){
    var loginStatus = "N";
    var checkUrl = contextPath+'/page/checkLoginStatus.do';

    $.ajax({
        type: "post",
        url: checkUrl,
        data: {"num":""},
        async: false,
        success: function(result){
            var data = eval("(" + result + ")");
            if(data.success){
                loginStatus = data.result;
            }
        },
        error:function(res){
        }
    });
    return loginStatus;
}
//判断整数
function isInteger(obj) {
    return Math.floor(obj) == obj;
}