import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/shared/views/HomeView.vue'
import AboutView from '@/shared/views/AboutView.vue'

const REDIRECT_PATH_PATTERN = '/:pathMatch(.*)*'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path: '/counter',
      name: 'counter',
      component: () => import('@/counter/views/CounterView.vue')
    },
    {
      path: REDIRECT_PATH_PATTERN,
      redirect: () => ({ name: 'home' })
    }
  ]
})

export default router
