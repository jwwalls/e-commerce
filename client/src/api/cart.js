const axios = require('axios');

const BASE_URL = 'https://your-api-base-url/api/cart';

// Add an item to the cart
async function addToCart(userId, productId, quantity) {
  try {
    const response = await axios.post(`${BASE_URL}/add`, {
      user_id: userId,
      product_id: productId,
      quantity,
    });

    return response.data.cartItemId;
  } catch (error) {
    console.error(error.response.data.error || 'Failed to add item to cart');
  }
}

// Get cart items for a user
async function getCartItems(userId) {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);

    return response.data.cartItems;
  } catch (error) {
    console.error(
      error.response.data.message || 'Failed to retrieve cart items'
    );
  }
}

// Remove an item from the cart
async function removeFromCart(cartId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${cartId}`);

    return response.status === 204;
  } catch (error) {
    console.error(
      error.response.data.message || 'Failed to remove item from cart'
    );
  }
}

// Perform cart checkout
async function checkout(userId) {
  try {
    const response = await axios.post(`${BASE_URL}/checkout`, {
      userId,
    });

    return response.status === 200;
  } catch (error) {
    console.error(error.response.data.message || 'Failed to perform checkout');
  }
}

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  checkout,
};
