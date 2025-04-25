<template>
  <header class="site-header">
    <nav class="nav-bar">
      <router-link to="/" class="nav-left">
        <img :src="logo" alt="Home" class="logo" />
      </router-link>

      <div class="nav-right">
        <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
        <router-link v-if="!isLoggedIn" to="/signup">Sign Up</router-link>
        <router-link v-if="isLoggedIn" to="/products" class="products-button glitch-btn">Products</router-link>
        <router-link v-if="isLoggedIn" to="/purchase" class="invoices-button">My Invoices</router-link>



        <router-link v-if="isLoggedIn" to="/cart" class="animated-buy-button">
          <svg viewBox="0 0 16 16" class="bi bi-cart-check" height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
          </svg>
          <span class="text">View Cart</span>
          <span class="cart-badge" v-if="cartCount > 0">{{ cartCount }}</span>
        </router-link>


        <button
          v-if="isLoggedIn"
          @click="handleLogout"
          id="logoutButton"
          class="logout-btn"
        >
          <div class="logout-sign">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
              />
            </svg>
          </div>
          <span class="logout-text">Logout</span>
        </button>
      </div>
    </nav>

    <transition name="fade">
      <div v-if="showPopup" class="popup">Item successfully added to cart!</div>
    </transition>
  </header>
</template>

<script setup>
import logo from '../assets/thevault icon.png'
import { ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'


const store = useStore()
const router = useRouter()
const isLoggedIn = computed(() => store.getters.isLoggedIn)
const cartCount = ref(0)
const showPopup = ref(false)

function handleLogout() {
  store.dispatch('logout')
  router.push('/login')
}

watchEffect(() => {
  const token = localStorage.getItem("token")
  if (!token) {
    cartCount.value = 0
    return
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const userId = payload.userId
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || []
    cartCount.value = cart.reduce((total, item) => total + item.quantity, 0)
  } catch (err) {
    cartCount.value = 0
  }
})


window.addEventListener('cart-updated', () => {
  const cart = JSON.parse(localStorage.getItem("shoppingCart")) || []
  cartCount.value = cart.reduce((total, item) => total + item.quantity, 0)

  showPopup.value = true
  setTimeout(() => showPopup.value = false, 2000)
})

onMounted(() => {
  updateCartCount()

  window.addEventListener('cart-updated', updateCartCount)
})

onBeforeUnmount(() => {
  window.removeEventListener('cart-updated', updateCartCount)
})

function updateCartCount() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return cartCount.value = 0

    const payload = JSON.parse(atob(token.split('.')[1]))
    const userId = payload.userId
    const key = `cart_${userId}`
    const cart = JSON.parse(localStorage.getItem(key)) || []
    cartCount.value = cart.reduce((total, item) => total + item.quantity, 0)
  } catch {
    cartCount.value = 0
  }
}

</script>

<style scoped>
.site-header {
  background-color: rgba(0, 0, 0, 0.62);
  padding: 1rem 2rem;
  color: white;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left,
.nav-right a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  height: 60px;
  width: 70px;
}

.cart-link {
  position: relative;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -10px;
  background: red;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 50%;
}

/* Logout Button Animation */
.logout-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: 0.3s;
  background-color: rgb(0, 0, 0);
}

.logout-sign {
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-sign svg {
  width: 17px;
}

.logout-sign svg path {
  fill: white;
}

.logout-text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: 0.3s;
}

.logout-btn:hover {
  width: 125px;
  border-radius: 40px;
  transition-duration: 0.3s;
}

.logout-btn:hover .logout-sign {
  width: 30%;
  padding-left: 10px;
}

.logout-btn:hover .logout-text {
  opacity: 1;
  width: 70%;
  padding-right: 10px;
}

.logout-btn:active {
  transform: translate(2px, 2px);
}

/* Popup Notification */
.popup {
  position: absolute;
  top: 80px;
  right: 20px;
  background-color: #333;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  font-weight: bold;
  animation: slide-down 0.5s ease;
}

@keyframes slide-down {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.animated-buy-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 15px;
  background-color: #181717;
  outline: 3px #181717 solid;
  outline-offset: -3px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: 400ms;
  text-decoration: none;
}

.animated-buy-button .text {
  color: white;
  font-weight: 700;
  font-size: 1em;
  transition: 400ms;
}

.animated-buy-button svg path {
  transition: 400ms;
}

.animated-buy-button:hover {
  background-color: transparent;
}

.animated-buy-button:hover .text {
  color: #181717;
}

.animated-buy-button:hover svg path {
  fill: #181717;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: red;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
}
/* From Uiverse.io by mahiatlinux */ 
/* Dark Mode 3D Button */
products-button {
  font: inherit;
  background-color: #2a2a2a;
  border: 0;
  color: #e0e0e0;
  border-radius: 0.5em;
  font-size: 1.35rem;
  padding: 0.375em 1em;
  font-weight: 600;
  text-shadow: 0 0.0625em 0 #000;
  box-shadow:
    inset 0 0.0625em 0 0 #3a3a3a,
    0 0.0625em 0 0 #252525,
    0 0.125em 0 0 #202020,
    0 0.25em 0 0 #1c1c1c,
    0 0.3125em 0 0 #181818,
    0 0.375em 0 0 #141414,
    0 0.425em 0 0 #101010,
    0 0.425em 0.5em 0 #0a0a0a;
  transition: 0.15s ease;
  cursor: pointer;
}

products-button:active {
  translate: 0 0.225em;
  box-shadow:
    inset 0 0.03em 0 0 #3a3a3a,
    0 0.03em 0 0 #252525,
    0 0.0625em 0 0 #202020,
    0 0.125em 0 0 #1c1c1c,
    0 0.125em 0 0 #181818,
    0 0.2em 0 0 #141414,
    0 0.225em 0 0 #101010,
    0 0.225em 0.375em 0 #0a0a0a;
}
.invoices-button {
  background-color: #fac921;
  color: black;
  font-weight: bold;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.3s;
}

.invoices-button:hover {
  background-color: #ffe761;
}


</style>