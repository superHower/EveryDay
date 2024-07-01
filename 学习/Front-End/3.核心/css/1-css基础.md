# 1. 三特性

层叠性、继承性、优先级
  （上 右 下 左）

# 2. 显示模式

  `<block>`             [块级框] ：   (会换行)
    举例： 【p、div】
  `<inline>`             [行内框]：   （不换行）
    举例： 【strong、span 】
  `<inliine-block>`       [行内块级框]：（内部会换行，外部不换行）
    行内块级框的行为与置换元素相似，但不完全相同。
    比如说把一个div元素像行内图像那样插入一行文本

# 3. 优先级

1. ！important
2. 行内样式
3. 选择器：
   id         【#】
   类/伪类/属性【.】 【:hover】
   标签= 伪元素【 】 【::before 、 ::after】

# 4. 选择器

## 1. 属性选择器(权重 10)

1. a[target]           选择有 target的属性       的元素
2. a[target="_blank"]  选择   target属性为_blank 的元素
3. a[data-info^='card'] 选择    以info开头       的元素
4. a[data-info$='info'] 选择    以info结尾       的元素
5. a[data-info*='info'] 选择    有info           的元素

## 2. 伪类选择器(权重 10)

1. :hover ，      当鼠标悬停在元素上时，修改元素的样式：
2. :visited ，    选择 已经访问过的链接：
3. :checked ,     选择 当前被选中的radio按钮或复选框
4. :nth-child(n), 选择 其父元素的第n个子元素

## 3. 伪元素选择器（权重 1）

  <p::before>    <p::after>
    1. 创建的元素， 属于行内元素
    2. 在dom里面看不见css创建的元素, 不是真正意义上的元素
    3. 必须有content属性

# 5. 盒模型

## 标准盒模型 box-sizing

    宽高 = content
  而padding 和 border在宽高外额外绘制，实际盒子大小= 宽高 + border + padding

## IE盒模型： border-sizing

    宽高 = border + padding + content。
  padding 和 border就会在已经设置好的宽高内绘制,width是多少盒子就是多大

# 6. 浮动

## 6.1 浮动的破坏性

  父盒子高度坍塌，导致页面紊乱

## 6.2 清除浮动的方法

1. 父级设置固定高度
2. 父级添加overflow:hidden
3. ::after 伪元素 (万能清除法)
4. clear 清除浮动
   ``css 在浮动元素下方添加空div，并给该div写css样式： .div { clear:both; height:0; overflow:hidden; } ``
5. 利用BFC清除浮动，一旦我们的父容器创建了BFC，那么就会清除内部的浮动。

# 7. 定位 position

1. static：   所有元素的[默认值]
2. relative：相对于 [自我]   的位置, 设置top、bottom、left、right
3. absolute：相对于 [父元素] 的位置
4. fixed：   元素的位置相对于浏览器窗口是[固定位置]，即使窗口是滚动的它也不会移动；
5. sticky：  它基本上是相对定位和固定定位的[混合位置]。

# 8. BFC(块级格式上下文) 

  是一个相对于外界完全独立的空间，BFC 内部的元素布局与外部互不影响。

## 8.1 如何触发BFC ?

1. 设置浮动float
2. overflow 设置为 auto、scroll、hidden, 不为visible
3. position 设置为 absolute、fixed

## 8.2 常见的 BFC 应用有：

1. 浮动元素令父元素高度坍塌
2. 非浮动元素被浮动元素覆盖
3. 外边距垂直方向重合

# 9. 层叠上下文

## 9.0 概念：

    是HTML中一个三维的概念。一旦元素发生堆叠，
    这时就能发现某个元素可能覆盖了另一个元素或者被另一个元素覆盖。
    z-index就是在z轴上堆叠

## 9.1 如何形成层叠上下文？

1. 根元素（HTML）: 页面的根元素天生具有一个层叠上下文。
2. 定位元素: 绝对定位（position: absolute/fixed）和相对定位（position: relative）的元素，当其z-index值不是auto时会创建层叠上下文。
3. CSS3属性: 如transform、filter、opacity等值不是默认值时，也会创建层叠上下文。

## 9.2 层叠顺序(层叠水平)

    1. 层叠上下文 元素的 背景和边框
    2. z-index < 0

    3. 块级盒子：block
    4. 浮动盒子: float
    5. 行内盒子：inline、inline-block、inline-table

    6. z-index: auto 或 z-index: 0
    7. z-index > 0

  同一个层叠上下文 内部子元素的 堆叠顺序是由[层叠水平]决定的，
  不同的层叠上下文 之间的      堆叠顺序是由[创建它们的元素的层叠水平]决定的。

## 问题1: 层级“穿透”

  现象： 即便元素A的z-index值比元素B高，可元素A的子元素却可能显示在元素B的下面。
  原因： 元素A创建了新的层叠上下文，而其子元素的z-index只能在该层叠上下文[内部生效]。

## 问题2: z-index不生效

  可能是因为元素没有定位属性，z-index只在创建层叠上下文的[定位元素]上才生效。
