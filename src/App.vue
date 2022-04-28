<template>
  <div class="container">
    <!--    根组件-->
    <div @click="updateName">
      <!--      <div>{{  name }}</div>-->
      <!--      <div>{{ age }}</div>-->
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
      console.log( 'obj', obj )  //此时obj还是响应式数据对象， Proxy {name: 'zebras', age: 18}
      // ⚠注意：从响应式数据对象中解构出来的属性数据，不再是响应式数据
      // let { name, age } = obj
      
      // console.log( 'name', name )
      // console.log( 'age', age )
      
      const { name, age } = obj
      console.log( 'name', name )
      console.log( 'age', age )
      const obj2 = { ...obj }
      console.log( 'obj2', obj2 )  //此时obj2 就成了普通的对象数据， {name: 'zebras', age: 18}
      const updateName = () => {
        console.log( 'updateName', updateName )
        // toRef转换响应式数据包装成对象，value是存放值的地方
        name.value = 'zebra'
      }
      // 以上方式会导致数据不是响应式数据
      return { }
      // return { name, age, updateName }
    }
  }
</script>
