import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, ListGroup, Spinner, ProgressBar } from "react-bootstrap";
import { BsBox, BsCart, BsCurrencyDollar, BsBoxSeam } from "react-icons/bs";
import Products from "./Dashboard/Product";
import Orders from "./Dashboard/orders";
import { MdOutlineDashboardCustomize, MdFormatListBulletedAdd } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { getApiUrl, API_ENDPOINTS } from "../config/api";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    inStockPercentage: 0,
    totalOrders: 0,
    todayOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [orderTrends, setOrderTrends] = useState([]); 
  const [categoryStats, setCategoryStats] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // ✅ Fetch product stats
        const productRes = await axios.get(getApiUrl(API_ENDPOINTS.DASHBOARD.STATS));

        // ✅ Fetch order stats (same backend on 5000)
        const orderRes = await axios.get(getApiUrl(API_ENDPOINTS.DASHBOARD.STATS));

        // ✅ Fetch all orders to calculate trends for last 7 days
        const ordersRes = await axios.get(getApiUrl(API_ENDPOINTS.ORDERS.LIST));
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dayString = date.toLocaleDateString();
          const count = ordersRes.data.filter(o => {
            const orderDate = new Date(o.createdAt);
            return orderDate.toLocaleDateString() === dayString;
          }).length;
          return { date: dayString, count };
        }).reverse();

        // ✅ Fetch category stats from products
        const products = await axios.get(getApiUrl(API_ENDPOINTS.PRODUCTS.LIST));
        const categoriesMap = {};
        products.data.forEach(p => {
          categoriesMap[p.category] = (categoriesMap[p.category] || 0) + 1;
        });
        const categories = Object.keys(categoriesMap).map(cat => ({ category: cat, count: categoriesMap[cat] }));

        setStats({
          totalProducts: productRes.data.totalProducts || 0,
          inStock: productRes.data.inStock || 0,
          inStockPercentage: productRes.data.inStockPercentage || 0,
          totalOrders: orderRes.data.totalOrders || 0,
          todayOrders: orderRes.data.todayOrders || 0,
          totalRevenue: orderRes.data.totalRevenue || 0,
        });

        setOrderTrends(last7Days);
        setCategoryStats(categories);
      } catch (err) {
        console.error("❌ Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (activePage !== 'users') return;
      setLoadingUsers(true);
      try {
        const res = await axios.get(getApiUrl(API_ENDPOINTS.DASHBOARD.USERS), {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching users:", err);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, [activePage, token]);

  const renderDashboard = () => (
    <>
      <h4 className="fw-bold mb-4 mt-3">Business Analytics</h4>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center p-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {/* Metric Cards */}
          <Row className="mb-4 g-4">
            <Col md={3}>
              <Card className="text-center shadow-sm border-primary">
                <Card.Body>
                  <BsBoxSeam size={32} className="text-primary mb-2" />
                  <Card.Title>Total Products</Card.Title>
                  <Card.Text className="fs-4 fw-bold">{stats.totalProducts}</Card.Text>
                  <ProgressBar now={stats.inStockPercentage} label={`${stats.inStockPercentage}% in stock`} />
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="text-center shadow-sm border-success">
                <Card.Body>
                  <BsBox size={32} className="text-success mb-2" />
                  <Card.Title>In Stock</Card.Title>
                  <Card.Text className="fs-4 fw-bold">{stats.inStock}</Card.Text>
                  <small className="text-muted">{stats.inStockPercentage}% active</small>
                  <ProgressBar now={stats.inStockPercentage} />
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="text-center shadow-sm border-warning">
                <Card.Body>
                  <BsCart size={32} className="text-warning mb-2" />
                  <Card.Title>Total Orders</Card.Title>
                  <Card.Text className="fs-4 fw-bold">{stats.totalOrders}</Card.Text>
                  <small className="text-muted">+{stats.todayOrders} today</small>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="text-center shadow-sm border-success">
                <Card.Body>
                  <BsCurrencyDollar size={32} className="text-success mb-2" />
                  <Card.Title>Revenue</Card.Title>
                  <Card.Text className="fs-4 fw-bold">₹{stats.totalRevenue.toFixed(2)}</Card.Text>
                  <small className="text-muted">Compared to last month</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          <Row className="mb-4 g-4">
            <Col md={6}>
              <Card className="p-3 shadow-sm">
                <h5>Orders Trend (Last 7 Days)</h5>
                <Line
                  data={{
                    labels: orderTrends.map(d => d.date),
                    datasets: [
                      {
                        label: "Orders",
                        data: orderTrends.map(d => d.count),
                        borderColor: "rgba(75,192,192,1)",
                        backgroundColor: "rgba(75,192,192,0.2)",
                        tension: 0.4,
                      },
                    ],
                  }}
                />
              </Card>
            </Col>

            <Col md={6}>
              <Card className="p-3 shadow-sm">
                <h5>Products by Category</h5>
                <Pie
                  data={{
                    labels: categoryStats.map(c => c.category),
                    datasets: [
                      {
                        data: categoryStats.map(c => c.count),
                        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
                      },
                    ],
                  }}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );

  const renderContent = () => {
    switch (activePage) {
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "users":
        return (
          <>
            <h4 className="fw-bold mb-4 mt-3">Users</h4>
            {loadingUsers ? (
              <div className="d-flex justify-content-center align-items-center p-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <div className="table-responsive bg-white shadow-sm p-3 rounded">
                <table className="table table-striped align-middle">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td><span className={`badge ${u.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>{u.role}</span></td>
                        <td>{u.createdAt ? new Date(u.createdAt).toLocaleString() : '-'}</td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center text-muted">No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        );
      case "dashboard":
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="d-flex py-5 min-vh-100 bg-light">
      {/* Sidebar */}
      <div className="bg-white border-end mt-3" style={{ width: "250px" }}>
        <div className="p-3 fw-bold fs-5 text-danger">Admin Panel</div>
        <ListGroup variant="flush">
          <ListGroup.Item action active={activePage === "dashboard"} onClick={() => setActivePage("dashboard")}>
            <MdOutlineDashboardCustomize size={20} className="me-1 mb-1" /> Dashboard
          </ListGroup.Item>
          <ListGroup.Item action active={activePage === "products"} onClick={() => setActivePage("products")}>
            <MdFormatListBulletedAdd size={20} className="me-1 mb-1" /> Products
          </ListGroup.Item>
          <ListGroup.Item action active={activePage === "orders"} onClick={() => setActivePage("orders")}>
            <FaListCheck className="me-1 mb-1" size={20} /> Orders
          </ListGroup.Item>
          <ListGroup.Item action active={activePage === "users"} onClick={() => setActivePage("users")}>
            <MdFormatListBulletedAdd size={20} className="me-1 mb-1" /> Users
          </ListGroup.Item>
        </ListGroup>
        <div className="p-3">
          <Button variant="outline-danger" className="w-100" href="/">
            Logout <IoIosLogOut size={20} />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;
