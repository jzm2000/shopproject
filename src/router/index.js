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
import Shop from '../pages/Shop'
import ShopInfo from '../pages/Shop/ShopInfo'
import ShopGoods from '../pages/Shop/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings'
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
    },
    {
      path: '/shop',
      component: Shop,
      children: [{
          path: 'goods',
          component: ShopGoods
        },
        {
          path: 'info',
          component: ShopInfo
        },
        {
          path: 'ratings',
          component: ShopRatings
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ]
})