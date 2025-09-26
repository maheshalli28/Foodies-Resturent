import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getApiUrl, API_ENDPOINTS } from "../config/api";

export default function OrderOverview() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <div className="container mt-5 pt-5">
        <h5 className="mb-3">No order to review</h5>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const placeOrder = async () => {
    try {
      const res = await fetch(getApiUrl(API_ENDPOINTS.ORDERS.CREATE), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert("Failed to place order: " + (err.message || res.status));
        return;
      }
      await res.json();
      alert("Order placed successfully!");
      navigate("/admin");
    } catch (e) {
      alert("Failed to place order.");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h4 className="fw-bold mb-3">Review Your Order</h4>
      <div className="row">
        <div className="col-md-6">
          <h6 className="fw-bold">Items</h6>
          <ul className="list-unstyled">
            {order.items?.map((it, idx) => (
              <li key={idx} className="mb-2">
                {it.image && (
                  <img src={it.image} alt={it.title} width="40" height="40" className="me-2 rounded" />
                )}
                {it.title} × {it.quantity} – ₹{(it.price * it.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h6 className="fw-bold">Customer</h6>
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Email:</strong> {order.customerEmail}</p>
          <p><strong>Phone:</strong> {order.customerPhone}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Pincode:</strong> {order.pincode}</p>
          <p><strong>Payment:</strong> {order.paymentMethod?.toUpperCase()}</p>
          <hr />
          <p>Subtotal: ₹{Number(order.subtotal || 0).toFixed(2)}</p>
          <p>Tax: ₹{Number(order.tax || 0).toFixed(2)}</p>
          <p>Delivery: ₹{Number(order.deliveryFee || 0).toFixed(2)}</p>
          <p className="fw-bold">Total: ₹{Number(order.totalAmount || 0).toFixed(2)}</p>
          <button className="btn btn-success" onClick={placeOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
}


