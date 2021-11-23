/*
入口文件
*/
import Vue from 'vue'
import {
  Button,
} from 'mint-ui'
import App from './App.vue'
import store from './store/index.js'
import router from './router'
import './mock/mockServe' //加载mockServer即可
//注册全局组件标签
Vue.component(Button.name, Button) //<mt-button>
Vue['config']['productionTip'] = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')