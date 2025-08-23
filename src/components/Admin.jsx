import React, { useState } from "react";
import { Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { BsBox, BsCart, BsCurrencyDollar, BsBoxSeam } from "react-icons/bs";
import Products from "./Dashboard/Product";
import Orders from "./Dashboard/orders";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";


function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard"); // ✅ Track active page

  // ✅ Render content based on selected menu
  const renderContent = () => {
    switch (activePage) {
      case "products":
  return (
    <Products />
  );

 case "orders":
  return (
    <Orders />
  );

      case "dashboard":
      default:
        return (
          <div>
            <h4 className="fw-bold mb-4 mt-3">Admin Overview</h4>
            <Row className="mb-4">
              <Col md={3}>
                <Card className="text-center">
                  <Card.Body>
                    <BsBoxSeam size={32} className="text-primary mb-2" />
                    <Card.Title>Total Products</Card.Title>
                    <Card.Text className="fs-4 fw-bold">6</Card.Text>
                    <small className="text-muted">Avilable Products </small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center">
                  <Card.Body>
                    <BsBox size={32} className="text-success mb-2" />
                    <Card.Title>In Stock</Card.Title>
                    <Card.Text className="fs-4 fw-bold">2</Card.Text>
                    <small className="text-muted">33% available</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center">
                  <Card.Body>
                    <BsCart size={32} className="text-warning mb-2" />
                    <Card.Title>Total Orders</Card.Title>
                    <Card.Text className="fs-4 fw-bold">30</Card.Text>
                    <small className="text-muted">+5 today</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center">
                  <Card.Body>
                    <BsCurrencyDollar size={32} className="text-success mb-2" />
                    <Card.Title>Revenue</Card.Title>
                    <Card.Text className="fs-4 fw-bold">₹1536.04</Card.Text>
                    <small className="text-muted">+12% from last month</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );
    }
  };

  return (
    <div className="d-flex py-5 min-vh-100 bg-light">
      {/* Sidebar */}
      <div className="bg-white border-end mt-3" style={{ width: "250px" }}>
        <div className="p-3 fw-bold fs-5 text-danger">Admin Panel</div>
        <ListGroup variant="flush">
          <ListGroup.Item
            action
            active={activePage === "dashboard"}
            onClick={() => setActivePage("dashboard")}
          >
            <MdOutlineDashboardCustomize size={20} className="me-1 mb-1"/>Dashboard
          </ListGroup.Item>
          <ListGroup.Item
            action
            active={activePage === "products"}
            onClick={() => setActivePage("products")}
          >
            <MdFormatListBulletedAdd size={20} className="me-1 mb-1" />Products
          </ListGroup.Item>
          <ListGroup.Item
            action
            active={activePage === "orders"}
            onClick={() => setActivePage("orders")}
          >
          <FaListCheck className="me-1 mb-1" size={20} /> Orders
          </ListGroup.Item>
        </ListGroup>
        <div className="p-3">
          <Button variant="outline-danger" className="w-100" href="/">
            Logout <IoIosLogOut size={20}/>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;
