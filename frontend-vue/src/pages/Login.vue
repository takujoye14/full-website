<template>
  <form class="form" @submit.prevent="handleLogin">
    <p id="heading">Login</p>

    <p v-if="success" style="color: green; text-align: center">{{ success }}</p>
    <p v-if="error" style="color: red; text-align: center">{{ error }}</p>

    <div class="field">
      <input v-model="email" autocomplete="off" placeholder="Email" class="input-field" type="email" required />
    </div>

    <div class="field">
      <input v-model="password" placeholder="Password" class="input-field" type="password" required />
    </div>

    <div class="btn">
      <button class="button1" type="submit">Login</button>
      <router-link to="/signup" class="button2">Sign Up</router-link>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const API_BASE = import.meta.env.VITE_API_BASE_URL

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

const handleLogin = async () => {
  error.value = ''
  success.value = ''

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })


    const data = await res.json()

    if (!res.ok) throw new Error(data.message || 'Login failed')

    await store.dispatch('login', data)
    success.value = 'Login successful! Redirecting...'

    localStorage.setItem('justLoggedIn', 'true')
    router.push('/LoginLoader')
  } catch (err) {
    error.value = err.message
  }
}
</script>



<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 2em;
  padding-right: 2em;
  padding-bottom: 0.4em;
  background-color: #171717;
  border-radius: 25px;
  transition: 0.4s ease-in-out;
  max-width: 400px;
  margin: 3rem auto;
}

.form:hover {
  transform: scale(1.05);
  border: 1px solid black;
}

#heading {
  text-align: center;
  margin: 2em;
  color: rgb(255, 255, 255);
  font-size: 1.5em;
}

.field {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  border-radius: 25px;
  padding: 0.6em;
  border: none;
  outline: none;
  color: white;
  background-color: #171717;
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
}

.input-icon {
  height: 1em;
  width: 1.3em;
  fill: white;
}

.input-field {
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: #d3d3d3;
}

.btn {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 2.5em;
  gap: 1rem;
}

.button1,
.button2 {
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: 0.7s ease-in-out;
  background-color: #252525;
  color: white;
  text-decoration: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button1:hover,
.button2:hover {
  background-color: black;
}
</style>
