// router/index.js
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    name: 'index',
    component: () => import("../views/index.vue")
  },
  {
    path: '/headerNav',
    name: 'headerNav',
    component: () => import("../components/headerNav.vue")
  }
]



// 创建路由管理器对象，并配置路由表
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 导出路由
export default router;