        # 09 - 组合API-toRefs函数

> 目标：掌握使用toRefs函数定义转化响应式中**所有**属性为响应式数据，通常用于解构|展开reactive定义对象。

定义响应式数据：
- toRefs是函数，转换**响应式对象**中所有属性为单独响应式数据，对象成为普通对象。

演示代码：
```vue
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
  import { reactive, toRefs } from "vue";
  
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
      
      // const { name, age } = obj
      // console.log( 'name', name )
      // console.log( 'age', age )
      // const obj2 = { ...obj }
      // console.log( 'obj2', obj2 )  //此时obj2 就成了普通的对象数据， {name: 'zebras', age: 18}
      const updateName = () => {
        console.log( 'updateName', updateName )
        // toRef转换响应式数据包装成对象，value是存放值的地方
        // obj2.name.value = 'zebra'
        obj.name = 'zebra'
      }
      // 以上方式会导致数据不是响应式数据
      const obj2 = toRefs(obj)
      console.log( 'obj2', obj2 )
      
      return { ...obj2, updateName }
      // return { name, age, updateName }
    }
  }
</script>

```

:warning: 使用场景：剥离响应式对象，想使用响应式对象中的多个或者所有属性作为响应式数据。