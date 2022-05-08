<template>
  <div class="container">
    <!--    根组件-->
    <div>坐标</div>
    <div>{{ x }}</div>
    <div>{{ y }}</div>
    <div>{{ count }}
    <button @click="add">+</button>
    </div>
  </div>
</template>
<script>
  import { reactive, onMounted, onUnmounted, toRefs, ref } from "vue";
  
  export default {
    name:'App',
    setup () {
      // 1. 获取坐标轴
      // 其实这个代码开头就有写过
      const mouse = reactive({
        x:0,
        y:0
      })
      
      const move = (e) => {
        mouse.x = e.pageX
        mouse.y = e.pageY
      }
      
      // dom渲染完毕，去监听事件
      onMounted(() => {
        document.addEventListener('mousemove', move)
      })
      
      // 组件销毁，删除事件
      onUnmounted(() => {
        document.removeEventListener('mousemove', move)
      })
      
      // 2.数字累加
      const count = ref(0)
      const add = () => {
        count.value++
      }
      
      return {
        ...toRefs(mouse),
        count,
        add
      }
    }
  }
</script>
