# 1. 隐藏元素的方式

| 方法               | 解释                                     |
| ------------------ | ---------------------------------------- |
| opicity: 0;        | 透明度为0                                |
| display: none;     | 元素消失，不会占据空间位置               |
| visiblity: hidden; | 元素消失，占据空间位置，一种不可见的状态 |
| position: abslote: | 移除屏幕                                 |

# 2. 哪些属性可以继承，哪些不可以

1. 文字：font
2. 文本： line-height
3. 元素可见性： visiblity:hidden
4. 表格布局属性： border-spacing
5. 页面样式： page
6. 声音样式

# 3. CSS3新特性

选择器
盒子模型属性：border-radius、box-shadow、border-image
背景：background-size、background-origin、background-clip
文本效果：text-shadow、word-wrap
颜色：新增 rgba，hsla 模式
渐变：线性渐变、径向渐变
字体：@font-face
2D/3D转换：transform、transform-origin
过渡与动画：transition、@keyframes、animation

# 4. 常见问题

## 4.1 请你说一下什么是回流和重绘，它们有什么区别？

重绘就是元素只是修改了一些不影响元素布局的内容，因此浏览器对内容更新时，不需要重新计算布局，减少了许多流程。
回流就是当我们修改或者访问一些元素layout的内容之后，浏览器就需要重新进行布局、分层、绘制、分块、光栅化等等一系列操作，如果我们频繁的导致页面回流，就会引起页面的卡顿。

## 4.2 说一说CSS中不同长度单位的区别，比如px、em、rem、vw、vh

px是一个绝对单位，1px代表了1个像素的物理大小，不会受外部的影响；
em是相对于当前文本字体大小的单位，比如当前区域字体大小为12px，那么1em = 12px，如果当前区域内字体大小继承自父元素，那么1em=父元素字体大小；
rem是相对于根节点字体大小的单位，如果我们当前html文档的根节点字体大小为12px，那么1rem = 12px；
vw是相对于当前视口宽度的单位，视口宽度被均分为100份，比如20vw，含义就是当前视口宽度的20%；
vh是相对于当前视口高度的单位，与vw一样，不过它是相对于视口高度的。

## 4.3 移动端的1px问题，为什么有时候1px看起来会比设计稿的要粗呢？

在高清屏出现之前，CSS里的px（逻辑像素）和手机物理像素是保持一致的，比如手机分辨率是375*750，那就代表手机横向有375个像素点，纵向有750个像素点，我们前端代码写多少像素就是多少像素。
随着屏幕分辨率的越来越高，有的手机尺寸没变，但是分辨率已经是之前的2倍甚至3倍，这时候就有了设备像素比dpr（devicePixelRatio）的概念，不同手机有不同的设备像素比，比如iPhone6的设备像素比就是2，那么当我们前端编写的代码为1px时，手机就会根据dpr，自动算出物理像素，也就是2px，也就是说我们代码中的1px到了真机就变成了2px。所以就造成了看起来偏粗的问题。
那如果我们直接写成0.5px呢？首先，在某些机型上这样做是没问题的，但是我们的PC端浏览器支持的最小像素为1px，某些旧版本浏览器还会把0.5px当作0px来渲染，就会造成各种各样的样式问题。

## 4.4 那么请问如何实现一个0.5px的线

我们可以通过实现一个1px的线，然后通过CSS的2D转换进行缩放，就变成了0.5px。
html复制代码 `<style>`
  .line {
    width: 100%;
    height: 1px;
    background: #333;
    transform: scaleY(0.5);
  }
`</style>`

<div class="line"></div>

## 4.5 chrome浏览器支持最小字体为12px，如果我们需要一个10像素的字体怎么办呢？

和实现0.5px的线原理相同，我们可以通过CSS的2D转换将整个元素进行缩放相应的倍率，达到10px的效果。
html复制代码 `<style>`
  .small {
    width: 200%;
    height: 200%;
    font-size: 20px;
    transform: scale(0.5);
    transform-origin: 0 0;
  }
`</style>`

<body>
  <div class="small">我是10像素</div>
</body>

## 4.6 link标签和@import引入CSS的区别

link作为HTML标签，可以放在HTML文件任何位置，而@import只能放在除了@charset以外其他CSS的前面。
link的兼容性更好，@import属于CSS2.1以后的规则，只在IE5以后才被支持。
link作为HTML标签，可以使用js动态插入，@import则比较麻烦，只能通过js先插入一个style标签，然后在里面添加@import。
link会最大限度的支持并行下载，但是@import如果嵌套过多时，就会导致串行加载，出现FOUC。
都会阻塞页面渲染，但是link标签会在HTML解析时同步解析，而@import则是在页面加载完毕之后才解析。

FOUC：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再重新显示文档，造成页面闪烁，在网速较慢或过多使用@import时出现，影响用户体验。

## 4.7 ::before和:before、:after、::after有什么区别？

没有什么区别，只是在CSS3中，为了更好的区分伪元素和伪类，才将伪元素都变成了冒号的写法。

## 4.8 文本溢出怎么处理？

单行文本溢出显示省略号

<style>
    .out {
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis; /* 文字溢出显示省略号 */
      white-space: nowrap; /* 强制文字不换行 */
    }
</style>

## 4.9 如何用 CSS 实现一个三角形

可以利用 盒模型的 border 属性上下左右边框交界处会呈现出平滑的斜线这个特点，
通过设置不同的上下左右边框宽度或者颜色即可得到三角形或者梯形。
如果想实现其中的任一个三角形，把其他方向上的 border-color 都设置成透明即可。

## 4.10 如何实现一个自适应的正方形

方法1：利用 CSS3 的 vw 单位，vw 会把视口的宽度平均分为 100 份

<style>
    .square {
    width: 10vw;
    height: 10vw;
    background: red;
    }
</style>

方法2：利用 margin 或者 padding 的百分比计算是参照父元素的 width 属性

<style>
    .square {
    width: 10%;
    padding-bottom: 10%; 
    height: 0; // 防止内容撑开多余的高度
    background: red;
    }
</style>
