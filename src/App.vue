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
import { reactive } from "vue";

export default {
  name:'App',
  setup () {
    const obj = reactive({
      name:'zebras',
      age:18
    })
    console.log( 'obj', obj )
    // :warning: 注意：从响应式数据对象中解构出来的属性数据，不再是响应式数据
    let { name, age } = obj
    const updateName = () => {
      console.log( 'updateName', updateName )
      obj.name = 'zebra'
    }
    return { name, age, updateName }
  }
}
</script>
