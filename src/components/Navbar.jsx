import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";

const RestaurantNavbar = ({ user, onLoginClick, onLogoutClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false); // Control navbar toggle

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeNavbar = () => setExpanded(false); // Helper to close menu

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className={`py-2 w-100 ${scrolled ? 'bg-dark shadow-sm' : ''}`}
      style={{
        transition: 'background 0.3s ease-in-out',
        zIndex: 1000,
        backgroundColor: scrolled ? '#0b0c2aff' : '#0f1b2eff',
      }}
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={closeNavbar}
          style={{
            fontFamily: 'Lucida Handwriting, cursive',
            color: '#fff',
            fontSize: '1.8rem',
            letterSpacing: '2px',
          }}
        >
          Foodie's
        </Navbar.Brand>

        {/* Toggle */}
        <Navbar.Toggle
          aria-controls="navbarNav"
          className="text-light border-light"
        >
          <MdOutlineRestaurantMenu size={28} />
        </Navbar.Toggle>

        {/* Nav Links */}
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto d-flex align-items-center gap-3 text-center">
            <Nav.Link as={Link} to="/" className="text-light" onClick={closeNavbar}>
              Home
            </Nav.Link>
            <Nav.Link href="#menu" className="text-light" onClick={closeNavbar}>
              Menu
            </Nav.Link>
            <Nav.Link href="#about" className="text-light" onClick={closeNavbar}>
              About
            </Nav.Link>

            {/* Cart */}
            <Nav.Link as={Link} to="/cart" className="text-light" onClick={closeNavbar}>
              <IoBagHandleOutline size={22} />
            </Nav.Link>

            {/* Admin Access */}
            {user?.role === "admin" && (
              <Nav.Link as={Link} to="/admin" onClick={closeNavbar}>
                <button className="btn btn-warning btn-sm px-3 py-1">
                  Admin
                </button>
              </Nav.Link>
            )}

            {/* Logged-in User */}
            {user ? (
              <>
                {user.role === "user" && (
                  <span className="text-light d-flex align-items-center gap-1">
                    <FaUserCircle /> {user.email}
                  </span>
                )}
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => {
                    onLogoutClick();
                    closeNavbar();
                  }}
                >
                  Sign Out <GoSignOut />
                </button>
              </>
            ) : (
              <button
                className="btn btn-danger btn-sm px-3 py-1"
                onClick={() => {
                  onLoginClick();
                  closeNavbar();
                }}
              >
                Sign In
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default RestaurantNavbar;
