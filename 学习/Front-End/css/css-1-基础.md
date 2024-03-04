# 1. 三特性
层叠性、继承性、优先级
  （上 右 下 左）
# 2. 显示模式
  <block>             [块级框] ：   (会换行)
    举例： 【p、div】
  <inline>             [行内框]：   （不换行）
    举例： 【strong、span 】
  <inliine-block>       [行内块级框]：（内部会换行，外部不换行）
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