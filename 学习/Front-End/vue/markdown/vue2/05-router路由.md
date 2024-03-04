# 0. 单页应用程序： SPA
1. 一个html页面，仅仅部分组件进行更新
2. 优点： 页面按需更新， 开发效率高， 用户体验好
3. 缺点： SEO差， 首屏加载时间长， 学习成本高
4. 应用： 系统类网站/内部网站/文档类网站/移动端站点

# 0.1 组件分类
1. 页面组件: views文件夹下
2. 复用组件： components文件夹下

# 1. 路由
## 1.1 介绍 
![img.png](imgs/路由介绍.png)

## 1.2 使用（在main.js中）
1. 下载插件： npm i vue-router@3.6.5
2. 引入到项目：     import VueRouter from 'vue-router'
3. 启用VueRouter: Vue.use(VueRouter) 
4. 创建路由对象：   const router = new VueRouter()
5. 注入new Vue中： router: router


## 1.3 配置路由 
### 1.3.1 建组件， 配规则（新建router文件夹下的index.js）
```
const router = new VueRouter({
  routes: [    // 规则
    {path: '/find', component: Find },
    {path: '/my', component: My },
    {path: '/friend', component: Friend },
  ]
})

export default router
```

### 1.3.2 配置导航、路由出口
```angular2html
  <div>
    <div class="footer_wrap">
      <a href="#/find">发现音乐</a>
      <a href="#/my">我的音乐</a>
      <a href="#/friend">朋友</a>
    </div>
    <div class="top">
      <router-view></router-view>      <!-- 路由出口 → 匹配的组件所展示的位置 -->
    </div>
  </div>
```

## 1.4 router-link(取代 a 标签)
1. 能跳转   <router-link to="/find">发现音乐</router-link>
2. 能高亮   a.router-link-active : 模糊匹配 （用的多）
     a.router-link-exact-active : 精确匹配 （只能匹配一级路由）
3. 自定义匹配类名
````
const router = new VueRouter({
   linkActiveClass: 'active', // 模糊匹配类名
   linkExactActiveClass: 'exact-active', // 精确匹配类名
}
````   

## 1.5 查询参数传参（多个参数）
1. 导航链接：<router-link to="/search?key=黑马程序员">黑马程序员</router-link>
2. 接收传参：$route.query.key


## 1.6 动态路由传参（单个参数）
1. 配置路由规则   { path: '/search/:words', component: Search },
2. 导航链接：<router-link to="/search/黑马程序员">黑马程序员</router-link>
3. 接收传参：$route.params.words
4. 动态路由可选符： 避免不传参数，组件显示空白
                { path: '/search/:words?', component: Search },



## 1.7 重定向 (避免默认路径时， 未匹配组件而空白)
配置路由：       { path: '/', redirect: '/home' },



## 1.8 404 (配置在路由最后)  
1. 新建NotFound组件
2. 配置路由：   { path: '*', component: NotFound },


## 1.9 模式设置
```
const router = new VueRouter({
})
```




# 2. 基本跳转
## 2.1 路径path跳转
```
      // 查询参数传参
      this.$router.push({
        path: `/search?key=${this.inpValue}`,
      })

      // 动态路由传参
      this.$router.push({
        path: `/search/${this.inpValue}`
      })
```
## 2.2 name命名路由跳转(适合长路径)
1. 给路由起名字： { name: 'search', path: '/search/:words?', component: Search },
```
      this.$router.push({
        name: 'search',   // 路由名字
        
        query:{            // 参数传参
          key: this.inpValue 
        },

        params: {          // 动态路由传参
          words: this.inpValue
        }
      })
```
## 2.3 返回上一级
@click="$router.back()"



# 3. 导航守卫
```
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

# 4. 组件缓存 keep-alive
1. include: 组件名数组， 只有匹配的组件会被缓存
2. exclude: 组件名数组， 匹配的组件都不会被缓存
3. max    : 最多可以缓存多少组件实例
```
activated() {
console.log('activated 组件激活， 看到页面（keep-alive缓存才有）')
},
deactivated() {
console.log('deactivated 组件失活， 离开页面（keep-alive缓存才有）')
}

```









