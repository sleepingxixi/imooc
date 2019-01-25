// 实现文章展开时，其他展开的文章会自动收起
function showList(obj){
    var abstract_div=obj.parentNode;
    var articleBody = abstract_div.nextElementSibling;
    var article_all=articleBody.parentNode.parentNode.children;
    for(var i=0;i<article_all.length;i++){
        var each_article=article_all[i].children;
        for(var j=0;j<each_article.length;j++){
            if (each_article[j].nodeType == 1 && each_article[j].getAttribute("class") == "article_body"){
                console.log(each_article[j]);
                each_article[j].style.display="none";
            }
            if (each_article[j].nodeType == 1 && each_article[j].getAttribute("class") == "abstract") {
                each_article[j].style.display="block";
                }
            }
        }
    abstract_div.style.display = "none";
    articleBody.style.display = "block";
}

function hideList(obj){
    var body_div=obj.parentNode;
    body_div.style.display="none";
    var abstract_div=body_div.previousElementSibling;
    abstract_div.style.display="block";
}