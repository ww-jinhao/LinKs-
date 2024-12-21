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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp > currentTime) {
        if (to.name == 'login') {
          next({ name: 'chat' });
        } else {
          next();
        }
        return;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  if (to.name === 'login') {
    next();
  } else {
    next({ name: 'login' });
  }
});

export default router
