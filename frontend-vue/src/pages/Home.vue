<template>
  <div class="home-page">
    <h1>Welcome to The Vault</h1>

    <div v-if="!isLoggedIn">
      <p>
        Discover a curated collection of exclusive products — accessible only to members. 
        From rare sneakers to premium essentials, everything here is handpicked and private.
      </p>
      <p>
        To browse our full catalog, please 
        <router-link to="/signup"> create an account</router-link> or 
        <router-link to="/login"> log in</router-link>.
      </p>
    </div>

    <div v-else>
      <p>
        Welcome back to the Vault.
        Your access to our full range of exclusive products is just one click away.
      </p>
      <button @click="$router.push('/products') " >
       All products
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isLoggedIn = computed(() => store.getters.isLoggedIn)



</script>

<style scoped>
.home-page {
  padding: 2rem;
  text-align: center;
  color: white;
}

button {
  font-size: 1rem;
  padding: 0.8em 2em;
  background-color: #000;
  border: 3px solid yellow;
  border-radius: 1em;
  color: #fff;
  font-weight: bolder;
  transition: cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.4s;
  box-shadow: -5px 5px 0px 0px yellow;
}

button:hover {
  transform: translate(5px, -5px);
}
</style>
