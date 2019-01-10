var num = 2;
var rate = document.getElementById('rate_list');
var each_li = document.getElementsByClassName('each_rate');
console.log(Object.getPrototypeOf(each_li));
//对象数组需要通过以下代码进行浅复制变成一个新的数组
var arr = Array.prototype.slice.call(each_li);
// 点亮星星
function lightOn(num, arrays) {
    arrays.forEach(function (value,index,arrays){
        if (index < num) {
            arrays[index].setAttribute('style', 'background-position:0 0');
        } else {
            arrays[index].setAttribute('style', 'background-position:0 -26px');
        }
    });
}; 

// 绑定事件
function bindEvent(arrays,rate,num){
    arrays.forEach(function(value,index,arrays){
        arrays[index].addEventListener('mouseover',function(e){
            lightOn(index+1,arrays);
        });
        arrays[index].addEventListener('click',function(e){
            num=index+1;
        });
    });
    rate.addEventListener('mouseout',function(e){
        lightOn(num,arrays);
    });
}

// 初始化，默认情况下点亮的星星
lightOn(num, arr);
//添加绑定事件
bindEvent(arr,rate,num);
