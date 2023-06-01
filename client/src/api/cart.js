const BASE_URL = 'http://localhost:8080/api/cart';


// Add an item to the cart
export async function addToCart(userId, productId, quantity, imageUrl, price) {
  try {
    console.log('Adding item to cart', userId, productId, quantity,imageUrl,price);
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        product_id: productId,
        image_url: imageUrl,
        quantity,      
        price,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }

    const data = await response.json();
    return data.cartItemId;
  } catch (error) {
    console.error(error.message || 'Failed to add item to cart');
  }
}


export async function getCartItems(userId) {
  try {
    if (!userId) {
      throw new Error('User ID is missing');
    }

    const response = await fetch(`${BASE_URL}/user/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to retrieve cart items');
    }

    const data = await response.json();
    return data.cartItems;
  } catch (error) {
    console.error(
      error.message || 'Failed to retrieve cart items'
    );
    throw error;
  }
}



// Remove an item from the cart
export async function removeFromCart(cartId) {
  try {
    const response = await fetch(`${BASE_URL}/${cartId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }

    return response.status === 204;
  } catch (error) {
    console.error(
      error.message || 'Failed to remove item from cart'
    );
  }
}

// Perform cart checkout
export async function checkout(userId) {
  try {
    const response = await fetch(`${BASE_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to perform checkout');
    }

    return response.status === 200;
  } catch (error) {
    console.error(error.message || 'Failed to perform checkout');
  }
}

