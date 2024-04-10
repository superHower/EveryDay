## 06.Webpack 静态模块打包工具


1. Webpack 是一个，从入口构建依赖图，打包有关的模块，最后用于展示你的内容

2. 静态模块：编写代码过程中的，html，css， js，图片等固定内容的文件

3. 打包过程，注意：只有和入口有直接/间接引入关系的模块，才会被打包

4. Webpack 的作用：把静态模块内容，压缩，这个和，转译等（前端工程化）

   * 把 less/sass 转成 css 代码
   * 把 ES6+ 降级成 ES5 等
   * 支持多种模块文件类型，多种模块标准语法


## 02.Webpack 修改入口和出口

## 04.Webpack 自动生成 html 文件

### 目标

让 Webpack 拥有自动生成 html 文件能力，并引入打包后的其他资源



### 讲解

1. [插件 html-webpack-plugin 作用](https://webpack.docschina.org/plugins/html-webpack-plugin/)：在 Webpack 打包时生成 html 文件，并引入其他打包后的资源

2. 步骤：

   1. 下载 html-webpack-plugin 本地软件包到项目中
      npm i html-webpack-plugin --save-dev

   2. 配置 webpack.config.js 让 Webpack 拥有插件功能

   1. 注意：Webpack 默认只识别 JS 和 JSON 文件内容，所以想要让 Webpack 识别更多不同内容，需要使用加载器

   * [加载器css-loader] 解析 css 代码
   * [加载器style-loader] 把解析后的 css 代码插入到 DOM（style 标签之间）
      ```js
      // ...
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      
      module.exports = {
        // ...
        plugins: [
          new HtmlWebpackPlugin({
            template: './public/login.html', // 模板文件
            filename: './login/index.html' // 输出文件
          })
        ]，
       module: {
        rules: [ // 规则列表
            {
              test: /\.css$/i, // 匹配 .css 结尾的文件
              use: ['style-loader', 'css-loader'], // 使用从后到前的加载器来解析 css 代码和插入到 DOM
            }
          ]
       }
      }
      ```

## 05.Webpack-打包 css 代码


## 06.优化-提取 css 代码

### 目标

让 Webpack 能够提取 css 代码到独立的 css 文件中



### 讲解

1. 需求：让 webpack 把 css 代码内容字符串单独提取到 dist 下的 css 文件中

2. 需要：mini-css-extract-plugin 插件来实现

3. 步骤：

   1. 下载 mini-css-extract-plugin 插件软件包到本地项目中
      npm i --save-dev mini-css-extract-plugin
      ```

   2. 配置 webpack.config.js 让 Webpack 拥有该插件功能

      ```js
      // ...
      const MiniCssExtractPlugin = require("mini-css-extract-plugin")
      
      module.exports = {
        // ...
        module: {
          rules: [
            {
              test: /\.css$/i,
              // use: ['style-loader', 'css-loader']
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
          ],
        },
        plugins: [
          // ...
          new MiniCssExtractPlugin()
        ]
      };
      ```

      

   3. 打包后观察效果

   4. 注意：不能和 style-loader 一起使用

   5. 好处：css 文件可以被浏览器缓存，减少 JS 文件体积，让浏览器并行下载 css 和 js 文件





### 小结



## 07.优化压缩过程

### 目标

把单独提取的 css 文件内代码压缩



### 讲解

1. 需求：把提出的 css 文件内样式代码压缩

2. 需要：css-minimizer-webpack-plugin 插件来实现

3. 步骤：

   1. 下载 mini-css-extract-plugin 插件软件包到本地项目中

      ```bash
      npm i css-minimizer-webpack-plugin --save-dev 
      ```

   2. 配置 webpack.config.js 让 Webpack 拥有该插件功能

      ```js
      // ...
      const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
      
      module.exports = {
        // ...
        // 优化
        optimization: {
          // 最小化
          minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 
            // `terser-webpack-plugin`），将下一行取消注释（保证 JS 代码还能被压缩处理）
            `...`,
            new CssMinimizerPlugin(),
          ],
        }
      };
      ```

   3. 打包后观察 css 文件内自己代码是否被压缩了






### 小结



## 08.Webpack-打包 less 代码

### 目标

让 Webpack 拥有打包 less 代码功能



### 讲解

1. [加载器 less-loader](https://webpack.docschina.org/loaders/less-loader/)：把 less 代码编译为 css 代码，还需要依赖 less 软件包

2. 步骤：

   1. 新建 login/index.less 文件，设置背景图样式（图片在配套资料-素材文件夹中）

      ```less
      html {
        body {
          background: url('./assets/login-bg.png') no-repeat center/cover;
        }
      }
      ```

      

   2.  less 样式引入到 src/login/musicRouter.js 中

      ```js
      /**
       * 目标8：打包 less 代码
       *  8.1 新建 less 代码（设置背景图）并引入到 src/login/musicRouter.js 中
       *  8.2 下载 less 和 less-loader 本地软件包
       *  8.3 配置 webpack.config.js 让 Webpack 拥有功能
       *  8.4 打包后观察效果
       */
      // 8.1 新建 less 代码（设置背景图）并引入到 src/login/musicRouter.js 中
      import './index.less'
      ```

   3. 下载 less 和 less-loader 本地软件包

      ```bash
      npm i less less-loader --save-dev
      ```

   4. 配置 webpack.config.js 让 Webpack 拥有功能

      ```js
      // ...
      
      module.exports = {
        // ...
        module: {
          rules: [
            // ...
            {
              test: /\.less$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            }
          ]
        }
      }
      ```

   5. 打包后运行  观察效果



### 小结

1. Webpack 支持 less 代码打包需要哪 2 个软件包?

   <details>     
   <summary>答案</summary> 
   <ul>
   <li>需要 less less-loader 这 2 个软件包</li>
   </ul> 
   </details>



## 09.Webpack-打包图片

### 目标

 让 Webpack 支持图片等资源打包



### 讲解

1. [资源模块](https://webpack.docschina.org/guides/asset-modules/)：Webpack 内置了资源模块的打包，无需下载额外 loader 

2. 步骤：

   1. 配置 webpack.config.js 让 Webpack 拥有打包图片功能

      占位符 【hash】对模块内容做算法计算，得到映射的数字字母组合的字符串

      占位符 【ext】使用当前模块原本的占位符，例如：.png / .jpg 等字符串

      占位符 【query】保留引入文件时代码中查询参数（只有 URL 下生效）

      

   2. 注意：判断临界值默认为 8KB

      大于 8KB 文件：发送一个单独的文件并导出 URL 地址

      小于 8KB 文件：导出一个 data URI（base64字符串）

   3. 在 src/login/musicRouter.js 中给 img 标签添加 logo 图片

      ```js
      /**
       * 目标9：打包资源模块（图片处理）
       *  9.1 创建 img 标签并动态添加到页面，配置 webpack.config.js
       *  9.2 打包后观察效果和区别
       */
      // 9.1 创建 img 标签并动态添加到页面，配置 webpack.config.js
      // 注意：js 中引入本地图片资源要用 import 方式（如果是网络图片http地址，字符串可以直接写）
      import imgObj from './assets/logo.png'
      const theImg = document.createElement('img')
      theImg.src = imgObj
      document.querySelector('.login-wrap').appendChild(theImg)
      ```

   4. 配置 webpack.config.js 让 Webpack 拥有打包图片功能

      ```js
      // ...
      
      module.exports = {
        // ...
        module: {
          rules: [
            // ...
            {
              test: /\.(png|jpg|jpeg|gif)$/i,
              type: 'asset',
              generator: {
                filename: 'assets/[hash][ext][query]'
              }
            }
          ]
        }
      }
      ```

   5. 打包后运行观察效果



### 小结

1. 资源模块指的是什么?

   <details>     
   <summary>答案</summary> 
   <ul>
   <li>图片，字体文件等等</li>
   </ul> 
   </details>



## 10.案例-用户登录-完成功能

### 目标

在 Webpack 环境下，使用 npm 下包作用在前端项目



### 讲解

1. 需求：点击登录按钮，基于 npm 下载 axios 包，完成验证码登录功能

   ![image-20230518103430262](images/image-20230518103430262.png)

2. 步骤：

   1. 使用 npm 下载 axios

      ```bash
      npm i axios
      ```

   2. 引入到 src/login/musicRouter.js 中编写业务实现

      ```js
      /**
       * 目标10：完成登录功能
       *  10.1 使用 npm 下载 axios（体验 npm 作用在前端项目中）
       *  10.2 准备并修改 utils 工具包源代码导出实现函数
       *  10.3 导入并编写逻辑代码，打包后运行观察效果
       */
      // 10.3 导入并编写逻辑代码，打包后运行观察效果
      import myAxios from '../utils/request.js'
      import { myAlert } from '../utils/alert.js'
      document.querySelector('.btn').addEventListener('click', () => {
        const phone = document.querySelector('.login-form [name=mobile]').value
        const code = document.querySelector('.login-form [name=code]').value
      
        if (!checkPhone(phone)) {
          myAlert(false, '手机号长度必须是11位')
          console.log('手机号长度必须是11位')
          return
        }
      
        if (!checkCode(code)) {
          myAlert(false, '验证码长度必须是6位')
          console.log('验证码长度必须是6位')
          return
        }
      
        myAxios({
          url: '/v1_0/authorizations',
          method: 'POST',
          data: {
            mobile: phone,
            code: code
          }
        }).then(res => {
          myAlert(true, '登录成功')
          localStorage.setItem('token', res.data.token)
          location.href = '../content/index.html'
        }).catch(error => {
          myAlert(false, error.response.data.message)
        })
      })
      ```

   3. 打包后运行观察效果



### 小结

1. npm 下载的包如何作用在前端项目上?

   <details>     
   <summary>答案</summary> 
   <ul>
   <li>被 Webpack 打包处理后，再引入到 html 文件中运行</li>      
   </ul> 
   </details>



## 10.Webpack 搭建开发环境

### 目标

体验 webpack-dev-server 开发服务器，快速开发应用程序



### 讲解

1. 每次改动代码，都要重新打包，很麻烦，所以这里给项目集成 webpack-dev-server 开发服务器

2. 作用：启动 Web 服务，打包输出源码在内存，并会自动检测代码变化热更新到网页

3. 步骤；

   1. 下载 webpack-dev-server 软件包到当前项目

      ```bash
      npm i webpack-dev-server --save-dev
      ```

   2. 配置自定义命令，并设置打包的模式为开发模式

      ```js
      // ...
      
      module.exports = {
        // ...
        mode: 'development'
      }
      ```

      ```json
      "scripts": {
        // ...
        "dev": "webpack serve --mode=development"
      },
      ```

   3. 使用 npm run dev 来启动开发服务器，访问提示的域名+端口号，在浏览器访问打包后的项目网页，修改代码后试试热更新效果

      > 在 js / css 文件中修改代码保存后，会实时反馈到浏览器



### 小结

1. webpack-dev-server 的作用?

   <details>     
   <summary>答案</summary> 
   <ul>
   <li>启动 Webpack 开发服务器，会启动一个 Web 服务，实时检测代码变化重新打包，并快速反应最新效果到浏览器页面上</li>
   </ul> 
   </details>



## 11.Webpack 打包模式

### 目标

了解不同打包模式对代码和环境的影响



### 讲解

1. [打包模式](https://webpack.docschina.org/configuration/mode/)：告知 Webpack 使用相应模式的内置优化

2. 分类：

   | **模式名称** | **模式名字** | **特点**                         | 场景     |
   | ------------ | ------------ | -------------------------------- | -------- |
   | 开发模式     | development  | 调试代码，实时加载，模块热替换等 | 本地开发 |
   | 生产模式     | production   | 压缩代码，资源优化，更轻量等     | 打包上线 |

3. 如何设置影响 Webpack呢？

   * 方式1：在 webpack.config.js 配置文件设置 mode 选项

     ```js
     // ...
     
     module.exports = {
       // ...
       mode: 'production'
     }
     ```

   * 方式2：在 package.json 命令行设置 mode 参数

     ```json
     "scripts": {
       "build": "webpack --mode=production",
       "dev": "webpack serve --mode=development"
     },
     ```

4. 注意：命令行设置的优先级高于配置文件中的，推荐用命令行设置

5. 体验：在 build 命令后 修改 mode 的值，打包输出观察打包后的 js 文件内容



### 小结

1. 两种模式的区别?

   <details>     
   <summary>答案</summary> 
   <ul>
   <li>开发模式注重代码热替换更快，让开发调试代码更便捷，生产模式注重项目体积更小，更轻量，适配不同的浏览器环境</li>
   </ul> 
   </details>



## 12.Webpack 打包模式的应用

### 目标

了解 Webpack 打包模式的应用



### 讲解

1. 需求：在开发模式下用 style-loader 内嵌更快，在生产模式下提取 css 代码

2. [方案](https://webpack.docschina.org/configuration/mode/)[1](https://webpack.docschina.org/configuration/mode/)：webpack.config.js 配置导出函数，但是局限性大（只接受 2 种模式）

   方案2：借助 cross-env （跨平台通用）包命令，设置参数区分环境

   [方案](https://webpack.docschina.org/guides/production/)[3](https://webpack.docschina.org/guides/production/)：配置不同的 webpack.config.js （适用多种模式差异性较大情况）

3. 主要使用方案 2 尝试，其他方案可以结合点击跳转的官方文档查看尝试

4. 步骤：

   1.下载 cross-env 软件包到当前项目

   ```js
   npm i cross-env --save-dev
   ```

   

   2.配置自定义命令，传入参数名和值（会绑定到 process.env 对象下）

   ![image-20230518104016802](images/image-20230518104016802.png)

   3.在 webpack.config.js 区分不同环境使用不同配置

   ```js
   module: {
       rules: [
         {
           test: /\.css$/i,
           // use: ['style-loader', "css-loader"],
           use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"]
         },
         {
           test: /\.less$/i,
           use: [
             // compiles Less to CSS
             process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
             'css-loader',
             'less-loader',
           ],
         }
       ],
     },
   ```

   

   4.重新打包观察两种配置区别

   



### 小结



## 13.Webpack 前端注入环境变量

### 目标

前端项目中，开发模式下打印语句生效，生产模式下打印语句失效



### 讲解

1. 需求：前端项目中，开发模式下打印语句生效，生产模式下打印语句失效

2. 问题：cross-env 设置的只在 Node.js 环境生效，前端代码无法访问 process.env.NODE_ENV

3. [解决](https://webpack.docschina.org/plugins/define-plugin)：使用 Webpack 内置的 DefinePlugin 插件

4. 作用：在编译时，将前端代码中匹配的变量名，替换为值或表达式

5. 配置 webpack.config.js 中给前端注入环境变量

   ```js
   // ...
   const webpack = require('webpack')
   
   module.exports = {
     // ...
     plugins: [
       // ...
       new webpack.DefinePlugin({
         // key 是注入到打包后的前端 JS 代码中作为全局变量
         // value 是变量对应的值（在 corss-env 注入在 node.js 中的环境变量字符串）
         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
       })
     ]
   }
   ```

   




### 小结



## 14.Webpack 开发环境调错 source map

### 目标

在开发环境如何精准定位到报错源码位置



### 讲解

1. [source map]([https://webpack.docschina.org/guides/development/#using-source-maps](https://webpack.docschina.org/guides/development/))：可以准确追踪 error 和 warning 在原始代码的位置

2. 问题：代码被压缩和混淆，无法正确定位源代码位置（行数和列数）

3. 设置：webpack.config.js 配置 devtool 选项

   ```js
   // ...
   
   module.exports = {
     // ...
     devtool: 'inline-source-map'
   }
   ```

   > inline-source-map 选项：把源码的位置信息一起打包在 JS 文件内

4. 注意：source map 适用于开发环境，不要在生产环境使用（防止被轻易查看源码位置）



### 小结

1. 为何打包后，在控制台无法准确定位到源码的位置信息?

   <details>     
   <summary>答案</summary> 
   <ul>
   <li>因为 Webpack 把代码压缩和混淆了</li>
   </ul> 
   </details>



## 15.Webpack 设置解析别名路径

### 目标

设置 Webpack 如何设置路径别名，方便我们引入目标模块



### 讲解

1. [解析别名]([https://webpack.docschina.org/configuration/resolve#resolvealias](https://webpack.docschina.org/configuration/resolve))：配置模块如何解析，创建 import 或 require 的别名，来确保模块引入变得更简单

2. 例如：

   1. 原来路径如下：

      ```js
      import { checkPhone, checkCode } from '../src/utils/check.js'
      ```

   2. 配置解析别名：在 webpack.config.js 中设置

      ```js
      // ...
      
      const config = {
        // ...
        resolve: {
          alias: {
            '@': path.resolve(__dirname, 'src')
          }
        }
      }
      ```

   3. 这样我们以后，引入目标模块写的路径就更简单了

      ```js
      import { checkPhone, checkCode } from '@/utils/check.js'
      ```

3. 修改代码的路径后，重新打包观察效果是否正常！



### 小结

1. 路径中的 '@' 符号代表什么意思？

   <details>     
   <summary>答案</summary> 
   <ul>
   <li>看在 webpack 配置中的别名路径是什么，就会在打包时替换成哪个路径使用</li>
   </ul> 
   </details>



## 16.优化-CDN使用

### 目标

开发模式使用本地第三方库，生产模式下使用 CDN 加载引入



### 讲解

1. 需求：开发模式使用本地第三方库，生产模式下使用 CDN 加载引入

2. [CDN](https://developer.mozilla.org/zh-CN/docs/Glossary/CDN)[定义](https://developer.mozilla.org/zh-CN/docs/Glossary/CDN)：内容分发网络，指的是一组分布在各个地区的服务器

3. 作用：把静态资源文件/第三方库放在 CDN 网络中各个服务器中，供用户就近请求获取

4. 好处：减轻自己服务器请求压力，就近请求物理延迟低，配套缓存策略

   ![image-20230518104603049](images/image-20230518104603049.png)




5. 实现需求的思路图：

   ![image-20230518104625088](images/image-20230518104625088.png)

6. 步骤：

   1.在 html 中引入第三方库的 [CDN ](https://www.bootcdn.cn/)[地址](https://www.bootcdn.cn/)[ ](https://www.bootcdn.cn/)并用模板语法判断

   ```html
   <% if(htmlWebpackPlugin.options.useCdn){ %>
       <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/css/bootstrap.min.css" rel="stylesheet">
   <% } %>
   ```

   

   2.配置 webpack.config.js 中 [externals](https://webpack.docschina.org/configuration/externals) 外部扩展选项（防止某些 import 的包被打包）

   ```js
   // 生产环境下使用相关配置
   if (process.env.NODE_ENV === 'production') {
     // 外部扩展（让 webpack 防止 import 的包被打包进来）
     config.externals = {
       // key：import from 语句后面的字符串
       // value：留在原地的全局变量（最好和 cdn 在全局暴露的变量一致）
       'bootstrap/dist/css/bootstrap.min.css': 'bootstrap',
       'axios': 'axios'
     }
   }
   ```

   ```js
   // ...
   const config = {
     // ...
     plugins: [
       new HtmlWebpackPlugin({
         // ...
         // 自定义属性，在 html 模板中 <%=htmlWebpackPlugin.options.useCdn%> 访问使用
         useCdn: process.env.NODE_ENV === 'production'
       })
     ]
   }
   ```

   

   3.两种模式下打包观察效果



### 小结



## 17.Webpack 多页面打包

### 目标

让 Webpack 同时打包登录和内容列表页面



### 讲解

1. 概念：[单页面](https://developer.mozilla.org/zh-CN/docs/Glossary/SPA)：单个 html 文件，切换 DOM 的方式实现不同业务逻辑展示，后续 Vue/React 会学到

   多页面：多个 html 文件，切换页面实现不同业务逻辑展示


2. 需求：把黑马头条-数据管理平台-内容页面一起引入打包使用

3. 步骤：

   1. 准备源码（html，css，js）放入相应位置，并改用模块化语法导出

   2. 下载 form-serialize 包并导入到核心代码中使用

   3. 配置 webpack.config.js 多入口和多页面的设置

      ```js
      // ...
      const config = {
        entry: {
          '模块名1': path.resolve(__dirname, 'src/入口1.js'),
          '模块名2': path.resolve(__dirname, 'src/入口2.js'),
        },
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: './[name]/musicRouter.js'  
        }
        plugins: [
          new HtmlWebpackPlugin({
            template: './public/页面2.html', // 模板文件
            filename: './路径/index.html', // 输出文件
            chunks: ['模块名2']
          })
          new HtmlWebpackPlugin({
            template: './public/页面2.html', // 模板文件
            filename: './路径/index.html', // 输出文件
            chunks: ['模块名2']
          })
        ]
      }
      ```

   4. 重新打包观察效果



### 小结



## 18.案例-发布文章页面打包

### 目标

案例-发布文章页面打包



### 讲解

1. 需求：把发布文章页面一起打包

   步骤：

   1.准备发布文章页面源代码，改写成模块化的导出和导入方式

   2.修改 webpack.config.js 的配置，增加一个入口和出口

   3.打包观察效果

   

### 小结



## 19.优化-分割公共代码

### 目标

优化-分割功能代码



### 讲解

1. 需求：把 2 个以上页面引用的公共代码提取

   步骤：

   1.配置 webpack.config.js 的 splitChunks 分割功能

   ```js
   // ...
   const config = {
     // ...
     optimization: {
       // ...
       splitChunks: {
         chunks: 'all', // 所有模块动态非动态移入的都分割分析
         cacheGroups: { // 分隔组
           commons: { // 抽取公共模块
             minSize: 0, // 抽取的chunk最小大小字节
             minChunks: 2, // 最小引用数
             reuseExistingChunk: true, // 当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用
             name(module, chunks, cacheGroupKey) { // 分离出模块文件名
               const allChunksNames = chunks.map((item) => item.name).join('~') // 模块名1~模块名2
               return `./js/${allChunksNames}` // 输出到 dist 目录下位置
             }
           }
         }
       }
         
    
   ```

   

   2.打包观察效果

   

### 小结



