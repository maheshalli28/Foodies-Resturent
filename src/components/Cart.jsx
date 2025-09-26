// CartPage.js
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { useAuth } from "../context/AuthContext.jsx";
import { getApiUrl, currentConfig } from "../config/api";

const CartPage = ({ cartItems, setCartItems }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 🔼 Increase quantity
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 🔽 Decrease quantity
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ❌ Remove item
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 🧹 Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // 🧮 Totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = cartItems.length > 0 ? 2.99 : 0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + deliveryFee + tax;

  // ✅ Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!customerName) newErrors.customerName = "Name is required";
    if (!phone || phone.length !== 10) newErrors.phone = "Valid phone required";
    if (!address) newErrors.address = "Address is required";
    if (!pincode || pincode.length !== 6)
      newErrors.pincode = "Valid pincode required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🚀 Proceed to checkout: if logged in → go to confirm order; else prompt sign in
  const proceedCheckout = () => {
    if (!user) {
      setShowModal(true);
      return;
    }
    navigate('/confirm-order', {
      state: {
        cartItems,
        prefill: {
          username: user?.name || '',
          email: user?.email || '',
          phone,
          address,
          pincode,
          paymentMethod
        }
      }
    });
  };

  return (
    <section id="cart" className="pt-5" >
     
    <div className="container py-5">
     
      <h2 className="fw-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <div className="row">
          {/* Left: Cart Items */}
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center border-bottom py-3"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.image?.startsWith('http') ? item.image : `${currentConfig.baseURL}${item.image}`}
                    alt={item.title}
                    className="rounded"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="ms-3">
                    <h6 className="fw-bold mb-1">{item.title}</h6>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => decreaseQty(item.id)}
                      >
                        –
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="fw-bold text-danger">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <RiDeleteBin5Line
                    className="fs-4 text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeItem(item.id)}
                  />
                </div>
              </div>
            ))}

            <button className="btn btn-outline-danger mt-3" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          {/* Right: Summary */}
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5 className="fw-bold mb-3">Order Summary</h5>
              <p>
                <strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}
              </p>
              <p>
                <strong>Delivery Fee:</strong> ₹{deliveryFee.toFixed(2)}
              </p>
              <p>
                <strong>Tax:</strong> ₹{tax.toFixed(2)}
              </p>
              <h5 className="fw-bold">Total: ₹{total.toFixed(2)}</h5>
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={proceedCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-3">
                <h5 className="fw-bold mb-3">Proceed to Sign In</h5>
                <p className="mb-3">Please sign in to continue to checkout.</p>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                  <button className="btn btn-danger" onClick={() => { setShowModal(false); navigate('/login'); }}>Sign In</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
    </section>
  );
};

export default CartPage;
