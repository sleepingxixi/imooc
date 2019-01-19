// 制作轮播图
function banner(){
    var ban_list = document.getElementById("ban_list");
    var ban_list_a = ban_list.getElementsByTagName("a");
    var each_ban=document.getElementById("each_ban");
    var new_ban_list=Array.prototype.slice.call(ban_list_a);
    for (var i = 0; i < ban_list_a.length;i++){
        ban_list_a[i].number=i;
        ban_list_a[i].onclick=function(){
            new_ban_list.forEach(function(value,index,array) {
                array[index].style.backgroundColor="#fff";
            });
            var result = -(this.number)*1000;
            each_ban.style.left=result+"px";
            ban_list_a[this.number].style.backgroundColor ="#e32217";
        };
    }
}

window.onload=function(){
    banner();
}