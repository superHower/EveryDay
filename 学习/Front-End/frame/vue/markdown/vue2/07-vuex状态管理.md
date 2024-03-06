
## 1. state
### 1.1. 作用： 提供唯一的公共组件数据源
### 1.2. 创建（index.js中）：  
```
state: {
   title: '仓库大标题',
   count: 100,
   }, 
```
### 1.3 store使用state：
```
模板中：    <div>{{ $store.state.count }}</div>
组件逻辑中： this.$store.state.count
```      
### 1.4 mapState -- 直接使用值(在computed使用)
```
computed: {
...mapState(['count', 'title'])
},
```



## 2. mutations
### 2.0. 作用间接修改state数据
### 2.1. strict: true, // 严格模式 (直接修改数据会报错 => 上线时需要关闭)
### 2.2. 定义mutations对象(index.js中)
```
  mutations: { // 第一个参数，都是 state
    addCount (state, obj) // 参数若有多个要写成对象形式
    {
      state.count += obj.count // 修改数据
    },
  }
```
### 2.3. store提交调用数据（组件vue中）：(参数若有多个要写成对象形式)
```
  methods: {
      handleAdd (n) {
      this.$store.commit('addCount', {
        count: n,
        msg: '哈哈'
      })
    },
  }
```

### 2.4 mapMutations: (把 mutations方法提取出来， 映射到组件methods中)
```
  methods: {
    ...mapMutations(['subCount', 'changeTitle'])
  }
-----------------------------------------
    <button @click="subCount(10)">值 - 10</button>
```



## 3. actions

### 3.1 作用： 处理异步操作setTimeout()
### 3.2 使用（index.js中） context.commit('mutation名字', 额外参数)
```
  actions: {
    changeCountAction (context, num) {
      setTimeout(() => {
        context.commit('changeCount', num)
      }, 1000)
    }
  }
```
### 3.3 store调用action
    handleChange () {
      this.$store.dispatch('changeCountAction', 666)
    }

### 3.4 mapActions (把 actions方法提取出来， 映射到组件methods中)
```
  methods: {
    ...mapActions(['changeCountAction'])
  }
-----------------------------------------
    <button @click="changeCountAction(888)">1秒后改成888</button>
```


## 4. getters
### 4.1 作用： 获取特定的state
### 4.2 使用（index.js中）： (必须有返回值 )
```
  getters: { 
    filterList (state) {
      return state.list.filter(item => item > 5)
    }
  }
```
### 4.3 store使用getters
```
 <div>getters返回特定state: {{ $store.getters.filterList }}</div>
```   
### 4.4 mapGetter (在computed使用)
```
  computed: {
    ...mapState(['count', 'title']),
    ...mapGetters(['filterList'])
  },
```


## 5. vuex模块 module (大项目)
![img.png](imgs/vuex模块介绍.png)

### 5.1 配置模块（在modules文件夹下， setter.js 与 user.js）
```
const state = {}
const mutations = {}
const actions = {}
const getters = {}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions,
  getters
}
```

### 5.2 导入模块 （index.js文件）
```
import user from './modules/user'
import setting from './modules/setting'
----------------------------------------
  modules: {
    user,
    setting
  }
```

### 5.3 store使用
```
state    <div>user模块 - name: {{ $store.state.user.userInfo.name }}</div>
----------------------------------------------------------------------
mutations   <button @click="updateUser">更新个人信息</button>
            this.$store.commit('setting/setTheme', 'pink')
----------------------------------------------------------------------
actions    <button @click="updateUser2">一秒后更新信息</button>
      this.$store.dispatch('user/setUserSecond', {name: 'pickure',age: 28})
----------------------------------------------------------------------
getters   <div>{{ $store.getters['user/UpperCaseName'] }}</div>
```

### 5.4 map使用 (子模块映射 mapMutations('模块名', ['方法名']) - 要开启命名空间 )
```
computed: {
...mapState(['count', 'title']),
...mapState('user', ['userInfo']),
...mapState('setting', ['theme', 'desc']),
...mapGetters(['filterList']),
...mapGetters('user', ['UpperCaseName'])
},
methods: {
...mapMutations(['subCount', 'changeTitle']),
...mapActions(['changeCountAction']),
...mapMutations('setting', ['setTheme']),
...mapMutations('user', ['setUser']),
...mapActions('user', ['setUserSecond'])
}

```


# 启用3000后端接口
1. powershell 写入 npm i json-server -g
2. 新建db/index.json
3. index.json中放置cart对象
4. powershell 写入 db> json-server --watch index.json
5. 浏览器输入地址： http://localhost:3000/cart
