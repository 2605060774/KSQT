/**
 * 屏蔽在失效input上按退格键时返回上一页面，禁用在使用控件上使用退格键
 * 
 * @param evt
 */
document.documentElement.onkeydown = function(evt){ 
	var b = !!evt, oEvent = evt || window.event; 
	if (oEvent.keyCode == 8) { 
		var node = b ? oEvent.target : oEvent.srcElement; 
		var reg = /^(input|textarea)$/i, regType = /^(text|textarea)$/i; 
		if (!reg.test(node.nodeName) || !regType.test(node.type) || node.readOnly || node.disabled) { 
			if (b) { 
				oEvent.stopPropagation(); 
			}  else  { 
				oEvent.cancelBubble = true; 
				oEvent.keyCode = 0;
				oEvent.returnValue = false; 
			}
		}
	}
}


/**
 * 消息提示
 * 
 * @param msrg
 * @param cntrlId
 *            绑定消息的控件
 * 
 * 
 * 
 * @param type
 *            消息类型[info|error||warning|forbidden|stop|blank] 默认为info
 * @return
 */
function WarningMsrg(msrg, cntrlId,type ) {
  var msrgDom = "<table class=\"MessageBox\" align=\"center\" width=\"290\">";
  if(!type){
    type = "info";
  }
  msrgDom += " <tr>  <td class=\"msg " + type + "\">"
  msrgDom +=  "<div class=\"content\" style=\"font-size:12pt\">" + msrg + "</div>"
      + " </td> </tr> </table>";
  $(cntrlId).innerHTML = msrgDom;
}

function WarningMsrgLong(msrg, cntrlId,type ) {
  var msrgDom = "<table class=\"MessageBox\" align=\"center\" width=\"410\">";
  if(!type){
    type = "info";
  }
  msrgDom += " <tr>  <td class=\"msg " + type + "\">"
  msrgDom +=" <h4 class=\"title\">信息</h4>"
  msrgDom +=  "<div class=\"content\" style=\"font-size:12pt\">" + msrg + "</div>"
      + " </td> </tr> </table>";
  $(cntrlId).innerHTML = msrgDom;
}

/**
 * 隐藏显示控件
 * 
 * @param cntrlId
 * @return
 */
function showCntrl(cntrlId) {
  if ($(cntrlId)) {
    if ($(cntrlId).style.display) {
      $(cntrlId).style.display = '';
    } else {
      $(cntrlId).style.display = 'none';
    }
  }
}

/**
 * 显示控件 by lance
 * 
 * @param id
 * @return
 */
function showCtrl(id){
	$(id).style.display = '';
}
/**
 * 隐藏控件 by lance
 * 
 * @param id
 * @return
 */
function hideCtrl(id){
	$(id).style.display = 'none';
}

/**
 * 判断小数位后２位
 * 
 * @param aValue
 * @return
 */
function isNumbers(aValue) { 
  var digitSrc = "0123456789"; 
  aValue = "" + aValue; 
  if (aValue.substr(0, 1) == "-") { 
    aValue = aValue.substr(1, aValue.length - 1); 
  } 
  var strArray = aValue.split("."); 
  // 含有多个“.”
  if (strArray.length > 2) { 
    return false; 
  } 
  var tmpStr = ""; 
  for (var i = 0; i < strArray.length; i++) { 
    tmpStr += strArray[i]; 
  } 
  for (var i = 0; i < tmpStr.length; i++) { 
    var tmpIndex = digitSrc.indexOf(tmpStr.charAt(i)); 
    if (tmpIndex < 0) { 
  // 有字符不是数字
      return false; 
    } 
  } 
  if(aValue.indexOf(".") != -1){
    var str = aValue.substr(aValue.indexOf(".")+1, aValue.length-1);
    if(str.length > 2){
      return false;
    }
    if(str.length == 0){
      return false;
    }
  }
  // 是数字
  return true;
}
/**
 * 检查输入字符串是否符合正整数格式
 * 
 * @param str
 * @return {Boolean}
 */
function isNumber(str) {
    var regu = "^[0-9]+$";
    var re = new RegExp(regu);
    if (str.search(re) != -1) return true;
    else return false;
}

// 项目流程查看
function showInfo(cellData, recordIndex, columIndex){
  var runId =this.getCellData(recordIndex,"runId");
  var flowId=this.getCellData(recordIndex,"flowId");
  var str= "<a href='javascript:;' onclick='showPrint("+ runId +"," +flowId +")'>"+cellData+"</a>"
  return str;
}
function showPrint(runId,flowId){
    window.open (contextPath + "/core/funcs/workflow/flowrun/list/print.jsp?runId="+runId+"&flowId="+flowId+"&flowView=1234");       
}

// 新建项目
function createWork(flowId){
  var url = contextPath + "/t9/core/funcs/workflow/act/T9FlowRunAct/createNewWork.act";
  var json = getJsonRs(url , "flowId=" + flowId);
  if(json.rtState == "0"){
      window.location.href = contextPath + "/core/funcs/workflow/flowrun/list/inputform/index.jsp?skin=&sortId=&runId=" + json.rtData + "&flowId=" + flowId + "&prcsId=1&flowPrcs=1&isNew=1";
  }else{
    alert(json.rtMsrg);
  }
}

// 时间格式化
function getTime(cellData, recordIndex, columIndex){
  if(!cellData){
    return "";
  }
  var today=new Date((myDate()).replace(/-/g,"/"));
  var addDay=new Date((cellData.substring(0,10)).replace(/-/g,"/"));
  if(today > addDay){
	  var str="<label style='color:red'>"+cellData.substring(0,10)+"</label>";
	  return str;
  }  
  return cellData.substring(0,10);
}

function cssSearch(){
    $j(".Select_Down").click(function(){
        $j(".Select_bg").slideDown();
           $j(".Select_Up").css("display","block");
           $j(".Select_Down").css("display","none");
           });
           $j(".Select_Up").click(function(){
       $j(".Select_bg").slideUp();
       $j(".Select_Down").css("display","block");
       $j(".Select_Up").css("display","none");
       })	
}

/**
 * 金额千分位带小数点
 * 
 * @param nStr
 * @return {string}
 */
function addCommas(s, n) {
   n = n > 0 && n <= 20 ? n : 2;
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
   var l = s.split(".")[0].split("").reverse(),
   r = s.split(".")[1];
   t = "";
   for(i = 0; i < l.length; i ++ )
   {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? " " : "");
   }
   return t.split("").reverse().join("") + "." + r;
}

/**
 * 金额千分位不带小数点
 * 
 * @param nStr
 * @return {string}
 */
function thousands(nStr){
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1;
}

/**
 * 金额大写
 * 
 * @param num
 * @return {*}
 * @constructor
 */
function DX(num) {
    if(num == undefined){
        alert("金额转换成大写时，传入的不是一个金额。");
        return ;
    }
	var strOutput = "",
	strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
	num += "00";
	var intPos = num.indexOf('.');
	if (intPos >= 0){
		num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
	}
	strUnit = strUnit.substr(strUnit.length - num.length);
	for (var i=0; i < num.length; i++){
		strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
	}
	return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")
}

function toPercent(a){
var b = a.toFixed(4);
var c = b.slice(2,4) + "." + b.slice(4,6) + "%";
return c;
}

/**
 * 修正IE下的ajax加载页面的缓存问题
 */
fix_url = function(url) {
	if (!!window.ActiveXObject || "ActiveXObject" in window) {
		if (url.indexOf('?') >= 0) {
			url += '&';
		} else {
			url += '?';
		}
		url += '_t=' + (new Date().getTime());
	}
	return url;
};

/**
 * 弹出框
 * 
 * @param url
 * @param width
 * @param height
 */
function newWindow(url,width,height){
  var locX=(window.screen.availWidth-width)/2;
  var locY=(window.screen.availHeight-height)/2;
  var win = window.open(url, "_blank", "height=" +height + ",width=" + width +",status=1,toolbar=no,menubar=no,location=no,scrollbars=yes, top=" + locY + ", left=" + locX + ", resizable=yes");
  return win;
}
function newWin(url,width,height){
  var locX=(screen.width-width)/2;
  var locY=(screen.height-height)/2;
  var iTop = (window.screen.availHeight-30-height)/2;
  return window.open(url, "_blank", "height=" +height + ",width=" + width +",status=1,toolbar=no,menubar=yes,location=no,scrollbars=yes, top=" + iTop + ", left=" + locX + ", resizable=yes");
}

/**
 * 弹出框查看信息
 * 
 * @param url
 * @param width
 * @param height
 */
function linkwin(md5, bucket, width,height) {

    var _width = width ? width : '800px';
    var _height = height ? height : "600px";
    var locX = (window.screen.availWidth-width)/2;
    var locY = (window.screen.availHeight-height)/2;

    var e=md5.split(',');
    for (i=0;i<e.length ;i++ ){
        {
            var url = contextPath + '/subsys/comm/openwin/open-win.jsp?md5=' + e[i] + "&bucket=" + bucket;
            window.open(url, "_openwin" + i, "height=" + _height + ",width=" + _width +",status=1,toolbar=no,menubar=no,location=no,scrollbars=yes, top=" + locY + ", left=" + locX + ", resizable=yes ");

        }
   }
}
/**
 * 外网专用加水印图片
 * @param url
 * @param width
 * @param height
 */
function linkwinnet(md5, bucket, width,height) {
    var _width = width ? width : '800px';
    var _height = height ? height : "600px";
    var locX = (window.screen.availWidth-width)/2;
    var locY = (window.screen.availHeight-height)/2;
    var e=md5.split(',');
    for (i=0;i<e.length ;i++ ){
        {
            var url = contextPath + '/subsys/comm/openwin/net-open-win.jsp?md5=' + e[i] + "&bucket=" + bucket;
            window.open(url, "_openwin" + i, "height=" + _height + ",width=" + _width +",status=1,toolbar=no,menubar=no,location=no,scrollbars=yes, top=" + locY + ", left=" + locX + ", resizable=yes ");

        }
    }
}

// unicode转码Json转字符串
function jsonToStr(myjson){
	var str=JSON.stringify(myjson); 
	  str= unescape(str.replace(/\\u/g,"%u"));
	  str= str.replace(/\\/g,"");
	  return str.substr(1,str.length-2);
}
/** 转义换行符 */
function replaceEnterToBR(str){
	var reg=new RegExp("\r\n","g");
	str = str.replace(reg,"<br>");  

	return str; 
}

/** 转义换行 */
function replaceBrToEnter(str){
	var reg=new RegExp("<br>","g"); 
	str = str.replace(reg,"\r\n"); 

	return str; 
}


// --处理拼json字符串含有双引号
function valueReplace(v){
	v=v.toString().replace(new RegExp("[\'|\"]","gm"),"\\\""); 
	return v;
}

/**
 * 获取记录的索引
 */
function rdIndex(cellData, recordIndex, columIndex){
	return recordIndex + 1;
}

function fmtEmptyStr(v){
	return v==undefined?"":v;
}

/**
 * 将字符串中间部分转换成星号显示  zhangrui
 */
function convertShow(str,num){
    var str1 = "";
    if(str.length > num) {
        var prefix = str.substring(0, num / 2);
        var end = str.substring(str.length - num / 2 - 1);
        var mid = "";
        for (var i = 0; i < str.length - prefix.length - end.length; i++) {
            mid += "*";
        }
        str1 = prefix + mid + end;
    }else{
        str1 = str;
    }
    return str1;
}

/**
 * 打开最大化新窗口，并且以post方式传递数据  postNewMaxWindow(URL, "_maxwin", jsonStr);  WangEZ 2015-07-22
 * @param url                弹框网址
 * @param windowName         弹框标题
 * @param data               json字符串（数据集合）
 * @param func               父窗体JS函数名称（弹窗关闭时调用）
 * @returns {*|Window}
 */
function postNewMaxWindow(url, windowName, data, func){
    //定义弹出窗口的参数
    var fulls = "left=0,screenX=0,top=0,screenY=0,scrollbars=1";
    if (window.screen) {
        var ah = screen.availHeight - 30;
        var aw = screen.availWidth - 10;
        fulls += ",height=" + ah;
        fulls += ",innerHeight=" + ah;
        fulls += ",width=" + aw;
        fulls += ",innerWidth=" + aw;
        fulls += ",resizable"
    } else {
        fulls += ",resizable"; // 对于不支持screen属性的浏览器，可以手工进行最大化。 manually
    }

    //创建临时表单
    var form=$j("<form action='"+url+"' target='"+windowName+"' method='post'></form>");
    form.append($j("<input type='hidden' name='data' value='"+data+"'/>"));
    form.append($j("<input type='hidden' name='func' value='"+func+"'/>"));
    $j("body").append(form);

    //打开弹框(空白)
    var obj = window.open("about:blank",windowName,fulls);

    //将数据及网页写到弹框中
    form.submit();

    //移除临时表单
    form.remove();

    //返回弹框句柄
    return obj;
}

/**
 * 打开最大化新窗口，newMaxWindow(URL, "_maxwin");  WangEZ 2015-07-30
 * @param url                弹框网址
 * @param windowName         弹框标题
 * @returns {*|Window}
 */
function newMaxWindow(url, windowName){
    //定义弹出窗口的参数
    var fulls = "left=0,screenX=0,top=0,screenY=0,scrollbars=1";
    if (window.screen) {
        var ah = screen.availHeight - 30;
        var aw = screen.availWidth - 10;
        fulls += ",height=" + ah;
        fulls += ",innerHeight=" + ah;
        fulls += ",width=" + aw;
        fulls += ",innerWidth=" + aw;
        fulls += ",resizable"
    } else {
        fulls += ",resizable"; // 对于不支持screen属性的浏览器，可以手工进行最大化。 manually
    }

    //弹出窗口
    var win = window.open(url,windowName,fulls);

    //返回弹框句柄
    return win;
}

