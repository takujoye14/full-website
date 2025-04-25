<template>
  <div
    :class="isLoggedIn ? 'inside-vault-background' : 'vault-background'"
    id="app"
  >
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const store = useStore()
const isLoggedIn = computed(() => store.getters.isLoggedIn)
</script>

<style scoped>
:global(html),
:global(body) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app {
  text-align: center;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.vault-background {
  background-image: url('/vault-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.inside-vault-background {
  background-image: url('/inside-vault-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
  padding: 2rem;
}
</style>
