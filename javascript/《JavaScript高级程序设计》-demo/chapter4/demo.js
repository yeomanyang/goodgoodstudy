// 基本类型参数按值传递，函数内部改变值不会影响到外部
function addTen(num) {
    num += 10;
    return num;
}
let count = 20;
let result = addTen(count);
console.log(count);
console.log(result);

// 如果是引用类型，在参数被修改之后会反应到函数外部的变量，很容易错误地以为引用类型是按引用传递的
function setName(obj) {
    obj.name = 'yeoman';
}

let person = new Object();
setName(person);

console.log(person.name);

// 这个例子可以推翻引用类型是按引用传递的猜想，JS中引用类型传递的是引用的副本，但是这个引用引用的是同一个对象
function setName1(obj) {
    obj.name = 'yeoman';
    obj = new Object();
    obj.name = 'nick';
}

let person1 = new Object();
setName(person1);

console.log(person1.name)

// typeof 可以用来判断基础数据类型，但是对于具体的Object类型需要通过instanceof来进行判断
console.log([] instanceof Array)
console.log([] instanceof Date)

// scope chain 作用域链是为了保证对执行环境是所有变量的有序访问
var color = 'blue';
function changeColor() {
    var anotherColor = 'red';
    function swapColor() {
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
    }
    // 这里不能访问 tempColor
    swapColor();
}

// 这里不能访问 tempColor和anotherColor
changeColor();

// try...catch 使得作用域链延长
try {

} catch (error) {
    var m = 1;
    console.error(error);
}
console.log(m);

// 这段代码使用引用计数来做内存回收的话就会存在循环引用，无法释放的问题
try {
    let element = document.getElementById('some_element');
    let obj = new Object();
    obj.element = element;
    element.someObj = obj;
} catch (error) {
    console.error(error);
}
