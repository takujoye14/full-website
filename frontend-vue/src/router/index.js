import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'
import Products from '../pages/Products.vue'
import NotFound from '../pages/NotFound.vue'
import store from '../store' // <-- correct

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  {
    path: '/products',
    component: Products,
    meta: { requiresAuth: true }
  },
  { path: '/:catchAll(.*)', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  if (requiresAuth && !store.getters.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
