<template>
  <div class="edit-product">
    <h1>Edit Product</h1>

    <form @submit.prevent="submitEdit" enctype="multipart/form-data">
      <input v-model="productName" type="text" placeholder="Product Name" required />
      <textarea v-model="description" placeholder="Description" required></textarea>
      <input v-model.number="price" type="number" placeholder="Price (€)" required />
      <input type="file" @change="handleFileChange" accept=".jpg,.jpeg,.png,.svg" multiple />
      <button type="submit">Save Changes</button>
    </form>

    <p v-if="success" class="success">{{ success }}</p>
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Delete Button Section -->
    <div class="delete-section">
      <button class="button" type="button" @click="showConfirm = true">
        <span class="button__text">Delete</span>
        <span class="button__icon">
          <svg class="svg" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
            <path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" 
              style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
            <line x1="80" x2="432" y1="112" y2="112" 
              style="stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/>
            <path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" 
              style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
            <line x1="256" x2="256" y1="176" y2="400" 
              style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
            <line x1="184" x2="192" y1="176" y2="400" 
              style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
            <line x1="328" x2="320" y1="176" y2="400" 
              style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
          </svg>
        </span>
      </button>

      <div v-if="showConfirm" class="confirm-popup">
        <p>Are you sure you want to delete this product?</p>
        <div class="actions">
          <button class="confirm" @click="deleteProduct">Yes, delete</button>
          <button class="cancel" @click="showConfirm = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productId = route.params.id

const showConfirm = ref(false)
const productName = ref('')
const description = ref('')
const price = ref(0)
const files = ref([])
const success = ref('')
const error = ref('')

const handleFileChange = (e) => {
  files.value = Array.from(e.target.files)
}

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()

    productName.value = data.productName
    description.value = data.description
    price.value = data.price
  } catch (err) {
    error.value = 'Failed to fetch product.'
  }
})

const submitEdit = async () => {
  success.value = ''
  error.value = ''

  const formData = new FormData()
  formData.append('productName', productName.value)
  formData.append('description', description.value)
  formData.append('price', price.value)
  files.value.forEach(file => {
    formData.append('images', file)
  })

  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/edit/${productId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })

    if (!res.ok) throw new Error('Edit failed.')
    success.value = '✅ Product updated!'
    setTimeout(() => router.push('/products'), 1500)
  } catch (err) {
    error.value = err.message
  }
}

const deleteProduct = async () => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/delete/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || "Delete failed")

    alert("Product deleted successfully")
    router.push('/products')
  } catch (err) {
    alert("Failed to delete product: " + err.message)
  }
}
</script>

<style scoped>
.edit-product {
  max-width: 500px;
  margin: 4rem auto;
  padding: 2rem;
  color: white;
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input,
textarea,
button[type="submit"] {
  width: 100%;
  margin: 1rem 0;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
}

button[type="submit"] {
  background: #1f1f1f;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button[type="submit"]:hover {
  background: black;
}

.success {
  color: limegreen;
  margin-top: 1rem;
}

.error {
  color: red;
  margin-top: 1rem;
}

.delete-section {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 🗑️ Trash-can delete button */
.button {
  position: relative;
  width: 150px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #cc0000;
  background-color: #e50000;
  overflow: hidden;
}

.button, .button__icon, .button__text {
  transition: all 0.3s;
}

.button .button__text {
  transform: translateX(35px);
  color: #fff;
  font-weight: 600;
}

.button .button__icon {
  position: absolute;
  transform: translateX(109px);
  height: 100%;
  width: 39px;
  background-color: #cc0000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button .svg {
  width: 20px;
}

.button:hover {
  background: #cc0000;
}

.button:hover .button__text {
  color: transparent;
}

.button:hover .button__icon {
  width: 148px;
  transform: translateX(0);
}

.button:active .button__icon {
  background-color: #b20000;
}

.button:active {
  border: 1px solid #b20000;
}

/* Confirm Popup */
.confirm-popup {
  background: #222;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  max-width: 300px;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
  text-align: center;
}

.confirm-popup .actions {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.confirm-popup .confirm {
  background: red;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 6px;
}

.confirm-popup .cancel {
  background: gray;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 6px;
}
</style>
