
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
            3. 如果没有父元素，则等同于 stretch。``css               span: nth-child(2) {                 align-self:flex-end;               }           ``

# 6. 网格布局 Grid

## 6.1 容器属性

1. grid-template-rows: [行的大小以及数量]``css .layout { display: grid; grid-template-columns: 1fr 2fr 1fr 200px 1fr; grid-template-rows: repeat(5, 1fr); grid-template-columns: repeat(auto-fill, minmax(260px, ifr)) } ``
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
   `<img srcset="photo_w350.jpg 1x, photo_w640.jpg 2x" src="photo_w350.jpg" alt="">`
3. 使用background-image


28. 实现双栏布局
1. 浮动或者定位
左元素固定宽度的情况下使用左浮动，或者相对于父元素进行绝对定位，右元素的margin-left设置为浮动元素的宽度。
2. calc+inline-block
左元素或右元素固定宽度的情况下，且两个元素都为行内块级元素，对其中宽度不固定的元素使用calc(100% - 固定宽度)计算出宽度。
3. flex布局（最常用）
html复制代码<style>
    .out {
      display: flex;
    }
    .left {
      width: 200px;
      height: 200px;
      background: aquamarine;
    }
    .right {
      flex: 1;
      background: skyblue;
    }
</style>
<body>
    <div class="out">
      <div class="left"></div>
      <div class="right"></div>
    </div>
</body>

# 8. 实现三栏布局
1. calc方式
三个子元素设置display: inline-block;，两个元素固定宽度时，另一个使用calc计算宽度。
2. flex布局
两个元素固定宽度时，父元素设置display: flex;，另一个元素设置flex: 1;。
3. 定位
两个元素固定宽度时，中间和右边的元素相对于父级元素进行绝对定位，中间元素的left设置为左边元素的宽度，右边元素的right设置为0。
4. 圣杯布局（float）
圣杯布局左右区域宽高固定，中间宽度自适应，使用float+margin+position，并且优先渲染中间区域。


因为要优先渲染中间区域，因此我们编写HTML代码时应该把中间区域放在最前面，然后调整左右区域的位置。


我们让中间区域宽度占据100%，左右元素宽度固定，父元素使用padding预留出左右元素的位置。


让三个元素都进行左浮动，这时因为中间区域占据了父元素的100%，左右元素会被挤到下一行，将left的margin-left设置为-100%，它就会跑到父元素最左边内边距的右边，然后再通过relative相对定位，相对于自身向左平移自身的宽度，就到达了最左边。right的margin-left设置为负的自身宽度，这时候它会跑到父元素最右边内边距的左边，然后通过relative，让他向右平移自己的宽度，就移动到了右边。
html复制代码    <style>
    .out {
      width: 100%;
      height: 600px;
      padding: 0 200px;
    }
    .center {
      background: blue;
      width: 100%;
      height: 100%;
      float: left;
    }
    .left {
      width: 200px;
      height: 100%;
      background: red;
      float: left;
      margin-left: -100%;
      position: relative;
      left: -200px;
    }
    .right {
      width: 200px;
      height: 100%;
      background: green;
      float: left;
      margin-left: -200px;
      position: relative;
      left: 200px;
    }
  </style>
  <body>
    <div class="out">
      <div class="center"></div>
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </body>



# 9. 双飞翼布局（float）


双飞翼布局是圣杯布局的改进版，去掉了圣杯布局中的position操作。


将中间容器包裹一层元素，通过设置中间容器的margin来给左右元素腾位置，而不再通过父元素的padding给左右容器腾位置。这样左元素设置margin-left: -100%的时候，就会直接跑到页面最左边了。
html复制代码   <style>
    .out {
      width: 100%;
      height: 600px;
    }
    .center-wrap {
      float: left;
      width: 100%;
      height: 100%;
    }
    .center {
      margin: 0 200px;
      height: 100%;
      background: blue;
    }
    .left {
      width: 200px;
      height: 100%;
      background: red;
      float: left;
      margin-left: -100%;
    }
    .right {
      width: 200px;
      height: 100%;
      background: green;
      float: left;
      margin-left: -200px;
    }
  </style>
  <body>
    <div class="out">
      <div class="center-wrap">
        <div class="center"></div>
      </div>
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </body>



# 10. 实现居中布局
## 10.1. 利用弹性布局
html复制代码<style>
    .out {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .inner {
      width: 200px;
      height: 200px;
      background: aquamarine;
    }
</style>
<body>
    <div class="out">
      <div class="inner"></div>
    </div>
</body>

## 10.2. 在知道内层盒子宽高时，利用绝对定位
html复制代码<style>
    .out {
      width: 100vw;
      height: 100vh;
      position: relative;
    }
    .inner {
      width: 200px;
      height: 200px;
      background: aquamarine;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -100px;
      margin-top: -100px;
    }
</style>
<body>
    <div class="out">
      <div class="inner"></div>
    </div>
</body>

## 10.3. 在不知道盒子内层宽高时，利用绝对定位
html复制代码<style>
    .out {
      width: 100vw;
      height: 100vh;
      position: relative;
    }
    .inner {
      width: 200px;
      height: 200px;
      background: aquamarine;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
</style>
<body>
    <div class="out">
      <div class="inner"></div>
    </div>
</body>




