<template>
  <div class="login-page">
    <h1>Login</h1>
    <p v-if="success" style="color: green">{{ success }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex' 

const store = useStore()         
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  success.value = ''

  try {
    const res = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })

    const data = await res.json()
    console.log(data)

    if (!res.ok) throw new Error(data)

    // 🧠 Save token and update login state
    store.dispatch('login', data) // <-- use Vuex to track login

    success.value = 'Login successful! Redirecting...'
    
    setTimeout(() => {
      router.push('/products')
    }, 1000)
  } catch (err) {
    error.value = err.message || 'Login failed'
  }
}
</script>


<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}
input,
button {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.75rem;
}
</style>