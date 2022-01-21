import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import home from '../views/HomeView.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: home,
  },
  {
    path: '/myApp',
    name: 'myApp',
    component: () => import('../views/MyAppInstalledView.vue')
  },
  {
    path: '/storeApp',
    name: 'storeApp',
    component: () => import('../views/AllAvailableAppsView.vue')
  },
  {
    path: '/conf',
    name: 'conf',
    component: () => import('../views/ConfigurationView.vue')
  },
  {
    path: '/support',
    name: 'supprt',
    component: () => import('../views/SupportView.vue')
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
