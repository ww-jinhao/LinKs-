import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/login/login.vue"),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import("../views/chat/chat.vue"),
    },
  ],
})

export default router
