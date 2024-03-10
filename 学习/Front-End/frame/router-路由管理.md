Vue
# 0. 单页应用程序： SPA
SPA 仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。
  一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；
  取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。
1. 优点： 对服务器压力小， 页面按需更新， 开发效率高， 用户体验好
2. 缺点： SEO差， 首次加载时间长， 前进后退路由只能由管理
3. 应用： 系统类网站/内部网站/文档类网站/移动端站点



# 0.1 组件分类
1. 页面组件: views文件夹下
2. 复用组件： components文件夹下

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



## 5.4 导航守卫--路由拦截
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

```js
// 全局前置导航守卫
const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  // 不需要登陆权证
  if (!authUrls.includes(to.path)) {
    next() // 所有的页面都直接放行
    return
  }
  // 需要登陆权证
  const token = store.getters.token
  if (token) {
    next() // token正确， 放行
  } else {
    next('/login') // token不正确， 让用户登录
  }
})
```

## 5.5. 如何 刷新后二次加载路由
  1. window.location.reload()
  2. matcher
      const router = createRouter()
      export function resetRouter(){
        const newRouter = createRouter ()
        router.matcher = newRouter.matcher
      }  




___________________________________________________________________________
React
# 1. 声明式导航
- 描述组件要跳转到哪里去
```js
<Link to="/article">文章</Link>

```

# 2. 编程式导航

useLocation[获取Router的URL信息]
useNavigate[跳转路由]

- 通过useNavigate钩子得到导航方法
- 通过调用方法的方式进行路由跳转
```javascript
  import { useNavigate } from "react-router-dom"
  const Login=()=>{
    const navigate = useNavigate() 
    return (
      <div>
        我是登录页
      <button onClick={O=> navigate('/article')}>
        跳转至文章
      </button>
      </div>
    )
  }

```
# 3. 获取路由参数方法： 
1. 获取？后的参数 useSearchParams() 
2. 获取？前的参数 useParams()

# 4. 嵌套路由
  1. 使用children属性配置路由嵌套关系
  2. 使用Outlet 组件 配置二级路由渲染 位置

## 5. 设置默认二级路由
- 去掉path: xxx 改成 index: true
- 一级路由中， 改成 link to="/"

# 6. 两种路由模式
- history: createBrowserRouter
- hash : createHashRouter

  history  底层原理：history对象 + pushState事件 （要后端支持）
  hash     底层原理：监听hashChange事件       （不需要后端支持）