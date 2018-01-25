## JavaScript简史

1. JavaScript诞生于1995年，最初的版本是Brendan Eich在Netscape就职的时候开发的。为了搭上被热炒的Java的顺风车，临时把名字从LiveScript改成JavaScipt。
2. 平时讲的JavaScript由ECMAScript（提供核心语言功能），DOM（提供操作和访问网页内容的方法），BOM（提供与浏览器交互的接口）组成。


## HTML中使用JS

### 关于script标签

1. script 标签按照其出现的顺序来执行，但是通过appendChild加到文档上的标签是根据浏览器请求处理完成的先后顺序来执行脚本，不再保证加载顺序。

2. 当一个script 标签被执行，开标签在它之前的HTML元素可以访问。因此document.head 在任何写在网页上的 JavaScript 几乎总是可用。document.body 只有当你将 script 标签写在 <body> 标签中或者它之后的时候才可用。

3. `async` 表示异步加载脚本，使用场景是统计分析脚本，因为页面上没有其他代码需要依赖这个脚本。 `defer` 表示等待页面解析完成再执行，大致等价于将你的脚本绑定到 DOMContentedLoaded 事件，当这个脚本被执行，DOM中所有元素可以被使用。延迟脚本总是按照他们被加载的顺序执行，在加载的时候是同步的

4. `crossorigin` 这个字段可以决定是否发送凭证。

5. Script 标签和 innerHTML，通过DOM动态添加到页面上的脚本会被浏览器执行，而通过innerHTML加到页面上的脚本不会被执行。

## 基本概念

### 严格模式

ES5的严格模式对正常的JS语义做了一些更改，它有如下作用：
1. 严格模式消除了一些JS的静默错误，在严格模式下会作为异常抛出
2. 严格模式修复了JS引擎难以执行优化的错误，有时候严格模式可以比非严格模式运行更快。
3. 严格模式禁用了在未来ES版本中可能出现的语法。

#### 严格模式下的不同：

1. 给一个不存在的全局变量赋值，会抛出ReferenceError
2. 试图直接删除一个对象，会抛出SyntaxError
3. 试图删除一个不可删除的属性，比如Object.prototype，会抛出TypeError
4. 尝试给eval和arguments赋值会抛出SyntaxError
5. implements, interface, let, package, private, protected, public, static和yield，这些关键字作为未来ES版本可能会用到的不可用作变量名和形参名，否则会抛出SyntaxError

> "use strict" 语句可以开启严格模式，放在函数体内可以给这个函数打开严格模式
>

### 建议写分号，建议写代码块的花括号

### 数据类型

#### ECMAScript的五种简单数据类型：

1. undefined
2. Number,
3. String
4. Boolean
5. null

#### ECMAScript的复杂数据类型

1. Object

#### ==typeof操作符==返回的结果

1. 'undefined'
2. 'number'
3. 'string'
4. 'boolean'
5. 'object' // 其中null返回的也是object，因为null在逻辑上被认为是一个对象的空引用
6. 'function' // 从技术角度讲，JS的函数也是对象，不是一种数据类型。但是在使用上函数具有很多特殊的属性，因为通过typeof来区分是有必要的

#### Undefined

* 对于为声明的和未初始化的值通过typeof操作符返回的结果都是'undefined'，因此显示地初始化一个变量仍然是明智的做法，这样可以通过typeof能够判断一个值是否未被声明


#### Null

* 如果定义的变量是准备用来保存对象的，那么最好将这个变量初始化成null。这样做不仅可以体现null作为空对象指针的惯例，也有助于区分null和undefined的区别。

#### Boolean

任何值都可以通过==转型函数Boolean()==来转成对应的Boolean值。


数据类型  | 转成true     | 转成false
---       |---           |---
Boolean   | true         | false
String    | 非空字符串   | ''
Number    | 任何非零数字 | 0和NaN
Object    | 任何对象     | null
Undefined | n/a          | undefined

#### Number

* ECMAScript采用IEEE754格式来标示整数和浮点数（双精度数值）。
* 0.1+0.2≠0.3，不要尝试测试某个特定的浮点值
* `isFinite()`函数，在`Number.MIN_VALUE`和`Number.MAX_VALUE`的范围里返回是true。
* NaN（Not a Number）用来表示本来应该返回数值但是没有返回数值的结果，特点：
    *  任何涉及NaN的操作，都会返回NaN
    *  NaN和任何值都不相等，包括NaN
    *  `isNaN()`和`Number.isNaN()`的区别在于全局函数会尝试将参数转成数字，再进行判断，而后者则需要参数是Number类型且值为NaN才返回true

数值转换函数有三个全局函数`Number()，parseInt，parseFloat`。

Number的转换规则可以模仿`Boolean()`的总结如下：

数据类型  | 转成数值 | 转成NaN
---       |---           |---
Boolean   | false转0，true转1        | n/a
String    | ''转0，只有数字字符转成对应数字   | 包含其他都数字字符
Number    | 传入返回 | n/a
Object    | null转0，先调用valueOf()，结果依据上述规则转换，如果是NaN，再调toString()，结果再依据上述条件判断     | valueOf()和toString()之后判断结果都是NaN
Undefined | n/a          | undefined

而`parseInt()`和`Number()`区别在于：
==parseInt的转化规则简单的多，会忽略字符串前面的空格，然后自左向右找到第一个非数字字符结束，如果第一个字符不是正负号或者空格或者数字字符，则直接返回NaN。==


```

1. parseInt('') // NaN
2. parseInt('a123') // Nan
2. parseInt(' 123abc45') // 123

```

> parseInt()还有第二个参数是基数，用来指定基数，也就是说这个函数可以用来将指定进制转成十进制，建议再调用的时候第二个参数都明确指定基数
> parseFloat()和parseInt()的区别是parseFloat()会解析到第一个无效的浮点数字符为止，parseFloat('12.34.56') // 12.34。还有就是只解析十进制数值

#### String
String类型表示由多个16位Unicode字符组成的字符序列。
* JS中的字符串是不可变的，一旦创建，值就不能被改变，要改变某个字符串的值需要先销毁原来的字符串，再重新分配空间进行存储。
* String()的转化和toString()是一致的，对于没有toString()方法的null和undefined，String()会直接返回"null"和"undefined"。
* Number类型调用toString()可以传递一个进制的函数，用于将10进制转成指定进制

#### Object

* constructor：用于保存创建当前对象的构造函数
* hasOwnProperty(propertyName)：用于判断属性在当前实例中是否存在（而不是原型链）
* isPropertyOf(object)：传入的对象是否是当前对象的原型
* propertyIsEnumerable(propertyName)：传入的属性能否通过for...in来枚举
* toLocaleString()：返回与当前环境地区相对应的字符串
* toString()：返回对象的字符串表示
* valueOf()：返回对象的字符串，数值，布尔值表示，通常和toString()相同


### 操作符

#### 一元操作符

* ++i和i++，前者返先自增再计算表达式，后者先计算表达式再自增，这个大部分语言都一样
* 在对非数值调用一元操作符的时候，会像Number()一样对这个值进行转换

#### 位操作符
==待补充==

#### 布尔操作符

可以同样按照数值类型来对非操作符的进行总结：

数据类型  | 转成true   | 转成false
---       |---         |---
Boolean   |   fals     | true
String    |     ''     | 非空字符串
Number    |   0和NaN   | 任何非零数字
Object    |   null     | 任何对象
Undefined |  undefined | n/a

可以发现，和Boolean()函数的返回值是正好相反的，因此`!value`可以认为是`!Boolean(value)`，而`!!value`则和`Boolean(value)`是等价的。

&& 与操作符只有在第一个操作为true的情况下才执行第二个操作符。

> 常用的操作是用来判断第一个操作符有值之后再取第二个操作符的值作为返回值。

|| 或操作符只有在第一个操作为false的情况下才执行第二个操作符。

> 常用的操作是用来避免为变量赋值为null和undefined。

#### 加减乘除操作符

书上介绍了一些计算规则，都不太常用，有一个共同点是当非数值字符应用了这些操作符之后，同样会先执行Number()的转换。

> 对于加操作符比较特殊的是，只要有一个操作数是字符串，加法操作符就会执行字符串拼接而不是相加，代码：`5 + '5' // '55'`以及`num1 = 5;num2 = 10;message = 'The sum of 5 and 10 is ' + num1 + num2; // The sum of 5 and 10 is 510`

#### 关系操作符

* 当两个操作数都是数值，则进行数值比较
* 当两个操作数都是字符串，则对比两个操作数的Unicode编码，`'23' < '3' // true`
* 如果其中有一个操作数是数值或者布尔值（true为1，false为0），则将另一个操作数转成数值比较，如果转换结果为NaN，则只会返回false
* 如果一个操作数是对象，调用valueOf()进行对象，没有valueOf则调用toString()

#### 相等操作符

JS中`==` 和 `===`的区别：

操作数         | ==   | ===
---            | ---  | ---
null,undefined | true | false
'5',5          | true | false
null,false,0   | true | false

### 语句


1. `do {} while (condition)` 和 `while (condition){}`区别在于前者循环体内至少会被执行一次，适合循环体最少要被执行一次的场景，这个也和大部分语言一样。

2. break用于跳出整个循环体，continue表示终止这一次循环，这也大部分语言也是一致的。

3. label语句可以配合break 和 continue精确控制循环嵌套的场景。


```

var num = 0;
outermost:
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j ++) {
        if (i ===5 && j===5) {
            break outermost;
        }
        num++
    }
}
console.log(num)

```

4. with语句可以将代码的作用域设置到一个特定的对象中。==严格模式下被禁用，不建议使用==


```

with(location) {
    let qs = search.substring();
    let host = hostname;
}

```

5. ==JS中所有参数传递的都是值，不可能通过引用传递参数。（这一块需要专门总结）==
> 传送门：https://www.zhihu.com/question/27114726

6. ==JS的函数之所以不能重载是因为没有函数签名。（需要专门总结）==

