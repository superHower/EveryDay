# 01_Node.js入门
1. Node.js 是一个独立的 JavaScript 运行时环境，[基于ChromeV8引擎封装], 能独立执行 JS 代码，
2. Node.js 能[编写后端]应用程序，也可以对前端代码进行[压缩，转译，整合]
3. 语法没有 document 和 window ， 无法调用DOM和BOM, 但是都支持 ECMAScript 标准的代码语法

## 基本模块fs、path、http
1. fs模块   -与[本机文件系统]进行交互的
2. path模块 -处理路径
3. http模块 -创建Web服务
   ```js
   const fs = require('fs')
   const path = require('path')
   const http = require('http')

   const server = http.createServer()
   server.on('request', (req, res) => {
     // 2. 使用 req.url 获取请求资源路径，并读取 index.html 里字符串内容返回给请求方
     if (req.url === '/index.html') {
       fs.readFile(path.join(__dirname, 'dist/index.html'), (err, data) => {
         res.setHeader('Content-Type', 'text/html;charset=utf-8')
         res.end(data.toString())
       })
     } else {
       // 3. 其他路径，暂时返回不存在提示
       res.setHeader('Content-Type', 'text/html;charset=utf-8')
       res.end('你要访问的资源路径不存在')
     }
   })
   server.listen(8080, () => {
     console.log('Web 服务启动了')
   })

   ```

# 02.模块化


1. 在 Node.js 中每个文件都被当做是一个独立的模块，模块内定义的变量和函数都是独立作用域的

2. 而且项目是由多个模块组成的，每个模块之间都是独立的，而且提高模块代码复用性，按需加载，独立作用域

3. CommonJS 标准：[标准语法]导出和导入
   导出：module.exports = {  }
   导入：const 变量名 = require('模块名或路径')
4. ECMAScript标准，[默认]导出和导入 [全部加载]
   导出：export default {} 
   导入：import 变量名 from '模块名或路径'

5. ECMAScript标准，[命名]导出和导入 [按需加载]
   导出：export 修饰定义的语句，
   导入：import { 同名变量 } from '模块名或路径'



   注： Node.js 默认CommonJS 标准语法，如果用 ECMAScript 标准语法，
        要修改package.json 文件
   ```json
      { “type”: "module" }
   ```



## 2.1 包


1. 包：将模块，代码，其他资料整合成一个文件夹

2. 包分类：
   * 项目包：主要用于编写项目和业务逻辑
   * 软件包：封装工具和方法进行使用

3. 包要求：根目录中，必须有 package.json 文件
   作用： 记录软件包的名字，作者，入口文件等信息
   默认： main 属性指定的文件


     ```js
     const { getArraySum } = require('./lib/arr.js')
     const { checkUser, checkPwd } = require('./lib/str.js')
     
     // 统一导出所有函数 - 形成utils包
     module.exports = {
       getArraySum,
       checkUser,
       checkPwd
     }
     ————————————————————————————————————————————————————————
     // 导入 utils 软件包
     const obj = require('./utils')

     const result = obj.getArraySum([10, 20, 30])
     console.log(result)
     ```

## 2.2 npm软件包管理器

1. 作用： 用于下载和管理 Node.js 环境中的软件包

## 2.3 npm全局软件包-nodemon

1. 软件包区别：
   * 本地软件包：当前项目内使用，存在于 node_modules
   * 全局软件包：本机所有项目使用存在于系统设置的位置

2. 作用：替代 node 命令，检测代码更改，自动重启程序
3. 使用：
   1. 安装：npm i nodemon -g （-g 代表安装到全局环境中）
   2. 运行：nodemon 待执行的目标 js 文件
4. 需求：使用 nodemon 命令来启动素材里准备好的项目，然后修改代码保存后，观察终端重启应用程序


# 03 Express 
Express 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。
作用： 用来快速创建 Web 服务器的。

req.query 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数：

req.params 对象，可以访问到 URL 中，通过 : 匹配到的动态参数

## 路由
路由指的是客户端的请求与服务器处理函数之间的映射关系。

## 中间件
当一个请求到达Express服务器后，可以连续调用多个中间件，从而对这次请求进行预处理

Express 的中间件，本质上就是一个 function 处理函数，[next函数]是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。
function(req, res, nexr) {
  console('这就是中间件函数')
  next()
}

作用：
多个中间件之间，共享同一份 req 和 res。基于这样的特性，我们可以在上游的中间件中，统一为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

1. 应用级别的中间件 app.use(mw)
2. 路由级别的中间件 router.use(mw)  app.use('/', router)
3. 错误级别的中间件 app.use(function (err, req, res, next){})
4. Express 内置的中间件
    1. express.static 快速托管静态资源的内置中间件，例如： HTML 、图片、CSS 样式等（无兼容性）
    2. express.json 解析 JSON 格式的请求体数据
    3. express.urlencoded 解析 URL-encoded 格式的请求体数据

5. 第三方的中间件 body-parser
```js
// 使用 body-parser 中间件来解析 JSON 格式的请求体  
app.use(bodyParser.json());  
  
// 使用 body-parser 中间件来解析 URL 编码格式的请求体  
app.use(bodyParser.urlencoded({ extended: true }));  
  
// 一个简单的 POST 请求处理路由  
app.post('/api/data', (req, res) => {  
  console.log('Request body:', req.body);  
  res.json({ status: 'success', data: req.body });  
});  

```

## 防盗链
防盗链（防止资源被其他网站链接使用）可以通过设置响应头来实现，通常的做法是检查请求中的Referer头部字段。这个字段表示了请求的来源页面，即哪个页面链接到了当前请求的资源。
```js
// 防盗链中间件  
function antiLeech(req, res, next) {  
  const allowedHosts = ['yourdomain.com', 'www.yourdomain.com']; // 允许引用资源的域名列表  
  const referer = req.headers.referer;  
  const host = req.headers.host;  
  

  if (referer) {    // 检查请求头中的Referer字段  
    const refererHost = new URL(referer).hostname;   // 提取Referer中的域名部分  
  
    // 检查Referer的域名是否在允许的列表中  
    if (allowedHosts.includes(refererHost)) {  
      next();   // 允许的Referer，继续处理请求  
    } else {   // 不允许的Referer，返回403 Forbidden  
      res.status(403).send('Forbidden: Referrer not allowed');  
    }  
  } else {  
    // 没有Referer，也返回403 Forbidden  
    res.status(403).send('Forbidden: Referrer header missing');  
  }  
}  


```
## 路由模块化-编写API接口

# EJS模板引擎
是一个简单高效的 JavaScript 模板引擎，它允许你在 HTML 中嵌入 JavaScript 来生成动态内容

```js
const express = require('express');  
const app = express();  
const ejs = require('ejs');  
  
app.set('view engine', 'ejs'); // 设置 EJS 为模板引擎  
app.set('views', path.join(__dirname, 'views')); // 设置模板文件的目录

app.get('/', (req, res) => {  
    const date = new Date();  
    const items = ['Item 1', 'Item 2', 'Item 3'];  
    res.render('index', { date: date.toISOString(), items: items });  
});

```