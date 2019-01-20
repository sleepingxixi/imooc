$.fn.slide = function (options) {
    // 默认参数
    var defaults = {
        // 自动滚动开关
        autoSlide: "true",
        // 轮播滚动的类型选择
        slideType: "rolling",
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
        picInfoBackgroupColor: "rgba(97, 95, 95, 0.5)",
        picInfoTop: "",
        picInfoRight: "",
        picInfoBottom: "0",
        picInfoLeft: "0",
        picInfoPadding: "10px",
        picInfoColor: "black",


        // 轮播时间
        time: "1000",
        // 图片地址和描述
        pic_url: ["img/ad2.jpg", "img/ad3.jpg", "img/ad4.jpg"],
        pic_info: ["图片1", "图片2", "图片3"],
        // 默认显示首张图片的问题，要求从0开始计算
        firstPicIndex: 2,

        // 设置默认显示的高度
        slideWidth: "1000",
        slideHeight: "310"


    }
    // 合并参数
    var options = $.extend(defaults, options);
    // new slide(options);

    this.each(function () {
        var slideDiv = $(this);
        var slideEle = null;
        var slideContent = null;
        var slideNavLi = null;
        var slideInfo = null;
        var slideItem=null;
        var slideImg = null;
        var slideNav = null;

        var timer = null;   //定时器
        var time = options.time;    //轮播图切换事件(毫秒)
        var slideWidth = options.slideWidth; //显示窗口宽度
        var slideHeight = options.slideHeight; //显示窗口的高度

        var pic_url = options.pic_url;
        var pic_num = pic_url.length;
        var pic_info = options.pic_info;
        var oldLength = pic_num;    //item初始长度
        var length = oldLength * 2;
        var index = oldLength;  //当前索引值
        var firstPic = options.firstPicIndex;

        var slideNavType = options.slideNavType;

        init();

        //初始化
        function init() {
            // 将图片的顺序重新排列
            sortFirstPic();

            // 假定用户已经创建好slide显示窗口
            createContain();

            //添加轮播图的样式
            addSlideStyle();

            //将item复制一份加入到原item的后面，形成:原1、原2、原3、原4、...原末、复1、复2、复3、复4...复末,并定位到复1项
            slideContent.append(slideContent.html()).css({ "width": slideWidth * length + "px", "left": -slideWidth * index + "px" });

            //鼠标悬浮事件
            slideEle.hover(function () {  //移除定时任务
                clearInterval(timer);
                //设置按钮的显示
                slideEle.find('.slide-btn').css({ "display": "block" });
            }, function () {   //添加定时任务    
                isSetTimer();
                slideEle.find('.slide-btn').css({ "display": "none" });
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

            isSetTimer();
        }

        function sortFirstPic() {
            pic_url = sortPicAndInfo(firstPic, pic_url, pic_num);
            pic_info = sortPicAndInfo(firstPic, pic_info, pic_num);

        }

        // 根据用户要求首张显示图片，对图片和信息进行排序
        function sortPicAndInfo(firstPic, beSort, pic_num) {
            var tempArr1 = [];
            var tempArr2 = [];
            if (firstPic > pic_num - 1 || firstPic < 0) {
                //待处理

            } else if (firstPic != 0) {
                for (var j = 0; j < pic_num; j++) {
                    if (j >= firstPic) {
                        tempArr1.push(beSort[j]);
                    } else {
                        tempArr2.push(beSort[j]);
                    }
                }
                tempArr1.push.apply(tempArr1, tempArr2);
                beSort = tempArr1;
                tempArr1 = null;
                tempArr2 = null;
                return beSort;
            }
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
            slideEle.append('<div class="slide-info"><p></p></div>')
            //添加左右的箭头
            slideEle.append('<a href="javascript:void(0);" class="slide-btn prev"></a><a href = "javascript:void(0);" class= "slide-btn next" ></a>');

            slideContent = slideEle.find(".slide-content");

            slideNav = slideEle.find(".slide-nav");
            for (var pic_index = 0; pic_index < pic_num; pic_index++) {
                slideContent.append('<div class="slide-item"><img src="' + pic_url[pic_index] + '" alt="' + pic_info[pic_index] + '"></div>');
                slideNav.append('<li></li>');
            }
            
            // 给第一个按钮添加样式
            slideNavLi = slideEle.find('.slide-nav li');
            slideNavLi.first().addClass('active').css({
                "background-color": options.slideNavActiveColor,
                "border-color": options.slideNavActiveColor
            });

            slideInfo = slideEle.find('.slide-info');
            // 初始默认的信息
            slideInfo.find("p").html(pic_info[0]);
            slideItem=slideEle.find('.slide-item');
            slideImg = slideImg = slideEle.find('.slide-item img');

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
                "width": slideWidth+"px",
                "height": slideHeight+"px"
            });
            slideItem.css({
                "width": slideWidth + "px",
                "height": slideHeight + "px"
            });
            console.log(slideWidth, slideHeight)


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
                "height": options.picInfoHight
            });
            slideInfo.find("p").css({
                "color": options.picInfoColor,
                "font-family": options.picInfoFontFamily,
                "font-size": options.picInfoFontSize,
                "padding": options.picInfoPadding
            })


        }

        // 用于判读用户是否需要轮播
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

        function change() {
            changeSlide();
            changeNav();
            changeInfo();
        }

        //轮播图切换
        function changeSlide() {
            slideContent.animate({ left: -slideWidth * index + "px" }, 500, function () {
                if (index <= 0) {
                    //当定位到原1时，在回调函数中将slideContent瞬间定位到复1
                    index = oldLength;
                    slideContent.css({ left: -slideWidth * index + "px" });
                }
                if (index >= length - 1) {
                    //当定位到复末时，在回调中将slideContent瞬间定位到原末
                    index = oldLength - 1;
                    slideContent.css({ left: -slideWidth * index + "px" });
                }
            });
        }
        //导航点切换
        function changeNav() {
            slideNavLi.removeClass('active').css({
                "background-color": "",
                "border-color": options.slideNavColor
            })
                .eq(index % oldLength).addClass('active').css({
                    "background-color": options.slideNavActiveColor,
                    "border-color": options.slideNavActiveColor
                });
        }

        // 切换描述信息
        function changeInfo() {
            var info = $(slideImg.get(index % oldLength)).attr('alt');
            slideInfo.html(function () {
                return "<p>" + info + "</p>";
            });
        }

    });
    return this;
}




