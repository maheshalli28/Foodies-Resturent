import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { getApiUrl, API_ENDPOINTS } from "../../config/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${getApiUrl(API_ENDPOINTS.ORDERS.LIST)}?_=${Date.now()}`);
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="fw-bold mb-3">Manage Orders</h4>
      <p>Track your orders and their details below.</p>

      {orders.length === 0 ? (
        <p className="text-muted">No orders found.</p>
      ) : (
        orders.map((order) => (
          <Card key={order._id} className="mb-3 shadow-sm">
            <Card.Body className="row">
              <h6 className="fw-bold">Order #{order._id}</h6>
              <small className="text-muted">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </small>

              {/* Items Ordered */}
              <div className="mt-3 col-md-6">
                <h6 className="fw-bold">Items Ordered</h6>
                {order.items.map((item, idx) => (
                  <p key={idx}>
                    {item.image && (
                      <img src={item.image} alt={item.title} width="40" height="40" className="me-2 rounded" />
                    )}
                    {item.title} × {item.quantity} –{" "}
                    <span className="fw-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                ))}
              </div>

              {/* Customer Info */}
              <div className="mt-3 col-md-6">
                <h6 className="fw-bold">Customer Information</h6>
                <p><strong>Name:</strong> {order.customerName}</p>
                <p><strong>Phone:</strong> {order.customerPhone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>

              {/* Total + Payment */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <p>Total amount:</p>
                <span className="fw-bold text-danger">
                  ₹ {Number(order.totalAmount || 0).toFixed(2)} - {order.items.length} items
                </span>
                <span className="text-muted">
                  Subtotal ₹{Number(order.subtotal || 0).toFixed(2)}, Tax ₹{Number(order.tax || 0).toFixed(2)}, Delivery ₹{Number(order.deliveryFee || 0).toFixed(2)}
                </span>
                {order.paymentMethod && (
                  <span className="fw-bold text-success">
                    {order.paymentMethod === "cod" ? "Cash on Delivery" : "✔ Paid"}
                  </span>
                )}
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Orders;
