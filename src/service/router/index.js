import Vue from 'vue'
import Router from 'vue-router'
import api from '@/service/prototypes/api'
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/diy',
    component: () => import('@/pages/diy/default'),
    children: [
      {
        path: '',
        name: 'index_diy',
        meta: {
          title: 'DIY编辑'
        },
        component: () => import('@/pages/diy/index')
      }
    ]
  },
  {
    path: '/auto',
    component: () => import('@/pages/auto'),
    name: '自动构建页面'
  },
  {
    path: '/admin/login',
    component: () => import('@/pages/admin/login'),
    name: 'admin-login'
  },
  {
    path: '/admin',
    component: () => import('@/admins/admin/admin-layout/index'),
    children: [
      {
        path: '*',
        meta: {
          title: '后台管理',
          filter: 3 // 后台过滤权限
        },
        params: {},
        component: () => import('@/pages/admin/index')
      }
    ]
  },
  {
    path: '/admin-city',
    component: () => import('@/admins/admin/admin-layout/index'),
    children: [
      {
        path: '*',
        meta: {
          title: 'DIY编辑'
        },
        params: {
          filter: 6
        },
        component: () => import('@/pages/admin/city/index')
      }
    ]
  },
  {
    path: '/admin-store',
    component: () => import('@/admins/admin/admin-layout/index'),
    children: [
      {
        path: '*',
        meta: {
          title: 'DIY编辑'
        },
        params: {
          filter: 4
        },
        component: () => import('@/pages/admin/store/index')
      }
    ]
  },
  {
    path: '/admin-market',
    component: () => import('@/admins/admin/admin-layout/index'),
    children: [
      {
        path: '*',
        meta: {
          title: 'DIY编辑'
        },
        params: {
          filter: 6
        },
        component: () => import('@/pages/admin/market/index')
      }
    ]
  },
  {
    path: '/diy-admin/',
    component: () => import('@/pages/diy/admin-diy'),
    children: [
      {
        path: 'diy',
        name: 'admin_diy',
        meta: {
          title: '后台diy编辑'
        },
        params: {
          filter: 3
        },
        component: () => import('@/pages/diy/index')
      }
    ]
  },
  {
    path: '/diy-user/*',
    component: () => import('@/pages/diy/index'),
    name: 'user-diy'
  },
  {
    path: '/',
    component: () => import('@/pages/index'),
    name: 'index-root',
    redirect: '/admin/index'
  },
  {
    path: '*',
    component: () => import('@/pages/index'),
    name: 'index-all'
  },
  {
    path: '/test',
    component: () => import('@/pages/test'),
    name: 'test1'
  }
]

const router = new Router({
  routes: constantRouterMap,
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  })
})

router.beforeEach((to, from, next) => {
  if (api.isTenant && api.tenant() === null) {
    if (to.query.tenant === undefined) {
      api.alert('访问路径不正确,请确保当前路径带有租户标识')
    } else {
      api.localSet('tenant', to.query.tenant)
      next()
    }
  } else {
    next()
  }
})
export default router
