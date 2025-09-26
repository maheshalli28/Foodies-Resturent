import React, { useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import RestaurantNavbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Features from "./components/Features.jsx";
import Contact from "./components/Contact.jsx";
import AdminDashboard from "./components/Admin.jsx";
import Login from "./components/Login.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import "./App.css";

// 🔄 Lazy load components
const Menu = lazy(() => import("./components/Menu.jsx"));

const CartPage = lazy(() => import("./components/Cart.jsx"));
const ConfirmOrder = lazy(() => import("./components/ConfirmOrder.jsx"));
const OrderOverview = lazy(() => import("./components/OrderOverview.jsx"));

// Wrapper to use Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const { user, loading } = useAuth();
  


  return (
    <>
      <RestaurantNavbar cartItems={cartItems} />

      {/* 🔃 Suspense fallback while loading */}
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <Features />
                <Contact />
              </>
            }
          />
          <Route path="/menu" element={
            <>
              <Menu cartItems={cartItems} setCartItems={setCartItems} />
              <Contact />
            </>
          } />

          <Route path="/cart" element={
              <>
                <CartPage cartItems={cartItems} setCartItems={setCartItems} />
                <Contact />
              </>
            }
          />


          {/* Separate Confirm Order page */}
          <Route path="/confirm-order" element={
            <>
              <ConfirmOrder />
              <Contact />
            </>
          } />

          <Route path="/login" element={<Login />} />

          <Route path="/order-overview" element={
            <>
              <OrderOverview />
              <Contact />
            </>
          } />

          {/* Admin protected route */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />

          </Routes>

      </Suspense>
    </>
  );
}

export default AppWrapper;
