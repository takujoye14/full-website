<template>
  <div class="cart-page">
    <h1>Your Cart</h1>

    <p v-if="cart.length === 0" class="empty">Your cart is empty.</p>

    <div v-else class="cart-list">
      <div class="cart-item" v-for="item in cart" :key="item._id">
        <img :src="getImageUrl(item.imageUrl[0])" :alt="item.productName" />
        <div class="info">
          <h2>{{ item.productName }}</h2>
          <p>{{ item.price }}€</p>
          <div class="quantity">
            <button @click="decreaseQuantity(item)">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>
          <button class="remove-btn" @click="removeItem(item._id)">Remove</button>
        </div>
        <div class="item-total">Total: {{ item.price * item.quantity }}€</div>
      </div>

      <div :data-tooltip="`Total: ${cartTotal}€`" class="button" @click="goToPurchase">
        <div class="button-wrapper">
          <div class="text">Buy Now</div>
          <span class="icon">
            <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
          </span>
        </div>
      </div>

      <!-- Clear Cart -->
      <div class="total">
        <button class="clear-btn" @click="clearCart">Clear Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { getCart, clearCart as clearCartStorage, updateCart } from '../utils/cart'

const cart = ref([])
const router = useRouter()

onMounted(() => {
  cart.value = getCart()
})

const increaseQuantity = (item) => {
  item.quantity++
  updateCart(cart.value)
  window.dispatchEvent(new CustomEvent('cart-updated'))
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
    updateCart(cart.value)
  }
}

const removeItem = (id) => {
  cart.value = cart.value.filter(item => item._id !== id)
  updateCart(cart.value)
  window.dispatchEvent(new CustomEvent('cart-updated'))
}

const clearCart = () => {
  clearCartStorage()
  cart.value = []
  window.dispatchEvent(new CustomEvent('cart-updated'))
}

const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity * item.price, 0)
})

const getImageUrl = (path) => {
  if (!path) return ''
  return path.startsWith('http') ? path : `http://localhost:3000${path}`
}

const goToPurchase = () => {
  router.push('/purchase')
}
</script>

<style scoped>
.cart-page {
  padding: 2rem;
  text-align: center;
  color: white;
  min-height: 80vh;
}

.empty {
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #ccc;
}

.cart-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(198, 198, 198, 0.2);
  padding: 1rem;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 0 10px #00000055;
}

.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1rem;
}

.info {
  flex: 1;
  text-align: left;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.quantity button {
  background: #444;
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.item-total {
  font-size: 1.2rem;
  font-weight: bold;
  color: #eee;
  margin-left: 1rem;
}

.remove-btn {
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: crimson;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.remove-btn:hover {
  background: darkred;
}

.total {
  margin-top: 2rem;
}

.clear-btn {
  background: red;
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: bold;
}

.button {
  --width: 140px;
  --height: 45px;
  --tooltip-height: 35px;
  --tooltip-width: 140px;
  --gap-between-tooltip-to-button: 14px;
  --button-color: #333;

  width: var(--width);
  height: var(--height);
  background: var(--button-color);
  position: relative;
  text-align: center;
  border-radius: 0.6em;
  font-family: "Arial", sans-serif;
  transition: background 0.3s;
  margin-top: 2rem;
  cursor: pointer;
  overflow: hidden;
}

.button::before {
  position: absolute;
  content: attr(data-tooltip);
  width: var(--tooltip-width);
  height: var(--tooltip-height);
  background-color: #555;
  font-size: 0.85rem;
  color: #fff;
  text-align: center;
  border-radius: 0.3em;
  line-height: var(--tooltip-height);
  bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) + 10px);
  left: calc(50% - var(--tooltip-width) / 2);
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  z-index: 5;
}

.button::after {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #555;
  left: calc(50% - 10px);
  bottom: calc(100% + var(--gap-between-tooltip-to-button) - 10px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  z-index: 5;
}

.button:hover::before,
.button:hover::after {
  opacity: 1;
  visibility: visible;
}

.button-wrapper,
.text,
.icon {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  color: #fff;
  overflow: hidden;
}

.text {
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  transition: top 0.4s ease;
  font-weight: bold;
  font-size: 1rem;
}

.icon {
  top: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: top 0.4s ease;
}

.button:hover .text {
  top: -100%;
}

.button:hover .icon {
  top: 0;
}
</style>
