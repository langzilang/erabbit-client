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
