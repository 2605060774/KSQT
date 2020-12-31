/**
 * Created by huyiqi on 2017/4/27.
 */
$(function(){
    var pageIndex = getUrlParam("pageIndex");
    if(pageIndex) {
        //设置导航栏当前选中项
        var that = $(".layui-nav").find("#"+pageIndex);
        var parent =  that.parent();
        parent.addClass("layui-this");
    }

    layui.use('element', function(){
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    });
});
