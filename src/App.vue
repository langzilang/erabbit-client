<template>
  <div class="container">
<!--    根组件-->
    <div @click="updateName">
      <div>{{  name }}</div>
      <div>{{ age }}</div>
    </div>
  </div>
</template>
<script>
import { reactive, toRef } from "vue";

export default {
  name:'App',
  setup () {
    const obj = reactive({
      name:'zebras',
      age:18
    })
    console.log( 'obj', obj )
    // ⚠注意：从响应式数据对象中解构出来的属性数据，不再是响应式数据
    // let { name, age } = obj
    
    let name = toRef(obj, 'name')
    let age = toRef(obj, 'age')
    console.log( 'name', name )
    const updateName = () => {
      console.log( 'updateName', updateName )
      // toRef转换响应式数据包装成对象，value是存放值的地方
      name.value = 'zebra'
    }
    return { name, age, updateName }
  }
}
</script>
