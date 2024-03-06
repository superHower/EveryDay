# 1. 安装element-plus
  pnpm install element-plus


# 2. 按需导入
pnpm install -D unplugin-vue-components unplugin-auto-import

# 3. 配置vite
```
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

# 4. 配置eslint
声明element全局变量名
```
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly',
  }
```

# 5. 全局组件中文英文切换 
App.vue文件
```
<script setup></script>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
<template>
  <div>
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped></style>
```



# 1 Layout-布局
el-row表示一行 (一行分成24份)
  el-col表示列
  (1) :span="12"  代表在一行中，占12份 (50%)
  (2) :span="6"   表示在一行中，占6份  (25%)
  (3) :offset="3" 代表在一行中，左侧margin 3份


# 2 form-表单
# 2.1 结构相关
el-form 整个表单组件
el-form-item 表单的一行 （一个表单域）
el-input 表单元素（输入框）
# 2.2 校验相关
(1) el-form => :model="ruleForm"      绑定的整个form的数据对象 { xxxxx, xxx }
(2) el-form => :rules="rules"         绑定的整个rules规则对象  { xxxxx, xxx }
(3) 表单元素 => v-model="ruleForm.xxx" 给表单元素，绑定form的子属性
(4) el-form-item => prop配置生效的是哪个校验规则 (和rules中的字段要对应)
# .2.3 脚本规则配置
1. 非空校验 required: true   message消息提示   trigger触发校验的时机 blur change
2. 长度校验 min:xx,   max: xx
3. 正则校验 pattern: 正则规则    \S 非空字符
4. 自定义校验 => 自己写逻辑校验 (校验函数)
   validator: (rule, value, callback)
   (1) rule  当前校验规则相关的信息
   (2) value 所校验的表单元素目前的表单值
   (3) callback 无论成功还是失败，都需要 callback 回调
       - 校验成功 callback() 
       - 校验失败 callback(new Error(错误信息))


# 3 menu-菜单
1. el-menu 整个菜单组件
  :default-active="$route.path"  配置默认高亮的菜单项
  router  菜单项点击跳转路由

2. el-menu-item 菜单项
  index="/article/channel" 跳转路由路径

3. el-sub-menu 子菜单（包含多个菜单项）
    具名插槽 title: 默认看到的    
```          
     <template #title>
        <el-icon><UserFilled /></el-icon>
        <span>个人中心</span>
    </template>
```

# 4 dropdown-下拉菜单
## 4.1. el-dropdown 整个下拉菜单
      placement="bottom-end"    下拉菜单的弹出位置
      @command="handleCommand"  监听哪个下拉菜单被点击了
    默认展示给用户，看到的
```
    <span class="el-dropdown__box">
      <el-avatar :src="userStore.user.user_pic || avatar" />
      <el-icon><CaretBottom /></el-icon>
    </span>
```

## 4.2. el-dropdown-menu 下拉菜单

## 4.3. el-dropdown-item 下拉菜单项
    command="profile" 传给监听器@command的参数key

# 5 table-表格
## 5.1 el-table
      v-loading="loading"
      :data="channelList" 数组
      style="width: 100%"

## 5.2. el-table-column
      type="index"     序号
      prop="cate_name" 值
      label="序号"      列名

## 5.3. 表单内嵌按钮
```
   <template #default="{ row, $index }">
     <el-button :icon="Edit" circle plain type="primary"
       @click="onEditChannel(row, $index)">
     </el-button>
   </template>
```

## 5.4. 空数据 
```
    <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
```


# 6 dialog-对话框
## 6.1. 对话框绑定组件
```
    import ChannelEdit from './components/ChannelEdit.vue'
    const dialog = ref()
    // @success是子组件emit的方法
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
```

## 6.2. 对话框打开
```
 const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onAddChannel = () => {
  dialog.value.open({})
}
```

## 6.3. 对话框组件
```
const dialogVisible = ref(false)

//添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}

// 向外暴露方法
defineExpose({
  open
})
```

# 7. drawer-抽屉
## 7.0 抽屉基本用法
el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl" 抽屉方向
    size="50%" 抽屉大小




# 8. uploadd-文件上传
## 8.0 上传基本用法
  el-upload
      :show-file-list="false"   
      :auto-upload="false"      自动上传关闭
      :on-change="onSelectFile" 改变事件
## 8.1 图片预览
```
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw) // 预览图片
  // 立刻将图片对象，存入 formModel.value.cover_img 将来用于提交
  formModel.value.cover_img = uploadFile.raw
}
--------------------------------------------------------------------
<img v-if="imgUrl" :src="imgUrl" class="avatar" />
<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
     
```

# 9. 富文本编译器
## 9.1 安装
pnpm add @vueup/vue-quill@latest
## 9.2 使用
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
## 9.3 渲染
```
  <quill-editor
    ref="editorRef"                     绑定组件
    v-model:content="formModel.content" 绑定数据
    content-type="html"                 文本类型
    theme="snow"
  ></quill-editor>
```