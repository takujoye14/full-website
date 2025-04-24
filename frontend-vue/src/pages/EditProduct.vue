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

    <!-- Custom Delete Button with Confirm Popup -->
    <div class="delete-section">
      <button class="delete-button" @click="showConfirm = true">
        <span class="text">Delete</span>
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
            />
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
    const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
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
    const res = await fetch(`http://localhost:3000/api/products/edit/${productId}`, {
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
    const res = await fetch(`http://localhost:3000/api/products/delete/${productId}`, {
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
  margin: 2rem auto;
  padding: 2rem;
  color: white;
  backdrop-filter: blur(6px);
}
input,
textarea,
button {
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
.delete-section {
  margin-top: 2rem;
  text-align: center;
}

/* New custom red delete button */
.delete-button {
  width: 150px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: #e62222;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  margin: 1rem auto 0;
  justify-content: center;
  position: relative;
}
.delete-button .text {
  transform: translateX(35px);
  color: white;
  font-weight: bold;
  transition: 200ms;
}
.delete-button .icon {
  position: absolute;
  border-left: 1px solid #c41b1b;
  transform: translateX(110px);
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 200ms;
}
.delete-button svg {
  width: 15px;
  fill: #eee;
}
.delete-button:hover {
  background: #ff3636;
}
.delete-button:hover .text {
  color: transparent;
}
.delete-button:hover .icon {
  width: 150px;
  border-left: none;
  transform: translateX(0);
}
.delete-button:focus {
  outline: none;
}
.delete-button:active .icon svg {
  transform: scale(0.8);
}

.confirm-popup {
  background: #222;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
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
}
.confirm-popup .cancel {
  background: gray;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
