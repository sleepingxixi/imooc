// 这是轮播图升级版3，主要改进是：
// 1.轮播图实现了两种方式
// 2.将一些多种类型的行为封装成对象
// 3.测试了可配置的选项

$.fn.slide = function (options) {
    // 默认参数
    var defaults = {
        // 自动滚动开关
        autoSlide: "true",
        // 轮播滚动的类型选择,rolling为左右滚动，fade为渐变
        slideType: "rolling",
        // 导航按钮的样式,rectangle为长方形，circle为圆形,square为正方形
        slideNavType: "square",

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
        slideWidth: 500,
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
        var slideType = options.slideType;

        var pic = options.pic_content;
        var pic_num = pic.length;

        var length = pic_num;    //item初始长度
        var firstPic = options.firstPicIndex;
        var index = firstPic;  //当前索引值

        var slideNavType = options.slideNavType;

        init();

        //初始化
        function init() {

            // 假定用户已经创建好slide显示窗口
            createContain();

            //添加轮播图的样式
            addSlideStyle();

            styleForSlideType(slideType);

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
            slideEle.css({
                "width": slideWidth + "px",
                "height": slideHeight + "px"
            });
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

        // 将不同动画而需要调整的样式封装在一个函数里，使用对象方式，可以减少判断语句填写
        function styleForSlideType(type) {
            var style = {
                rolling: function () {
                    slideContent.css({
                        "width": slideWidth * length + "px",
                    }).css(leftForIndex(index));
                },
                fade: function () {
                    slideItem.css({
                        "position": "absolute",
                        "z-index": 0
                    })
                    slideItem.eq(index).css({
                        "z-index": 1
                    })
                }
            };
            style[type]();
        }

        // 将动画封装在一个函数里，使用对象方式，可以减少判断语句的填写
        function animateForSlideType(type) {
            var animate = {
                rolling: function () {
                    slideContent.animate(leftForIndex(index), slideSpeed);
                },
                fade: function () {
                    slideItem.eq(index).fadeIn(slideSpeed).siblings().stop(true, true).fadeOut(slideSpeed);
                }
            };
            animate[type]();
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
                    index = (index - 1) < 0 ? length - 1 : index - 1;
                    change();
                }

            }).end()
                .find('.next').click(function () {
                    if (!slideContent.is(':animated')) {
                        index = (index + 1) > length - 1 ? 0 : index + 1;
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
                index = (index + 1) > length - 1 ? 0 : index + 1;
                change();
            }, time);
        }

        // 给用户设置动画
        function change() {
            animateForSlideType(slideType);
            changeNav();
        }


        // 设置滚动的函数
        function rolling() {
            // slideContent.css(leftForIndex(index));
            slideContent.animate(leftForIndex(index), slideSpeed);
        }

        function fade() {
            slideItem.eq(index).fadeIn(slideSpeed).siblings().stop(true, true).fadeOut(slideSpeed);
        }

        // 用于设置向左滚动的位置
        function leftForIndex(goalIndex) {
            return { "left": -slideWidth * goalIndex + "px" };
        }

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


    });
    return this;
}




