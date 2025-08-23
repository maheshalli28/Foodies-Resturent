import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import './Contact.css'; // Optional for custom styling

const Contact = () => {
  return (
    <footer className="footer text-white mt-5 py-5 pt-5 pb-4" id='contact'>
      <div className="container">
        <div className="row g-5">
          {/* Company */}
          <div className="col-md-3">
            <h5 className="footer-title text-danger">Company</h5>
            <ul className="list-unstyled">
              <li><a href="#">› About Us</a></li>
              <li><a href="#">› Contact Us</a></li>
              <li><a href="#">› Reservation</a></li>
              <li><a href="#">› Privacy Policy</a></li>
              <li><a href="#">› Terms & Condition</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h5 className="footer-title text-danger">Contact</h5>
            <p><FaMapMarkerAlt className="me-2" />123 Street, New York, USA</p>
            <p><FaPhoneAlt className="me-2" />+012 345 67890</p>
            <p><FaEnvelope className="me-2" />info@example.com</p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaYoutube /></a>
              <a href="#" className="social-icon"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Opening */}
          <div className="col-md-3">
            <h5 className="footer-title text-danger">Opening</h5>
            <p className="mb-1">Monday - Saturday</p>
            <p>09AM - 09PM</p>
            <p className="mb-1">Sunday</p>
            <p>10AM - 08PM</p>
          </div>

          {/* Newsletter */}
          <div className="col-md-3">
            <h5 className="footer-title text-danger">Newsletter</h5>
            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
            <div className="input-group">
              <input type="email" className="form-control" placeholder="Your email" />
              <button className="btn btn-danger text-white">SIGNUP</button>
            </div>
          </div>
        </div>

        <hr className="border-top border-light mt-5" />

        <div className="row text-center text-md-start">
          <div className="col-md-6">
            <p className="mb-1">© Your Site Name, All Right Reserved. Designed By <a href="#" className="text-decoration-underline text-white">Alli Mahesh</a></p>
           
          </div>
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end gap-4 mt-3 mt-md-0">
            <a href="#" className="text-white text-decoration-none">Home</a>
            <a href="#" className="text-white text-decoration-none">Cookies</a>
            <a href="#" className="text-white text-decoration-none">Help</a>
            <a href="#" className="text-white text-decoration-none">FAQs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
