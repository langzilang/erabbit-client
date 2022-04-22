# 04 - 选项API和组合API

## 什么是选项API的写法：Options API
- 在vue2.x项目中使用的就是 选项API 写法

  代码风格：data选项写数据，methods选项写函数...，一个功能逻辑的代码分散。
- 优点：易于学习和使用，写代码的位置已经约定好
- 缺点：代码组织性差，相似的逻辑代码不便于复用，逻辑复杂代码多了不好阅读。
- 补充：虽然提供mixins用来封装逻辑，但是出现数据函数覆盖的概率很大，不好维护。

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
- 在vue3.0项目中将会使用 组合API 写法

  代码风格：一个功能逻辑的代码组织在一起（包含数据，函数...）
- 优点：功能逻辑复杂繁多情况下，各个功能逻辑代码组织再一起，便于阅读和维护
- 缺点：需要有良好的代码组织能力和拆分逻辑能力
- 补充：为了能让大家较好的过渡到vue3.0的版本来，也支持vue2.x选项API写法

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