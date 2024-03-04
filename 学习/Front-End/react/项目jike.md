
# 0. 基础配置
## 0.0 快速搭建开发环境
- npx create-react-app react-jike
- yarn start
## 0.1 安装
sass[预编译器]
antd[组件库]
echarts[图表库]
normalize.css[兼容不同浏览器css]
react-quill@2.0.0-beta.2[富文本编辑器]

axios[请求] : utils/request.js


json-server[模拟接口] ：server/db.json
@craco/craco[别名路径] : jsconfig.js  cracoconfig.json

react-router-dom[路由] : router
@reduxjs/toolkit[状态管理] : store


## 0.2 配置@别名路径
```js
// 0. 安装  
   yarn add @craco/craco
// 1. 新建craco.config.js

   const path = require('path');

   module.exports = {
   webpack: {
      alias: {
         '@': path.resolve(__dirname, 'src/')
      }
   }
   }
// 2. 修改package.json
   {
   "scripts": {
      "start": "craco start",
      "build": "craco build",
      "test": "craco test",
      "eject": "react-scripts eject"
   }
   }

// 3. 新建jsconfig.json

   { // 联想别名配置
   "compilerOptions": {
      "baseUrl": "./",
      "paths": {
         "@/*": ["src/*"]
      }
   }
   }
```
## 0.3 模拟接口服务
- pnpm i -g json-server
- 创建db.json文件： 放置各种json数据
- json-server：模拟接口服务， 通过axios发送接口请求
- package.json中添加serve脚本
- "serve": "json-serve db.json --port 3004"
- pnpm run serve


## 0.4 Hook钩子
useDispatch[使用Redux中store的state]
useSelector[使用Redux中store的异步方法]

useLocation[获取Router的URL信息]
useNavigate[跳转路由]

useRef     [绑定DOM元素]
useState   [数据与视图绑定]
useEffect  [进行与函数主作用无关的操作]
            如axios, 修改DOM, 获取数据
