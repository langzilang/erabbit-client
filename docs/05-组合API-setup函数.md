# 05 - 组合API-setup函数

- `setup` 十一个新的组件选项，作为组建中使用组合API的起点
- 从组件生命周期来看，它的执行在组件实例创建之前 `Vue2.x的beforeCreate`执行
- 在setup函数中this还不是组件实例，this此时是undefined
- 在模板中需要使用的数据和函数，需要在setup返回

