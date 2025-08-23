import React, { useState } from "react";
import "./Cart.css";
import { RiDeleteBin5Line } from "react-icons/ri";

const CartPage = ({ cartItems, setCartItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState({});

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 2.99 : 0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + deliveryFee + tax;

  const validateForm = () => {
    const newErrors = {};
    if (!address) newErrors.address = "Address is required";
    if (!pincode || pincode.length !== 6) newErrors.pincode = "Valid pincode required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const confirmOrder = () => {
    if (!validateForm()) return;
    alert("✅ Order placed!");
    setCartItems([]);
    setShowModal(false);
    setAddress('');
    setPincode('');
    setPaymentMethod('cod');
  };

  return (
    <div className={`cart-container mt-5 py-5 ${showModal ? 'modal-open' : ''}`}>
      <div className="cart-grid mt-3">
        {/* Left - Cart Items */}
        <div className="cart-box">
          <div className="cart-header">
            <div>
              <h2 className="cart-title">Cart Items</h2>
              <p className="cart-subtitle">{cartItems.length} items in your cart</p>
            </div>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <img src={item.image} alt={item.title} className="cart-img" />
                    <div>
                      <h5>{item.title}</h5>
                    </div>
                  </div>

                  <div className="cart-qty ms-3 me-3">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <div className="cart-price">
                    <span className="text-dark fw-bold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button className="delete-btn" onClick={() => removeItem(item.id)}>
                      <RiDeleteBin5Line size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="summary-box">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span className="text-danger fw-bold">₹{total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={() => setShowModal(true)}>
            Proceed to Checkout
          </button>
          <button className="continue-btn">
            <a href="/" className="text-secondary text-decoration-none">
              Back to Menu
            </a>
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Your Order</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>

                <div className="modal-body">
                  <div className="row">
                    {/* Customer Details */}
                    <div className="col-md-6 border-end pe-4">
                      <h6 className="fw-bold mb-3">Customer Details</h6>
                      <p><strong>Name:</strong> John Doe</p>
                      <p><strong>Phone:</strong> 9876543210</p>

                      <label className="form-label">Address:</label>
                      <input
                        type="text"
                        className={`form-control mb-2 ${errors.address ? 'is-invalid' : ''}`}
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {errors.address && <div className="text-danger mb-2">{errors.address}</div>}

                      <label className="form-label">Pincode:</label>
                      <input
                        type="number"
                        className={`form-control mb-2 ${errors.pincode ? 'is-invalid' : ''}`}
                        placeholder="Enter pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                      {errors.pincode && <div className="text-danger mb-2">{errors.pincode}</div>}

                      <label className="form-label">Payment Method:</label>
                      <select
                        className="form-select mb-3"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <option value="cod">Cash on Delivery</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="upi">UPI</option>
                      </select>
                    </div>

                    {/* Order Details */}
                    <div className="col-md-6 ps-4">
                      <h6 className="fw-bold mb-3">Order Details</h6>
                      <ul className="list-unstyled">
                        {cartItems.map((item) => (
                          <li key={item.id}>
                            {item.title} × {item.quantity} – ₹{(item.price * item.quantity).toFixed(2)}
                          </li>
                        ))}
                      </ul>
                      <hr />
                      <p><strong>Delivery Fee:</strong> ₹{deliveryFee.toFixed(2)}</p>
                      <p><strong>Tax:</strong> ₹{tax.toFixed(2)}</p>
                      <p className="fw-bold">Total: ₹{total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-success" onClick={confirmOrder}>
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default CartPage;
