//扩展Date的format方法 
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

function isEmpty(text){
    if(text=='undefined' || text==null ||text==''||text.length==0){                
        return true;
    }
    return false;
}

/** 
*转换日期对象为日期字符串 
* @param date 日期对象 
* @param isFull 是否为完整的日期数据, 
* 为true时, 格式如"2000-03-05 01:05:04" 
* 为false时, 格式如 "2000-03-05" 
* @return 符合要求的日期字符串 
*/
function fmtD(date, isFull) {
    var pattern = "";
    if (isFull == true || isFull == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    } else {
        pattern = "yyyy-MM-dd";
    }
    return uFmtD(date, pattern);
}

/** 
*转换日期对象为日期字符串 
* @param date 日期对象 
* @param isFull 是否为完整的日期数据, 
* 为true时, 格式如"2000年03月05日 01点05分"
* 为false时, 格式如 "2000年03月05日" 
* @return 符合要求的日期字符串 
*/
function fmtCHN(date, isFull) {
    var pattern = "";
    if (isFull == false || isFull == undefined) {
    	pattern = "yyyy年MM月dd日";
    } else {
    	pattern = "yyyy年MM月dd日 hh点mm分";
    }
    return uFmtD(date, pattern);
}

/** 
 *转换日期对象为日期字符串 
 * @param l 日期getTime值
 * @param isFull 是否为完整的日期数据, 
 * 为true时, 格式如"2000年03月05日 01点05分"
 * 为false时, 格式如 "2000年03月05日" 
 * @return 符合要求的日期字符串 
 */
function fmtLCHN(l, isFull) {
	var pattern = "";
	if (isFull == false || isFull == undefined) {
		pattern = "yyyy年MM月dd日";
	} else {
		pattern = "yyyy年MM月dd日 hh点mm分";
	}
	return uFmtL2D(l, pattern);
}

/** 
*转换当前日期对象为日期字符串 
* @param date 日期对象 
* @param isFull 是否为完整的日期数据, 
* 为true时, 格式如"2000-03-05 01:05:04" 
* 为false时, 格式如 "2000-03-05" 
* @return 符合要求的日期字符串 
*/
function fmtND(isFull) {
    return fmtD(new Date(), isFull);
}

/** 
*转换long值为日期字符串 
* @param l long值 
* @param isFull 是否为完整的日期数据, 
* 为true时, 格式如"2000-03-05 01:05:04" 
* 为false时, 格式如 "2000-03-05" 
* @return 符合要求的日期字符串 
*/
function fmtL2D(l, isFull) {
	if(isEmpty(l)){
		return "";
	}
	if(typeof(l) == "string") {
		return l;
	}
    return fmtD(new Date(l), isFull);
}

/** 
*转换long值为日期字符串 
* @param l long值 
* @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss 
* @return 符合要求的日期字符串 
*/
function uFmtL2D(l, pattern) {
	if(isEmpty(l)){
		return "";
	}
    return uFmtD(new Date(l), pattern);
}

/** 
*转换日期对象为日期字符串 
* @param l long值 
* @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss 
* @return 符合要求的日期字符串 
*/
function uFmtD(date, pattern) {
    if (date == undefined) {
        date = new Date();
    }
    if (pattern == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    }
    return date.format(pattern);
}

/**
 * 将秒显示成 hh:mm:ss 格式
 * @param l  秒数
 * @return {string}
 */
function showClock(l){
    var l = Math.ceil(l);
	var h = Math.floor(l / 3600)+'';
	var m = Math.floor((l - (h * 3600)) / 60)+'';
	var s = l - (h * 3600) - (m * 60)+'';
	return digit(h) + ':' + digit(m) + ':' + digit(s);
}
function digit(a){
	if(a.length < 2){
		return '0' + a;
	}
	return a;
}

//alert(fmtD(new Date(1279849429000), true)); 
//alert(fmtD(new Date(1279849429000),false)); 
//alert(fmtL2D(1279829423000, true)); 
//alert(fmtL2D(1279829423000, false));
//alert(uFmtL2D(1279829423000, "yyyy-MM")); 
//alert(uFmtD(new Date(1279829423000), "yy-MM")); 
//alert(uFmtL2D(1279849429000, "yyyy-MM hh:mm")); 


