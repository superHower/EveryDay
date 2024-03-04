

  ## 4. computed 与 watch
  - 使用场景：
    computed: 
      进行数值计算，并且依赖于其它数据时，利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
    watch:
      在数据变化时执行异步或开销较大的操作时，watch选项允许执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。

  ## 5. 组件中的data为什么是一个函数而不是对象？
      因为对象是一个引用类型，
      如果data是一个对象
        会造成多个组件共用一个data
      如果data为一个函数，
        每个组件都会有自己的私有数据空间，不会干扰其他组件的运行。

  ## 6. data 和 props 的区别？
    props: 将父组件的数据向下传递到子组件的方式。只读无法修改
    data : 组件自己的数据，仅供自身使用，可以修改。数据是响应式的。




# 3. 响应式数据：代码数据更改，网页自动更改

```shell
________________________________________________
v-html: 解析标签,动态设置内嵌标签
v-bind: 动态设置html的标签属性，绑定元素属性到vue实例的数据 
v-bind:src 可简写成 :src
——————————————————————————————————————————————————
v-model：
    1. 作用在表单: v-bind:value 表单元素双向绑定
                  v-on:input 监听数据变化， 并修改value
    2. 作用在组件：是父子通信语法糖，
                  通过props和$emit 实现 
——————————————————————————————————————————————————
:class="{类名1：bool, 类名2：bool}"  (一个类名，来回切换)
:class="[类名1：bool, 类名2：bool]"  (批量添加或删除类)

————————————————————————————————————————————————————
v-on: 注册事件 = 添加监听       ( v-on:click 可简写成 @click )
@keyup.enter:   键盘回车监听
@click.stop:    阻止冒泡
@click.prevent: 阻止默认行为
——————————————————————————————————————————————————-
v-show: 控制元素显示与隐藏:  (display的none的控制)：频繁显示和隐藏
v-if , v-else , v-else-if:  (条件控制): 创建和移出元素节点
v-for: v-for=" (item, index) in 数组"
  ## 2. v-for: 中key的值作用是什么？
    key是DOM元素的唯一标识
    - 作用
    1. 提高虚拟DOM的更新， 在更新的时候不改变原来的，只把新来的dom加上
    2. 触发过度效果
__________________________________________________
```





# 4. 计算属性
    作用：根据data数据的数据对象做计算处理
    原理：computed在Vue内部做了缓存处理，
            只有它的依赖属性发生了变化，它才会重新计算并且触发渲染。
    使用：当模板中的某个值需要通过[一个或多个数据计算]得到时
```js
    computed: {
      // 简写法
      totalCount () {
        return this.list.reduce((sum, item) => sum + item.num, 0)
      },
      // 完整写法 → 获取 + 设置
      fullName: {
        get () {
          return this.firstName
        },
        set (value) {

        }

      }
    }
```


# 5.watch侦听器
    作用：对依赖属性进行监听。
    原理：当侦听的属性发生变化时，就会执行一个函数。
            watch是异步函数，当属性需要在侦听后再执行某个变化,可以使用$nextTick这个API
    使用：当监听某个值[发生变化]后，对新值去进行逻辑处理。
### v-model=“obj.lang” 中写入要监视的对象的属性
```js
watch: {
      obj: {
        deep:true,       // 深度监视， 对obj对象的所有属性进行监视
        immediate: true, // 立刻执行
        handler (newValue) {
          console.log(newValue)   // newVale监视的所有值
          // 进行监视
        }
      }
    }
```



# 6. 自定义指令
#### v-focus  <==> mounted () { this.$refs.inp.focus() }

## 6.1 全局注册指令  v-focus  (在main.js文件中)
```
Vue.directive('focus', {
  inserted (el) {  // inserted 指令的元素，被插入到页面中时触发
    el.focus()
  }
})
```

## 6.2 局部注册指令 v-color="red"
```
  directives: {
    color: {
      inserted (el, binding) {  // 1. inserted 元素刚被添加到页面中时
        el.style.color = binding.value   // binding.value 就是指令的值
      },
 
      update (el, binding) {     // 2. update 指令的值修改时，dom更新
        el.style.color = binding.value
      }
    }
  }
```



# 7. v-model的原理（输入框、下拉框）
```js
// 输入框
v-model="msg" 
<==> @input=" msg = $event.target.value "
-------------------------------------------
// 下拉框
v-model="selectId"
<==> :value="selectId" @input=" selectId = $event "
```
### 下拉框  的v-model原理
```js
下拉框 父组件
<SonSelect v-model="selectId"></SonSelectId>

data() {
 return {
    selectId: '103'
 }
}
----------------------------------------------
下拉框 子组件
<select :value="value" @change="handleChange" >
    <option value="101">北京</option> 
</select>

  props: {
    selectId: String,
  },
  methods: {
    selectCity(e) {
      this.$emit('changeCity', e.target.value)
    },
  },
```



# 9. ref $refs  获取dom元素 或 组件
```
// ref绑定元素
<div ref="chartRef" class="echarts-box" id="main"></div> 

// $refs获取dom元素
this.myChart = echarts.init(this.$refs.chartRef) 
```



# 10. $nextTick(Fn)函数： 等待dom元素更新完成之后 立刻执行方法Fn
setTimeOut(Fn) 也是同理， 不过，要限制秒数，不能立刻更新



### 数组
```
删除：this.list = this.list.filter(item => item.id !== id)
求和：let total = this.list.reduce( (sum,item) => sum + item.num, 0)
添加：this.list.unshift({
          id: +new Date(),
          subject: this.newSubject,
          score: this.newScore
        })
饼状图异步更新数据：  data: this.list.map(item => ({value: item.price, name: item.name}))
```