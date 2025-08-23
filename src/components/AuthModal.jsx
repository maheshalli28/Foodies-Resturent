import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./AuthModal.css"; // ✅ custom css

const AuthModal = ({ show, onClose, onLogin }) => {
  const [mode, setMode] = useState("user"); // "user" | "admin" | "register"
  const [error, setError] = useState("");

  // ✅ States
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [users, setUsers] = useState([
    { name: "Mahesh", email: "mahesh@gmail.com", password: "123", role: "user" },
    { name: "Varun", email: "varun@gmail.com", password: "456", role: "user" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  // ✅ Handlers
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminEmail === "admin@gmail.com" && adminPassword === "admin@123") {
      onLogin({ username: "Admin", role: "admin", email: adminEmail });
      onClose();
    } else setError("❌ Invalid admin credentials.");
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (u) => u.email === userEmail && u.password === userPassword
    );
    if (foundUser) {
      onLogin({ username: foundUser.name, role: "user", email: foundUser.email });
      onClose();
    } else setError("❌ Invalid user credentials.");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.password) {
      setUsers([...users, { ...newUser, role: "user" }]);
      setNewUser({ name: "", email: "", password: "" });
      setMode("user");
    } else setError("⚠️ All fields are required.");
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <div className="auth-card">
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === "admin"
              ? "🔑 Admin Login"
              : mode === "user"
              ? "👤 User Login"
              : "📝 Create New User"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}

          {mode === "admin" && (
            <Form onSubmit={handleAdminLogin} className="auth-form">
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="email"
                  id="adminEmail"
                  placeholder="Admin Email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
                <Form.Label htmlFor="adminEmail">Admin Email</Form.Label>
              </Form.Group>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="password"
                  id="adminPassword"
                  placeholder="Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
                <Form.Label htmlFor="adminPassword">Password</Form.Label>
              </Form.Group>
              <Button type="submit" className="auth-btn admin-btn w-100">
                Admin
              </Button>
              <pre className="row mt-3">
                <strong>Credentials:</strong><br />
                <span className="text-secondary">Admin Email: admin@gmail.com</span>
                <br />
                <span className="text-secondary">Password: admin@123</span>
                
              </pre>
            </Form>
          )}

          {mode === "user" && (
            <Form onSubmit={handleUserLogin} className="auth-form">
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="email"
                  id="userEmail"
                  placeholder="User Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
                <Form.Label htmlFor="userEmail">User Email</Form.Label>
              </Form.Group>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="password"
                  id="userPassword"
                  placeholder="Password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                />
                <Form.Label htmlFor="userPassword">Password</Form.Label>
              </Form.Group>
              <Button type="submit" className="auth-btn user-btn w-100">
                Login as User
              </Button>
            </Form>
          )}

          {mode === "register" && (
            <Form onSubmit={handleRegister} className="auth-form">
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
                <Form.Label htmlFor="name">Full Name</Form.Label>
              </Form.Group>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="email"
                  id="newEmail"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
                <Form.Label htmlFor="newEmail">Email</Form.Label>
              </Form.Group>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="password"
                  id="newPassword"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
                <Form.Label htmlFor="newPassword">Password</Form.Label>
              </Form.Group>
              <Button type="submit" className="auth-btn register-btn w-100">
                Create Account
              </Button>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer className="auth-footer">
          {mode !== "admin" && (
            <span onClick={() => setMode("admin")}>🔑 Admin Login</span>
          )}
          {mode !== "user" && (
            <span onClick={() => setMode("user")}>👤 User Login</span>
          )}
          {mode !== "register" && (
            <span onClick={() => setMode("register")}>New User</span>
          )}
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default AuthModal;
