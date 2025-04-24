import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'
import Products from '../pages/Products.vue'
import NotFound from '../pages/NotFound.vue'
import Cart from '../pages/Cart.vue'
import store from '../store' 
import AddProduct from '../pages/AddProduct.vue'
import Purchase from '../pages/Purchase.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  {
    path: '/products',
    component: Products,
    meta: { requiresAuth: true }
  },
  { path: '/add-product', component: AddProduct, meta: { requiresAuth: true } },
  {path: '/cart',component: Cart,meta: { requiresAuth: true }},
  { path: '/purchase', component: Purchase },
  { path: '/:catchAll(.*)', component: NotFound },
  {
    path: '/edit/:id',
    component: () => import('../pages/EditProduct.vue'),
    meta: { requiresAuth: true }
  }
  
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
