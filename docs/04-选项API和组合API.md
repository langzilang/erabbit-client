# 04 - 选项API和组合API

## 什么是选项API的写法：Options API

```vue
<template>
  <div class="container">
    <div>鼠标位置：</div>
    <div>X轴：{{x}}</div>
    <div>Y轴：{{y}}</div>
    <hr>
    <div>{{count}} <button @click="add()">自增</button></div>  
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      x: 0,
      y: 0,
      count: 0
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.move)
  },
  methods: {
    move(e) {
      this.x = e.pageX
      this.y = e.pageY
    },
    add () {
        this.count++
    }    
  },
  destroyed() {
    document.removeEventListener('mousemove', this.move)
  }
}
</script>
```


## 什么是组合API的写法： `Composition API`

```vue
<template>
  <div class="container">
    <div>鼠标位置：</div>
    <div>X轴：{{x}}</div>
    <div>Y轴：{{y}}</div>
    <hr>
    <div>{{count}} <button @click="add()">自增</button></div>  
  </div>
</template>
<script>
import { onMounted, onUnmounted, reactive, ref, toRefs } from 'vue'
export default {
  name: 'App',
  setup () {
    // 鼠标移动逻辑
    const mouse = reactive({
      x: 0,
      y: 0
    })
    const move = e => {
      mouse.x = e.pageX
      mouse.y = e.pageY
    }
    onMounted(()=>{
      document.addEventListener('mousemove',move)
    })
    onUnmounted(()=>{
      document.removeEventListener('mousemove',move)
    })

    // 累加逻辑
    const count = ref(0)
    const add = () => {
      count.value ++ 
    }

    // 返回数据
    return {
      ...toRefs(mouse),
      count,
      add
    }
  }
}
</script>
```