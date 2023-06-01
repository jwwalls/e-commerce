import React, { useEffect, useState } from "react";
import { getCartItems, removeFromCart, checkout } from "../api/cart";
import '../css/Checkout.css';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
      console.log("userId: " + storedUserId);
      if (storedUserId !== "") {
        try {
          const items = await getCartItems(storedUserId);
          console.log(items);
          setCartItems(items);
        } catch (error) {
          console.error(error.message || "Failed to retrieve cart items");
        }
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleRemoveItem = async (cartId) => {
    try {
      const success = await removeFromCart(cartId);
      if (success) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== cartId)
        );
      }
    } catch (error) {
      console.error(error.message || "Failed to remove item from cart");
    }
  };

  const handleCheckout = async () => {
    try {
      const success = await checkout(userId);
      if (success) {
        console.log("Checkout successful");
        setCartItems([]);
      }
    } catch (error) {
      console.error(error.message || "Failed to perform checkout");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      <img src="/pics/productheader.png" alt="Product Header" className="product-header-image" />
      {userId ? (
        <div className="checkout-container">
          <h1 className="checkout-title">Welcome to Checkout</h1>
          {cartItems && cartItems.length > 0 ? (
            <ul className="checkout-list">
              {cartItems.map((item) => (
                <li key={item.id} className="checkout-item">
                  <p className="checkout-product-id">Product ID: {item.product_id}</p>
                  <p className="checkout-quantity">Quantity: {item.quantity}</p>
                  <p className="checkout-price">Price: {item.price}</p>
                  <img src={item.image_url} alt={`Product ${item.product_id}`} className="checkout-image"/>
                  <button onClick={() => handleRemoveItem(item.id)} className="checkout-remove-btn">X</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="checkout-empty">No items in the cart</p>
          )}
          {cartItems && cartItems.length > 0 && (
            <div className="checkout-summary">
              <p className="checkout-total">Total: {calculateTotal()}</p>
              <button onClick={handleCheckout} className="checkout-button">Checkout</button>
            </div>
          )}
        </div>
      ) : (
        <div className="checkout-container">
          <h1 className="checkout-title">Please login to view your cart</h1>
        </div>
      )}
    </>
  );
}

export default Checkout;