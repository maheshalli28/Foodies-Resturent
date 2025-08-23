import React from 'react';
import { Card } from 'react-bootstrap';

export const Orders = () => {
  return (  
<div>
      <h4 className="fw-bold mb-3">Manage Orders</h4>
      <p>Track your ordes and update orders.</p>

      {/* First Order */}
      <Card className="mb-3 shadow-sm">
        <Card.Body className='row'>
          <h6 className="fw-bold">Order #20250805090954</h6>
          <small className="text-muted">Placed on 5/8/2025 at 3:12:54 pm</small>

          <div className="mt-3 col-md-6">
            <h6 className="fw-bold">Items Ordered</h6>
            <p>Chicken Biryani x 3 - <span className="fw-bold">₹375.00</span></p>
            <p>Chicken Mamoos x 1 - <span className="fw-bold">₹99.00</span></p>
          </div>

          <div className="mt-3 col-md-6">
            <h6 className="fw-bold">Customer Information</h6>
            <p><strong>Name:</strong> B Srikar</p>
            <p><strong>Address:</strong> 1-5/6, Uppal, Hyderabad, Telangana 324156</p>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <p>Total amount:</p>
            <span className="fw-bold text-danger">₹ {132.54} - 2 items</span>
             <span className="fw-bold text-success">✔ Paid</span>
             </div>
        </Card.Body>
      </Card>

      {/* Second Order */}
      <Card className="mb-3 shadow-sm">
        <Card.Body className='row'>
          <h6 className="fw-bold">Order #2025080509091102</h6>
          <small className="text-muted">Placed on 5/8/2025 at 9:08:11 pm</small>

          <div className="mt-3 col-md-6">
            <h6 className="fw-bold">Items Ordered</h6>
            <p>Chicken Biryani x 1 - <span className="fw-bold">₹135.00</span></p>
            <p>Sambar Idly x 3 - <span className="fw-bold">₹150.00</span></p>
          </div>

          <div className="mt-3 col-md-6">
            <h6 className="fw-bold">Customer Information</h6>
            <p><strong>Name:</strong> Mahesh</p>
            <p><strong>Address:</strong> 1-55, BN reddy, Hyderabad, Telangana 500801</p>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <p>Total amount:</p>
            <span className="fw-bold text-danger">₹ {89.39} - 2 items</span>
             <span className="fw-bold text-success">✔ Paid</span>
          </div>
        </Card.Body>
      </Card>
    </div>
    );
}
export default Orders;