# vuex
  Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。

  Vuex 的状态存储是响应式的。
      当 Vue 组件从 store 中读取状态的时候，
      若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

vuex 状态改变的流程
  1. 【vue components】 接收用户操作交互行为， 
  2. 执行【dispatch】触发的action进行回应
  3. 若状态需要改变， 调用【commit】提交mutation修改state, 
  4. 通过getters获取state的新值， 
  5. 重新渲染vue Components

## 1. vuex 属性
  1. state         [存储状态---数据]
  2. getters       [state的计算属性]， 用于读取state,并进行计算处理
  3. mutations     [修改state的方法]， 直接修改state, 必须同步执行
  4. actions       [异步修改state的方法]，通过提交mutations来修改数据 （ 并非直接更新数据 ）
      【commit】   执行mutations的方法，直接修改状态
      【dispatch】 执行action的方法，   间接修改状态


## 【问题】 vuex刷新数据是否丢失？
  vuex会重新获取数据， 页面也会丢失数据
  - 解决：
    1. 把数据保存在浏览器缓存里（cookie, localstorage, sessionstorage）
    2. 页面刷新时， 再次请求数据， 达到可以动态更新数据的方法

______________________________________________________________________

# pinia
    Pinia 是 拥有组合式 API 的 Vue 状态管理库

## 1. option store仓库中
```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }), // 对应 ref
  getters: { // 对应computed
    double: (state) => state.count * 2,
  },
  actions: { // 对应 actions
    increment() {
      this.count++
    },
  },
})
```
  
## 2. Setup Store仓库 中：
```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0) // 就是 state 属性
  const doubleCount = computed(() => count.value * 2) // 就是 getters
  function increment() { count.value++} // 就是 actions

  return { count, doubleCount, increment }
})

```

## 3. 组件中 使用store
storeToRefs() 
```js
const store = useCounterStore()
// 结构 store的 状态
const { name, doubleCount } = storeToRefs(store) // 从 store 中提取state时 保持其响应性
// 作为 action 可 直接解构
const { increment } = store

```
## 4. pinia优点
  1. 更加轻量级，压缩后提交只有1.6kb。
  2. 完整的 TS 的支持，Pinia 源码完全由 TS 编码完成。
  3. 移除 mutations，只剩下 state 、 actions 、 getters 。
  4. 没有 Vuex 那样的模块镶嵌结构，只有 store 概念，并支持 多个 互相独立隔离 的 store
  5. 无需手动添加每个 store，它的模块默认情况下创建就自动注册。
  6. 支持服务端渲染（SSR）。
  7. 支持 Vue DevTools。


______________________________________________________________________

# Redux
  Redux 是一个管理全局应用状态的库，使用 "单向数据流"

Redux 改变数据的流程
1. State 描述了应用程序在某个时间点的状态，视图基于该 state 渲染
2. 当应用程序中发生某些事情时：
    1. 视图 dispatch 一个 action
    2. store 调用 reducer，随后根据发生的事情来更新 state
    3. store 将 state 发生了变化的情况通知 UI
    4. 视图基于新 state 重新渲染

## 1. 创建Redux Reducer: （总仓库）
    ```js
    import { configureStore } from '@reduxjs/toolkit'
    import userReducer from './modules/user'
    
    export default configureStore({
      reducer: {
        user: userReducer
      }
    })
    ```
## 2. Slice Reducer （分仓库）
  initialState: {} [状态] 
  reducers:     {} [修改状态的方法] 同步方法, 计算，修改新的 state

## 3. 用 Thunk异步中间件 编写异步逻辑
  thunk 是一种特定类型的 Redux 函数，可以包含异步逻辑。

    ```js
    // 1. 外部的 thunk creator 函数, 它创建并返回 thunk 函数
    const fetchUserById = (userId) => {
      // 2. 内部的 thunk 函数, 以 dispatch 和 getState 作为参数
      return async (dispatch, getState) => {
        try {
          const user = await userAPI.fetchById(userId);// thunk 内发起异步数据请求
          dispatch(userLoaded(user));// 但数据响应完成后 dispatch 一个 action
        } catch (err) {
          // 如果过程出错，在这里处理
        }
      };
    };
    
    ```
## 4. 组件中 使用 状态和操作
  useSelector   [使用store的数据]，不能修改
  useDispatch   [修改store的数据], 同步方法


# Zustand
## 1. 创建仓库
  返回 状态 与 方法
## 2. 异步支持
  直接在函数中编写异步逻辑，
  最后把接口的数据放到set函数中返回即可
## 3. 切片模式
  类似于[模块化]
  场景：当我们单个store比较大的时候，
  可以采用一种`切片模式`进行模块拆分再组合

```javascript
import { create } from 'zustand'

// 创建channel相关切片
const createChannelStore = (set) => {
  return {
    count: 0, // 状态
    inc: () => { // 修改状态的方法
      set(state => ({ count: state.count + 1 }))
    }，
    channelList: [], 
    fetchChannelList: async () => { // 异步逻辑
      const res = await fetch(URL)
      const jsonData = await res.json()
      set({channelList: jsonData.data.channels})
    }
  }
}
// 创建counter相关切片
const createCounterStore = (set) => {
  return {
    count: 0,
    setCount: () => {
      set(state => ({ count: state.count + 1 }))
    }
  }
}
// 组合切片
const useStore = create((...a) => ({
  ...createCounterStore(...a),
  ...createChannelStore(...a)
}))

export default useStore
```
app.js - 绑定组件
```jsx
import { useEffect } from 'react'
import useChannelStore from './store/channelStore'

function App() {
  const {count, inc, channelList, fetchChannelList } = useStore()
 
  useEffect(() => { // 进行异步操作
    fetchChannelList()
  }, [fetchChannelList])

  return (
    <ul>
      {channelList.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

