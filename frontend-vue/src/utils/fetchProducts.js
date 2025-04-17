export const fetchProducts = async () => {
    const token = localStorage.getItem('token')
  
    const response = await fetch('http://localhost:3000/api/products/allproducts', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  
    if (!response.ok) {
      throw new Error('Unauthorized or failed to fetch products')
    }
  
    return await response.json()
  }
  