import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      name:"home",
      component:HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: () => import('../views/ReserveView.vue')
    },
    {
      path: '/reserve-record',
      name: 'reserveRecord',
      component: () => import('../views/ReserveRecordView.vue')
    },
    {
      path: '/friend',
      name: 'friend',
      component: () => import('../views/FriendView.vue')
    },
    {
      path: '/reserve-stat',
      name: 'reserveStat',
      component: () => import('../views/ReserveStatView.vue')
    }
  ]
})




export default router
