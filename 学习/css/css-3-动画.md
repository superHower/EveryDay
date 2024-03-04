# 1. 转换 transform
  ## 2D变换
  1. 位移（Translate）
  2. 缩放（Scale）
  3. 旋转（Rotate）
  4. 倾斜（Skew）
  5. 转换中心点（ transform-origin ）
    ```css
    div {
      transform: translate(50%, 50%); /* 元素会向右移动50px，向下移动100px。*/

      transform: scale(1.5, 0.5); /* 在X轴方向上等比缩放1.5倍，而在Y轴方向上缩小0.5倍。*/

      transform: rotate(45deg);    /*元素将顺时针旋转45度。*/

      transform: skew(30deg, 20deg);/*元素在X轴方向上倾斜30度，在Y轴方向上倾斜20度。*/

      transform-origin: 50px 50px; /* 转换中心点 */ 
    }
    ```
  ## 3D变换
  todo 还没看呢， 以后有机会再看！！！


# 2. 动画 animation
  1. animation-name            动画名称
  2. animation-duration        持续时间
  3. animation-time-function:  运动速度曲线 linear，ease，ease-in，ease-out
  4. animation-dely:           何时开始
  5. animation-iteration-count:播放次数  infinite
  6. animation-play-state :    是否正在运行： running或paused。
  7. animation-direction:      动画是否反向播放 
              normal: 正向播放
              reverse: 反向播放，
              alternate  在奇数次正向播放，在偶数次反向播放，
  8. animation-fill-mode : 规定动画在播放之前或之后的状态
              none : 动画将在非动画状态下显示。
              forwards : 动画将在最后一个关键帧的位置结束。
              backwards : 在动画开始前，元素应用第一帧的样式。
              both : 动画按照 forwards 和 backwards 的规则同时应用。

  ## 2.1 关键帧 @keyframes
  ```css
    /* 定义动画 */
    @keyframes big {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }

    /* 应用动画 */
    div {
      animation: big 3s infinite;
    }

  ```
  ## 2.2 3D变换添加动画
  
  ## 2.3 动画延迟 和 填充模式 和 动画性能

  ## 2.4 通过动画传递意图

  ## 2.5 运动中的变换
  CSS3 提供了转换（transform）和过渡（transition）两个非常有用的属性，可以用来创建动画效果。
  ```css
      div {
        transition: transform 2s;
      }

      div:hover {
        transform: rotate(180deg);
      }

      在这个例子中，<div> 元素在鼠标悬停时会使用2秒的时间旋转180度，从而形成动画效果。
  ```

# 3. 过渡 transition
  1. transition-property：       过渡的CSS属性： width、height、all等。
  2. transition-duration：       完成所需的时间
  3. transition-timing-function：速度曲线：     linear、ease、ease-in、ease-out
  4. transition-delay：          开始前的延迟时间。

# 4. 其他
## 4.1 背景，阴影，混合模式

## 4.2 对比，颜色，间距

## 4.3 文字排版


