# 38. AJAX、XHR、Fetch是什么

（1）AJAX
AJAX（Asynchronous JavaScript And XML）是一种使用XMLHttpRequest技术构建更复杂，动态的网页的编程实践。
AJAX 允许只更新一个HTML页面的部分[DOM]，而无须重新加载整个页面。AJAX 还允许异步工作，这意味着当网页的一部分正试图重新加载时，你的代码可以继续运行（相比之下，同步会阻止代码继续运行，直到这部分的网页完成重新加载）。
MDN对AJAX的介绍
（2）XHR
XHR就是XMLHttpRequest对象，主要用于跟服务器交互，虽然名称是这样，但是它可以获取任何类型的数据，并且除了HTTP协议外还支持其它协议。
MDN对XMLHttpRequest的介绍
（3）Fetch
Fetch已经在逐渐取代AJAX，全局的 fetch()方法用于发起获取资源的请求。它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 Response对象。
MDN对fetch的介绍

# 41. V8引擎的隐藏类你了解吗？

隐藏类是v8引擎对对象访问速度以及内存空间所做的一个优化。
js是一门动态语言，之所以性能不如静态语言，是因为像静态语言在创建一个对象时，它会先创建一个类，然后对象的结构和属性就已经被固定了，而js不同，比如我们通过js创建一个对象obj，一开始给了它a、b两个属性，但是突然我们想往里面加一个c属性，可能我们直接使用obj.c = xxx就给它赋值了，这种行为其实是不好的，因为它会影响V8所做的隐藏类的优化。
隐藏类，顾名思义，一个“隐藏”的类，在我们编写代码的过程中，是看不到的，但是在V8解析我们的代码时，它会帮助我们的对象生成一个类。比如：
js复制代码const obj = {
    name: 1,
    age: 2
}

// v8解析时创建一个隐藏类
function Hidden(name,age) {
    this.name = name
    this.age = age
}

隐藏类有什么用

当V8为一个对象创建了一个隐藏类只会，V8就会默认这个对象的属性和结构已经固定了，不会再改变，因此它会记录每一个属性以及对应属性在对象中的偏移量（索引），当我们访问对象的属性时，V8会先去查找隐藏类，然后查看当前属性在对象属性中的索引，直接找到该属性在内存的位置（知道了索引就不用遍历对象键名一个个比对是不是当前要查找的键名了），然后就可以很快速的给到我们结果，这就是隐藏类最大的作用之一，提升访问效率。

当两个对象的属性和结构相同时，V8会让两个对象共用一个隐藏类，这样就不会声明多余的隐藏类，节省了内存的使用。

代码内联缓存：当一个属性或方法被调用时，V8会先查看调用对象的结构，查看之前是否访问过相同结构的隐藏类对象，如果有的话，就会使用之前记录的访问路径，以达到快速访问的目的。

js复制代码const obj = {
    name: 1,
    age: 2
}
const obj1 = {
    name: 1,
    age: 2
}
const obj2 = {
    age: 2,
    name: 1
}

在上述代码中，obj和obj1共用一个隐藏类，因为它们属性排布顺序以及属性名都是一样的，而obj和obj2就是两个不同的隐藏类，虽然它们属性相同，但是结构不同（一个是name在上面一个是age在上面）。
我们应该做什么
既然V8引擎帮助我们实现了隐藏类，来对我们的性能进行优化，那我们应该合理利用这一点，在编写代码时尽量做到以下几点：

创建对象时一次性声明所有属性，不要频繁往对象里新增属性；
创建相同属性的对象时，保证属性的顺序是一致的；
不要删除对象的属性；

# 37. eval是做什么的？

eval会将字符串以js脚本的方式执行，在一些框架或者库的源码中，就有很多使用eval的场景。

传入参数字符串时：会当作js脚本执行，如果字符串是一个算数表达式，那么则会返回这个表达式的结果；
传入的参数不是一个字符串时：会将参数原封不动的返回；

js复制代码eval("console.log('eval')") // eval
console.log(eval('1 + 2 + 3')) // 6
console.log(eval(1)) // 1

# 44. parseInt的参数

parseInt：解析一个字符串，并返回指定基数的十进制整数。
它一共有两个参数：

第一个参数（string）：是一个字符串，需要被解析的值；
第二个参数（radix）：指定的基数，为2-36的整数，表示进制的基数，比如2，就是以二进制解析，16就是以16进制解析，如果不在这个返回，就会返回NaN，如果没有传参，就会以第一个参数的值进行推算；

需要注意的点：

它是先将传入的字符进行指定基数的转化，然后再将转化后的字符转化成十进制；
如果第一个字符不能转换为数字，parseInt 会返回 NaN；
如果解析过程中遇到的字符不是指定基数中的数字，比如parseInt('abcde',8)，parseInt解析到a，发现a不是8进制中的数字，就会停止a之后所有字符的解析，返回值只会返回已解析的那部分字符的结果，在这个例子中，没有被解析的字符，因此返回NaN；
某些数字在字符串表示形式中会使用e字符，因此对特别大或特别小的数字使用parseInt时，会发生意想不到的结果；
使用parseInt转换BigInt类型的数据时，有可能发生精度丢失问题，尾部的n也会丢失；
如果radix是undefined、0或者没有指定，会根据以下情况推导：

如果第一个参数以0x开头，会默认radix = 16。
如果第一个参数以0开头，会默认radix = 8或10，ES5中规定了默认应该使用10，但是不是所有浏览器都遵循规范，所以在使用parseInt时，最好给一个radix值。
如果第一个参数以其他任何值开头，都会默认radix = 10。

# 56. JS模块化

（1）模块化有什么优点
在没有模块化的时候，通常我们会拆分多个js文件，然后通过script标签引入，这种方式十分容易造成变量污染，比如在别的js文件中声明了一个和当前页面相同名称的变量，这就会造成许多意想不到的问题，而有了模块化之后，每个模块都有自己独立的作用域，别人想使用你的代码，直接将你的模块进行导入，并且不会产生变量污染的问题，极大的增加了开发的便捷性和安全性。
（2）模块化都有哪几种
js中的模块化有多种方案，但是它们一开始都不是官方方案，比如CommonJs、AMD、UMD、CMD等，直到ES6模块化的出现，才有了一个官方的模块化解决方案。
（3）CommonJs

CommonJs一般用于Node环境，也是Node.js中默认的模块化规范，因为它是同步加载的，在浏览器环境同步加载的方式可能会导致很多任务阻塞；
每个文件都是一个模块，每个模块都有自己的作用域；
CommonJs通过module.exports来导出模块，通过require来导入模块；
模块多次被加载时，首次加载会对加载结果进行缓存，再次加载时会使用缓存；

（4）AMD

AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。
AMD通过define(function(){})来定义模块，define([otherModule], function(){})来定义依赖其他模块的模块，通过require([module], function(){})的方式来加载模块；
AMD推崇依赖前置、提前执行（在文件一开始时就声明所需要的模块，然后加载模块，执行回调函数）；
require.js中实现了AMD的规范；

（5）CMD

CMD使用按需加载，不需要在一开始就对模块进行加载；
CMD推崇依赖就近、延迟执行（在需要用到模块的地方进行导入模块，不需要在一开始就声明）；
CMD和AMD类似，通过define方式定义模块，不过定义模块函数中有三个参数require、export、module，require用于加载其它模块，export用于导出方法，module是一个对象，存储着与当前模块关联的一些属性和方法；
sea.js中实现了CMD的规范；

（6）ES6模块化

ES6模块是可以实现静态分析的，也就是说，通过编译代码时，浏览器会识别import，然后进行静态分析，就能确定各个模块之间的依赖关系，这一点是其它模块化方式做不到的；
ES6模块化使用export导出模块，使用import导入模块；

（7）各个模块化的区别

AMD和CMD的区别：

AMD推崇依赖前置，也就是说要把当前模块使用到的模块提前声明，而CMD则推崇依赖就近，使用到哪个模块时再进行导入；
AMD推崇提前执行，在加载完模块之后会立即执行模块，而CMD加载完模块并不会立即执行，而是等到require语句才去执行相应的模块；
CMD区分了require、export、module等，各自的分工不同，而AMD没区分这么清楚；

CommonJs和ES6模块化的区别

CommonJs的模块是运行时加载整个模块，然后生成一个对象，而ES6模块不是一个对象，它是在编译时静态分析然后加载特定的值；
CommonJs模块输出的是一个值的拷贝，而ES6模块输出的是一个值的引用；
CommonJs的require是同步加载，而ES6模块的import命令是异步加载；

（8）CommonJs中的module.exports和exprots
在CommonJS中，有两种导出模块的方法，一个是module.exports，另一个是exports，它们有什么不同呢？
其实modules.exports就是exports，因为在源码中有一行代码就是类似：
js复制代码const exports = modules.exports

也就是说，它们两个指向同一块内存地址，但是如果给modules.exports重新赋值，那情况就不一样了。
js复制代码let modules.exports = {} // 比如此时modules.exports的内存地址是0x100
const exports = modules.exports // 此时exports的内存地址也是0x100

modules.exports = {} // 这相当于将modules.exports重新赋值了一个对象，内存地址变成了0x110

// 而此时exports对象的内存地址还是0x100，它们就不相等了。

如果将exports重新指向一个其它值，那就完了，就会丢失所有和modules.exports的联系。
（9）ES6模块化导入导出的方式

1. 导出某个变量
   js复制代码export const a = 1
2. 统一导出
   js复制代码const a = 1

const b = function () {
  console.log('b')
}

const c = {
  name: 'c'
}

// 可以起别名
export { a as a1, b, c }

3. 默认导出
   js复制代码export default {
   a: 1,
   b: 2
   }
4. 导出其它文件所有内容
   js复制代码export * from './index'
5. 导入某个变量
   js复制代码import { a } from './index'
   import { b as b1 } from './index'
6. 导入所有
   js复制代码import * as module from './index'
7. 导入默认
   js复制代码import module1 from './module1'
   // 只允许将default重命名，不能直接将default解构导入
   import { default as xx } from './module1'

# 43. 不同版本的ECMA标准都增加特性吗？

我只是列举出来了一些常用的，具体全一点的大家可以去网上找相关内容去看。
（1）ES6（es2015）
ES6是属于一个跨度比较大的阶段，诞生了如class、箭头函数、Promise、let和const、展开运算符、模板字符串、块级作用域、模块化等。
（2）ES7（es2016）
ES7新增了数组的includes方法、求幂运算等。
（3）ES8（es2017）
ES8新增了async/await、Object.values()、Object.entries()、字符串补全、参数列表支持尾逗号、Object.getOwnPropertyDescriptors()等；
（4）ES9（es2018）
ES9新增了for-await-of异步迭代、Promise.finally()、Rest/Spread、解除模板字符串限制（Lifting template literal restriction）等；
（5）ES10（es2019）
ES10新增了可选的catch参数、函数的toString()方法、消除前后空格（trimStart()、trimEnd()）、数组的flat、flatMap方法、JSON超集、JSON.stringify()加强格式转化、Object.fromEntries、Symbol.prototype.description等；
（6）ES11（es2020）
ES11新增了BigInt、可选链?.、全局对象、Promise.allSettled、??空值合并、模块新特性（import动态导入）、String.prototype.matchAll（匹配所有）等；
（7）ES12（es2021）
ES12新增了WeakRefs、Promise.any、逻辑赋值运算符、数字分隔符、String.prototype.replaceAll等；
（8）ES13（es2022）
ES13新增了Class Static Block(类静态块)、顶层await、Object.hasOwn()、.at()方法返回指定索引元素、私有字段检查、类的私有属性class fields、异常链（给Error构造函数新增options）等；
（9）ES14（es2023）
ES14新增了findLast()、findLastIndex从尾部查找、Hashbang语法（想执行js文件需要在控制台输入node xx.js）；
