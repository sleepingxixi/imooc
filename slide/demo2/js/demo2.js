window.onload = function () {

    var size = $(".banner .img li").size();
    var newSize=size*2;

    var i = size;
    $(".banner .img").append($(".banner .img").html()).css({ width: 1000 * newSize + "px", left: -1000 * i + "px" });

    // 用来设置滚动图的小圆点
    for (var j = 0; j < size; j++) {
        $(".banner .num").append("<li></li>");
    }

    $(".banner .num li").first().addClass("on");

    /*自动轮播*/

    var t = setInterval(function () { i++; move(); }, 3000);

    /*鼠标悬停事件*/

    $(".banner").hover(function () {
        clearInterval(t);//鼠标悬停时清除定时器
    }, function () {
        t = setInterval(function () { i++; move(); }, 3000); //鼠标移出时设置定时器
    });




    /*鼠标滑入原点事件*/

    $(".banner .num li").hover(function () {

        var index = $(this).index();//获取当前索引值
        i = index;
        $(".banner .img").stop().animate({ left: "-" + index * 1000 + "px" }, 500);
        $(this).addClass("on").siblings().removeClass("on");
    });



    /*向左按钮*/
    $(".banner .btn_l").click(function () {
        i++;
        console.log("left" + i);
        move();
    });


    /*向右按钮*/
    $(".banner .btn_r").click(function () {
        i--;
        // console.log("right" + i);
        move();
    });

    /*移动事件*/
    // function move() {
    //     console.log(i);
    //     // if (i < 0 && i > -3) {
    //     //     var num = size + i;
    //     // } else if (i <= -3) {
    //     //     var num = (-i) % size;
    //     //     i = num;
    //     // } else {
    //     //     var num = i % size;
    //     // }
    //     if (i >= size) {
    //         i = 0;
    //         // $(".banner .img").css({ left: "-" + i * 1000 + "px" });
    //     }
    //     if (i < 0) {
    //         i = size - 1;
    //         // $(".banner .img").css({ left: "-" + i * 1000 + "px" });
    //     }
    //     $(".banner .img").stop().animate({ left: "-" + i * 1000 + "px" }, 1000);
    //     $(".banner .num li").eq(i%size).addClass("on").siblings().removeClass("on");
    // }
    function move(){
        $(".banner .img").stop().animate({ left: "-" + i * 1000 + "px" }, 1000,function(){
            if (i >= newSize-1) {
                i = size - 1;
                $(".banner .img").css({ left: "-" + i * 1000 + "px" });
            }
            if(i<=0){
                i=size;
                $(".banner .img").css({ left: "-" + i * 1000 + "px" });
            }
        });
        $(".banner .num li").eq(i % size).addClass("on").siblings().removeClass("on");
        
    }
}

