## 1. 安装vant2
npm i vant@latest-v2 -S

## 2. 全部引入组件（main.js）
```
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

```

## 3. 按需引入组件
### 3.1. 安装插件
npm i babel-plugin-import -D



### 3.2. 在 babel.config.js 中配置
```
module.exports = {
plugins: [
    ['import', {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
        }, 'vant']
    ]
};
```

### 3.3. 封装vant (utils文件夹下， 新建 vant-ui.js)
```
import Vue from 'vue';
import Vant from 'vant';
import { Button, Switch } from 'vant;

Vue.use(Button)
Vue.use(Switch)
```

### 3.4 使用(main.js)
import '@/utils/vant-ui'


## 4. 浏览器适配
1. npm i postcss-px-to-viewport@1.1.1 -D 

2. 在项目中新建postcss.config.js文件
```
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
    },
  },
};
```

## 5. tabbar
1. 路由跳转： van-tabbar route
2. 激活颜色：active-color="orange"
3. 图表选择：icon="home-o"
4. 跳转路径： to="/home"

```
    <van-tabbar route v-model="active" active-color="orange" inactive-color="#000">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
```

## 6. navbar
```
    <van-nav-bar
      title="会员登陆"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
```

## 7. Toast请提示
1. 导入调用（哪里都可以）
```
import { Toast } from 'vant'
Toast('提示内容')

```
2. this调用（只能组件内）
this.$toast('提示内容')

3. Toast 默认是单例模式，后面的 Toast调用了，会将前一个 Toast 效果覆盖
  
