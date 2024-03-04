# 1.ESlint代码风格
## 1.1. Eslint风格：代码规范 -> 校验错误
## 1.2. prettier风格：  美观 -> 格式化
1. 单引号
2. 不使用分号
3. 单行宽度80字符
4. 对象数组后， 不加逗号
5. 换行符号不受限制

## 1.3 添加prettier: (在.eslintrc.cjs文件中添加代码)
### 注意： 添加完之后，vsCode要禁用已经启用的prettier插件
```
  rules: {
    // prettier专注于代码的美观度 (格式化工具)
    // 前置：
    // 1. 禁用格式化插件 prettier  format on save 关闭
    // 2. 安装Eslint插件, 并配置保存时自动修复
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 单引号
        semi: false, // 无分号
        printWidth: 80, // 每行宽度至多80字符
        trailingComma: 'none', // 不加对象|数组最后逗号
        endOfLine: 'auto' // 换行符号不限制（win mac 不一致）
      }
    ],
    // ESLint关注于规范, 如果不符合规范，报错
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验 (props解构丢失响应式)
    // 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
    'no-undef': 'error'
  }
```



# 2. 设置Eslint保存自动更改
## 2.1 vscode
1. 设置->打开设置文件->setting.json
2. 粘贴代码 
```
{
"window.zoomLevel": 1,
"workbench.iconTheme": "vscode-icons",
"editor.tabSize": 2,
"emmet.triggerExpansionOnTab": true,

    // eslint自动修复
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    },
    "editor.formatOnSave": false
}
```

## 2.2 intellij
文件 -> 设置 -> 语言和框架 -> javascript
-> 代码质量工具 -> ESlint
-> 保存时(ctrl + S ),自动运行eslint fixed