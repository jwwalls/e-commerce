const express = require('express');
const client = require('../db/client');

const router = express.Router();

router.post('/add', async (req, res, next) => {
    const { user_id, product_id, quantity } = req.body;
    console.log(user_id, product_id, quantity);
    
    // Check if any of the values are undefined
    if (user_id === undefined || product_id === undefined || quantity === undefined) {
      const errorMessage = 'Missing required fields: user_id, product_id, quantity';
      res.status(400).json({ error: errorMessage });
      return;
    }
  
    try {
      // Save the cart item to the database
      const query = `
        INSERT INTO carts (user_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING id;
      `;
      const values = [user_id, product_id, quantity];
      const result = await client.query(query, values);
      const cartItemId = result.rows[0].id;
  
      if (!cartItemId) {
        // If the cart item ID is not returned, throw an error
        throw new Error('Failed to add item to the cart');
      }
  
      // Send a response with the cart item ID
      res.status(201).json({ cartItemId });
    } catch (error) {
      next(error);
    }
  });
  
router.get('/user/:userId', async (req, res, next) => {
    const { userId } = req.params;
  
    try {
      // Retrieve the cart items for the user from the database
      const query = `
        SELECT *
        FROM carts
        WHERE user_id = $1;
      `;
      const values = [userId];
      const result = await client.query(query, values);
      const cartItems = result.rows;
  
      // Check if the cart is empty
      if (cartItems.length === 0) {
        return res.status(200).send({ message: 'No items in the cart' });
      }
  
      // Send a response with the cart items
      res.json({ cartItems });
    } catch (error) {
      next(error);
    }
  });
  

// DELETE: api/cart/:itemId
router.delete('/:cartId', async (req, res, next) => {
    const { cartId } = req.params;
  
    try {
      // Delete the cart item from the database
      const query = `
        DELETE FROM carts
        WHERE id = $1;
      `;
      const values = [cartId];
      await client.query(query, values);
  
      // Send a response indicating successful deletion
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });
  
  
// POST: api/cart/checkout
router.post('/checkout', async (req, res, next) => {
    const { userId } = req.body;
  
    try {
      // Retrieve the cart items for the user from the database
      const getCartItemsQuery = `
        SELECT *
        FROM carts
        WHERE user_id = $1;
      `;
      const getCartItemsValues = [userId];
      const cartItemsResult = await client.query(getCartItemsQuery, getCartItemsValues);
      const cartItems = cartItemsResult.rows;
  
      // Perform the checkout process (e.g., process payment, update inventory, etc.)
  
      // Clear the user's cart by deleting all cart items
      const clearCartQuery = `
        DELETE FROM carts
        WHERE user_id = $1;
      `;
      const clearCartValues = [userId];
      await client.query(clearCartQuery, clearCartValues);
  
      // Send a response indicating successful checkout
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;