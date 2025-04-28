<template>
  <div class="purchase-container">
    <div v-if="loading" class="no-invoice">Loading purchases...</div>

    <div v-else-if="invoices.length === 0" class="no-invoice">
      No purchases found.
    </div>

    <div v-else v-for="invoice in invoices" :key="invoice._id" class="receipt">
      <h2>RECEIPT</h2>
      <hr />

      <div class="line" v-for="(item, i) in invoice.products" :key="i">
        <span class="product">{{ item.productName }}</span>
        <span class="dots"></span>
        <span>x{{ item.quantity }}</span>
      </div>

      <hr />

      <div class="line">
        <span>TOTAL</span>
        <span class="dots"></span>
        <span>€{{ invoice.totalprice.toFixed(2) }}</span>
      </div>

      <div class="line">
        <span>DATE</span>
        <span class="dots"></span>
        <span>{{ formatDate(invoice.createdAt) }}</span>
      </div>

      <hr />

      <p class="thanks">Thank you for shopping at The Vault!</p>
      <div class="barcode"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const invoices = ref([])
const loading = ref(true)
const router = useRouter()

onMounted(async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    console.error('No token found, redirecting to login.');
    router.push('/login')
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/invoices/myInvoices`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch invoices')
    invoices.value = data.reverse()
  } catch (err) {
    console.error('Failed to fetch invoices:', err.message)
    router.push('/login')
  } finally {
    loading.value = false
  }
})

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
}
</script>



<style scoped>
.purchase-container {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  color: #111;
  font-family: 'Courier New', Courier, monospace;
}

.no-invoice {
  color: white;
  font-size: 1.4rem;
  text-align: center;
}

.receipt {
  background: white;
  padding: 2rem;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  position: relative;
  border-bottom: 20px solid transparent;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 65% 98%, 60% 100%, 55% 98%, 50% 100%, 45% 98%, 40% 100%, 35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 5% 98%, 0 100%);
}

.receipt h2 {
  text-align: center;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

hr {
  border: none;
  border-top: 1px dotted #aaa;
  margin: 1rem 0;
}

.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  margin: 0.4rem 0;
}

.product {
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dots {
  flex-grow: 1;
  border-bottom: 1px dotted #000;
  margin: 0 0.5rem;
  height: 1px;
}

.thanks {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #333;
}

.barcode {
  margin: 1rem auto 0;
  height: 30px;
  width: 100%;
  background: repeating-linear-gradient(
    90deg,
    #000,
    #000 2px,
    transparent 2px,
    transparent 4px
  );
}
</style>
