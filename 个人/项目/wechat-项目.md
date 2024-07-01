# 0. 获取小程序appID

# 1. 自定义npm配置文件
1. 在 project.config.json 文件中
```json
    "miniprogramRoot": "miniprogram/",
    "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./miniprogram"
      }
    ],
```
2. app.json 文件： 删除 "style": "v2"
3. 项目 -> 重新打开项目
4. 导航 -> 工具 -> 构建npm
5. npm install


# 2. 模块封装
提示框 toast
对话框 modal

封装网络请求 request.js
拦截器 http.js -> instance
本地存储 sorage.js


# 3. 首页
1. 获取网络数据