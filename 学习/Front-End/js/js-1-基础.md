# 0. js三大部分
- ECMAScript: js核心， 描述语言基础语法如var, for数据类型
- 文档对象模型DOM:   把整个HTML页面划分成元素构成文档
- 浏览器对象模型BOM: 对浏览器窗口进行访问和操作

# 1. 块级作用域（ES6 新增）: let const以及与var的区别
    let 和const 是块级作用域，只在当前作用域有效，不存在变量提升，存在暂时性死区问题
    const不可重新赋值，let和var可以

# 2. js的内置对象
Math Date RegExp
基本数据类型：String Boolean Number undefined null
  保存在 栈内存 （具体的值）

引用数据类型：Array Object Function 
  保存在 堆内存（地址）
  - 如果两个引用变量都指向通一个地址， 那么修改其中一个另一个也会改变


# 3. 操作数组的方法
  改变原数组
    push()  pop()  splice()  sort()  unshift()  shift()  reverse()  

  不改变原数组
    concat()  join()  map()  filter()  every()  some()  reduce()  isArray()  findIndex()

# 4. 数据类型的检测方式（4）
1. typeof()
  区分数据类型： 
    String、 Number、 boolean、 undefined 、symbol( ES6新增 )、bigint（ ES11 新增）
    object、function
    null: 会错误的判断为object 

2. instanceof()： 返回true 或者false
  区分引用数据类型：
    Array Object Function 

3. constructor
  大多数类型都可以判断，(除了：  声明的构造函数且他的原型指向了Array ) 

4. Object.protype.toString.call()
  全都可以判断
![Alt text](image-1.png)




# 5. setTimeout的最小执行时间
  setTimeout:  4ms
  setInterval: 10ms
  

# 6. ES6 和 ES5 区别
  ##  新增内容
  1. 块级作用域: let const
  2. 基本数据类型： symbol
  3. 解构赋值：从 数组或者对象 中【取值】， 然后给 变量【赋值】，而无需显式地逐个取出元素或属性。
  4. 扩展运算符： 对象和数组新增
  5. 数据结构：set: 内容不重复， map: key的类型不受限制
  6. 模块化： import 和 export
  7. 箭头函数
  8. async/await
  9. promise






      
# 7. 递归时遇到的问题
  若一个函数可以调用函数本身， 那么这个时递归函数
  函数内部调用自己
  写递归必须要有退出条件return， 否则会一直调用下去




# 8. js如何实现继承
  1. 原型链继承
  2. 借用构造函数继承
  3. 组合式继承
  4. ES6 的 class 类继承

# 8 js设计原理
  js引擎
  运行上下文
  调用栈
  事件循环
  回调
