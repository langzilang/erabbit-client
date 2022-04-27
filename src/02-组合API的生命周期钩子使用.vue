<template>
  <div class="container">
<!--    根组件-->
    <h1 @click="say">{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  name:'App',
  // 1. 组合API的起点，将来的组合API的代码，基本上在这里
  // 2. 可以理解为：在beforeCreate钩子函数前执行，组件实例创建前
  // 3. 函数中不能使用this  ==> undefined
  // 4. 末班中需要使用的数据和函数，需要在setup中返回  ==> 因此返回的应该是一个对象，而不是一个值
  setup () {
    console.log('setup',this)
    // 数据
    const msg = 'hi vue3'
    // 函数
    const say = () => {
      console.log('hi,vue3')
    }

    return { msg, say }
  },
  beforeCreate () {
    console.log('beforeCreate',this)
  }
}
</script>
