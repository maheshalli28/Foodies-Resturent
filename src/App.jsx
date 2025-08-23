import React, { useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import RestaurantNavbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Features from "./components/Features.jsx";
import Contact from "./components/Contact.jsx";

import "./App.css";

// 🔄 Lazy load components
const Menu = lazy(() => import("./components/Menu.jsx"));
const AdminDashboard = lazy(() => import("./components/Admin.jsx"));
const AuthModal = lazy(() => import("./components/AuthModal.jsx"));
const CartPage = lazy(() => import("./components/Cart.jsx"));

// Wrapper to use useLocation
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const location = useLocation();

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const AdminRoute = ({ children }) => {
    if (!user || user.role !== "admin") {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <>
      <RestaurantNavbar
        user={user}
        onLoginClick={() => setShowAuth(true)}
        onLogoutClick={handleLogout}
      />

      {/* 🔃 Suspense fallback while loading */}
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Menu cartItems={cartItems} setCartItems={setCartItems} />
                <About />
                <Features />
                <Contact />
              </>
            }
          />

          <Route
            path="/cart"
            element={
              <>
                <CartPage cartItems={cartItems} setCartItems={setCartItems} />
                <Contact />
              </>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>

        {/* Auth Modal (lazy-loaded) */}
        {showAuth && (
          <AuthModal
            show={showAuth}
            onClose={() => setShowAuth(false)}
            onLogin={handleLogin}
          />
        )}
      </Suspense>
    </>
  );
}

export default AppWrapper;
