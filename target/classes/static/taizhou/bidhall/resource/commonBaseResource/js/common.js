/**
 * 字符串模板
 * @param fn
 * @returns {String} 将注释转为字符串
 */
function heredoc(fn) {
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n';
}
/**
 * 注销
 */
function logout() {
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.confirm('是否要退出登录？', {icon: 3, title:'提示'}, function(){
            window.location.href = contextPath +'/sysUser/logout.do';
        });
    });
}
function setUserSkin(skin, index) {
    var url = contextPath +'/setUserSkin.do';
    var param = {'session_user_skin':skin,'session_user_skin_index':index};
    $.post(url, param);
}
//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
/**
 * 设置文件名，默认目标input_atta_name
 * @param obj input-file对象
 */
function setFileName(obj) {
    setFileName(obj, 'input_atta_name');
}
/**
 * 设置文件名
 * @param obj input-file对象
 * @param input_id 目标input
 */
function setFileName(obj, input_id) {
    var textValue = getRealFileName(obj);
    $("#"+input_id).val(textValue);
}
/**
 * 获取真实文件名称
 * @param obj input-file对象
 * @returns {string} 文件名
 */
function getRealFileName(obj){
    var textValue = "";
    if(obj){
        //ie
        if (window.navigator.userAgent.indexOf("MSIE")>=1){
            obj.select();
            obj.blur();
            textValue= document.selection.createRange().text;
        }
        else if(window.navigator.userAgent.indexOf("Firefox")>=1){
            if(obj.files){
                textValue= obj.files.item(0).mozFullPath;
            }
            textValue= obj.value;
        } else if (window.navigator.userAgent.indexOf("Chrome")>=1) {
            textValue = obj.value;
        }
        textValue= obj.value;
    }
    textValue = textValue.substring(textValue.lastIndexOf("\\")+1);
    textValue = textValue.substring(0,textValue.lastIndexOf("."));
    return textValue;
}
/**
 * 下载文件
 * @param url 下载文件服务端路径
 */
function downloadFile(url) {
    var exportIframe = document.createElement('iframe');
    exportIframe.src = url;
    exportIframe.style.display = "none";
    document.body.appendChild(exportIframe);
}
/**
 * 字符串格式化
 * @param args 参数
 * @returns {*}
 */
String.prototype.format = function(args) {
    if (arguments.length>0) {
        var result = this;
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                var reg=new RegExp ("({"+key+"})","g");
                result = result.replace(reg, args[key]);
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if(arguments[i]==undefined)
                {
                    return "";
                }
                else
                {
                    var reg=new RegExp ("({["+i+"]})","g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    }
    else {
        return this;
    }
};
/**
 * 设置cookie
 * @param c_name 键
 * @param value 值
 * @param expiredays 过期天数
 */
function setCookie(c_name,value,expiredays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
/**
 * 获取cookie
 * @param c_name 键
 * @returns {string} 值
 */
function getCookie(c_name) {
    if (document.cookie.length>0) {
        var c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1) {
            c_start=c_start + c_name.length+1;
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}
/**
 * 获取guid
 * @returns {string} 返回guid
 */
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function stopEvent(event){ //阻止冒泡事件
    //取消事件冒泡
    var e=arguments.callee.caller.arguments[0]||event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
    if (e && e.stopPropagation) {
        // this code is for Mozilla and Opera
        e.stopPropagation();
    } else if (window.event) {
        // this code is for IE
        window.event.cancelBubble = true;
    }
}
/**
 * 替换字符串中不需要的空格回车等
 * @param str 要替换的字符串
 * @param type 1：空格，2：回车（和的形式）
 */
function replaceStr(str, type) {
    if((type & 1) == 1) {
        str = str.replace(/[\r\n]/g, "");
    }
    if((type & 2) == 2) {
        str = str.replace(/\ +/g, "");
        str = str.replace(/[ ]/g, "");
    }
    return str;
}
/**
 * 加载select选择框
 * @param selector 目标选择器
 * @param data 加载的数据
 * @param valueKey 值key
 * @param nameKey 名称key
 * @param needClear 是否需要清除原先的数据
 * @param firstOpt 第一行数据
 * @param form 归属的form选择器，用于render
 */
function loadSelect(selector, data, valueKey, nameKey, needClear, firstOpt, form){
    if(needClear) {
        $(selector).empty();
    }
    if(firstOpt) {
        $(selector).append($("<option value='"+firstOpt[valueKey]+"'>"+firstOpt[nameKey]+"</option>"))
    }
    if(data && data.length > 0) {
        for(var i in data) {
            $(selector).append($("<option value='"+data[i][valueKey]+"'>"+data[i][nameKey]+"</option>"))
        }
    }
    if(form) {
        form.render("select");
    }
}
$.fn.line = function () {
    var ww = $(this).width();
    var hh = $(this).height();
    return $(this).children("td").each(function (index) {
        if (index == 0) {//重点部分
            $(this).children("*:first").before("<div style='position:absolute;width:"+ww+"px;padding-top: "+hh/2+"px;'><div style='border:red solid 1px; width:100%;padding: 0 !important;'></div></div>");//5
        }
    })};

/**
 * 获取选中行的参数值
 * @param data 数据源
 * @param id 字段名
 * @returns {string} 返回组合值
 */
function getCheckedIds(data,id) {
    var arrContact = new Array();
    if(data!=undefined){
        for (var i = 0; i < data.length; i++) {
            arrContact.push(data[i][id]);
        }
    }
    return arrContact.toString();
}

/**
 * 模拟点击复选框、复选框选中
 */
function setCheckboxChecked(tableId, index) {
    var checkCell  = $('#'+tableId).next().find("tr[data-index=" + index + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
    if (checkCell.length>0) {
        checkCell.click();
    }
}
/**
 * 模拟点击单选框、单选框选中
 */
function setRadioChecked(tableId, index) {
    var checkCell  = $('#'+tableId).next().find("tr[data-index=" + index + "]").find("td div.laytable-cell-radio div.layui-form-radio I");
    if (checkCell.length>0) {
        checkCell.click();
    }
}
/**
 * 单击行时复选框、单选框选中功能
 */
$(document).on("click",".layui-table-body table.layui-table tbody tr",function(event){
    var obj = event ? event.target : event.srcElement;
    var tag = obj.tagName;
    var checkbox = $(this).find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
    if(checkbox.length!=0){
        if(tag == 'DIV') {
            checkbox.click();
        }
    }
    var radio = $(this).find("td div.laytable-cell-radio div.layui-form-radio I");
    if(radio.length!=0){
        if(tag == 'DIV') {
            radio.click();
        }
    }
});

// $(document).on("click","td div.laytable-cell-checkbox div.layui-form-checkbox",function(e){
//     e.stopPropagation();
// });
// $(document).on("click","td div.laytable-cell-radio div.layui-form-radio",function(e){
//     e.stopPropagation();
// });

/**
*   根据需要自行添加是否需要滚动条
 *   若需要滚动条则在列表done事件中调用该方法
 */
// function scrollX(){
//     $(".layui-table-box").find(".layui-table-body").addClass("scrollX");
// }

//注销
function loginOut() {
    layer.confirm('确定要注销吗？', {
        btn: ['确定','取消'], //按钮
        shade: false //不显示遮罩
    },function(){
        var url = contextPath+"/toData/setSessionOut.do";
        $.post(url,{},function(result){
            var data = eval("("+result+")");
            if(data.success == true){
                $("#enterpriseId").val("");
                //获取父窗口的地址
                var urls = window.location.href;
                if (urls.indexOf("enterpriseId") > -1) {
                    var urls = urls.split("enterpriseId");
                    window.location.href = urls[0];
                }else{
                    window.location.href = urls;
                }
            }
        })
    }, function(index){
        layer.close(index);
    });
}
//注销
function loginOut2() {
    var url = contextPath+"/toData/setSessionOut.do";
    $.post(url,{},function(result){

    })
}