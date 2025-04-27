<template>
<div class="products-grid">
  <div
    class="card"
    v-for="(product, index) in products"
    :key="product._id"
    @click="goToEdit(product._id)"
  >
    <div class="image-container">
      <img
        :src="getImageUrl(product.imageUrl[activeImageIndex[index] || 0])"
        :alt="product.productName"
      />
      <button
        v-if="product.imageUrl.length > 1"
        class="nav left"
        @click.stop="prevImage(index)"
      >‹</button>
      <button
        v-if="product.imageUrl.length > 1"
        class="nav right"
        @click.stop="nextImage(index, product.imageUrl.length)"
      >›</button>
    </div>

    <h2>{{ product.productName }}</h2>
    <p class="price">{{ product.price }}€</p>
    <p class="description">{{ product.description }}</p>

    <button class="cartBtn" @click.stop="addProductToCart(product)">
      <svg class="cart" fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>      </svg>
      ADD TO CART
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" class="product">
      <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" />      </svg>
    </button>
  </div>
</div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchProducts } from '../utils/fetchProducts'
import { addToCart } from '../utils/cart'

const products = ref([])
const error = ref('')
const loading = ref(true)
const router = useRouter()
const activeImageIndex = ref({})

const addProductToCart = (product) => {
  addToCart(product)
}
const goToEdit = (id) => {
  router.push(`/edit/${id}`)
}


onMounted(async () => {
  if (!isLoggedIn()) return router.push("/login")

  try {
    const data = await fetchProducts()
    products.value = data
  } catch (err) {
    error.value = err.message || "Failed to load products."
  } finally {
    loading.value = false
  }
})

function isLoggedIn() {
  return localStorage.getItem('token') !== null
}

function getImageUrl(path) {
  if (!path) return '';
  const cleanPath = path.replace('http://localhost:3000', '');
  return `${import.meta.env.VITE_API_BASE_URL}${cleanPath}`;
}


function nextImage(index, length) {
  activeImageIndex.value[index] = (activeImageIndex.value[index] + 1 || 1) % length
}

function prevImage(index) {
  const current = activeImageIndex.value[index] || 0
  const length = products.value[index].imageUrl.length
  activeImageIndex.value[index] = (current - 1 + length) % length
}
</script>

<style scoped>
.products-page {
  padding: 2rem;
  text-align: center;
  color: white;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 190px;
  height: 175px;
  padding: 0.5rem;
  background: rgba(198, 198, 198, 0.34);
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border-bottom: 3px solid rgba(255, 255, 255, 0.440);
  border-left: 2px rgba(255, 255, 255, 0.545) outset;
  box-shadow: -40px 50px 30px rgba(0, 0, 0, 0.280);
  transform: skewX(10deg);
  overflow: hidden;
  color: white;
  transition: all 0.4s ease;
}

.card:hover {
  transform: skewX(0deg) scale(1.05);
  height: auto;
  cursor: pointer;
}

.card h1 {
  text-align: center;
  margin: 1.3rem;
  color: rgb(218, 244, 237);
  text-shadow: -10px 5px 10px rgba(0, 0, 0, 0.573);
}

.image-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  color: white;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.8);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;
}

.nav.left {
  left: 4px;
}

.nav.right {
  right: 4px;
}

.price {
  font-weight: bold;
  color:rgb(255, 255, 255);
}

.description {
  color: white;
  font-size: 0.9rem;
}
.cartBtn {
  width: 155px;
  height: 50px;
  border: none;
  border-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: white;
  font-weight: 500;
  position: relative;
  background-color: rgb(29, 29, 29);
  box-shadow: 0 20px 30px -7px rgba(27, 27, 27, 0.219);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden;
}

.cart {
  z-index: 2;
}

.cartBtn:active {
  transform: scale(0.96);
}

.product {
  position: absolute;
  width: 12px;
  border-radius: 3px;
  content: "";
  left: 23px;
  bottom: 23px;
  opacity: 0;
  z-index: 1;
  fill: rgb(211, 211, 211);
}

.cartBtn:hover .product {
  animation: slide-in-top 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-30px);
    opacity: 1;
  }

  100% {
    transform: translateY(0) rotate(-90deg);
    opacity: 1;
  }
}

.cartBtn:hover .cart {
  animation: slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes slide-in-left {
  0% {
    transform: translateX(-10px);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>