# 1. 响应式
rpx: 是小程序新增的自适应单位，它可以根据不同设备的屏幕宽度进行自适应缩放
全局样式：app.wxss 作用于每一个页面，例如：设置字号、背景色、宽高等全局样式
局部样式：page.wxss 作用对应的页面，并会覆盖 app.wxss 中相同的选择器。

# 2. 组件
1. view 组件
2. swiper 组件：轮播图
3. image 组件： 
  1. src 属性：图片资源地址
  2. mode ：图片裁剪、缩放的模式
  3. show-menu-by-longpress：长按图片显示菜单
  4. lazy-load：图片懒加载
4. text 组件
  1. user-select ：文本是否可选，用于长按选择文本
  2. space ：显示连续空格
5. navigator 组件
  1. . url ：当前小程序内的跳转链接
  2. open-type ：跳转方式
    • navigate：保留当前页面，跳转到应用内的某个页面。  但  是不能跳到 tabbar 页面
    • redirect： 关闭当前页面，跳转到应用内的某个页面。  但  不能跳转到 tabbar 页面
    • switchTab：跳转到 tabBar 页面，并关闭其他所有  非   tabBar 页面
    • reLaunch：关闭所有页面，打开到应用内的某个页面
    • navigateBack：关闭当前页面，返回上一页面或多级页面

6. scroll-view 组件：可滚动视图区域

7. 字体图表


# 3. 事件 bindtap
绑定事件使用 bind 方法，click 事件也需要使用 tap 事件来进行代替
 <view bind:tap=“fnName”></view>
 <view bindtap=“fnName”></view>

非冒泡事件：事件被触发后，不会向父节点传递
冒泡事件（bind绑定的事件）：事件被触发后，会向父节点传递，如果想阻止事件冒泡，可以使用 catch 来绑定事件。

## 事件传参
 通过 data-* 定义要传递的数据，
 <view data-id=“100” bindtap=“handler” />
 使用 mark 标记传递参数
<view mark:id=“100” bindtap=“handler” />

[问题] data-* 与 mark: 要区别在于：
mark 包含从触发事件的节点到根节点上所有的 mark: 属性值
data-* 只包含事件绑定者 或者 事件触发者那一个节点的 值

currentTarget.dataset 或者 target.dataset 

# 4. 模板语法
（1） 数据绑定
在 WXML 中，普通属性的[绑定是单向]的，
<input value="{{value}}" />

简易[双向绑定机制]。在对应属性之前添加 model: 
例如 <input model:value="{{value}}" />

📌 注意事项：简易双向绑定的属性值如下限制：
1. 只能是一个单一字段的绑定，
错误用法：<input model:value="值为 {{value}}" />
2. 也就是不支持数组和对象，
错误用法：<input model:value="{{ a.b }}" />

（2） 列表渲染 wx:for 
wx:for-item 可以指定数组当前元素的变量名
wx:for-index 可以指定数组当前下标的变量名
将wx:for 用在<block /> 标签上，以渲染一个包含多个节点的结构块
 <block /> 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染
只接受控制属性，在 wxml 中可以用于组织代码结构，支持列表渲染、条件渲染等

（3） 条件渲染
1. wx:if   通过 移除/新增节点 的方式来实现
2. hidden  通过 display 样式属性 来实现

# 5. 运行与更新
## 运行方式
冷启动：如果用户首次打开 或 销毁后再次打开，
        此时小程序需要[重新加载启动]
热启动：如果用户已经打开过某小程序，然后在一定时间内再次打开该
        小程序，此时小程序并未被销毁，只是从后台状态进入前台状态

前台: 小程序启动后，界面被展示给用户
后台: 「关闭」小程序时，并没有真正被关闭，而是进入了后台
挂起：进入「后台」状态一段时间后（5 秒），停止小程序 JS 线程执行
      当开发者使用了后台播放音乐、后台地理位置等能力时，小程序可以在后台持续运行，不会进入到挂起状态
销毁：如果用户很久没有使用小程序（目前是 30 分钟），
      或者系统资源紧张，小程序会被销毁

## 更新机制

（1）启动时同步更新 
1. 最近使用的小程序：下次小程序启动时，同步更新到最新版本
2. 长时间未使用小程：强制同步检查版本更新
3. 更新失败或超时：  为了保障小程序的可用性，会使用本地版本打开

（2）启动时异步更新
每次冷启动检查是否有更新版本
1. 有新版本更新
如果发现有新版本，将会异步下载新版本的代码包，将新版本的小程序
在下一次冷启动进行使用，本次访问使用的依然是本地的旧版本代码
2. 希望立刻进行版本更新
使用 wx.getUpdateManager API 进行处理。在有新版本时提示用
户重启小程序更新新版本。



# 6. 小程序 API
## 异步 API    
    通常都接受一个 object 类型的参数，如：wx.request({})
支持 callback & Promise 两种调用方式：
1. 当接口参数 Object 对象中不包含 success/fail/complete 时将默认返回 Promise
2. 部分接口如 request, uploadFile 本身就有返回值，因此不支持 Promise 风格的调用方式，它们的 promisify 需要开发者自行封装。
## 同步 API
    约定以 Sync 结尾，例如：wx.setStorageSync()
## 事件监听 API
    约定以 on 开头，例如：wx.onAppHide()

## 页面交互API
1. wx.showLoading() 显示 loading 提示框
2. wx.showModal() ：模态对话框，常用于询问用户是否执行一些操作
3. wx.showToast() ：消息提示框，根据用户的某些操作来告知操作的结果

## 本地存储API
存储：wx.setStorage() 
获取：wx.getStorage()
删除：wx.removeStorage() 
清空：wx.clearStorage()

## 路由与通信 API
1. 声明式导航：navigator 组件
2. 编程式导航：使用小程序提供的 API
wx.navigateTo()：保留当前页面，跳转到应用内的某个页面，但是不能跳到 tabbar 页面
wx.redirectTo()：关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
wx.switchTab()：跳转到 tabBar 页面，路径后不能带参数
wx.reLaunch()：关闭所有页面，打开到应用内的某个页面
wx.navigateBack()：关闭当前页面，返回上一页面或多级页面


## 上拉加载 API
1. 在 app.json 或者 page.json 中配置距离页面底部距离： onReachBottomDistance；默认 50px
2. 在 页面.js 中定义 onReachBottom 事件监听用户上拉加载

## 下拉刷新 API
1. 在 app.json 或者 page.json 中开启允许下拉，同时可以配置 窗口、loading 样式等
2. 在 页面.js 中定义 onPullDownRefresh 事件监听用户下拉刷新


# 7. 组件
## 插槽 slot-

页面中使用某个组件
  <custom-component>
    <view slot="before">这是插入到 before 插槽的内容</view>
    <view slot="after">这是插入到 after 插槽的内容</view>
  </custom-component>

组件中定义插槽
```js
  // 多插槽时：xxx.js
    Component({
      options: { mutipleSlots: true },
      properties: {}
      data: {}
    })
```
  组件的模板： xxx.wxml
  <view class="wrapper">
    <slot name="before"></slot>
    <view>这是组件的固有内容</view>
    <slot name="after"></slot>
  </view>

## 组件样式隔离 styleIsolation
1. 组件 wxss 文件的样式，默认只对当前组件生效
2. 若 需要 组件使用者 的样式能够影响到组件，
   这时候就需要指定特殊的样式隔离选项 styleIsolation，
   1. isolated： 表示启用[样式隔离]，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值)
   2. apply-shared： 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面
   3. shared： 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 
   或 shared 的自定义组件。

## 组件外部样式类用 externalClasses 
在使用组件时，组件使用者可以给组件传入 CSS 类名，通过传入的类名修改组件的样式。
外部样式类的使用步骤：
1. 在 Component 中用 externalClasses 定义段定义若干个外部样式类
2. 自定义组件标签通过 属性绑定 的方式提供一个样式类，属性是 externalClasses 定义的元素，属性值是传递的类名
3. 将接受到的样式类用于自定义组件内部

## 事件监听器 observers
数据监听器主要用于监听和响应任何属性 (properties) 和 数据 (data) 的变化，当数据发生变化时就会触发对应回调函数，从而方便
开发者进行业务逻辑的处理



## 使用Component构造页面
1. 要求对应 json 文件中包含 usingComponents 定义段
2. 页面使用 Component 构造器创建，需要定义与普通组件一样的字段与实例方法
3. 页面 Page 中的一些生命周期方法（如 onLoad() 等以“on”开头的方法），在 Component 中要写在 methods 属性中才能生效
4. 组件的属性 Properties 可以用于接收页面的参数，在 onLoad() 中可以通过 this.data 拿到对应的页面参数

## 组件复用机制 behaviors
每个 behavior 可以包含一组属性、数据、生命周期函数和方法
组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。


组件和它引用的 behavior 中可以包含[同名字段]
1. 如果有同名的[属性或方法]，采用 “就近原则”，组件会覆盖 behavior 中的同名属性或方法
2. 如果有同名的[数据字段]且都是[对象]类型，会进行对象合并，其余情况会 采用 “就近原则” 进行数据覆盖
3. [生命周期]函数和 [observers] 不会相互覆盖，会是在对应触发时机被逐个调用，也就是都会被执行


```js
/* 自定义一个mybehavior.js  */
module.exports = Behavior({
  properties: {
    sharedProperty: {
      type: String,
      value: '',
    }
  },
  data: {
    sharedData: 'shared data'
  },
  methods: {
    sharedMethod: function() {
      console.log('This is a shared method.');
    }
  },
  attached: function () {
    console.log('Behavior life cycle function: attached.');
  }
})

/* 其他组件中使用这个behavior */
const MyBehavior = require('my-behavior.js')

Component({
  behaviors: [MyBehavior],
  })
```

# 8. 分包
## 1. 新建分包
1. 新建分包： modules/goodModule文件夹
2. app.json文件中

```json
  "subPackages": [
    {
      "root": "modules/goodModule",
      "name": "goodModule",
      "pages": [
        "pages/list/list",
        "pages/detail/detail"
      ]
    }
  ]
```
## 2. 打包原则
1. tabBar 页面必须在主包内
2. 最外层的 pages 字段，属于主包的包含的页面
3. 按 subpackages 配置路径进行打包，配置路径外的目录将被打包到主包中
4. 分包之间不能相互嵌套，subpackage 的根目录不能是另外一个 subpackage 内的子目录

## 3. 引用原则
1. 主包不可以引用分包的资源，但分包可以使用主包的公共资源
2. 分包与分包之间资源无法相互引用， 分包异步化时不受此条限制

## 4. 独立分包
1. 是指能够独立于主包和其他分包运行的包
2. 从独立分包中页面进入小程序时，[不需要下载主包]，当用户进入普通分包或主包内页面时，主包才会被下载
3. 开发者可以将功能相对独立的页面配置到独立分包中，因为独立分包不依赖主包就可以运行，可以很大程度上提升分包页面的启动速度。
4. 在app.json文件中添加[independent]字段,

## 5. 分包预下载
1. 是指访问小程序某个页面时，预先下载其他分包中的代码和资源，
2. 当用户需要访问分包中的页面时，已经预先下载的代码和资源，因此可以直接使用，从而提高用户的使用体验。
3. 在app.json 中通过 [preloadRule] 字段设置预下载规则
```json
  "preloadRule": {
    /* 分包 预下载 */
    "pages/index/index": {
      "network": "all",
      "packages": ["modules/goodModule"]
    },
    // 独立分包 预下载
    "modules/marketModule/pages/market/market": {
      "network": "all",
      "packages": ["__APP__"] // 主包
    }
  }
```

# 9. 开放能力
