export const fetchProducts = async () => {
  const token = localStorage.getItem('token') 

  if (!token) {
    throw new Error('No token found in localStorage')
  }

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/allproducts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Unauthorized or failed to fetch products')
  }

  return await response.json()
}
