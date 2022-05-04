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
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index'),
        meta: { title: '角色管理' }
      },
      // 添加菜单分配
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */'@/views/role/alloc-menu'),
        props: true
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkName: 'alloc-menu' */'@/views/role/alloc-resource'),
        props: true
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
        path: '/resource/:id/edit',
        name: 'resource-edit',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/edit')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index')
      },
      // 添加资源菜单
      {
        path: '/resource/create-resource',
        name: 'create-resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/create')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index'),
        meta: { title: '课程管理' }
      },
      // 编辑课程信息
      {
        path: '/course:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/edit'),
        props: true
      },
      // 内容编辑
      {
        path: '/course:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/section'),
        props: true
      },
      // 添加课程信息
      {
        path: '/create',
        name: 'create-course',
        component: () => import(/* webpackChunkName: 'create-course' */'@/views/course/create')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index'),
        meta: { title: '用户管理' }
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
