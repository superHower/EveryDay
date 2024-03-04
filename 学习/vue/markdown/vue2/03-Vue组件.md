# 0. 创建脚手架文件
### 终端输入： vue create 项目名

```
main.js
App.vue : 根组件
       结构<template>： 有且仅有一个根元素
       行为<script>     js逻辑
       样式<style>      样式（支持less,需要装包）, scoped样式只作用于当前组件
index.html
``` 

# 1. 局部组件注册
 只能在组件内部使用

# 2. 全局组件注册
在components中创建vue文件， 在main.js中全局注册

# 3. data函数
保证每个组件实例， 维护独立的一份数据对象
```
<script>
export default {
  data () {
    return {
      count: 999
    }
  }
}
</script>
```

# 4. 组件通信： 组件与组件之间 数据传递
```
   父子通信 -> props    || $emit
 非父子通信 -> provided || inject 或 eventbus
  通用方案  -> vuex
```

## 4.1 父子通信

1. :title ->  父组件向子组件传递data函数的数据 <Son :title="myTitle”></Son>

2. props: ->  子组件接收 父组件数据

3. $emit: ->  子组件向父组件发送数据 this.$emit('Fn', ’newData’)

4. @Fn  : ->  父组件接收 子组件发送的方法  <span> @Fn="handleChange" </span>

5. newData:-> 父组件 调用方法 处理子组件的数据 
```
methods: {
    handleChange(newTitle) {
      this.myTitle = newTitle
    },
  }
```


## 4.1.2 props校验
```
props: {
  w: Number // 强制规定类型必须是 数值
}

// 完整写法
props: {
    w: {
      type: Number,   // 类型校验
      required: true, // 非空校验
      default: 0,     // 默认值
      validator(val)  // 自定义校验
      {
        // console.log(val) 
        if (val >= 100 || val <= 0) {
          console.error('传入的范围必须是0-100之间')
          return false
        } else {
          return true
        }
      },
    },
  }
```

## 4.1.3 单向数据流

1. props是外部数据， 不能直接改
2. data函数是 内部数据， 可以随便改
3. 父组件的prop更新，回单向向下流， 影响到子组件
4. 子组件prop, 只能通过$emit通知父组件， 在父组件中进行修改，


## 4.2 非父子通信
### 4.2.1. 在utils文件夹下， 创建EventBus作为通信媒介
```
import Vue from 'vue'
const Bus  =  new Vue()
export default Bus
```
### 4.2.2. Bus.$emit  与   Bus.$on
``` 
 * 发送方
 methods: {
    sendMsgFn() {
      Bus.$emit('sendMsg', '今天天气不错，适合旅游')
    },
  } 
  
  * 接收方 
  created() {
    Bus.$on('sendMsg', (msg) => {
      // console.log(msg)
      this.msg = msg
    })
  }
```


## 4.3 非父子通信（跨层） provide & inject
```
  * 提供数据的组件
  provide() {
    return {
      color: this.color,  // 简单类型 是非响应式的
      userInfo: this.userInfo,// 复杂类型 是响应式的
    } 
  },
  * 取值的组件
  inject: ['color', 'userInfo'],
```

