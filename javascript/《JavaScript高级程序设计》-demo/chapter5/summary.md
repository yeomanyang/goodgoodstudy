## Object类型

初始化对象的两种方法，new Object()和对象字面量，在用对象字面量初始化的时候不会调用Object的构造函数

## Array类型

* Array的length属性不是只读的，通过设置这个属性，可以从数组的末尾移除或者添加新项。
* 数组的检测建议用Array.isArray()，而不是instance，这样可以避免有多个全局环境。

### Array的操作函数：

1. 用push和pop结合可以实现LIFO（last in first out）的栈行为


```
let colors = ['red', 'blur'];
colors.push('black'); // ['red', 'blur', 'black']
console.log(colors.pop()); // black
console.log(colors); // ['red', 'blur']
```

2. 用push和shift结合可以实现FIFO（first in first out）的队列行为，从队尾进，队首出

```
let colors = ['red', 'blur'];
colors.push('black'); // ['red', 'blur', 'black']
console.log(colors.shift()); // red
console.log(colors); // [ 'blur', 'black' ]
```

用unshift和pop结合可以实现FIFO（first in first out）的队列行为，从队首进，队尾出

```
let colors = [ 'blur', 'black' ];
colors.unshift('red');
console.log(colors.pop()); // black
console.log(colors); // ['red', 'blur']
```


3. concat在数组后面进行拼接，但是不会改变原来的数组

```
let colors = ['red', 'blur'];
console.log(colors.concat('yellow')); // [ 'red', 'blur', 'yellow' ]
console.log(colors); // [ 'red', 'blur' ]
```

4. slice函数返回从指定起始为止到结束位置的数组（不包括最后一个元素），但不会改变原数组，如果没有指定第二个参数的话，等价于 arr.slice(start, arr.length);

```
let colors = ['red', 'blur'];
console.log(colors.slice(0)); // [ 'red', 'blur' ]
console.log(colors.slice(0, 1)); // [ 'red' ]
console.log(colors); // [ 'red', 'blur' ]
console.log(colors.slice(1, 0)); // [] 如果初始位置大于结束位置，则返回空数组
```

5. splice是数组操作中最强大的一个函数，可以实现增，删，改的全部操作，并且会直接影响原来的数组


```
let colors = ['red', 'blur'];
// 增
console.log(colors.splice(2, 0, 'black')); // []
console.log(colors);  // [ 'red', 'blur', 'black' ]

// 删
console.log(colors.splice(0, 1)); // [ 'red' ]
console.log(colors);  // [ 'blur', 'black' ]

// 改
console.log(colors.splice(0, 1, 'green')); // [ 'blur' ]
console.log(colors);  // [ 'green', 'black' ]
```

6. reverse和sort进行排序


```
let numbers = [1, 2, 3, 4];
// reverse 反转数组
console.log(numbers.reverse());

// 通过sort自定义排序规则
const sortFunc = (a, b) => {
    if (a < b) {
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
```

7. indexOf 和 lastIndexOf用来查找元素在数组中的索引，如果不存在则返回-1，indexOf从前往后找，lastIndexOf反之

```
let numbers1 = [1, 2, 3, 4];
console.log(numbers1.indexOf(2)); // 1
console.log(numbers1.lastIndexOf(2)); // 1
console.log(numbers1.indexOf(0)); // -1
```

### Array的5种迭代方式：


```
let numbers2 = [1, 2, 3, 4, 5];
// every方法用来测试是否所有元素都满足给定的函数
const everyRes = numbers2.every((item, index) => {
    return item === 2;
});
// some方法用来测试是否有元素满足给定的函数
const someRes = numbers2.some((item, index) => {
    return item === 2;
});

console.log(everyRes);
console.log(someRes);

// filter方法用来筛选满足条件的元素
const filterRes = numbers2.filter((item, index) => {
    return item === 2;
});

// map方法用来返回经过给定函数处理的新数组
const mapRes = numbers2.map((item, index) => {
    return item + 1;
});

console.log(filterRes); // [ 2 ]
console.log(mapRes); // [ 2, 3, 4, 5, 6 ]

// forEach没有返回值，作用和for循环类似，但是forEach中return是结束这一次循环，而整个循环会一致迭代到结束
numbers2.forEach((item, index) => {
    if (item === 1) {
        return;
    }
    console.log(item);
});

// 归并方法，第一个参数是前一次的归并结果，第二个参数是下一个值，reduceRight的区别是从后往前进行迭代
const reduceRes = numbers2.reduce((a, b) => {
    return a + b;
});

console.log(reduceRes); // 15

const reduceRes1 = numbers2.reduceRight((a, b) => {
    return a + b;
});

console.log(reduceRes1); //15
```
