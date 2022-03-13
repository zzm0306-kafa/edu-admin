import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入store文件
import store from '@/store'
Vue.use(VueRouter)
// 定义路由规则
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'layout' */'@/views/layout/index'),
    // 这个属性是验证有没有登录
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index')
      },
      {
        path: '/menu/create-meun',
        name: 'create-menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/create')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/edit')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index')
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]
const router = new VueRouter({
  routes
})
// 定义导航守卫
router.beforeEach((to, from, next) => {
  // to需要验证身份
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 通过判断本地用户
    if (!store.state.user) {
      // 如果用户没有登录，需要重新登录
      return next({
        name: 'login',
        // 保存我们所在的位置，以便以后再来
        query: {
          redirect: to.fullPath
        }
      })
    }
    // 登录，则放行
    next()
  } else {
    next() // 确保一定要调用 next()
  }
})
export default router
