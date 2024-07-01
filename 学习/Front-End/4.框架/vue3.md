# 2. setup

scrtpt setup 是 vue3 的语法糖，简化了组合式 API 的写法，并且运行性能更好。

## 2.1 setup()函数

1. setup比beforeCreated执行的还早
2. 最好不要使用this
3. setup函数要有返回值

## 2.2 setup语法糖特点

- 1. 属性和方法无需返回，可以直接使用。
- 2. 引入组件的时候，会自动注册，无需通过 components 手动注册。
- 3. 使用 defineProps 接收父组件传递的值。
- 4. useAttrs 获取属性，useSlots 获取插槽，defineEmits 获取自定义事件。
- 5. 默认不会对外暴露任何属性，如果有需要可使用 defineExpose 。

# 3. reactive()与ref()

## 3.0 如何理解reactive、ref 、toRef 和 toRefs？

1. ref： 函数可以接收原始数据类型与引用数据类型。
   ref函数创建的响应式数据，在templete模板中  可以  直接被使用，
   在 JS 中需要通过 .value 的形式才能使用。
2. reactive： 函数只能接收引用数据类型。
3. toRef：针对一个响应式对象的[属性]创建一个ref，使得该属性具有响应式，两者之间保持引用关系

## 3.1 reactive作用

接收对象类型，返回一个响应式的对象

```js
const state = reactive({
  count: 100
})
const setCount = () => {
  state.count++
}
```

## 3.2. ref作用

接收简单类型 或 复杂类型，返回一个响应式的对象

1. 在count = ref(0)中 :count 默认value=0
2. script脚本：要使用count.value
3. template: 直接使用{{ count }}即可

```js
const count = ref(0) // 默认value = 0

const setCount = () => {
  count.value++
}
```

## 3.3 ref与reactive区别

Vue3的响应式原理是基于Proxy的，而Proxy只能代理对象，
要实现一个基本数据类型的响应式， 只能通过将它变成对象的方式；

- reactive只能传入一个对象，而ref可以传入任何类型；
- ref声明的变量，我们在访问时，除了模板之外，必须使用xxx.value，而reactive不用；
- reactive声明的变量可能会造成响应式丢失，这也是为什么官方更推荐使用ref的原因；

# 4. computed()

```
// 声明数据
const list = ref([1, 2, 3, 4, 5, 6, 7, 8])

const computedList = computed(() => {
  return list.value.filter(item => item > 2)
})
```

# 5. watch

1. 监视单个对象：watch(obj,(newArr, oldArr) => { ... })
2. 监视多个对象：watch([obj_1, obj_2],(newArr, oldArr) => { ... })
3. 深度监视: deep:true
4. 立刻执行: immediate:true
5. 监视某数据：watch(() => obj.value.age, (newValue, oldValue) => {})
