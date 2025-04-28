<template>
  <form class="form" @submit.prevent="handleSignup">
    <p id="heading">Sign Up</p>

    <p v-if="successMessage" style="color: green; text-align: center">{{ successMessage }}</p>
    <p v-if="errorMessage" style="color: red; text-align: center">{{ errorMessage }}</p>

    <div class="field">
      <input v-model="firstName" autocomplete="off" placeholder="First Name" class="input-field" type="text" required />
    </div>

    <div class="field">
      <input v-model="lastName" autocomplete="off" placeholder="Last Name" class="input-field" type="text" required />
    </div>

    <div class="field">
      <input v-model="email" autocomplete="off" placeholder="Email" class="input-field" type="email" required />
    </div>

    <div class="field">
      <input v-model="password" placeholder="Password" class="input-field" type="password" required />
    </div>

    <div class="btn">
      <button class="button1" type="submit">Sign Up</button>
      <router-link to="/login" class="button2">Login</router-link>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()

async function handleSignup() {
  errorMessage.value = ''
  successMessage.value = ''

  console.log("Trying to signup...");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName.value + ' ' + lastName.value)}`,
        role: 'user'
      })
    })

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Signup failed:", errorData.message || "Unknown error");
      errorMessage.value = errorData.message || "Signup failed";
      return;
    }

    const token = await response.text();
    localStorage.setItem('token', token);

    console.log("Signup successful!");
    successMessage.value = "Signup successful! Redirecting...";

    setTimeout(() => {
      router.push('/products');
    }, 1500);

  } catch (err) {
    console.error("Error during signup:", err.message || err);
    errorMessage.value = err.message || "Signup failed";
  }
}
</script>

<style scoped>
/* Same style as your Login.vue */
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
