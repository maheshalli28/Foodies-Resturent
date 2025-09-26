import React, { useState, useEffect } from "react";
import "./Menu.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoBagCheck } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiUrl, API_ENDPOINTS } from "../config/api";

const Menu = ({ cartItems, setCartItems }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Desserts"];

  // 🔹 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(getApiUrl(API_ENDPOINTS.PRODUCTS.LIST));
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Filter products by category
  const filteredItems =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // 🔹 Split into 2 columns
  const mid = Math.ceil(filteredItems.length / 2);
  const leftColumn = filteredItems.slice(0, mid);
  const rightColumn = filteredItems.slice(mid);

  // 🔹 Add item to cart with popup
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product._id);

      if (existingItem) {
        setPopupMessage(`${product.title} quantity updated`);
        return prevCart.map((item) =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        setPopupMessage(`${product.title} added to cart`);
        return [...prevCart, { ...product, id: product._id, quantity: 1 }];
      }
    });

    // Hide popup after 2s
    setTimeout(() => setPopupMessage(""), 2000);
  };

  // Calculate total items in cart
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <section className="menu-section py-5 min-vh-100" id="menu">
      <div className="container py-5">
        {/* 🔹 Title & Categories */}
        <div className="text-center mb-5">
          <h5 className="subtext text-danger fw-semibold">Food Menu</h5>
          <h2 className="display-5 fw-bold">Most Popular Items</h2>

          <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-1 fw-semibold ${
                  selectedCategory === cat
                    ? "text-danger border-bottom border-3 border-danger"
                    : "text-dark"
                }`}
                style={{ cursor: "pointer" }}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Menu Grid */}
        <div className="row">
          {[leftColumn, rightColumn].map((column, idx) => (
            <div key={idx} className="col-md-6">
              {column.map((product) => (
                <div
                  key={product._id}
                  className={`d-flex justify-content-between align-items-center border-bottom py-3 
                    ${product.status === false ? "opacity-50" : ""}`}
                >
                  {/* Left: Image + Title */}
                  <div className="d-flex align-items-center">
                    <img
                      src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                      alt={product.title}
                      className="rounded"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        filter: product.status === false ? "grayscale(50%)" : "none"
                      }}
                    />
                    <div className="ms-3">
                      <h6 className="fw-bold mb-1">{product.title}</h6>
                      <small className="text-muted fst-italic">
                        {product.desc || "A taste for every mood."}
                      </small>
                      {product.status === false && (
                        <div className="text-danger small fw-bold">Unavailable</div>
                      )}
                    </div>
                  </div>

                  {/* Right: Price + Add to Cart */}
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="text-danger fw-bold"
                      style={{ fontSize: "1.1rem" }}
                    >
                      ₹{product.price}
                    </div>
                    <button
                      className="btn btn-outline-success rounded-pill d-flex align-items-center gap-2"
                      onClick={() => addToCart(product)}
                      disabled={product.status === false}   // ✅ disable button
                    >
                      <IoBagCheck className="fs-5" />
                    </button>
                  </div>
                </div>
              ))}

            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Floating Cart Button */}
      {totalCartItems > 0 && (
        <button
          className="btn btn-danger position-fixed rounded-circle shadow-lg"
          style={{
            bottom: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}
          onClick={() => navigate('/cart')}
        >
          <IoBagHandleOutline size={24} />
          <span 
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
            style={{ fontSize: '0.7rem', minWidth: '20px', height: '20px' }}
          >
            {totalCartItems}
          </span>
        </button>
      )}

      {/* 🔹 Popup Message */}
      {popupMessage && (
        <div
          className="position-fixed top-0 end-0 mt-5 me-3 p-2 bg-success text-white rounded shadow"
          style={{ zIndex: 1000 }}
        >
          {popupMessage}
        </div>
      )}
    </section>
  );
};

export default Menu;
