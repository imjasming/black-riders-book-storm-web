import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '../store'

const Layout = resolve => require(['@/components/Layout'], resolve);

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children:[
        {
          path: 'home',
          name: 'Home',
          component: HelloWorld
        }
      ]
    },
    {//404 notfound
      path: '*',

      name: '404notfound'
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
