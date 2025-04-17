<template>
  <div class="products-page">
    <h1>Products</h1>
    <p v-if="error" class="error-msg">{{ error }}</p>
    <div v-if="loading" class="loading-msg">Loading products...</div>

    <div class="products-grid">
      <div class="product-card" v-for="(product, index) in products" :key="product._id">
        <div class="image-container">
          <img
            :src="getImageUrl(product.imageUrl[activeImageIndex[index] || 0])"
            :alt="product.productName"
          />
          <button v-if="product.imageUrl.length > 1" class="nav left" @click="prevImage(index)">‹</button>
          <button v-if="product.imageUrl.length > 1" class="nav right" @click="nextImage(index, product.imageUrl.length)">›</button>
        </div>

        <h2>{{ product.productName }}</h2>
        <p class="price">{{ product.price }}€</p>
        <p class="description">{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchProducts } from '../utils/fetchProducts'

const products = ref([])
const error = ref('')
const loading = ref(true)
const router = useRouter()
const activeImageIndex = ref({}) // { [productIndex]: currentImageIndex }

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
  if (!path) return ''
  return path.startsWith('http') ? path : `http://localhost:3000${path}`
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
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.product-card {
  width: 300px;
  height: 100%;
  padding: 1rem;
  border-radius: 12px;
  background-color: #fafafa;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: 0.2s;
}

.image-container {
  width: 100%;
  position: relative;
  overflow: hidden;
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
  color: #2c3e50;
}

.description {
  color: #555;
  font-size: 0.9rem;
}
</style>
