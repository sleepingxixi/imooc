// 设置展示图片
function showPic(each_li){
    var show_img = document.getElementById("show_img");
    var each_src=each_li.getAttribute("href");
    show_img.setAttribute("src",each_src);
}

// 给列表绑定鼠标经过事件
function bind_event(arr){
    for(var i=0;i<arr.length;i++){
        // 鼠标经过事件
        // arr[i].onmouseover=function(){
        //     showPic(this);
        // }

        // 鼠标点击事件,在下方显示，但是不跳转
        arr[i].onclick=function(){
            showPic(this);
            return false;
        }
    }
}

window.onload=function(){
    var all_li = document.getElementById("show_list").getElementsByTagName("a");
    debugger;
    bind_event(all_li);
}