function Zoom(imgbox, hoverbox, l, t, x, y, h_w, h_h, showbox) {
    //l = l+396.5;
    //console.log(l)
    //l = l+190;
    //t = t+113;
    var moveX = x - l - (h_w / 2);
    //鼠标区域距离
    var moveY = y - t - (h_h / 2);
    //鼠标区域距离
    if (moveX < 0) {
        moveX = 0
    }
    if (moveY < 0) {
        moveY = 0
    }
    if (moveX > imgbox.width() - h_w) {
        //console.log(imgbox.width())
        moveX = imgbox.width() - h_w
    }
    if (moveY > imgbox.height() - h_h) {
        moveY = imgbox.height() - h_h
    }
    //判断鼠标使其不跑出图片框
    var zoomX = showbox.width() / imgbox.width()
    //求图片比例
    var zoomY = showbox.height() / imgbox.height()
    showbox.css({
        left: -(moveX * zoomX),
        top: -(moveY * zoomY)
    })
    hoverbox.css({
        left: moveX,
        top: moveY
    })
    //确定位置

}

function Zoomhover(imgbox, hoverbox, showbox) {
    var l = imgbox.offset().left+$('.container').offset().left+67;//距离屏幕最左边的距离
    var t = imgbox.offset().top+$('.container').offset().top+115;//距离屏幕最上边的距离
    var w = hoverbox.width();
    var h = hoverbox.height();
    var time;
    $(".probox img,.hoverbox").mouseover(function(e) {

        var x = e.pageX;
        //console.log(x)
        var y = e.pageY;
        $(".hoverbox,.showbox").show();
        var src = $(this).attr('src');
        $('.showbox img').attr('src',src);
        hoverbox.css("opacity", "0.3")
        time = setTimeout(function() {
            Zoom(imgbox, hoverbox, l, t, x, y, w, h, showbox)
        }, 1)
    }).mousemove(function(e) {
        var x = e.pageX;
        var y = e.pageY;
        time = setTimeout(function() {
            Zoom(imgbox, hoverbox, l, t, x, y, w, h, showbox)
        }, 1)
    }).mouseout(function() {
        showbox.parent().hide()
        hoverbox.hide();
    })
}
$(function() {
    Zoomhover($(".probox img"), $(".hoverbox"), $(".showbox img"));
})