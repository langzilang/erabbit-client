# 07 - 组合API-reactive函数

> 目标：掌握使用reactive函数定义响应式数据

定义响应式数据：
- reactive是一个函数，它可以定义一个复杂数据类型，成为响应式数据。
- 通常是用来定义响应式数据

演示代码：
```vue
<template>
  <div class="container">
<!--    根组件-->
    <div @click="updateName">
      <div>{{  obj.name }}</div>
      <div>{{ obj.age }}</div>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";

export default {
  name:'App',
  setup () {
    const obj = reactive({
      name:'zebras',
      age:18
    })
    
    const updateName = () => {
      console.log( 'updateName', updateName )
      obj.name = 'zebra'
    }
    return { obj, updateName }
  }
}
</script>

```
