function greet(name ,callback){
    console.log("hello"+ name)
    callback();
}
function wellcome(){
    console.log("Welcome!");
}
greet("jana", wellcome)