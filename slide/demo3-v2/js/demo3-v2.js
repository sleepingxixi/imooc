// 这是轮播图升级版2，主要改进是：
// 1.轮播图实现方式修改。从之前的复制一套图片的方式转换成仅用一套图片显示。
// 2.优化了html结构，将图片与展示信息放在一个div中，结合相对定位和绝对定位实现。并且优化展示的函数。
// 3.将图片和相关信息的数据进行了处理，变成了数组对象。
// 4.使用了函数进行封装。
// 5.改进用户指定显示的首张图片的方法。去掉排序，直接将index设置为用户需要看到的首张图片，并且指定了首张图片显示的位置
// 6.添加了渐入渐出的效果，不改变html的结构的情况下

$.fn.slide = function (options) {
    // 默认参数
    var defaults = {
        // 自动滚动开关
        autoSlide: "true",
        // 轮播滚动的类型选择,rolling为左右滚动，fade为渐变
        slideType: "fade",
        // 导航按钮的样式,rectangle为长方形，circle为圆形,square为正方形
        slideNavType: "circle",

        // 设置导航按钮的位置
        slideNavTop: "",
        slideNavRight: "50px",
        slideNavBottom: "10px",
        slideNavLeft: "",
        // 设置导航按钮的颜色
        slideNavColor: "#ccc",
        slideNavActiveColor: "#fff",

        // 设置显示的信息
        picInfoFontFamily: "微软雅黑",
        picInfoFontSize: "14px",
        picInfoHight: "40px",
        picInfoWidth: "1000px",
        picInfoBackgroupColor: "rgba(97, 95, 95, 0.5)",
        picInfoPadding: "10px",
        picInfoColor: "black",

        // 轮播间隔时间
        time: 1000,
        // 轮播速度
        slideSpeed: 1000,
        pic_content: [
            {
                pic_url: "img/ad2.jpg",
                pic_info: "图片1"
            },
            {
                pic_url: "img/ad3.jpg",
                pic_info: "图片2"
            },
            {
                pic_url: "img/ad4.jpg",
                pic_info: "图片3"
            }],
        // 默认显示首张图片的问题，要求从0开始计算
        firstPicIndex: 2,

        // 设置默认显示的高度
        slideWidth: 1000,
        slideHeight: 310


    }
    // 合并参数
    var options = $.extend(defaults, options);

    this.each(function () {
        var slideDiv = $(this);
        var slideEle = null;
        var slideContent = null;
        var slideNavLi = null;
        var slideInfo = null;
        var slideItem = null;
        var slideNav = null;

        var timer = null;   //定时器
        var time = options.time;    //轮播图切换事件(毫秒)
        var slideSpeed = options.slideSpeed;
        var slideWidth = options.slideWidth; //显示窗口宽度
        var slideHeight = options.slideHeight; //显示窗口的高度

        var pic = options.pic_content;
        var pic_num = pic.length;

        var length = pic_num;    //item初始长度
        var firstPic = options.firstPicIndex;
        var index = firstPic;  //当前索引值
        var preIndex=index;

        var slideNavType = options.slideNavType;

        init();

        //初始化
        function init() {

            // 假定用户已经创建好slide显示窗口
            createContain();

            //添加轮播图的样式
            addSlideStyle();

            //鼠标悬浮事件
            mouseoverEvent();

            //按钮点击事件
            buttonClickEvent();


            //导航点点击事件委托
            navLiEvent();

            // 用于判读用户是否需要自动轮播
            isSetTimer();
        }


        // 创建轮播图的结构
        function createContain() {
            slideDiv.append('<div class="slide"></div>');
            slideEle = slideDiv.find(".slide");
            // 创建内容
            slideEle.append('<div class="slide-content"></div>');
            //创建导航
            slideEle.append('<ul class="slide-nav"></ul>');
            //创建描述信息
            // slideEle.append('<div class="slide-info"><p></p></div>')
            //添加左右的箭头
            slideEle.append('<a href="javascript:void(0);" class="slide-btn prev"></a><a href = "javascript:void(0);" class= "slide-btn next" ></a>');

            slideContent = slideEle.find(".slide-content");

            slideNav = slideEle.find(".slide-nav");
            for (var pic_index = 0; pic_index < pic_num; pic_index++) {
                slideContent.append('<div class="slide-item">'
                    + '<img src="' + pic[pic_index].pic_url + '" alt="' + pic[pic_index].pic_url + '">'
                    + '<span class="slide-info"><p>' + pic[pic_index].pic_info + '</p></span>'
                    + '</div>');
                slideNav.append('<li></li>');
            }

            // 给第一个按钮添加样式
            slideNavLi = slideEle.find('.slide-nav li');
            slideNavLi.eq(index).addClass('active').css({
                "background-color": options.slideNavActiveColor,
                "border-color": options.slideNavActiveColor
            });

            slideItem = slideEle.find('.slide-item');
            slideImg = slideImg = slideEle.find('.slide-item img');
            slideInfo = slideItem.find('.slide-info');
        }

        function addSlideStyle() {
            //主要用于设置一些可以自定义的样式
            // 判断用户是否设置有宽高，优先使用用户设置的宽高，否则使用否认值
            // console.log(slideDiv.width());
            if (slideDiv.width() != 0) {
                slideWidth = slideDiv.width();
            }
            if (slideDiv.height() != 0) {
                slideHeight = slideDiv.height();
            }
            slideEle.css({
                "width": slideWidth + "px",
                "height": slideHeight + "px"
            });
            slideContent.css({
                "width": slideWidth * length + "px",
                // "left": -slideWidth * index + "px"
            }).css(leftForIndex(index));
            slideItem.css({
                "width": slideWidth + "px",
                "height": slideHeight + "px",
            });

            // 设置导航样式
            // 设置导航形状
            switch (slideNavType) {
                case "square":
                    slideNavLi.each(function () {
                        $(this).css({ "border-radius": "" });
                    });
                    break;
                case "rectangle":
                    slideNavLi.each(function () {
                        $(this).css({ "border-radius": "", "width": "20px", "height": "5px" });
                    });
                    break;
                default:
                    slideNavLi.each(function () {
                        $(this).css({ "border-radius": "50%" });
                    });
            }
            // 设置高航位置和颜色
            slideNav.css({
                "left": options.slideNavLeft,
                "top": options.slideNavTop,
                "bottom": options.slideNavBottom,
                "right": options.slideNavRight
            });
            slideNavLi.each(function () {
                $(this).css({ "border-color": options.slideNavColor });
            })

            // 设置显示的信息
            slideInfo.css({
                "left": options.picInfoLeft,
                "top": options.picInfoTop,
                "bottom": options.picInfoBottom,
                "right": options.picInfoRight,
                "background-color": options.picInfoBackgroupColor,
                "height": options.picInfoHight,
                "width": options.picInfoWidth
            });
            slideInfo.find("p").css({
                "color": options.picInfoColor,
                "font-family": options.picInfoFontFamily,
                "font-size": options.picInfoFontSize,
                "padding": options.picInfoPadding
            })
        }

        // 鼠标悬停事件，用于设置鼠标停在轮播图上时候的定时及按钮的状态
        function mouseoverEvent() {
            slideEle.hover(function () {  //移除定时任务
                clearInterval(timer);
                //设置按钮的显示
                slideEle.find('.slide-btn').css({ "display": "block" });
            }, function () {   //添加定时任务    
                isSetTimer();
                slideEle.find('.slide-btn').css({ "display": "none" });
            });
        }

        // 按钮点击事件，用户触发按钮事件
        function buttonClickEvent() {
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
        }

        // 设置导航按钮的事件
        function navLiEvent() {
            slideNavLi.click(function (event) {
                // event.target用来说明最初触发事件的dom元素
                index = $(event.target).index();
                change();
            });
        }

        // 用于判读用户是否需要自动轮播
        function isSetTimer() {
            if (options.autoSlide == "true") {
                setTimer();

            }
        }
        //设置定时器
        function setTimer() {
            timer = setInterval(function () {
                index++;
                change();
            }, time);
        }

        // 给用户设置动画
        function change() {
            changeSlide();
            changeNav();
            // changeInfo();
        }

        //轮播图切换
        function changeSlide() {
            switch (options.slideType) {
                case "fade":
                    fade();
                    break;
                default:
                    rolling();
                    break;
            }
        }

        // 设置滚动的函数
        function rolling() {
            if (index < 0) {
                index = length - 1;
                // slideContent.css({ left: -slideWidth * (index - 1) + "px" });

                // 当需要跳转到最后一张的时候会先让其快速切换到倒数第二张
                rollingToIndex(index - 1);
            } else if (index >= length) {
                index = 0;
                // slideContent.css({ left: -slideWidth * (index + 1) + "px" });

                // 当需要其跳转到第1张的时候，会快速让其先切换到第二张
                rollingToIndex(index + 1);
            }
            slideContent.animate(leftForIndex(index), slideSpeed);
        }

        function fade(){
            if(index <0){
                index = length-1;
            }else if(index >=length){
                index=0;
            }
            //rollingToIndex(index);
            slideContent.css(beforeHade(index));
            slideContent.animate(fadeInForIndex(index), slideSpeed);
        }

        // 用于设置滚动框的位置
        function rollingToIndex(goalIndex) {
            slideContent.css(leftForIndex(goalIndex));
        }

        // 用于设置向左滚动的位置
        function leftForIndex(goalIndex) {
            return { "left": -slideWidth * goalIndex + "px" };
        }

        // 用于设置渐变前的样式，包括透明度和位移
        function beforeHade(goalIndex){
            return {
                "left": -slideWidth * goalIndex + "px",
                "opacity":0.3
            }
        }
        // 用于设置渐入的样式
        function fadeInForIndex(goalIndex) {
            return {
                "left": -slideWidth * goalIndex + "px",
                "opacity": 1
            }
        }

        // function fade() {
        //     slideItem.css({
        //         "float": "left"
        //     })
        // }
        //导航点切换
        function changeNav() {
            slideNavLi.removeClass('active').css({
                "background-color": "",
                "border-color": options.slideNavColor
            })
                .eq(index % length).addClass('active').css({
                    "background-color": options.slideNavActiveColor,
                    "border-color": options.slideNavActiveColor
                });
        }

        // 切换描述信息
        // function changeInfo() {
        //     var info = $(slideImg.get(index)).attr('alt');
        //     slideInfo.html(function () {
        //         return "<p>" + info + "</p>";
        //     });
        // }

    });
    return this;
}




