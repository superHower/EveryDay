<template>
    <div class="drag_box" draggable="true" @dragstart="dragstart" @dragend="dragend" :style="styleObject" >
      <div class="text">{{props.title}}</div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
const elLeft = ref(0);
const elTop = ref(0);

const styleObject = ref({
  left: `${elLeft.value}px`,
  top: `${elTop.value}px`,
});

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
const dragstart = (e) => {
  elLeft.value = e.clientX - parseFloat(styleObject.value.left);
  elTop.value = e.clientY - parseFloat(styleObject.value.top);
};
// 拖拽完成事件
const dragend = (e) => {
  const x = e.clientX - elLeft.value;
  const y = e.clientY - elTop.value;
  const node = {}
  node.x = x;
  node.y = y;
  node.title = props.title
  emit('getNode', node);
};
const emit = defineEmits(['getPosition']);

</script>

<style scoped>
.drag_box {
  width: 100px;
  height: 40px;
  float: right;

  position: relative;
  z-index: 10;
  user-select: none; /* 不可选中,为了拖拽时不让文字高亮 */
  border-bottom: black 1px solid;
}
.text {
  position: absolute;
  width: 100px;
  height: 40px;
  font-size: 13px;
  background-color: rgb(219, 242, 242);
}
</style>