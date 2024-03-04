# 1. 浮动
## 1.1 浮动的破坏性
  父盒子高度坍塌，导致页面紊乱

## 1.2 清除浮动的方法
  1. 父级设置固定高度
  2. 父级添加overflow:hidden
  3. ::after 伪元素 (万能清除法)
  4. clear 清除浮动
    ```css
      在浮动元素下方添加空div，并给该div写css样式：
      .div {
        clear:both;
        height:0;
        overflow:hidden;
      }
    ```

# 2. 定位 position
  1. static：   所有元素的[默认值]
  2. relative：相对于 [自我]   的位置, 设置top、bottom、left、right
  3. absolute：相对于 [父元素] 的位置
  4. fixed：   元素的位置相对于浏览器窗口是[固定位置]，即使窗口是滚动的它也不会移动；
  5. sticky：  它基本上是相对定位和固定定位的[混合位置]。

# 3. 块级格式上下文 BFC
  是一个独立的布局环境，BFC 内部的元素布局与外部互不影响。
## 3.1 如何形成 BFC ?
  1. 设置浮动
  2. overflow 设置为 auto、scroll、hidden
  3. positon 设置为 absolute、fixed

## 3.2 常见的 BFC 应用有：
  1. 浮动元素令父元素高度坍塌
  2. 非浮动元素被浮动元素覆盖
  3. 外边距垂直方向重合

# 4. 层叠上下文
  ## 4.0 概念：
    是HTML中一个三维的概念。一旦元素发生堆叠，
    这时就能发现某个元素可能覆盖了另一个元素或者被另一个元素覆盖。
    z-index就是在z轴上堆叠

  ## 4.1 如何形成层叠上下文？
  1. 根元素（HTML）: 页面的根元素天生具有一个层叠上下文。
  2. 定位元素: 绝对定位（position: absolute/fixed）和相对定位（position: relative）的元素，当其z-index值不是auto时会创建层叠上下文。
  3. CSS3属性: 如transform、filter、opacity等值不是默认值时，也会创建层叠上下文。

  ## 4.2 层叠顺序(层叠水平)
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

# 5. 弹性布局 Flex
  1. 父盒子设为flex布局后，子元素的float、clear、vertical-align属性会失效
  2. 应用： 列表， 导航菜单
  ## 5.1 父项：容器属性
    1. flex-direction： [决定主轴的方向]
            row             （水平方向，起点在左）
            row-reverse    （水平方向，起点在右）
            column         （垂直方向，起点在上）
            column-reverse  （垂直方向，起点在下）

    2. flex-wrap ：[决定一条轴线排不下，如何换行]
            nowrap      （默认，不换行）
            wrap        （换行）
            wrap-reverse（换行，第一行在下方）。

    3. flex-flow:  [复合形式]
            flex-direction 和 flex-wrap 的复合
            默认值： row nowrap
             
    4. justify-content [项目在主轴上的对齐方式]
            flex-start    （默认，左对齐）
            flex-end      （右对齐）
            center        （居中）
            space-between （两端对齐，项目之间的间隔相等）
            space-around  （每个项目两侧的间隔相等）

    5. align-items [项目在交叉轴上如何对齐]
            stretch       （默认值，拉伸以占满整个容器的高度）
            flex-start    （交叉轴的起点对齐）
            flex-end      （交叉轴的终点对齐）
            center        （交叉轴的中点对齐）
            baseline      （项目的第一行文字的基线对齐）

    6. align-content [多根轴线的对齐方式]
  ## 5.2 子项：项目属性
    1. order [项目的排列顺序]，默认为0。(数值越小，排列越靠前)
    2. flex-grow [项目的放大比例]，默认为0。
    3. flex-shrink [项目的缩小比例]，默认为1。
    4. flex-basis [在分配多余空间之前，项目占据的主轴空间]，默认值是 auto。
    5. flex 是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。
    6. align-self [允许单个项目与其他项目不一样的对齐方式]
            1. 可以覆盖 align-items 属性，
            2. 默认值为 auto，表示继承父元素 align-items 属性
            3. 如果没有父元素，则等同于 stretch。
          ```css
              span: nth-child(2) {
                align-self:flex-end;
              }
          ```

# 6. 网格布局 Grid
  
  ## 6.1 容器属性
  1. grid-template-rows: [行的大小以及数量]  
    ```css
    .layout {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr 200px 1fr;
      grid-template-rows: repeat(5, 1fr);
      grid-template-columns: repeat(auto-fill, minmax(260px, ifr))
    }
    ```   
  2. grid-gap：[行或列之间的间隙]
  3. grid-template-areas：[定义区域并为其命名]
  4. grid-auto-flow：[新项目添加到网格的方式]，例如 row（默认值）表示按行添加，column 表示按列添加。

  ## 6.2项目属性：
    1. grid-column-start / grid-column-end / grid-row-start / grid-row-end：[项目所处的格子范围]
    2. grid-area：[项目所处的区域]
    3. justify-self / align-self：[调整单个项目在网格内的对齐方式]



# 7. 响应式布局设计 
## 7.1 设备优先
  移动端优先首先使用的是min-width，PC端优先使用的max-width。
  
## 7.2 媒体查询@media
  1. 针对不同[媒体类型]设置不同样式
  2. 针对不同[屏幕尺寸]设置不同样式
  3. 重置浏览器大小时，页面也会重新 根据浏览器宽高 渲染页面
  4. 语法规范
    1. mediatype：all, print, screen
    2. 关键字：    and, not, only
    3. width:     可见区域宽度

## 7.3 百分比布局
  通过百分比单位，使得浏览器中组件的宽和高随着浏览器的高度的变化而变化，

## 7.4 rem适配布局
  rem单位都是相对于根元素html的font-size来决定大小的。
  当页面的size发生变化时，只需要改变font-size的值，那么以rem为固定单位的元素的大小也会发生响应的变化。

## 7.5 视口单位
  <meta name="viewport" content="width=device-width, initial-scale=1.0， user-scalable=no">
                              宽度是viewport的宽度        初始缩放比=1.0     不允许用户缩放
  px:  物理像素（分辨率）是绝对单位长度
  em:  相对单位， 根据父元素缩放
  rem: 相对单位， 根据根节点缩放，可以整体控制
        如：值62.5%  :  1rem = 10px;
  vw： 可视窗口宽度的百分之一1vw
  vh： 可视窗口高度的百分之一1vh

## 7.6 图片响应式
  1. 使用max-width
  max-width保证了图片能够随着容器的进行等宽扩充
  （即保证所有图片最大显示为其自身的 100%。此时，如果包含图片的元素比图片固有宽度小，图片会缩放占满最大可用空间），

  2. 使用srcset
  <img srcset="photo_w350.jpg 1x, photo_w640.jpg 2x" src="photo_w350.jpg" alt="">

  3. 使用background-image



