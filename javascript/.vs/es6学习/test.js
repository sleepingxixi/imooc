function pick(object,...keys){
    let result=Object.create(null);
    for(let i=0,len=keys.length;i<len;i++){
        result[keys[i]]=object[keys[i]];
    }
    return result;

}

let book={
    title:"hahah",
    author:"liping",
    year:2018
}
let result=pick(book,"title","year","e");
console.log(result);