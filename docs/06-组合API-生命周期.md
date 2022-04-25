# 06 - 组合API-生命周期

> 目标：掌握使用组合API写法的生命周期钩子函数

回顾vue2.x的声明周期钩子函数：
- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestory
- destoryed

vue3.0 的声明周期钩子函数：
- `setup`  创建实例前
- `onBeforeMount`   挂载DOM前
- `onMounted`   挂载DOM后
- `onBeforeUpdate`   更新组件前
- `onUpdated`   更新组件后
- `onBeforeUnmount`  卸载销毁前
- `onUnmounted`   卸载销毁后
