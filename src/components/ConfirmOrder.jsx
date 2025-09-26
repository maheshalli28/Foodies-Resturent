import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], prefill = {} } = location.state || {};

  const [customerName, setCustomerName] = useState(prefill.username || "");
  const [email] = useState(prefill.email || ""); // email prefilled, not editable
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});

  // 📊 Order calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 2.99 : 0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + deliveryFee + tax;

  // ✅ Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!customerName) newErrors.customerName = "Name is required";
    if (!phone || phone.length !== 10) newErrors.phone = "Valid phone required";
    if (!address) newErrors.address = "Address is required";
    if (!pincode || pincode.length !== 6) newErrors.pincode = "Valid pincode required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🚀 Confirm Order
  const confirmOrder = async () => {
    if (!validateForm()) return;

    const orderData = {
      customerName,
      customerEmail: email,
      customerPhone: phone,
      address,
      pincode,
      paymentMethod,
      items: cartItems.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      subtotal,
      tax,
      deliveryFee,
      totalAmount: total,
    };
    navigate('/order-overview', { state: { order: orderData } });
  };

  return (
    <div className="container mt-5 pt-5">
      <h4 className="fw-bold mb-4">Confirm Your Order</h4>
      <div className="row">
        {/* Left Side: Customer Info */}
        <div className="col-md-6 border-end pe-4">
          <h6 className="fw-bold mb-3">Customer Details</h6>

          <label className="form-label">Name:</label>
          <input
            type="text"
            className={`form-control mb-2 ${errors.customerName ? "is-invalid" : ""}`}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          {errors.customerName && <div className="text-danger mb-2">{errors.customerName}</div>}

          <label className="form-label">Email:</label>
          <input type="email" className="form-control mb-2" value={email} disabled />

          <label className="form-label">Phone:</label>
          <input
            type="number"
            className={`form-control mb-2 ${errors.phone ? "is-invalid" : ""}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <div className="text-danger mb-2">{errors.phone}</div>}

          <label className="form-label">Address:</label>
          <input
            type="text"
            className={`form-control mb-2 ${errors.address ? "is-invalid" : ""}`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <div className="text-danger mb-2">{errors.address}</div>}

          <label className="form-label">Pincode:</label>
          <input
            type="number"
            className={`form-control mb-2 ${errors.pincode ? "is-invalid" : ""}`}
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

        {/* Right Side: Order Summary */}
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

          <button className="btn btn-success" onClick={confirmOrder}>
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
