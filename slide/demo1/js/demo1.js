function show(){
    var length = $("#scroll_box li").length;
    var liWidth = $("#scroll_box li").outerWidth(true);
    var boxWidth = $(".box").outerWidth(true);
    var showLength = Math.ceil(boxWidth / liWidth); //显示图片个数
    var speed = 1000;   //滚动速度
    var time = 3000;    //滚动间隔
    var scrollIndex = 1;    //每次滚动的图片数量
    $("#scroll_box").css("width",length * liWidth);     //设置滚动盒子宽度
    function scroll(){
        $("#scroll_box").stop().animate({ "margin-left": "-" + scrollIndex * liWidth + "px" }, speed, function () {
            $("#scroll_box").css("margin-left", 0);
            for (var i = 0; i < scrollIndex; i++) {
                //将第一张图片放到最后一张图片后面
                $("#scroll_box").find("li").last().after($("#scroll_box").find("li").first());
            }
        });
    }
setInterval(scroll,time);
}

window.onload=function(){
    show();
}
