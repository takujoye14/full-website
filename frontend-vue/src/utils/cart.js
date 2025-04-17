const CART_KEY = "shoppingCart";

export const addToCart = (product) => {
  const existingCart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const existingItem = existingCart.find(item => item._id === product._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    existingCart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(existingCart));
  alert(`Added "${product.productName}" to cart!`);
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
