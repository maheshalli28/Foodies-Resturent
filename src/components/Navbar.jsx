import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";

import { useAuth } from '../context/AuthContext.jsx';

const RestaurantNavbar = ({ cartItems = [] }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeNavbar = () => setExpanded(false);

  // Calculate total items in cart
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

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
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={closeNavbar}
          style={{
            fontFamily: 'Charm',
            color: '#fff',
            fontSize: '1.8rem',
            letterSpacing: '2px',
          }}
        >
          Foodie's
        </Navbar.Brand >

        <Navbar.Toggle
          aria-controls="navbarNav"
          className="text-light border-0 "
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ImSpoonKnife size={24} /> : <MdOutlineRestaurantMenu size={28} />}
        </Navbar.Toggle>

        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto d-flex align-items-center gap-3 text-center">
            <Nav.Link as={Link} to="/" className="text-light" onClick={closeNavbar}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/menu" className="text-light" onClick={closeNavbar}>
              Menu
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" className="text-light position-relative" onClick={closeNavbar}>
              <IoBagHandleOutline size={22} />
              {totalCartItems > 0 && (
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.7rem', minWidth: '18px', height: '18px' }}
                >
                  {totalCartItems}
                </span>
              )}
            </Nav.Link>

            {user?.role === 'admin' && (
              <Nav.Link as={Link} to="/admin" className='text-light' onClick={closeNavbar}>
                Admin
              </Nav.Link>
            )}

            {user ? (
              <>
                <span className="text-light d-none d-md-inline">{user.name}</span>
                <button className="btn btn-outline-light btn-sm" onClick={() => { logout(); navigate('/'); }}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link className="btn btn-danger btn-sm text-white" to="/login" onClick={closeNavbar}>
                Sign In
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default RestaurantNavbar;

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { MdOutlineRestaurantMenu } from "react-icons/md";
// import { IoBagHandleOutline } from "react-icons/io5";
// import { GoSignOut } from "react-icons/go";
// import { FaUserCircle } from "react-icons/fa";
// import { ImSpoonKnife } from "react-icons/im";

// const RestaurantNavbar = ({ user, onLoginClick, onLogoutClick }) => {
//   const [scrolled, setScrolled] = useState(false);
//   const [expanded, setExpanded] = useState(false); // Control navbar toggle

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const closeNavbar = () => setExpanded(false); // Helper to close menu

//   return (
//     <Navbar
//       expand="lg"
//       fixed="top"
//       expanded={expanded}
//       onToggle={setExpanded}
//       className={`py-2 w-100 ${scrolled ? 'bg-dark shadow-sm' : ''}`}
//       style={{
//         transition: 'background 0.3s ease-in-out',
//         zIndex: 1000,
//         backgroundColor: scrolled ? '#0b0c2aff' : '#0f1b2eff',
//       }}
//     >
//       <Container>
//         {/* Brand */}
//         <Navbar.Brand
//           as={Link}
//           to="/"
//           onClick={closeNavbar}
//           style={{
//             fontFamily: 'Charm',
//             color: '#fff',
//             fontSize: '1.8rem',
//             letterSpacing: '2px',
//           }}
//         >
//           Foodie's
//         </Navbar.Brand>

//         {/* Toggle */}
//           <Navbar.Toggle
//             aria-controls="navbarNav"
//             className="text-light border-light"
//             onClick={() => setExpanded(!expanded)}
//           >
//             {expanded ? <ImSpoonKnife size={24} /> : <MdOutlineRestaurantMenu size={28} />}
//           </Navbar.Toggle>

//         <Navbar.Collapse id="navbarNav">
//           <Nav className="ms-auto d-flex align-items-center gap-3 text-center">
//             <Nav.Link as={Link} to="/" className="text-light" onClick={closeNavbar}>
//               Home
//             </Nav.Link>
//             <Nav.Link as={Link} to="/menu" className="text-light" onClick={closeNavbar}>
//               Menu
//             </Nav.Link>

//             {/* Cart */}
//             <Nav.Link as={Link} to="/cart" className="text-light" onClick={closeNavbar}>
//               <IoBagHandleOutline size={22} />
//             </Nav.Link>
//             <Nav.Link as={Link} to="/admin" className='text-light' onClick={closeNavbar}>
//               Admin
//             </Nav.Link>
            

//             {/* Logged-in User */}
//             {user ? (
//               <>
//                 {user.role === "user" && (
//                   <span className="text-light d-flex align-items-center gap-1">
//                     <FaUserCircle /> {user.email}
//                   </span>
//                 )}
//                 <Nav.Link as={Link} to="/login/user" className='text-light' onClick={closeNavbar}>
//                 <button
//                   className="btn btn-outline-light btn-sm"
//                   onClick={() => {
//                     onLogoutClick();
//                     closeNavbar();
//                   }}
//                 >
//                   Sign Out <GoSignOut />
//                 </button>
//                 </Nav.Link>
                
//               </>
//            ) : (

//             <Nav.Link as={Link} to="/login/user" className='text-light' onClick={closeNavbar}>
//                 <button
//                 className="btn btn-danger btn-sm px-3 py-1"
//                 onClick={() => {
//                   onLoginClick();
//                   closeNavbar();
//                 }}
//               >
//                 Sign In
//               </button>
//                 </Nav.Link>
              
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default RestaurantNavbar;
