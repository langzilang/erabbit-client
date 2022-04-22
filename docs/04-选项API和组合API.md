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

> `ref` 跟 `reactive` 都是响应系统的核心方法，作为整个系统的入口
> 
> 可以将 `ref` 看成 `reactive` 的一个变形版本，这是由于 `reactive` 内部采用 [Proxy](https://vue3js.cn/es6/#%E6%AD%A3%E6%96%87) 来实现，而 `Proxy` 只接受对象作为入参，这才有了 `ref` 来解决值类型的数据响应，如果传入 `ref` 的是一个对象，内部也会调用 `reactive` 方法进行深层响应转换

## toRef
可以用来为源响应式对象上的某个 property 新创建一个 `ref`。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。
```vue
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```
当你要将 prop 的 ref 传递给复合函数时，`toRef` 很有用：
```vue
export default {
  setup(props) {
    useSomeFeature(toRef(props, 'foo'))
  }
}
```
即使源 property 不存在，`toRef` 也会返回一个可用的 ref。这使得它在使用可选 prop 时特别有用，可选 prop 并不会被 `toRefs` 处理。

## toRefs
将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 `ref`。
```javascript
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型:

{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// ref 和原始 property 已经“链接”起来了
state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3
```
当从组合式函数返回响应式对象时，`toRefs` 非常有用，这样消费组件就可以在不丢失响应性的情况下对返回的对象进行解构/展开：
```javascript
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // 操作 state 的逻辑

  // 返回时转换为ref
  return toRefs(state)
}

export default {
  setup() {
    // 可以在不失去响应性的情况下解构
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar
    }
  }
}

```
`toRefs` 只会为源对象中包含的 property 生成 ref。如果要为特定的 property 创建 ref，则应当使用 `toRef`
