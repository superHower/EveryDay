# 0. JSX
- 是javaScripth和XML的缩写，在js中写html
- {} 用法
  - 使用引号传递字符串
  - 识别js变量
  - 函数调用
  - 识别js对象

# 1. 管理状态
  ## （1）useState：
      1. 简单的状态管理
      2. 为组件添加可变状态和相应的状态修改功能。
      3. 状态不可变： 状态是只读的
  ## （2）useRender: 
      1. 进行复杂的状态管理
      2. 避免重新创建初始值 
      3. React 会保存 state 的初始值并在下一次渲染时忽略它。
  ```shell
__________________________________________
##（1）useState
  const [count, setCount] = useState(0);

  // 返回一个 state 变量（保存状态的值）
  //     一个 dispatch 函数（用于改变状态的值）。
__________________________________________
##（2）useRender
  // 1. 先 创建一个reducer。管理 多个状态
  function reducer(state, action)
  const [state, dispatch] = useReducer(reducer, initialState);

  // 2. state 状态
  // 3. dispatch 函数可以接收一个 action 对象，通过 reducer 函数返回新的 state。
_____________________________________________
  ```

```js
import { useReducer } from 'react';
// 1. 先 创建一个reducer。管理 多个状态
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName, // 实时更新成 输入框的内容
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}
// 2. 初始化状态
const initialState = { name: 'Taylor', age: 42 };

export default function Form() {

// 3. useReducer 返回由两个值:（1）state（2） dispatch 函数，可根据交互修改 state。
  const [state, dispatch] = useReducer(reducer, initialState);

// 4. 执行dispatch
  function handleButtonClick() {
    dispatch({ type: 'incremented_age' });
  }

  function handleInputChange(e) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    });
  }
// 5. 使用state
  return (
    <>
      <input value={state.name} onChange={handleInputChange}/>
      <button onClick={handleButtonClick}>增加 age</button>
      <p>Hello, {state.name}. You are {state.age}.</p>
    </>
  );
  }
```

# 2. 渲染性能
  ## （1）useRef
      1. 引用一个不需要渲染的值,改变它 不会触发重新渲染
      2. ref 可以操作 DOM 
  ## （2）forwardRef
      1. 子组件使用 ref 向父组件暴露【DOM节点】
      2. 在多个组件中转发 ref
  ## （3）useImperativeHandle
      1. 向父组件暴露一个自定义的 ref 句柄
      2. 暴露【命令式方法】
  ## 【场景】聚焦文本输入框
  ```js
  // 把自己整个元素 向父组件暴露
  const FocusInput = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({ 
      focus: () => {// 向父组件暴露方法
        ref.current.focus();
      }
    }));
  
    return <input ref={ref} type="text" />;
  });

  const App = () => {
    const inputRef = useRef(); // ref绑定子组件
    // 父组件直接使用 子组件的这个元素，
    // 并使用其暴露的方法
    useEffect(() => {
      inputRef.current.focus();
    }, []);
    // 子组件使用 ref 把自己暴露给父组件
    return <FocusInput ref={inputRef} />;
  };

  ```



# 3. 实现缓存
  ## (1) useMemo作用： 
    每次重新渲染时，缓存[计算的结果], 跳过代价昂贵的重复计算
    当依赖改变时，创建函数将被重新执行，并且结果被记住，直到下一次依赖改变。
  ## (2) React.memo作用：
    允许【子组件】在Props没有改变的情况下，就会跳过渲染
    1. props是[简单类型]：
        只有当值改变时，这个组件才会重新渲染
    2. props是[引用类型]：
        即使 原来的[对象或数组]在值上是相等的，但因为它们的引用地址不同，               
        React.memo 也会认为 props 发生了改变，从而引发不必要的渲染。
  ## (3) useCallback作用：
    在多次渲染中，可以缓存[函数],从而跳过组件的重新渲染

  ```js
//（1）useMemo
    const result = useMemo(() => {
      return fib(count1);// 斐波那契函数，是一个耗性能的计算
    }, [count1]); // count1是依赖项

//（2）React.memo
  const MyComponent = React.memo(function MyComponent(props) {
      /* 只有props改变时，这个组件才会重新渲染 */
      return <div>{props.text}</div>;
  });

//（3）useCallback
  export default function ProductPage({ productId, referrer, theme }) {
    // 要被缓存的函数
    const handleSubmit = useCallback((orderDetails) => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails,
      });
    }, [productId, referrer]); // 仅当productId或referrer改变时，该函数才会重新创建。
  
    return (
      <div className={theme}>
        <ShippingForm onSubmit={handleSubmit} />
      </div>
    );
  }
  ```


# 4. 外部系统同步
  ## （1）useEffect
useEffect(setup, dependencies?)

连接到外部系统
在自定义 Hook 中封装 Effect
控制非 React 小部件
使用 Effect 请求数据
指定响应式依赖项
在 Effect 中根据先前 state 更新 state
删除不必要的对象依赖项
删除不必要的函数依赖项
从 Effect 读取最新的 props 和 state
在服务器和客户端上显示不同的内容

  useEffect(() => {})          无依赖项,      组件初始渲染+组件更新时执行
  useEffect(() => {}, [])      空数组依赖,     只在初始渲染时执行一次 
  useEffect(() => {}, [count]) 添加特定依赖项, 特性依赖向变化时执行



# 5. 自定义hook
## 用法与规则
  (1) 用法
  - 声明use开头的函数
  - 在函数体内封装可复用的逻辑
  - 把组件中用到的状态或者回调函数 return出去 
  - 在每一个组件中解构此hook
  (2) 使用规则
  - 只能在组件中或者其他自定义hook中使用
  - 只能在组件顶层调用，不能嵌套在if、for、其他函数中 
```js
  import { useState } from "react"

  function useToggle(){
  // 可复用的逻辑代码
  const [value,setValue]= useState(true)
  const toggle=()=> setValue(!value)
  // 哪些状态和回调函数需要在其他组件中使用
  return return {
    value,
    toggle
  }
 }
```

## 【场景】 用户自定义hook封装数据请求
```js
  function useGetList (){
    // 获取接口数据渲染
    const [commentList,setCommentList]= useState([])
    useEffect(() => {
      //请求数据
      async function getList ({
        // axios请求数据
        const res = await axios.get('localhost:3004/list')
        setCommentList(res.data)
    }
    getList()
    }，[])

    return {
      commentList, 
      setCommentList
    }
  }
```

# 5. 常见功能
## 5.1 渲染列表 - list.map
```js
const list = [
  {id: 101, name: 'Vue'}，
  {id: 102, name: 'React'}，
  {id: 103, name: 'Angular'}，
]
______________________________________________
<ul>
  { list.map(item => <li key={item.id}>{item.name}</li> ) }
</ul>
```

## 5.2 条件渲染
```js
  const articleType = 1 //0 1 3

  function getArticleTem(){ // 条件渲染模板
    if (articleType --0){
      return <div>我是无图文章</div>
    } else if (articleType1){ 
      return <div>我是单图模式</div>
    }else {
      return <div>我是三图模式</div>
    }
  }
______________________________________________
  function App() { 
    return (
      <div className="App">
        {getArticleTem()}{/* 调用函数渲染不同的模版 */}
      </div>
    )
  }
  export default App
```
## 5.3 删除功能 - list.filter

```js
  // 1. 使用useState维护list
  const [cList,setCList]= useState(list)
  // 删除功能
  const handleDelete =(id)=>{
    console.log(id)
    // 对cList做过滤处理
    setCList(cList.filter(item => item.rpid !==id))
  } 
```

## 【场景】 Tab高亮实现
```js
  // 1. 点击谁就把谁的type记录下来
  // 2.通过记录的type和每一项遍历时的type做匹配 控制激活类名的显
  const	[type，setType]= useState('hot')	
  const handleTabChange = (type) =>{ 
    console.log(type) 
    setType(type)
  }
  _____________________________
  {
    // 遍历时和每一项type匹配
    tabs.map(item =>
      <span
        key={item.type}
        onClick={() => handleTabChange(item.type)}
        className={`nav-item ${type=- item.type && 'active'}`}>{item.text}
      </span>)
  }
```




