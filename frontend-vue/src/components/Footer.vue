<template>
  <footer class="site-footer">
    <p>© 2025 The Vault. All rights reserved.</p>

    <router-link
      v-if="isLoggedIn"
      to="/add-product"
      class="add-product-btn"
    >
      ➕ Add Product
    </router-link>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isLoggedIn = computed(() => store.getters.isLoggedIn)
</script>

<style scoped>
.site-footer {
  padding: 1rem;
  text-align: center;
  background-color: rgba(125, 123, 123, 0.62);
  color: white;
  position: relative;
}

.add-product-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background: #1f1f1f;
  color: white;
  font-weight: bold;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.add-product-btn:hover {
  background: #000;
}

</style>
