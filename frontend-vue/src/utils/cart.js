const CART_KEY = "shoppingCart"

const getUserCartKey = () => {
  const token = localStorage.getItem("token")
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return `cart_${payload.userId}` // Unique key for each user
  } catch {
    return null
  }
}

export const addToCart = (product) => {
  const CART_KEY = getUserCartKey()
  if (!CART_KEY) return

  const existingCart = JSON.parse(localStorage.getItem(CART_KEY)) || []
  const existingItem = existingCart.find(item => item._id === product._id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    existingCart.push({ ...product, quantity: 1 })
  }

  localStorage.setItem(CART_KEY, JSON.stringify(existingCart))
  window.dispatchEvent(new CustomEvent('cart-updated'))
}

export const getCart = () => {
  const CART_KEY = getUserCartKey()
  if (!CART_KEY) return []
  return JSON.parse(localStorage.getItem(CART_KEY)) || []
}
export const updateCart = (cartArray) => {
  const CART_KEY = getUserCartKey()
  if (!CART_KEY) return
  localStorage.setItem(CART_KEY, JSON.stringify(cartArray))
}

export const clearCart = () => {
  const CART_KEY = getUserCartKey()
  if (!CART_KEY) return
  localStorage.removeItem(CART_KEY)
}
