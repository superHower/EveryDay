## 1. 变量声明
  1. 使用美元符号$
  2. 注意声明的顺序
  3. 可在一个变量中引用另一个变量
  4. 调用变量时依然使用美元符号

```scss
    //声明变量
    $font-stack: Helvetica, sans-serif;
    $primary-color: #333;

    //使用变量
    body {
      font: 100% $font-stack;
      color: $primary-color;
    }

```
## 2. 嵌套
```scss
    nav {
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      li { 
      display: inline-block; 
      }

      a {
        display: block;
        padding: 0.5em 1em;
        text-decoration: none;
      }
    }
_____________________________________
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

nav li {
  display: inline-block;
}

nav a {
  display: block;
  padding: 0.5em 1em;
  text-decoration: none;
}

```
## 3. 符号& 
  符号后面的内容与其父元素直接进行链接
  不用像平常的 嵌套子元素一样与父元素 是空格连接的
  用法： 用于各种伪类hover
```scss
.btn {
  background: blue;
  color: white;

  &:hover {
    background: darkblue;
  }

  &-primary {
    background: red;

    &:hover {
      background: darkred;
    }
  }
}
_____________________________________
.btn {
  background: blue;
  color: white;
}

.btn:hover {
  background: darkblue;
}

.btn-primary {
  background: red;
}

.btn-primary:hover {
  background: darkred;
}

```
## 4. 群组嵌套

```scss
.container {
  h1, h2, h3 {
    color: #333;
    margin-top: 0;
  }

  p, a {
    font-size: 16px;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
_____________________________________

.container h1,
.container h2,
.container h3 {
  color: #333;
  margin-top: 0;
}

.container p,
.container a {
  font-size: 16px;
}

.container a {
  text-decoration: none;
}

.container a:hover {
  text-decoration: underline;
}
```
## 5. 嵌套层内 多种选择器
在嵌套层内 用多种选择器
+ 相邻兄弟 选择器
> 子元素   选择器
~ 后继兄弟 选择器

## 6. 多属性叠写

```scss
.box {
  font: {
    family: Helvetica, sans-serif;
    size: 16px;
    weight: bold;
  }

  border: {
    width: 1px;
    style: solid;
    color: #000;
  }

  margin: {
    top: 10px;
    right: 20px;
    bottom: 30px;
    left: 40px;
  }
}
_____________________________________
.box {
  font-family: Helvetica, sans-serif;
  font-size: 16px;
  font-weight: bold;
  border-width: 1px;
  border-style: solid;
  border-color: #000;
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 30px;
  margin-left: 40px;
}
```

## 7. import
  1. 导入外部scss文件（不要添加后缀.scss）
  2. 不可导入css文件
  3. scss编译时，优先把import导入的内容进行编译
      并插入到输出css文件内
      之后才编译文本文件的内容
  4. 可以导入scss文件内的局部内容
      例如@import "./part/abc"
      

## 8. !default
  使用!default标志 去声明变量的默认值。
  如果该变量在此之前没有被赋值 或者被赋予了null，
  那么它将会被设置为!default定义的值。
```scss
$content-font: null !default;
$content-font: Arial;

body {
  font-family: $content-font;
}

_____________________________________

body {
  font-family: Arial;
}
```



## 9. @mixin函数使用
  1. 可以把mixin当作大型的结构体
  2. 可以在任意处使用@include，即可把@mixin定义内容引入
  3. @mixin声明 名称后 小括号内写入函数形参
  4. 调用时 用小括号传入实参

```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}

.box {
  @include border-radius(10px);
}
_____________________________________
.box {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```

## 10. @mixin嵌套结构
1. @mixin中可以写入任意结构
2. 甚至可以使用多种选择器
```scss
@mixin text-hover($color) {
  color: $color;

  &:hover {
    color: darken($color, 10%);
  }
}

.button {
  @include text-hover(blue);

  a {
    @include text-hover(red);
  }
}
_____________________________________
.button {
  color: blue;
}

.button:hover {
  color: darken(blue, 10%);
}

.button a {
  color: red;
}

.button a:hover {
  color: darken(red, 10%);
}

```

## 11. 继承@extends
    @extends 表示继承关系 
    name ： 表示具体的选择器

```scss
.button {
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
}

.primary-button {
  @extend .button;
  background-color: blue;
  color: white;
}

.secondary-button {
  @extend .button;
  background-color: gray;
  color: black;
}
```

## 12. 编译成css
  1. 进入到scss文件所在的目录下
  2. 打开命令提示符输入  sass s1.scss s1.css

## 13. 插值语句
  使用 #{} 符号进行包裹，就会被 Sass 解析器视为插值并进行计算或替换


# sass常见函数
## 1. color
```scss
p {
  color: lighten(red, 20%);    // 把红色的亮度增加20%
  color: darken(red, 20%);    // 把红色的亮度减少20%
  color: saturate(red, 20%);    // 把红色的饱和度增加20%
  color: desaturate(red, 20%);    // 把红色的饱和度减少20%
  color: mix(red, yellow, 25%);    // 混合红色和黄色，红色占25%，黄色占75%
  color: rgba(red, .5);    // 红色的透明度设为0.5
}
```
## 2. list函数
```scss

$list: 1px 2px 3px 4px 5px;
$list1: 1px 2px;
$list2: 3px 4px;
$list3: 5px 6px;
---------------------------------------------------------------------------
.list-length {
  width: length($list);    // 返回列表的长度。输出：5
}
---------------------------------------------------------------------------
.list-nth {
  width: nth($list, 3);    // 返回列表的第n个元素。输出：3px
}
---------------------------------------------------------------------------
$list: set-nth($list, 1, 10px); /* 重设列表的第n个元素值。*/
.list-set-nth {
  width: nth($list, 1);    // 输出：10px
}
---------------------------------------------------------------------------
.list-join {
  border-width: join($list1, $list2);    // 合并两个列表。输出：1px 2px 3px 4px
}
---------------------------------------------------------------------------
.list-append {
  border-width: append($list, 3px);    // 在列表的末尾添加一个元素。输出：1px 2px 3px
}
---------------------------------------------------------------------------
.list-zip {
  border-width: zip($list1, $list2, $list3);    // 合并多个列表为一个多维列表。输出：1px 3px 5px, 2px 4px 6px
}

```

## 3. map函数
1. map-get($map, $key)：    根据键获取值。
2. map-has-key($map, $key)：检查地图是否包含指定的键。
3. map-keys($map)：         获取Map中全部的键。
4. map-values($map)：       获取Map中全部的值。
5. map-merge($map1, $map2)：合并两个Map。
```scss



$font-sizes: (
  small: 12px,
  medium: 14px,
  large: 16px,
);
$more-font-sizes: (
  x-large: 20px,
);
---------------------------------------------------------------------------
p {
  font-size: map-get($font-sizes, medium);    // 根据键获取值。输出：14px
  font-size: map-has-key($font-sizes, small);  // 检查map是否包含指定的键。输出：true
}
---------------------------------------------------------------------------
p {
  content: map-keys($font-sizes);    // 获取Map中全部的键。输出：small, medium, large
  content: map-values($font-sizes);    // 获取Map中全部的值。输出：12px, 14px, 16px
}

---------------------------------------------------------------------------
$merged-font-sizes: map-merge($font-sizes, $more-font-sizes); // 合并两个Map。
p {
  content: map-values($merged-font-sizes);    // 输出：12px, 14px, 16px, 20px
}
```

## 4. math函数
1. percentage($number)：把一个数字转化为百分比形式。
2. round($number)：     四舍五入一个数字到最接近的整数。
3. ceil($number)：      向上取整，获取大于或等于该数的最小整数。
4. floor($number)：     向下取整，获取小于或等于该数的最大整数。
5. abs($number)：       获取一个数字的绝对值。
6. random([$limit])：   获取一个随机数，如果给定limit，那么随机数的范围在1到limit之间。

```scss
p {
  width: percentage(0.5);    // 转化为百分比。输出：50%
  width: round(10.6px);    // 四舍五入。输出：11px
  width: ceil(10.2px);    // 向上取整。输出：11px
  width: floor(10.6px);    // 向下取整。输出：10px
  margin-left: abs(-10px);    // 绝对值。输出：10px
  width: random(100);   // 输出：一个1到100之间的随机数
}
```

## 5. meta函数
1. variable-exists($name)：       检查一个变量是否存在。
2. global-variable-exists($name)：检查一个全局变量是否存在。
3. function-exists($name)：       检查一个函数是否存在。
4. mixin-exists($name)：          检查一个mixin是否存在。
5. meta.inspect($value)：         将任何Sass脚本数据转换为一个可打印的字符串。这对于调试很有用，因为它可以显示Sass颜色、列表、地图的内部结构。
6. meta.type-of($value)：         获取一个值的类型。



```scss
$my-var: 10px;
p {
  content: variable-exists(my-var);  // 检查一个变量是否存在。输出：true
}

p {
  content: global-variable-exists(my-var);  // 检查一个全局变量是否存在。输出：true
}

---------------------------------------------------------------------------
@function my-func() {
  @return 10px;
}
p {
  content: function-exists(my-func);  // 检查一个函数是否存在。输出：true
}
---------------------------------------------------------------------------
@mixin my-mixin() {
  width: 10px;
}

p {
  content: mixin-exists(my-mixin);  // 检查一个mixin是否存在。输出：true
}
---------------------------------------------------------------------------
$list: 1px 2px, 3px 4px;
p {
  content: meta.inspect($list);  // 将Sass脚本数据转换为一个可打印的字符串。输出："1px 2px, 3px 4px"
}
---------------------------------------------------------------------------
p {
  content: meta.type-of(10px);  // 获取一个值的类型。输出："number"
}

```


## 6. selector函数
  Sass的选择器函数用于处理CSS选择器。
  用于访问和操作当前或父级选择器的引用。

1. selector-nest($selectors…)：                           嵌套 多个选择器
2. selector-append($selectors…)：                         连接 多个选择器
3. selector-unify($selector1, $selector2)：               合并 两个选择器
4. selector-replace($selector, $original, $replacement)： 替换 子选择器片段。
5. selector-parse($selector)：                            解析 一个选择器为Sass理解的结构。
6. is-superselector($super, $sub)：                       检查 选择器是否是 另个的 超选择器。
7. selector-extend($selector, $extendee, $extender)：     将一个选择器（$extender）应用到另一个选择器（$extendee）。

```scss
---------------------------------------------------------------------------
p {
  content: selector-nest(".class1", ".class2");  // 嵌套 多个选择器 输出：".class1 .class2"
  content: selector-append(".class1", ".class2");  // 连接 多个选择器 输出：".class1.class2"
  content: selector-unify(".class1", ".class2");  // 合并 两个选择器 输出：".class1.class2"
  content: selector-replace(".class1.class2",".class2", ".class3");  // 替换 子选择器片段。 输出：".class1.class3"
  content: selector-parse(".class1");  // 解析 一个选择器为Sass理解的结构。 输出：(".class1".)
  content: is-superselector(".class1.class2",".class2");   // 检查 选择器是否是 另个的 超选择器。输出：true
}
---------------------------------------------------------------------------
%extendee: hover;
%extender: .class1;
p {
  content: selector-extend("%extendee", "%extender");  // 将一个选择器（$extender）应用到另一个选择器（$extendee）。输出：".class1:hover"
}
```
# 1. 控制指令
   @if 指令： @for 指令： @each 指令：@while 指令：
```scss
--------------------------------------
// 1. @if 指令：
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
--------------------------------------
/* 三元条件if的使用 */
$condition: true;
$bg-color: if($condition, blue, red); 

body {
  background-color: $bg-color;
}

--------------------------------------
// 2. @for指令
@for $i from 1 through 3 {
  .item-#{$i} { 
    width: 2em * $i; 
  }
}

--------------------------------------
// 3. @each 指令：
```scss
$animals: puma, sea-slug, egret, salamander;

@each $animal in $animals {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

--------------------------------------
// 4. @while 指令：
```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { 
    width: 2em * $i; 
  }
  $i: $i - 2;
}
```


# 2. @function 函数
```scss
// 定义一个函数，计算三角形的面积
@function triangle-area($base, $height) {
  @return 0.5 * $base * $height;
}

.container {
  height: 200px;
  width: 100px;
  --area: triangle-area(200px, 100px);
}
```





# 3. 导入导出
## 3.1 @use
    Sass的@use规则是一个在Sass中导入其他Sass文件的新方式，
    它用于在一个Sass文件中加载另一个Sass文件的变量、函数、混入等，
    并在一定程度上替代了旧版的@import规则。

```scss

// _buttons.scss 文件
$color: blue;

.btn {
  color: $color;
}

--------------------------------------------------
然后在另一个 Sass 文件中用 @use 来加载它：
// main.scss
@use 'buttons';

.container {
  color: buttons.$color;
}

.demo {
  @include buttons.btn;
}
```

## 3.2 @forward
```scss
--------------------------------------------------
在 buttons.scss 文件中定义了变量、Mixin和CSS规则：
$color: blue;

@mixin btn {
  color: $color;
}

.btn {
  @include btn;
}
--------------------------------------------------
然后在 styles.scss 文件中用 @forward 来重新导出 buttons 模块：
@forward 'buttons'

--------------------------------------------------
现在，你就可以在其它的Sass文件中用 @use 来加载 styles，然后就能访问 buttons 中的所有东西：
@use 'styles' as styles;

.container {
  color: styles.$color;
}
```


# 4. @at-root
  ## 4.1 基本使用
  1. 作用：将一段样式规则移动到样式表的 最顶层，
  2. 用来跳出任何[包含块]（如选择器、媒体查询等）。
  3. 适用于 要在顶层声明的CSS规则（如关键帧、字体声明等）

```scss
.parent {
  .child {
    @at-root .top-level {
      color: blue;
    }
  }
}
------------------------------------------------
.parent .child .top-level {
  color: blue;
}
```
  ## 4.2 without和with选项
  精确地控制要从输出中[排除或包含]的父级类型。
     
```scss
@at-root (without: media) {
  .parent {
    @media screen and (min-width: 1000px) {
      color: blue;
    }
  }
}
--------------------------------------
@media screen and (min-width: 1000px) {
  .parent {
    color: blue;
  }
}
```



























