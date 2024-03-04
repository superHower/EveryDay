

# 2. 双向绑定原理
## 2.1. MVVM是什么
  1. M 模型       数据 
  2. V 视图       用户UI界面
  3. VM 视图模型  监听model中数据的改变， 并控制视图的更新
  核心： view 与 viewModel的双向绑定
    数据改变时， viewModel能监听到数据的变化， 自动更新视图
    视图改变时， viewModel能监听到数据的变化，通知数据进行改动

## 2.2. vue的双向数据绑定原理（必问）
  通过数据劫持，结合【发布者-订阅者模式】来实现
    在数据发生改变时， 发布消息给订阅者， 触发对应的监听回调渲染视图
    使得数据和视图是同步的
  - 原理
    data数据在初始化的时候，会实例化一个Observe类，
        它会将data数据进行递归遍历，并通过Object.defineProperty方法，给每个值添加上一个getter和一个setter。
    
    在数据【读取】时， 触发getter进行依赖（Watcher）收集，
    当数据【改变】时， 触发setter，对刚刚收集的依赖进行触发，
    并且更新watcher通知视图进行渲染。



# 3 生命周期
## 3.1. vue生命周期的理解（8个）
  组件从创建到销毁的过程
  1. 创建
      [beforeCreat]：创建实例之前。
      [created]：Vue实例创建完毕，
          可以访问data、computed、watch、methods上的方法和数据，可以进行一些简单的Ajax，对页面进行初始化之类的操作
          但还没有将虚拟Dom挂载到真实Dom上，所以此时访问不到Dom元素（el属性，ref属性此时都为空）
  2. 挂载
      [beforeMount] : 会在此时去找到虚拟Dom，并将其编译成Render,【即将】渲染与修改数据， 不会触发updade
      [mounted] : 虚拟Dom已经被挂载到真实Dom上，访问$ref, 做Ajax请求，可以获取Dom节点，对节点做一些操作
  3. 更新
      [beforeUpdate] : 虚拟Dom还没更新，此时依旧可以访问现有的Dom。
      [updated] : Dom已经更新完毕，可以执行一些依赖新Dom的操作。不建议在此时进行数据操作，避免进入死循环
  4. 销毁
      [beforeDestory] : 实例还未被销毁。实例还可以用，如：销毁定时器，解绑全局事件，销毁插件对象等
      [destoried]： 组件已经被销毁
## 3.2 keep-alive 
  会多出两个周期
      [activited]
        缓存的组件被激活： 可以进行 数据恢复、状态更新
      [deactivited]
        缓存的组件被停用： 可以进行 数据清理、状态保存

## 【问题1】keep-alive是什么？
    1. 概念： keep-alive 是 Vue 内置的一个组件，
    2. 作用： 可以使被包含的组件保留状态，避免重新渲染减少加载时间和性能消耗， 提高用户体验
    3. 使用： 一般结合路由和动态组件一起使用，用于缓存组件； 

## 【问题2】created和mounted区别
      created: 模板渲染前调用， 先初始化属性，后渲染
        请求的数据对DOM有影响
      mounted: 模板渲染完成后： 在初始化页面后，对元素节点操作，请求数据会出现闪屏， 
        请求的数据对DOM没有影响


# 4. 组件通信
  1. 父传子
      父组件 绑定属性：      <Son :msg="msg"> </Son>
      子组件 使用props接收   props:{'msg'}
  2. 子传父
      $emit
        子组件绑定自定义事件  $emit('getMsg', "子组件")
        父组件事件监听来接收  <Son @getMsg="showMsg"> </Son>
  3. 兄弟传
      new一个新的vue实例     const EventBus = new Vue()
      A 用$EventBus.$emit() 传输
      B 用$EventBus.$on() 接收
  4. vuex传值
      通过数据共享实现传值



# 5. 路由
## 5.1. 路由hash 和 history
  - url地址:
      hash 有#号
      history没有#, 但需要后端配置支持
  - 原理：
      hash：监听hash值变化, 对应的URL会被记录下来， 以实现浏览器历史页面的前进和后退；
      history：有历史记录， H5新增了pushState 和 replaceState 以修改历史记录， 不会触发页面刷新和后台数据请求
  - abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

## 5.2 route 与 router
  route:  路由信息， 包括path, params, query, name等参数
  router: 路由实例， 包含路由跳转方法， 钩子函数

## 5.3. 如何设置 动态路由？
  - params传参
      路由配置： /index/:id
      路由跳转：this.$router.push({name: 'index', params: {id: "zs"}});
      路由参数获取：$route.params.id
      最后形成的路由：/index/zs
      url参数： 参数不会再地址栏显示，刷新后会消失


  - query传参
      路由配置：/index正常的路由配置
      路由跳转：this.$rouetr.push({path: 'index', query:{id: "zs"}});
      路由参数获取：$route.query.id
      最后形成的路由：/index?id=zs
      url参数： 不容易消失



## 5.4 路由拦截
    路由拦截， axios拦截
    在路由配置中添加一个字段， 用于判断路由是否需要拦截
    {
      name: 'index',
      path:'/index',
      component: Index,
      meta:{
        requirtAuth: true
      }
    }
    router.beforeEach((to, from, next) => {
      if(to.meta.requirtAuth) {
        if(store.state.token){
          next()
        }
        else{

        }
      }
    })



## 5.5. 如何 刷新后二次加载路由
  1. window.location.reload()
  2. matcher
      const router = createRouter()
      export function resetRouter(){
        const newRouter = createRouter ()
        router.matcher = newRouter.matcher
      }  





# 6. vuex
  Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
  Vuex 应用的核心就是 store（仓库）。
  “store” 是一个容器，包含应用中大部分的状态 ( state )。
  （1）Vuex 的状态存储是响应式的。
      当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
  （2）改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。
      这样使得我们可以方便地跟踪每一个状态的变化。

  ## 6.1 vuex 属性
      1. state         存储状态
      2. getters       state的计算属性， 用于读取state
      3. mutations     用于修改state， 必须同步执行
          【commit】  执行mutations的方法
      4. actions       通过提交mutations来修改数据 （ 并非直接更新数据 ） 可以包括异步操作  ---》 一个actions中包含多个mutations
          【dispatch】执行action的方法
      5. modules       模块化vuex
          
  【vue components】 接收用户操作交互行为， 执行【dispatch】触发的action进行回应
                    若状态需要改变， 调用【commit】提交mutation修改state, 
                                                通过getters获取state的新值， 重新渲染vue Components
  ## 6.2 vuex的使用场景
      1. 用户个人信息
      2. 购物车模块
      3. 订单模块

  ## 6.3 vuex刷新数据是否丢失？
  vuex会重新获取数据， 页面也会丢失数据
  - 解决：
    1. 把数据保存在浏览器缓存里（cookie, localstorage, sessionstorage）
    2. 页面刷新时， 再次请求数据， 达到可以动态更新数据的方法



# 7 组件
  ## 7.0 概念
    组件是 可重复使用的vue实例，
          可以抽离单独的公共模块
          提高代码的复用率

  ## 7.1 如何封装组件？
    1. vue.extend() 创建组件
    2. vue.components() 注册组件
    3. 子组件需要数据： 在props中接收定义
    4. 子组件修改数据， 提交给父组件： emit()
  ## 7.2 组件的原则
    1. 功能尽可能拆开
    2. 尽量组件原子化 - 一个组件做一件事
    3. 容器组件 管理 数据， 展示组件 管理 视图
  ## 7.3 如何封装可复用组件？
    1. 低耦合： 组件之间依赖越小越好
    2. 最好父级传入信息， 不要在公共组件请求数据
    3. 传入的数据要进行校验
    4. 处理事件的方法写在父组件中

# 8. 性能优化
## 8.1. vue如何性能优化？
（1）代码层面的优化
    v-if 和 v-show 区分使用场景
    computed 和 watch  区分使用场景
    v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
    长列表性能优化
    事件的销毁
    图片资源懒加载
    路由懒加载
    第三方插件的按需引入
    优化无限列表性能
    服务端渲染 SSR or 预渲染

（2）Webpack 层面的优化

    Webpack 对图片进行压缩
    减少 ES6 转为 ES5 的冗余代码
    提取公共代码
    模板预编译
    提取组件的 CSS
    优化 SourceMap
    构建结果输出分析
    Vue 项目的编译优化

（3）基础的 Web 技术的优化
    开启 gzip 压缩
    浏览器缓存
    CDN 的使用
    使用 Chrome Performance 查找性能瓶颈



## 8.2. 如何 首屏优化？
  1. 使用 路由 懒加载
  2. 非首屏组件使用异步组件
  3. 首屏中 不要的组件  延迟加载
  4. 静态资源放在CDN上
  5. 减少首屏的 js、css等资源文件的大小
  6. 服务端渲染
  7. 减少DOM数量和层级
  8. 使用精灵图请求
  9. 使用loading
  10. 开启Gzip压缩
  11. 图片懒加载

# 9.  SPA 单页面
  SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。
  一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；
  取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。
优点：
  1. 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
  2. SPA 相对对服务器压力小；
  3. 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；

缺点：
  1. 初次加载耗时多：
      为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
  2. 前进后退路由管理：
      由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
  3. SEO 难度较大：
      由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。



# 10. diff算法和虚拟dom
1. 实现原理
    （1）用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
    （2）diff 算法 — 比较两棵虚拟 DOM 树的差异；
    （3）pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

2. 优点：
    （1）保证性能下限： 
        框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，
        它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的， 但是比起粗暴的 DOM 操作性能要好很多；
    （2）无需手动操作 DOM：
        我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，
        框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
    （3）跨平台： 
        虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，
        相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

3. 缺点:
    无法进行极致优化： 
    虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。








# 17. vue如何搭建脚手架？
    node webpack vue-cli

# 17. 如何规划项目文件？

# 18. vue强制刷新？
  1. location.reload()
  2. this.$router.go(0)
  3. provide和inject
 


  


# 19. vue遍历全局的方式
  - 1. 普通遍历：【forEach】
      arr.forEach(function(item, index, arr) {
        console.log(item, index)
      })
  - 2. 元素统一操作： 【map】
      var newarr = arr.map(function(item) {
        return item+1
      })
  - 3. 过滤出符合条件的元素：【filter】
      arr.filter(function(item) {
        if(item > 2)
          return false
        else
          return true
      })
  - 4. 符合条件的返回索引： 【findindex】
      arr.findindex(function(item) {
        if(item > 1)
          return false
        else
          return true
      })






# 18. vue与jquery的区别
    - 原理： vue数据绑定； jquery是先获取dom再处理
    - 侧重点：vue是数据驱动， jquery侧重于页面



# 19. element-ui表单通信
  1. 表单中加入rules属性，再data中写校验规则
  2. 内部添加规则
  3. 自定义函数校验



# 16. vue修饰符
    1. 事件修饰符
        .stop       阻止冒泡
        .prevent    阻止默认事件
        .capture    与冒泡的方向相反， 从内部元素向外触发事件
        .self       触发当前元素的事件， 不包括子元素
        .once       立即触发事件
    2. 按键修饰符
        .keyup      键盘抬起
        .keydown    键盘按下
    3. 系统修饰符
        .ctrl
        .alt
        .meta
    4. 鼠标修饰符
        .left
        .right
        .middle
    5. 表单修饰符
        .lazy     等输入完后再显示
        .trim     删除内容前后的空格
        .number   输入是数字， 或者转为数字
