import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Index from '@/views/Index';
const Login = resolve => require(['@/views/Login'], resolve);
const SignUp = resolve => require(['@/views/SignUp'], resolve);
const CheckPhone = resolve => require(['@/views/signUp/CheckPhone'], resolve);
const InputInfo = resolve => require(['@/views/signUp/InputInfo'], resolve);
const SignUpDone = resolve => require(['@/views/signUp/SignUpDone'], resolve);
const GoodsList = resolve => require(['@/views/GoodsList'], resolve);
const GoodsDetail = resolve => require(['@/views/GoodsDetail'], resolve);
const ShoppingCart = resolve => require(['@/views/ShoppingCart'], resolve);
const Order = resolve => require(['@/views/Order'], resolve);
const Pay = resolve => require(['@/views/Pay'], resolve);
const PayDone = resolve => require(['@/views/PayDone'], resolve);
const Freeback = resolve => require(['@/views/Freeback'], resolve);
const Home = resolve => require(['@/views/Home'], resolve);
const MyAddress = resolve => require(['@/views/home/MyAddress'], resolve);
const AddAddress = resolve => require(['@/views/home/AddAddress'], resolve);
const MyOrder = resolve => require(['@/views/home/MyOrder'], resolve);
const MyShoppingCart = resolve => require(['@/views/home/MyShoppingCart'], resolve);
const Merchant = resolve => require(['@/views/Merchant'], resolve);

const Layout = resolve => require(['@/components/Layout'], resolve);

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/', // 首页
      name: 'Index',
      component: Index
    },
    {
      path: '/Login', // 登录
      name: 'Login',
      component: Login
    },
    {
      path: '/SignUp', // 注册
      name: 'SignUp',
      component: SignUp,
      children: [
        {
          path: '/',
          name: 'index',
          component: CheckPhone
        },
        {
          path: 'checkPhone',
          name: 'CheckPhone',
          component: CheckPhone
        },
        {
          path: 'inputInfo',
          name: 'InputInfo',
          component: InputInfo
        },
        {
          path: 'signUpDone',
          name: 'SignUpDone',
          component: SignUpDone
        }
      ]
    },
    {
      path: '/goodsList', // 商品列表
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/goodsDetail', // 商品详情
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/shoppingCart', // 商品详情
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/order', // 订单页面
      name: 'Order',
      component: Order
    },
    {
      path: '/pay', // 支付页面
      name: 'Pay',
      component: Pay
    },
    {
      path: '/payDone', // 支付成功页面
      name: 'PayDone',
      component: PayDone
    },
    {
      path: '/freeback', // 反馈页面
      name: 'Freeback',
      component: Freeback
    },
    {
      path: '/home', // 主页
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'HomeIndex',
          component: MyOrder
        },
        {
          path: 'myAddress',
          name: 'MyAddress',
          component: MyAddress
        },
        {
          path: 'addAddress',
          name: 'AddAddress',
          component: AddAddress
        },
        {
          path: 'myOrder',
          name: 'MyOrder',
          component: MyOrder
        },
        {
          path: 'myShoppingCart',
          name: 'MyShoppingCart',
          component: MyShoppingCart
        }
      ]
    },
    {
      path: '/merchant',
      name: 'Merchant',
      component: Merchant
    }
  ]
})

/*
const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
  // authorized, permit all
  if (getToken()) {
    if (to.path === '/login') {
      next('/home')
    } else {
      if (!store.getters.userInfo || store.getters.userInfo.length === 0 || !store.getters.trainerList) {
        store.dispatch('initUserData').then(res => { // 拉取用户信息
          next()
        }).catch((err) => {
          store.dispatch('logout').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({path: '/login'})
          })
        })
      } else {
        next()
      }
    }
  } else {// unauthorized
    if (whiteList.indexOf(to.path) === -1) {
      next({
        path: '/login',
        //query: {redirect: to.fullPath}
      })
    } else {// to the path in white list
      next()// 一定要调用 next()
    }
  }
})

router.afterEach(() => {
})
*/

export default router
