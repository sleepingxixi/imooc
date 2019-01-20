$.fn.slide = function () {
    var slideEle = $(this);

    var slideContent = slideEle.find('.slide-content');
    var slideNavLi = slideEle.find('.slide-nav li');
    var slideItem=slideEle.find('.slide-item');
    var slideImg = slideItem.find('img');
    var slideInfo = slideEle.find('.slide-info');
    var slideWidth = slideEle.width(); //显示窗口宽度
    var timer = null;   //定时器
    var time = 2000;    //轮播图切换事件(毫秒)
    var index = 0;  //当前索引值
    var oldLength = slideItem.length;    //item初始长度
    var length = oldLength * 2;   //item复制后的长度 

    init();

    //初始化
    function init() {
        //将item复制一份加入到原item的后面，形成:原1、原2、原3、原4、...原末、复1、复2、复3、复4...复末,并定位到复1项
        index = oldLength;
        slideContent.append(slideContent.html()).css({ width: slideWidth * length+"px", left: -slideWidth * index+"px" });

        //鼠标悬浮事件
        slideEle.hover(function () {  //移除定时任务
            clearInterval(timer);
            //设置按钮的显示
            slideEle.find('.slide-btn').css({"display":"block"});
        }, function () {   //添加定时任务    
            setTimer();
            slideEle.find('.slide-btn').css({"display":"none"});
        });

        //按钮点击事件
        slideEle.find('.prev').click(function () {
            if (!slideContent.is(':animated')) {
                index--;
                change();
            }

        }).end()
            .find('.next').click(function () {
                if (!slideContent.is(':animated')) {
                    index++;
                    change();
                }
            });
        
        //导航点点击事件委托
        slideNavLi.click(function (event) {
            // event.target用来说明最初触发事件的dom元素
            index = $(event.target).index() + oldLength;
            change();
        });

        setTimer();
    }
    //设置定时器
    function setTimer() {
        timer = setInterval(function () {
            index++;
            change();
        }, time);
    }

    function change() {
        changeSlide();
        changeNav();
        changeInfo();
    }

    //轮播图切换
    function changeSlide() {
        /*      if(slideContent.is(':animated')){
                    return;
                }*/
        slideContent.animate({ left: -slideWidth * index + "px" }, 500 ,function () {
            //原1、原2、原3、原4、...原末、复1、复2、复3、复4...复末
            if (index <= 0) {
                //当定位到原1时，在回调函数中将slideContent瞬间定位到复1
                index = oldLength;
                slideContent.css({ left: -slideWidth * index +"px"});
            }
            if (index >= length - 1) {
                //当定位到复末时，在回调中将slideContent瞬间定位到原末
                index = oldLength - 1;
                slideContent.css({ left: -slideWidth * index +"px" });
            }
        });
    }
    //导航点切换
    function changeNav() {
        slideNavLi.removeClass('active').eq(index % oldLength).addClass('active');
    }

    // 切换描述信息
    function changeInfo(){
        console.log(index);
        var info = $(slideImg.get(index % oldLength)).attr('alt');
        slideInfo.html(function (){
            return "<p>"+info+"</p>";
        });
    }

}