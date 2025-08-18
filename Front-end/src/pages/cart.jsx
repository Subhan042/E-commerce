import React, { useState } from 'react';
import './cart.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, decreaseQuantity,addQuantity, clearCart } from '../Slices/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showPopup, setShowPopup] = useState(false);

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setShowPopup(true);
    dispatch(clearCart()); 
    setTimeout(() => setShowPopup(false), 3000); 
  };

  return (
    <div id="container">
      <h2>Your Cart ({cartItems.length} items)</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-table">
            <div className="cart-header">
              <span>Item</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {cartItems.map(item => (
              <div className="cart-row" key={item.id}>
                <div className="cart-item">
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                  />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                  </div>
                </div>
                <div className="cart-price">₹ {item.price.toFixed(2)}</div>
                <div className="cart-quantity">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(addQuantity(item.id))}>+</button>
                </div>
                <div className="cart-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}

      <Link to="/productlist">
        <button className="back-btn">Back to Products</button>
      </Link>
      {showPopup && (
        <div className="checkout-popup">
          ✅ Order placed successfully!
        </div>
      )}
    </div>
  );
}

export default Cart;
