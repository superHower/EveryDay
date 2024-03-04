# 1. Pinia介绍:
## 状态管理工具 (替代 vuex共享数据)

# 2. Pinia安装
npm install pinia

在main.js文件中
```
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```


# 3. Pinia使用
## 3.1 store文件夹下
1. 创建counter.js文件:
  import { defineStore } from 'pinia'
2. 导出数据名字叫：useCounterStore
  export const useCounterStore = defineStore('counter', () => {

------------------------------------------------|
3. 声明数据state:                                |   
  const count = ref(100)                        |    
  const msg = ref('hello pinia')                |  
4. 声明操作数据的方法action:                      |
  const addCount = () => count.value++          |
  const subCount = () => count.value--          |
5. 声明计算属性computed：                         |
  const double = computed(() => count.value * 2) | 
-------------------------------------------------

6. 返回数据以对象的形式：
  return {
    count,
    double,
    addCount,
    subCount,
    msg,
  }

  })


## 3.2 拿到store仓库的数据 
1. 导入仓库
import { useCounterStore } from '@/store/counter'
2. 拿到数据 
const counterStore = useCounterStore()
## 3.3 使用数据：
1. 直接使用： 当成对象使用    <h3> {{ counterStore.count }} </h3>
2. 解构使用(不处理，数据会丢失响应式)
    const { count, msg } = storeToRefs(counterStore)
    <h3> {{ count }} </h3>
3. 解构action： 不用storeToRef, 直接解构    
    const { getList } = channelStore



# 4. Pinia持久化
## 4.1 安装
npm i pinia-plugin-persistedstate
## 4.2 导入插件 (main.js)
import persist from 'pinia-plugin-persistedstate'
## 4.3 使用插件 (main.js)
app.use(pinia.use(persist)) 
## 4.4 在指定store仓库的js文件下使用
  export const useCounterStore = defineStore('counter', () => {}
  , {
1. 默认持久化    
    persist: true // 开启当前模块的持久化
2. 自定义持久化    
    persist: {
3. 修改持久化名字
      key: 'hm-counter', // 修改本地存储的唯一标识
4. 指定持久化的数据
      paths: ['count'] // 指定count这一数据被持久化
    }
  })