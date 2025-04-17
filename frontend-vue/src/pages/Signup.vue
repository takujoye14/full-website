<template>
  <div class="signup-page">
    <h1>Sign Up</h1>
    <p v-if="success" style="color: green">{{ success }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
    <form @submit.prevent="handleSignup">
      <input v-model="firstName" type="text" placeholder="First Name" required />
      <input v-model="lastName" type="text" placeholder="Last Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="confirmPassword" type="password" placeholder="Retype Password" required />
      <button type="submit">Create Account</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')

const handleSignup = async () => {
  error.value = ''
  success.value = ''

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    const res = await fetch('http://localhost:3000/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        imageUrl: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(firstName.value + ' ' + lastName.value),
        role: 'user',
        password: password.value
      })
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Signup failed')
    }

    success.value = 'Account created! You can now log in.'
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.signup-page {
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
