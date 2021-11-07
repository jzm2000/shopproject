/*
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite'
import Search from '../pages/Search'
import Order from '../pages/Order'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
Vue.use(VueRouter)

export default new VueRouter({
  // 所有路由
  routes: [{
      name: 'msite',
      path: '/msite',
      component: MSite,
      meta: {
        ShowFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        ShowFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        ShowFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        ShowFooter: true
      }
    },
    {
      path: '/',
      redirect: '/msite',
      meta: {
        ShowFooter: true
      }
    }, {
      path: '/login',
      component: Login
    }
  ]
})