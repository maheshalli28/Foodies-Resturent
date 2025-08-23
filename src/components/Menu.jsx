import React, { useState, useEffect } from 'react';
import './Menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoBagCheck } from "react-icons/io5";

const menuItems = [
  {
    id: 1,
    title: 'Omelette',
    desc: 'Tasty breakfast option',
    image: '/assets/omelette.png',
    price: 99,
    category: 'Breakfast',
  },
  {
    id: 2,
    title: 'Dosa',
    desc: 'Light and Tasty option',
    image: '/assets/Dosa.png',
    price: 150,
    category: 'Breakfast',
  },
  {
    id: 3,
    title: 'Mutton Biryani',
    desc: 'Spicy and flavorful',
    image: '/assets/Mutton.png',
    price: 139,
    category: 'Lunch',
  },
  {
    id: 4,
    title: 'Malai Tikka',
    desc: 'Creamy grilled chicken',
    image: '/assets/Malai.png',
    price: 235,
    category: 'Dinner',
  },
  {
    id: 5,
    title: 'Idli & Sambar',
    desc: 'A South Indian staple.',
    image: '/assets/Idli.png',
    price: 199,
    category: 'Breakfast',
  },
  {
    id: 6,
    title: 'Chicken Shawarma',
    desc: 'Wrapped flavor on the go.',
    image: '/assets/Chicken-Shawarma.png',
    price: 299,
    category: 'Dinner',
  },
  {
    id: 7,
    title: 'Aloo Paratha',
    desc: 'Stuffed flatbread with curd or butter',
    image: '/assets/Aloo-Paratha.png',
    price: 90,
    category: 'Breakfast',
  },
  {
    id: 8,
    title: 'Curd Rice',
    desc: 'Cool, calm, and comforting.',
    image: '/assets/Curd.png',
    price: 150,
    category: 'Lunch',
  },
  {
    id: 9,
    title: 'Grilled Fish',
    desc: 'Where spice meets silky smoothness',
    image: '/assets/Fish.png',
    price: 139,
    category: 'Lunch',
  },
  {
    id: 10,
    title: 'Chicken Curry',
    desc: 'Classic comfort & fiery soul',
    image: '/assets/Chicken.png',
    price: 235,
    category: 'Dinner',
  },
  {
    id: 11,
    title: 'Paneer Pizza',
    desc: 'Cheesy veg pizza',
    image: '/assets/pizza.png',
    price: 199,
    category: 'Lunch',
  },
  {
    id: 12,
    title: 'Grilled Tikka',
    desc: 'Delicious chicken bites',
    image: '/assets/tikkag.png',
    price: 299,
    category: 'Dinner',
  },
];

const Menu = ({ cartItems, setCartItems }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [popupMessage, setPopupMessage] = useState('');

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner'];

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter(item => item.category === selectedCategory);

  const mid = Math.ceil(filteredItems.length / 2);
  const leftColumn = filteredItems.slice(0, mid);
  const rightColumn = filteredItems.slice(mid);

  // Add item to cart and show popup
  const addToCart = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        setPopupMessage(`${item.title} quantity updated`);
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        setPopupMessage(`${item.title} added to cart`);
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    // Hide message after 2 seconds
    setTimeout(() => setPopupMessage(''), 2000);
  };

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  return (
    <section className="menu-section py-5 min-vh-100" id="menu">
      <div className="container">
        {/* Title & Categories */}
        <div className="text-center mb-5">
          <h5 className="subtext text-danger fw-semibold">Food Menu</h5>
          <h2 className="display-5 fw-bold">Most Popular Items</h2>
          <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer ${
                  selectedCategory === cat ? 'text-danger border-bottom border-3 border-danger' : 'text-dark'
                } pb-1 fw-semibold`}
                style={{ cursor: 'pointer' }}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="row">
          {[leftColumn, rightColumn].map((column, colIdx) => (
            <div className="col-md-6" key={colIdx}>
              {column.map((item) => (
                <div
                  className="d-flex justify-content-between align-items-center border-bottom py-3"
                  key={item.id}
                >
                  {/* Left: Image + Title */}
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded"
                      style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                    />
                    <div className="ms-3">
                      <h6 className="fw-bold mb-1">{item.title}</h6>
                      <small className="text-muted fst-italic">{item.desc}</small>
                    </div>
                  </div>

                  {/* Right: Price + Add to Cart */}
                  <div className="d-flex align-items-center gap-3">
                    <div className="text-danger fw-bold" style={{ fontSize: '1.1rem' }}>
                      ₹{item.price}
                    </div>
                    <button
                      className="btn btn-outline-success border-1 rounded-pill d-flex align-items-center gap-2"
                      onClick={() => addToCart(item)}
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

      {/* ✅ Simple Popup Message */}
      {popupMessage && (
        <div
          className="position-fixed top-0 end-0 mt-5 me-0 p-1  "
          style={{ zIndex: 1000 }}
        >
          <p className='mt-3 bg-success text-white p-1'>{popupMessage }</p>
          
        </div>
      )}
    </section>
  );
};

export default Menu;
