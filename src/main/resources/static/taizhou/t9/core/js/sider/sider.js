/**
 * 页面分栏导航栏的伸缩功能
 * @param sid 被点击的分栏条编号（从0开始）
 * @return
 */
function showsubmenu(sid) {
    whichel = eval("submenu" + sid); //拼接你所点击的目录id
    if (whichel.style.display == "none")//如果当前目录没被显示
    {
        eval("submenu" + sid + ".style.display=\"\";"); //显示当前菜单
        document.getElementById("sm" + sid + "").src = imgPath + "/q1/sider/down-icon.jpg";
    }

    else {
        eval("submenu" + sid + ".style.display=\"none\";"); //隐藏当前目录
        document.getElementById("sm" + sid + "").src = imgPath + "/q1/sider/right-icon.jpg";
    }
    
}

/** 分栏导航条伸缩控制  */
function showSider(sid){
	var whichel = eval("submenu" + sid);
    if (whichel.style.display == "none"){
    	whichel.style.display = "";
        $("sm" + sid).src = "/t9/core/styles/style1/img/q1/sider/down-icon.jpg";
    }
}