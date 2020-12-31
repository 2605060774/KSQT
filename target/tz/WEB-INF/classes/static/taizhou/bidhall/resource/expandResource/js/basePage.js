/**
 * Created by huyiqi on 2017/5/25.
 */
$(function(){
    var pageIndex = getUrlParam('pageIndex');
    $('.layui-nav-tree').find('#'+pageIndex).focus();
});