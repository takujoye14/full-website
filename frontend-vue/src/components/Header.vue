<template>
  <header class="site-header">
    <nav class="nav-bar">
      <router-link to="/" class="nav-left">Home</router-link>


      <div class="nav-right">
        <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
        <router-link v-if="!isLoggedIn" to="/signup">Sign Up</router-link>
        <router-link v-if="isLoggedIn" to="/products">Products</router-link>

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
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const isLoggedIn = computed(() => store.getters.isLoggedIn)

function handleLogout() {
  store.dispatch('logout')
  router.push('/login')
}

</script>

<style scoped>
.site-header {
  background-color: #333;
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
    background-color:rgb(51, 51, 51); 
    
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
    transition-duration: 0.3s;
    padding-left: 10px;
  }
  
  .logout-btn:hover .logout-text {
    opacity: 1;
    width: 70%;
    transition-duration: 0.3s;
    padding-right: 10px;
  }
  
  .logout-btn:active {
    transform: translate(2px, 2px);
  }
  
</style>
