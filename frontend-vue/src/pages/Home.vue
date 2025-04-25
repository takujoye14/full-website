<template>
  <div class="home-page">
    <h1>Welcome to The Vault</h1>

    <div v-if="!isLoggedIn" class="guest-content">
      <p class="tagline">
        Discover a curated collection of exclusive products — accessible only to members.
        From rare sneakers to premium essentials, everything here is handpicked and private.
      </p>
      <p class="cta">
        To browse our full catalog, please
        <router-link to="/signup" class="fancy-link">create an account</router-link>
        or
        <router-link to="/login" class="fancy-link alt">log in</router-link>.
      </p>

      <div class="card-container">
        <div class="card">
          <h2>Exclusivity</h2>
          <p class="card-text">Gain access to a carefully curated collection not available to the public.</p>
        </div>
        <div class="card">
          <h2>Private Access</h2>
          <p class="card-text">Only registered users can explore and purchase from our hidden catalog.</p>
        </div>
        <div class="card">
          <h2>Luxury Vault</h2>
          <p class="card-text">Every item is premium, limited, and personally vetted by our experts.</p>
        </div>
      </div>
    </div>

    <div v-else class="logged-in">
      <p>
        Welcome back to the Vault.
        Your access to our full range of exclusive products is just one click away.
      </p>
            <router-link to="/products" class="boton-elegante">See Products</router-link>
            <div class="card-container">
        <div class="card">
          <h2>Exclusivity</h2>
          <p class="card-text">Gain access to a carefully curated collection not available to the public.</p>
        </div>
        <div class="card">
          <h2>Private Access</h2>
          <p class="card-text">Only registered users can explore and purchase from our hidden catalog.</p>
        </div>
        <div class="card">
          <h2>Luxury Vault</h2>
          <p class="card-text">Every item is premium, limited, and personally vetted by our experts.</p>
        </div>
      </div>
    
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
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
}

.tagline {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.85;
}

.cta {
  font-size: 1.15rem;
  color: #eee;
  margin-bottom: 2.5rem;
}

.fancy-link {
  color: #fac921;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease-in-out;
}
.fancy-link:hover {
  color: #fff;
  border-bottom: 2px solid #fac921;
  text-shadow: 0 0 5px #fac921;
}
.fancy-link.alt {
  color:rgb(48, 157, 187);
  margin-left: 0.4rem;
}
.fancy-link.alt:hover {
  color: #fff;
  border-bottom: 2px solid #69b9ff;
  text-shadow: 0 0 5px #69b9ff;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  width: 190px;
  height: 254px;
  background:rgb(63, 63, 63);
  position: relative;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 20px;
  padding: 1rem;
  text-align: center;
}

.card h2 {
  z-index: 1;
  color: white;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.card .card-text {
  z-index: 1;
  font-size: 0.85rem;
  color: #ccc;
  padding: 0 0.5rem;
}

.card::before {
  content: '';
  position: absolute;
  width: 100px;
  height: 130%;
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.61), rgba(0, 0, 0, 0.61));
  animation: rotBGimg 5s linear infinite;
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.card::after {
  content: '';
  position: absolute;
  background:rgba(57, 57, 57, 0.61);
  inset: 5px;
  border-radius: 15px;
}

/* 🔒 Logged-in */
.logged-in p {
  margin-bottom: 2rem;
}

/* From Uiverse.io by iZOXVL */ 
.boton-elegante {
  padding: 15px 30px;
  border: 2px solid #2c2c2c;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 30px;
  transition: all 0.4s ease;
  outline: none;
  position: relative;
  overflow: hidden;
  font-weight: bold;
}

.boton-elegante::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  transform: scale(0);
  transition: transform 0.5s ease;
}

.boton-elegante:hover::after {
  transform: scale(1.25);
}

.boton-elegante:hover {
  border-color: #666666;
  background: #292929;
}

</style>
