export const fetchProducts = async () => {
    const token = localStorage.getItem('token')
  
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/allproducts`, {

      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  
    if (!response.ok) {
      throw new Error('Unauthorized or failed to fetch products')
    }
  
    return await response.json()
  }
  