## 1. 默认插槽
1. 组件内容不确定时 <slot>我是默认内容</slot>
2. 后备内容: slot之间的内容是默认的，一旦slot中没有写内容，就会启用后背内容

## 2. 具名插槽
```
// App.vue中， 封装模板template v-slot:head

<MyDialog>

    <template v-slot:head>
        <div>我是大标题</div>
    </template>

    <template v-slot:content>
        <div>我是内容</div>
    </template>

    <template #footer>
        <button>取消</button>
        <button>确认</button>
    </template>

</MyDialog>
-----------------------------------------
// 自己的组件中， 使用slot name="head"

  <div class="dialog">
    <div class="dialog-header">
      <!-- 一旦插槽起了名字，就是具名插槽，只支持定向分发 -->
      <slot name="head"></slot>
    </div>
  </div>

```

## 3. 作用域插槽
1. 向子组件传递数据list， 子组件用props接收
2. <button>是slot插槽的内容
3. <slot :row="item" msg="测试文本"></slot> slot以属性的方式传值
4. 传的值 以对象的形式 传给父组件
5. 父组件以#default="obj" 以对象obj形式接收slot传值

```
// App.vue中
<MyTable :data="list">  // 1. 向子组件传递数据list， 子组件用props接收

    <template #default="obj">  // 4. 父组件以#default="obj" 以对象obj形式接收slot传值
        <button @click="del(obj.row.id)"> // 2. <button>是slot插槽的内容
            删除
        </button>
    </template>
    
</MyTable>

-----------------------------------------------------------
// 子组件中 
<tr v-for="(item, index) in data" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>
          <slot :row="item" msg="测试文本"></slot> // 3. slot以属性的方式传值
        </td>
      </tr>
```



