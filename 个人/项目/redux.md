## 创建Redux Reducer: （总仓库）

    ```js

    import { configureStore } from'@reduxjs/toolkit'

    importuserReducerfrom'./modules/user'

    exportdefaultconfigureStore({

    reducer: {

    user:userReducer

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

    constfetchUserById = (userId) => {

    // 2. 内部的 thunk 函数, 以 dispatch 和 getState 作为参数

    returnasync (dispatch, getState) => {

    try {

    constuser = awaituserAPI.fetchById(userId);// thunk 内发起异步数据请求

    dispatch(userLoaded(user));// 但数据响应完成后 dispatch 一个 action

    } catch (err) {

    // 如果过程出错，在这里处理

    }

    };

    };

    ```
