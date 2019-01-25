// 使用了定时的任务进行加载


var h = 0;

function show_img() {
    if (h < 300) {
        h += 5;
        document.getElementById("show_img").style.height = h + "px";
        setTimeout(show_img, 30);
    } else {
        return;
    }
}

function hide_img() {
    if (h > 0) {
        h -= 5;
        document.getElementById("show_img").style.height = h + "px";
        setTimeout(hide_img, 30);
    } else {
        document.getElementById("show_img").style.display = "none";
        return;
    }
}

window.onload = function () {
    show_img();
    setTimeout(hide_img, 5000);
}