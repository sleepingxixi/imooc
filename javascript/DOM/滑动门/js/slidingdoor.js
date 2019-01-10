window.onload = function () {
    // 获取相应的节点
    var containerId = document.getElementById('container');
    var containerImg = document.getElementsByTagName('img');

    // 单张图片的宽度
    var eachImgWidth = containerImg[0].offsetWidth;

    // 设置掩藏门体的宽度
    var exposeWidth = 160;

    // 设置container的整体宽度
    var containerWidth = eachImgWidth + exposeWidth * (containerImg.length - 1);
    containerId.style.width = containerWidth + 'px';

    // 设置每张图片的位置，由于第一张图片是居左，因此不需要设置
    function setContainerLeft() {
        for (var i = 1, len = containerImg.length; i < len; i++) {
            containerImg[i].style.left = eachImgWidth + exposeWidth * (i - 1) + 'px';
        }
    }
    setContainerLeft();
    // 设置滑动的位移
    var translate = eachImgWidth - exposeWidth;

    // 为每道门设置绑定事件
    for (var i = 0, len = containerImg.length; i < len; i++) {
        // 使用立即调用函数表达式，为了获得不同的i值
        (function (i) {
            containerImg[i].onmouseover = function () {
                // 先将每道门复位
                setContainerLeft();
                //打开门
                for (var j = 1; j <= i; j++) {
                    containerImg[j].style.left = parseInt(containerImg[j].style.left, 10) - translate + 'px';
                }
            }

        })(i);
    }


}