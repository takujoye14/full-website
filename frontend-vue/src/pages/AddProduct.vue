<template>
  <div class="add-product">
    <h1>Add New Product</h1>

    <form @submit.prevent="submitProduct" enctype="multipart/form-data">
      <input v-model="productName" type="text" placeholder="Product Name" required />
      <input v-model="brand" type="text" placeholder="Brand" required />
      <textarea v-model="description" placeholder="Product Description" required></textarea>
      <input v-model.number="price" type="number" placeholder="Price (€)" required />
      <input type="file" @change="handleFileChange" accept=".jpg,.jpeg,.png,.svg" multiple required />

      <button type="submit">Add Product</button>
    </form>

    <p v-if="success" class="success">{{ success }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const productName = ref('')
const description = ref('')
const brand = ref('')
const price = ref('')
const files = ref([])
const success = ref('')
const error = ref('')


const handleFileChange = (e) => {
  files.value = Array.from(e.target.files)
}

const submitProduct = async () => {
  success.value = ''
  error.value = ''

  const formData = new FormData()
  formData.append('productName', productName.value)
  formData.append('description', description.value)
  formData.append('brand', brand.value)
  formData.append('price', price.value)

  files.value.forEach(file => {
    formData.append('images', file)
  })

  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/addProducts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.message || 'Failed to add product.')

    success.value = '✅ Product added successfully!'
    productName.value = ''
    description.value = ''
    price.value = ''
    files.value = []
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.add-product {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  color: white;
  backdrop-filter: blur(6px);
}
input, textarea, button {
  width: 100%;
  margin: 1rem 0;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
}
button {
  background: #1f1f1f;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background: black;
}
.success {
  color: limegreen;
}
.error {
  color: red;
}
</style>
