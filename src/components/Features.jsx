// src/components/Features.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Features.css';
import 'animate.css';
import { FaUserTie, FaUtensils, FaShoppingCart, FaHeadset } from 'react-icons/fa';
import FadeInSection from './FadeInSection';

const Features = () => {
  return (
    <section className="py-3 mb-5 pb-5">
      <div className="container">
        <div className="row g-4">

          <div className="col-lg-3 col-md-6">
            <FadeInSection animation="animate__fadeInUp">
              <div className="text-dark text-center p-4 rounded shadow h-100 feature-card">
                <FaUserTie size={40} className="mb-3" />
                <h5 className="fw-bold">Master Chefs</h5>
                <p>“Crafted by experts, served with passion.”</p>
              </div>
            </FadeInSection>
          </div>

          <div className="col-lg-3 col-md-6">
            <FadeInSection animation="animate__fadeInUp">
              <div className="text-dark text-center p-4 rounded shadow h-100 feature-card">
                <FaUtensils size={40} className="mb-3" />
                <h5 className="fw-bold">Quality Food</h5>
                <p>“Fresh ingredients and Flawless flavors.”</p>
              </div>
            </FadeInSection>
          </div>

          <div className="col-lg-3 col-md-6">
            <FadeInSection animation="animate__fadeInUp">
              <div className="text-dark text-center p-4 rounded shadow h-100 feature-card">
                <FaShoppingCart size={40} className="mb-3" />
                <h5 className="fw-bold">Online Order</h5>
                <p>“Your favorite meal, just a click away.”</p>
              </div>
            </FadeInSection>
          </div>

          <div className="col-lg-3 col-md-6">
            <FadeInSection animation="animate__fadeInUp">
              <div className="text-dark text-center p-4 rounded shadow h-100 feature-card">
                <FaHeadset size={40} className="mb-3" />
                <h5 className="fw-bold">24/7 Service</h5>
                <p>“Serving you deliciousness, day and night.”</p>
              </div>
            </FadeInSection>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
