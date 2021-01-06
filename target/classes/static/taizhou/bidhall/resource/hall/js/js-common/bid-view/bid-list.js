var length;//项目条数
var layer;//弹窗
var table;//表格
var laypage;
var element;
var enterId;
var str;//数据
var imgUrl;//图片地址
var strUrL;//图片路径
var bidState;//一次竞价多次竞价
var offsets = 1;//页码
var limits = 6;//每页6条
var c = '';
var d = "";
var depositStatus;//报名状态值
var tab = 0; 
var arry = [5,10,15,20];
var total = '';
var objectName = '';//项目名称-保证金
var depositStatus1 = '' ;//保证金状态
var applyEndTimeStart = '';//报名开始时间
var applyEndTimeEnd = '';//报名截止时间
var resourceType = '';// 项目类型
var itemName = '';// 项目名称
var listObjectName = '';// 标的名称-列表
var objectTimeStart = '';// 竞价开始时间
var objectTimeEnd = '';// 竞价开始时间
var laydate = '';
var pageIdx = 0;
$(function(){
    d = $('.layui-tab-list0');
    layui.config({
        base: contextPath+'/resource/commonBaseResource/plus/'
    }).extend({
        panel: 'panel/js/panel',
        toolbar: "toolbar/toolbar"
    });
    enterId = $("#enterpriseId").val(); //企业id
    layui.use(['layer','table','element','laypage','laydate'], function() {
        table = layui.table;
        layer = layui.layer;
        element = layui.element;
        laypage = layui.laypage;
        laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#objectTimeStart', //指定元素
            istime: true,
            format:'yyyy年MM月dd日 HH时mm分',
            type: 'datetime',//这是显示时分秒的
            choose: function(dates){ //选择好日期的回调
            }
        });
        //执行一个laydate实例
        laydate.render({
            elem: '#objectTimeEnd', //指定元素
            istime: true,
            format:'yyyy年MM月dd日 HH时mm分',
            type: 'datetime',//这是显示时分秒的
            choose: function(dates){ //选择好日期的回调
            }
        });
        element.on('tab(docDemoTabBrief)', function(data){ //监听tab选项卡
            // 报名状态conditions
            $('#conditions').hide();
            // 查询条件栏
            $('#selectTab').show();
            selectBtnReset();
            //页面初始设置
            offsets = 1;
            pageIdx = data.index;
            if(data.index == 1){
                //每页5条
                limits = 5;
                arry = [5,10,15,20];
                $('#conditions').show();
                enterId = $("#enterpriseId").val(); //企业id
                $('#conditions span').removeClass('active');
                depositStatus = '';
                tab = 1;
                if( enterId == '' || null == enterId || "null" == enterId){
                    loginWindow ();
                }else{
                    c = enterId;
                    d = $('.layui-tab-list1');
                    informFn(c,d);
                }
            }else if(data.index == 0){
                //每页5条
                limits = 5;
                arry = [5,10,15,20];
                depositStatus = '';
                c = '';
                d = $('.layui-tab-list0');
                tab = 0;
                informFn(c,d);
            }else if(data.index == 2){
                $('#selectTab').hide();
                //每页10条
                limits = 10;
                arry = [10,20,30,40];
                enterId = $("#enterpriseId").val(); //企业id
                objectName ='';
                depositStatus1 = '';
                applyEndTimeStart = '';
                applyEndTimeEnd = '';
                tab = 2;
                $('#depositStatus1').find("option").eq(0).attr("selected",true);
                if( enterId == '' || null == enterId || "null" == enterId){
                    loginWindow ();
                }else{
                    marginFn(enterId);
                }
            }
        });
        //列表页初始化
        informFn('',$('.layui-tab-list0'));

    });
    //保证金搜索
    $('#search').on('click',function(){
        offsets = 1;
        objectName = $('#objectName').val();
        depositStatus1 = $('#depositStatus1 option:selected').attr('value');
        applyEndTimeStart = $('#applyEndTimeStart').val();
        applyEndTimeEnd = $('#applyEndTimeEnd').val();
        marginFn(enterId);
    });
    //刷新
    $('#refresh').on('click',function () {
        $('#depositStatus1').find("option").eq(0).attr("selected",true);
        objectName = '';
        depositStatus1 ='';
        applyEndTimeStart ='';
        applyEndTimeEnd = '';
        marginFn(enterId);
    });
    $('#conditions span').on('click',function(){
        $(this).toggleClass('active').siblings('span').removeClass('active');
        depositStatus = '';
        offsets = 1;
        limits = 5;
        if($(this).is('.active')){
            depositStatus = $(this).attr('depositStatus');
        }
        enterId = $("#enterpriseId").val(); //企业id
        c = enterId;
        d = $('.layui-tab-list1');
        informFn(c,d)
    });
    // 查询绑定事件
    $('#selectBtn').on('click',function(){
        selectBtnFn();
    });

    // 重置
    $('#resetBtn').on('click',function(){
        selectBtnReset();
        selectBtnFn();
    });

    // 高级查询
    $('#otherBtn').on('click',function(){
        $("#selectTab tbody").toggle(100,function () {
            $("#objectTimeStart").val('');
            $("#objectTimeEnd").val('');
        });
    });

    function selectBtnReset() {
        // $("#resourceType").get(0).selectedIndex=0;
        // $("#itemName").val('');
        $("#listObjectName").val('');
        // $("#objectTimeStart").val('');
        // $("#objectTimeEnd").val('');
    }

    // 查询
    function selectBtnFn(){
        $(this).toggleClass('active').siblings('span').removeClass('active');

        depositStatus = '';
        offsets = 1;
        limits = 3;
        resourceType = $("#resourceType").val();        // 项目类型
        itemName = $("#itemName").val();                 // 项目名称
        listObjectName = $("#listObjectName").val();    // 标的名称-列表
        objectTimeStart = $("#objectTimeStart").val(); // 竞价开始时间
        objectTimeEnd = $("#objectTimeEnd").val();      // 竞价开始时间
        enterId = $("#enterpriseId").val(); //企业id
        // if (pageIdx == 1) {
        //     depositStatus = $(this).attr('depositStatus');
        // }
        if($('#conditions span').is('.active')){
            depositStatus = $('.active').attr('depositStatus');
        }
        c = enterId;
        d = $('.layui-tab-list'+pageIdx);
        informFn(c,d)
    }

    //列表页初始化
    // $('#num').on('change',function(){
    //     a = offset;
    //     b = limit;
    //     informFn(a,b,c,d);
    // });
});
//offset:页码标志,limit:每页显示多少条数据
function informFn(enterIds,obj){
    var url = "/jingjia/getItemInfo";
    var data = {};


    data = {"rp":limits,"page":offsets,"depositStatus":depositStatus,"resourceType":resourceType,"itemName":itemName,
        "listObjectName":listObjectName,"objectTimeStart":objectTimeStart,"objectTimeEnd":objectTimeEnd};

    if(null != enterIds && "" != enterIds){
        data.enterId = enterIds;
    }

    $.post(url,data,function(result){
        console.log(result.length);
        if(result.length!=0){
            console.log(result);
             str = result;
            if( str  == null){
                obj.html("");
                arry = [5,10,15,20];
                paged(0,arry);
                // $("#total").html("");
                // $("#num1").html("");
                // $("#num2").html("");
                // $("#num3").html("0");
                // $("#box").hide();
                return;
            };
            //显示总数
            total = str[0].count;
            // $("#total").html(count);
            // totalPage = Math.ceil(count/$("#num").val());
            // $("#num1").html(null == offsets ? 1:offsets);
            // $("#num2").html(totalPage);
            length = str.length;
            var urlOne;
            if(null != obj){
                obj.html("");
            }
            if(length > 0) {
                // if(obj.selector == '.layui-tab-list0'){
                    var bidList = ' <div class="item-list">  <div class="item-box clearfix"><div class=" item-list-type pull-left" id="itemList0' + [i+1] + '"> <ul class="clearfix itemList-ul">  </ul> </div></div> </div>';
                    obj.append(bidList);
                    var bidSmall = ""; //标的
                    for (var i = 0; i < length; i++) {
                        imgUrl = str[i].imgs[0];//图片地址
                        console.log(imgUrl);



                        // for (var j = 0; j < str[i].objects.length; j++) {
                            chooNull(i,i);
                            bidState = str[i].BID_STATE;//BID_STATE 1一次性报价,2多次报价
                            if(bidState == 1){
                                urlOne = '/jsps/JingJiaDaTing/bidPageJump.jsp?pageUrl=hall/bid-view/bidding-hall-one&objectId='+str[i].objectId+'&enterpriseId='+enterId;
                            }else{
                                urlOne = '/jsps/JingJiaDaTing/bidPageJump.jsp?pageUrl=hall/bid-view/bidding-hall&objectId='+str[i].objectId+'&enterpriseId='+enterId;
                            }
                            if (str[i].bidStatus == 0 || str[i].bidStatus == 1 ) {
                                bidSmall += '<li style="margin-bottom: 30px"> <a href="'+urlOne+'"> <img  src="'+imgUrl+'"> <span class="item-status">未进行</span> </a> <span class="item-name"><a href="javascript:;" title="'+ str[i].objectName +'">' + str[i].objectName + '</a></span> <div class="item-infor"> <div> <span>起始价：<strong>' + str[i].startPrice + '</strong>' + str[i].unit + '<em></em></span> <span>保证金：<em>' + str[i].cmcostAmount + '</em>元</span> <span>竞价开始时间：<b>' + str[i].bidStartTime + '</b></span><h6 class="serial-number">' + [i+1]  + '</h6></div> <p style="display: none;"> ' + str[i].applyNum + '人报名</p> </div> </li>';
                            } else if (str[i].bidStatus == 2 || str[i].bidStatus == 3) {
                                bidSmall += '<li style="margin-bottom: 30px"> <a href="'+urlOne+'"> <img  src="'+imgUrl+'"> <span class="item-status">正在进行</span> </a> <span class="item-name"><a href="javascript:;" title="'+ str[i].objectName +'">' + str[i].objectName + '</a></span> <div class="item-infor"> <div> <span><span>当前价：<strong>' + str[i].closePrice + '</strong>' + str[i].unit + '</span></span><span>起始价：<strong>' + str[i].startPrice + '</strong>' + str[i].UNIT + '<em></em></span><span><em>（' + str[i].NUM + ' 次出价）</em></span><h6 class="serial-number">' + [i+1]  + '</h6></div> <p style="display: none;">' + str[i].applyNum + '人报名</p> </div> </li>';

                            } else {
                                bidSmall += '<li style="margin-bottom: 30px"> <a href="'+urlOne+'"> <img  src="'+imgUrl+'"> <span class="item-status">竞价结束</span> </a> <span class="item-name"><a href="javascript:;" title="'+ str[i].objectName +'">' + str[i].objectName + '</a></span> <div class="item-infor"> <div><span>竞得单位：<b>' + str[i].BID_NAME + '</b></span> <span>成交价：' + str[i].closePrice + '' + str[i].UNIT + '<em>（' + str[i].NUM + '次出价）</em></span><span>成交时间：<em>' + str[i].bidDelayTime + '</em></span><h6 class="serial-number">' + [i+1]  + '</h6></div> <p style="display: none;"> ' + str[i].applyNum + '人报名</p> </div> </li>';
                            }

                        // }

                    }
                        obj.find('.itemList-ul').eq(0).html(bidSmall);
                /*}else if(obj.selector == '.layui-tab-list1'){
                    for (var i = 0; i < length; i++) {
                        var bidList = ' <div class="item-list"> <span class="title-name">项目名称：' + str[i].item_name + '</span> <div class="item-box clearfix"><span class=" arrow-rl arrow-left pull-left"  id="arrowLeft1' + [i] + '"></span> <div class=" item-list-type pull-left" id="itemList1' + [i] + '"> <ul class="clearfix itemList-ul">  </ul> </div> <span  class=" arrow-rl arrow-right pull-right" style="background-position-x:-53px;left: 1120px; "  id="arrowRight1' + [i] + '" ></span> </div> </div>';
                        var bidSmall = ""; //标的
                        obj.append(bidList);
                        // for (var j = 0; j < str[i].objects.length; j++) {
                            chooNull(i,i);
                            bidState = str[i].BID_STATE;//BID_STATE 1一次性报价,2多次报价
                            if(str[i].depositStatus == 0 ){
                                var depositStatus = '报名中';
                            }else if(str[i].depositStatus == 1 ){
                                var depositStatus = '报名成功';
                            }
                            if(bidState == 1){
                                urlOne = contextPath+'/page/bidPageJump.do?pageUrl=hall/bid-view/bidding-hall-one&objectId='+str[i].seqId+'&enterpriseId='+enterId;
                            }else{
                                urlOne = contextPath+'/page/bidPageJump.do?pageUrl=hall/bid-view/bidding-hall&objectId='+str[i].seqId+'&enterpriseId='+enterId;
                            }

                            //台州的隐藏报名人数
                            if (str[i].bidStatus == 0 || str[i].bidStatus == 1 ) {
                                bidSmall += '<li> <a href="'+urlOne+'" target="_blank"> <img src="'+strUrL+'"> <span class="item-status">未进行</span> </a> <span class="item-name"><a href="javascript:;" title="'+ str[i].objectName +'">' + str[i].objectName + '</a></span> <div class="item-infor"> <div> <span>起始价：<strong>' + str[i].startPrice + '</strong>' + str[i].UNIT + '<em></em></span> <span>保证金：<em>' + str[i].cmcostAmount + '</em>元</span> <span>竞价开始时间：<b>' + str[i].bidStartTime + '</b></span><h6 class="serial-number">' + str[i].orderNum  + '</h6><h5 class="state">'+depositStatus+'</h5></div> <p style="display: none;"> ' + str[i].applyNum + '人报名</p> </div> </li>';

                            } else if (str[i].bidStatus == 2 || str[i].bidStatus == 3) {
                                bidSmall += '<li> <a href="'+urlOne+'" target="_blank"> <img src="'+strUrL+'"> <span class="item-status">正在进行</span> </a> <span class="item-name"><a href="javascript:;" title="'+ str[i].objectName +'">' + str[i].objectName + '</a></span> <div class="item-infor"> <div> <span><span>当前价：<strong>' + str[i].closePrice + '</strong>' + str[i].UNIT + '</span></span><span>起始价：<strong>' + str[i].startPrice + '</strong>' + str[i].UNIT + '<em></em></span><span><em>（' + str[i].NUM + ' 次出价）</em></span><h6 class="serial-number">' + str[i].orderNum  + '</h6><h5 class="state">'+depositStatus+'</h5></div> <p style="display: none;">' + str[i].applyNum + '人报名</p> </div> </li>';
                            } else {
                                bidSmall += '<li> <a href="'+urlOne+'" target="_blank"> <img src="'+strUrL+'"> <span class="item-status">竞价结束</span> </a> <span class="item-name"><a href="javascript:;" title="'+ str[i].objectName +'">' + str[i].objectName + '</a></span> <div class="item-infor"> <div><span>竞得单位：<b>' + str[i].BID_NAME + '</b></span> <span>成交价：' + str[i].closePrice + '' + str[i].UNIT + '<em>（' + str[i].NUM + '次出价）</em></span><span>成交时间：<em>' + str[i].bidDelayTime + '</em></span> <h6 class="serial-number">' + str[i].orderNum  + '</h6><h5 class="state">'+depositStatus+'</h5></div> <p style="display: none;"> ' + str[i].applyNum + '人报名</p> </div> </li>';
                            }
                        // }
                        obj.find('.itemList-ul').eq(i - 1).html(bidSmall);

                    }
                    arrowFn(obj.selector);

                }*/
            }
            var olineHeight = $('.item-name').css("line-height");
            for(var i = 0; i < $('.item-name').length;i++){
                var oLi = $('.item-name').eq(i);
                var oHeight = Math.round( oLi.find('a').height());
                var rowNum=oHeight/parseFloat(olineHeight);
                //行数大于2时，加上...样式
                if ( rowNum > 2) {
                    oLi.addClass('item-name1');
                }
            }
            paged(total,[3,6,9,12]);
        }else{
            obj.html("");
            paged(0,[3,6,9,12]);
        }
    })
};

function arrowFn(name){
    for(var n = 0; n < length ;n++){

        var liLength = $(name).find($('.item-list')).eq(n-1).find('li').length;//每个项目的标的条数
        if(liLength > 3){
            $(name).find($('.item-list-type')).eq(n-1).css('margin-left','4px');
           $(name).find($('.item-list')).eq(n-1).find('.arrow-rl').show();//对应的项目显示箭头
            nameFn(name,n);
        }else{
            $(name).find($('.item-list-type')).eq(n-1).css('margin-left','54px');
            $(name).find($('.item-list')).eq(n-1).find('.arrow-rl').hide();//对应的项目隐藏箭头
        }
    }

};
function nameFn(name,n){
    var scrollPic_02 = new ScrollPic();
   if(name == '.layui-tab-list0'){
       scrollPic_02.scrollContId   = "itemList0"+n+""; //内容容器ID
       scrollPic_02.arrLeftId      = "arrowLeft0"+n+"";//左箭头ID
       scrollPic_02.arrRightId     = "arrowRight0"+n+""; //右箭头ID
   }else{
       scrollPic_02.scrollContId   = "itemList1"+n+""; //内容容器ID
       scrollPic_02.arrLeftId      = "arrowLeft1"+n+"";//左箭头ID
       scrollPic_02.arrRightId     = "arrowRight1"+n+""; //右箭头ID
   }


    scrollPic_02.frameWidth     = 1059;//显示框宽度
    scrollPic_02.pageWidth      = 353; //翻页宽度

    scrollPic_02.speed          = 2; //移动速度(单位毫秒，越小越快)
    scrollPic_02.space          = 10; //每次移动像素(单位px，越大越快)
    scrollPic_02.autoPlay       = false; //自动播放
    scrollPic_02.autoPlayTime   = 3; //自动播放间隔时间(秒)
    scrollPic_02.initialize(); //初始化

};
function chooNull(i,j){
    //竞得单位
    if(str[i].BID_NAME == null){
        str[i].BID_NAME = '';
    };
    //竞得单位
    if(str[i].UNIT == null){
        str[i].UNIT = "元/年";
    };
    //成交价
    if(str[i].closePrice == null){
        str[i].closePrice = '';
    };
    //竞价次数
    if(str[i].NUM == null){
        str[i].NUM = '0';
    };
    //成交时间
    if(str[i].bidDelayTime == null){
        str[i].bidDelayTime = '';
    };
    //报名次数
    if(str[i].applyNum == null){
        str[i].applyNum = '';
    };
    //评估价
    if(str[i].EVALUATE_PRICE == null){
        str[i].EVALUATE_PRICE = '';
    };
    //序号
    if( str[i].orderNum  == null || str[i].orderNum  == 'undefined'){
        str[i].orderNum  = '';
    };
    //竞价开始时间
    if(str[i].bidStartTime == null){
        str[i].bidStartTime = '';
    }
    //图片
    if(str[i].MD5 == undefined){
        strUrL = contextPath+'/resource/skins/skin-blue/images/small-bg.png';
    }else{
        strUrL = imgUrl + 'down?md5=' + str[i].MD5 + '&bucket=2';
    };
}
// //当前页码标志
// var offset = 1;
// //每页显示多少条数据
// var limit=3;
// //总数
// var count = 0;
// //显示总页数
// var totalPage ;
//首页
// function first_page(){
//     offset = 1;
//     a = offset;
//     b = limit;
//     informFn(a,b,c,d);
//     $("#num1").html(1);
//     $("#num2").html(totalPage);
// }

//上一页
// function pre_page(){
//     if(offset > 1){
//         offset--;
//         a = offset;
//         b = limit;
//         informFn(a,b,c,d);
//         $("#num1").html(offset);
//         $("#num2").html(totalPage);
//     }else{
//         layer.msg("已经是第一页了!");
//     }
// }
//下一页
// function next_page(){
//     if(offset < totalPage){
//         offset++;
//         a = offset;
//         b = limit;
//         informFn(a,b,c,d);
//         $("#num1").html(offset);
//         $("#num2").html(totalPage);
//     }else{
//         layer.msg("已经是最后一页了!");
//     }
//
// }
//尾页
// function last_page(){
//     offset = totalPage;
//     a = offset;
//     b = limit;
//     informFn(a,b,c,d);
//     $("#num1").html(totalPage);
//     $("#num2").html(totalPage);
// }

//登入弹窗
function loginWindow () {
    // 判断登陆状态
    var loginStatus = checkLoginStatus();
    if("Y" == loginStatus){
        layer.open({
            //shade:0,
            type: 2,
            area: ['800px', '300px'],
            fix: false, //不固定
            resize:false,
            skin:'layer-ext-vitality',
            title: ['<em></em>', false],
            content:'/jsps/register/login.jsp'
        });
        return ;
    }
    //验证码
    var isSendSms  = $("#isSendSms").val();
    layer.open({
        //shade:0,
        type: 2,
        area: ['1000px', '800px'],
        fix: false, //不固定
        resize:false,
        offset: '40px',
        skin:'layer-ext-vitality',
        title: ['<em></em>', false],
        cancel : function(){
            // 你点击右上角 X 取消后要做什么
            $('.layui-tab-title').find('li').removeClass('layui-this');
            $('.layui-tab-title').find('li').eq(0).addClass('layui-this');
            $('.layui-tab-item').removeClass('layui-show');
            $('.layui-tab-item').eq(0).addClass('layui-show');
            //报名状态隐藏
            $('#conditions').hide();
        },
        content:'/jsps/register/login.jsp'
    });
};
function paged(counter,arry){
    laypage.render({
            elem:'split' // 容器id
            , count: counter//总页数
            , curr: offsets
            ,limit:limits
            ,limits:arry
            ,groups:3
            // ,layout: ['prev', 'next', 'skip','limit','count']
            ,layout: [ 'prev', 'page', 'next','skip','limit','count']
            , jump: function (obj,first) {
                limits = obj.limit;
                offsets =obj.curr;  //这里是后台返回给前端的当前页数
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr  ajax 再次请求
                     if(tab == 0 || tab  == 1){
                         informFn(c,d);
                     }else if(tab == 2){
                         marginFn(enterId) ;
                     };
                }
            }
        });

};

function marginFn(enterId) {
    var url = contextPath+"/bid/getEnterpriseDepositStatus.do";
    var data = {
        'enterpriseId':enterId,
        'rp':limits,
        'page':offsets,
        'objectName':objectName,
        'depositStatus':depositStatus1,
        'applyEndTimeStart':applyEndTimeStart,
        'applyEndTimeEnd':applyEndTimeEnd

    };
    $.post(url,data,function(result){
        var data = eval("("+result+")");
        if(data.success){
            if("" != data.result && null != data.result){
                var result = eval("("+data.result+")");
                total = result.total;
                var depositList = result.depositList;
                // console.log(depositList)
                var oTable = '';
                var depostStatus = '';
                if(depositList.length == 0){
                    oTable = '<tr><td colspan="7">暂无数据！</td></tr>';
                }else if(depositList.length > 0){
                for(var i = 0;i<depositList.length;i++){
                    if(depositList[i].DEPOSIT_STATUS == 0){
                        depostStatus = '未缴纳';
                    }else if(depositList[i].DEPOSIT_STATUS == 1){
                        depostStatus = '已缴纳';
                    }else if(depositList[i].DEPOSIT_STATUS == 2){
                        depostStatus = '未退付';
                    }else if(depositList[i].DEPOSIT_STATUS == 3){
                        depostStatus = '退付中';
                    }else if(depositList[i].DEPOSIT_STATUS == 4){
                        depostStatus = '已退款';
                    };
                    if(null == depositList[i].NOTICETIME){
                        depositList[i].NOTICETIME = '';
                    };
                    oTable += '<tr><td>'+parseInt(i+1)+'</td><td>'+depositList[i].ITEM_NAME+'</td><td>'+depositList[i].objectName+'</td><td>'+depositList[i].cmcostAmount+'</td><td>'+depositList[i].APPLY_END_TIME+'</td><td>'+depositList[i].NOTICETIME+'</td><td>'+depostStatus+'</td></tr> ';
                }
                };
                $('#history tbody').html(oTable);
                paged(total,arry);

            }
        }
    })
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

