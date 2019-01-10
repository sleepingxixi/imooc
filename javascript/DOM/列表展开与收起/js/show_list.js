function showList(){
    var show_list=document.getElementsByClassName("hide");
    var new_showList=Array.prototype.slice.call(show_list);
    for(var i=0;i<new_showList.length;i++){
        new_showList[i].style.display="block";
    }
    var more_url=document.getElementById("more_url");
    more_url.setAttribute("href","javascript:hideList();");
    more_url.innerHTML="收起";
}

function hideList(){
    var hide_list = document.getElementsByClassName("hide");
    var new_hideList = Array.prototype.slice.call(hide_list);
    for (var i = 0; i < new_hideList.length; i++) {
        new_hideList[i].style.display = "none";
    }
    var more_url = document.getElementById("more_url");
    more_url.setAttribute("href", "javascript:showList();");
    more_url.innerHTML ="更多选项";
}