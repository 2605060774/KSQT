
<!-- 这里写方法，并且返回值   入口参数obj 对象里面有url后面跟的参数 -->
/*  function PROJECT_NAME(obj){
 return  "1234";
 }*/

//项目编号
function projectCode(obj) {
    var runId=obj.runId;
    var projeId=obj.mainId;
    var projeType=obj.projeType;
    var type=obj.type;
    var number = 17;//项目编号17位
    var url = contextPath+"/com/qzhprp/comm/supplementaryData/act/SuppleAct/gpData.act?runId="+runId+"&projeId="+projeId+"&projeType="+projeType+"&type="+type+"&number="+number;
    var json = getJsonRs(url);
    var projectCode = "";
    if(json.rtState == "0"||json.rtState=="undefined"||json.rtState==null){
        var data = json.rtData;
        projectCode = data;
    }
    return projectCode;
}
//招标项目编号
function tenderProjectCode(obj) {
    var runId=obj.runId;
    var projeId=obj.mainId;
    var projeType=obj.projeType;
    var type=obj.type;
    var number = 20; //招标项目编号20位
    var url = contextPath+"/com/qzhprp/comm/supplementaryData/act/SuppleAct/gpData.act?runId="+runId+"&projeId="+projeId+"&projeType="+projeType+"&type="+type+"&number="+number;
    var json =  getJsonRs(url);
    var tenderCode = "";
    if(json.rtState == "0"){
        var data = json.rtData;
        tenderCode=data;
    }
    return tenderCode;
}
//标段编号
function bidSectionCode(obj) {
    var runId=obj.runId;
    var projeId=obj.mainId;
    var projeType=obj.projeType;
    var type=obj.type;
    var number=23;
    var url = contextPath+"/com/qzhprp/comm/supplementaryData/act/SuppleAct/gpData.act?runId="+runId+"&projeId="+projeId+"&projeType="+projeType+"&type="+type+"&number="+number;
    var json =  getJsonRs(url);
    var sectionCode = "";
    if(json.rtState == "0"){
        var data = json.rtData;
        sectionCode=data;
    }
    return sectionCode;
}

//交易平台招标项目编号
function tradePlatfTenderProjectCode(obj){
    var runId=obj.runId;
    var projeId=obj.mainId;
    var projeType=obj.projeType;
    var type=obj.type;
    var number = 201; //交易平台招标项目编号=招标项目编号20位
    var url = contextPath+"/com/qzhprp/comm/supplementaryData/act/SuppleAct/gpData.act?runId="+runId+"&projeId="+projeId+"&projeType="+projeType+"&type="+type+"&number="+number;
    var json =  getJsonRs(url);
    var tradeCode = "";
    if(json.rtState == "0"){
        var data = json.rtData;
        tradeCode=data;
    }
    return tradeCode;
}

//交易平台段（包）编号
function tradePlatfBidSectionCode(obj){
    var runId=obj.runId;
    var projeId=obj.mainId;
    var projeType=obj.projeType;
    var type=obj.type;
    var number = 231; //交易平台招标项目编号=招标项目编号20位
    var url = contextPath+"/com/qzhprp/comm/supplementaryData/act/SuppleAct/gpData.act?runId="+runId+"&projeId="+projeId+"&projeType="+projeType+"&type="+type+"&number="+number;
    var json =  getJsonRs(url);
    var tradeSectionCode = "";
    if(json.rtState == "0"){
        var data = json.rtData;
        tradeSectionCode=data;
    }
    return tradeSectionCode;
}