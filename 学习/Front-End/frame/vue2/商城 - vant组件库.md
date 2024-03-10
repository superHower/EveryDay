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
