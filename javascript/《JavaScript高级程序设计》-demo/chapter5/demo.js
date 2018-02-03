// 用Array.isArray()来判断数组比instanceof更适合
console.log(Array.isArray([]));

// 用push和pop结合可以实现LIFO（last in first out）的栈行为
let colors = ['red', 'blur'];
colors.push('black'); // ['red', 'blur', 'black']
console.log(colors.pop()); // black
console.log(colors); // ['red', 'blur']

// 用push和shift结合可以实现FIFO（first in first out）的队列行为，从队尾进，队首出
colors.push('black'); // ['red', 'blur', 'black']
console.log(colors.shift()); // red
console.log(colors); // [ 'blur', 'black' ]

// 用unshift和pop结合可以实现FIFO（first in first out）的队列行为，从队首进，队尾出
colors.unshift('red');
console.log(colors.pop()); // black
console.log(colors); // ['red', 'blur']

let numbers = [1, 2, 3, 4];
// reverse 反转数组
console.log(numbers.reverse());

// 通过sort自定义排序规则
const sortFunc = (a, b) => {
    if (a > b) {
        return -1;
    } else if (a > b) {
        return 1;
    }
    return 0;
}
console.log(numbers.sort(sortFunc));

// 如果是数字类型，用这个简单函数就可以排序了
const sortFunc1 = (a, b) => {
    return a - b;
}

console.log(numbers.sort(sortFunc1));
