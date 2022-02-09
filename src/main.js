//创建一个vue应用（就是之前的根实例）
//1.导入createApp函数从vue中
//2. 创建一个根组件App.vue导入至main
//3.使用createApp创建应用实例
//4.应用实例挂在到#app容器中

import {createApp} from 'vue'
import App from './App.vue'
const app = createApp(App)
app.mount('#app')