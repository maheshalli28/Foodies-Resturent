import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css'; // Optional for styles
import './FadeInSection';
import FadeInSection from './FadeInSection';

const About = () => {
  return (
    <section className="py-5  " id="about">
      <div className="container">
        <div className="row align-items-center gy-4">

          {/* Left: Grid of 4 Images */}
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6">
                <FadeInSection animation="animate__fadeInUp">
                <img src="/assets/image3.png" alt="img1" className="img-fluid " style={
                  { height: '250px',width:'300px', objectFit: 'cover' }
                } />
                </FadeInSection>
              </div>
              <div className="col-6">
                <FadeInSection animation='animate__fadeInUp'>
                <img src="/assets/image2.png" alt="img2" className="img-fluid  mt-5" 
                style={{
                  height: '200px', objectFit: 'cover' 
                }}/>
                </FadeInSection>
              </div>
              <div className="col-6 pt-0 ps-5">
                <FadeInSection animation='animate__fadeInUp'>
                <img src="/assets/image1.png" alt="img3" className="img-fluid me-0 pe-0" style={{
                  height: '180px',width:'180px', objectFit: 'cover'}  }/>
                  </FadeInSection>
              </div>
              <div className="col-6">
                <FadeInSection animation='animate__fadeInUp'>
                <img src="/assets/image4.png" alt="img4" className="img-fluid " 
                style={
                  { height: '250px',width:'300px', objectFit: 'cover' }}/>
                  </FadeInSection>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="content-section col-lg-6">
            <h5 className="text-danger fw-semibold mb-2">About Us</h5>
            <FadeInSection animation='animate__fadeInUp'>
            <h2 className="fw-bold mb-4">
              Welcome to <span className="text-danger">Foodie's</span>
            </h2>
           
            <p className="mb-3 text-muted">
               <span className='fs-5 fw-bold'>Y</span>our go to destination for heartwarming meals and unforgettable flavors. 
              We take pride in serving a wide variety of dishes from traditional Indian breakfasts to rich, flavorful lunches and comforting dinners. 
              Every plate is made with fresh ingredients, authentic recipes, and a generous touch of love.
            </p>
            <p className="mb-5 text-muted">
              Whether you're craving something spicy, soulful, or simply satisfying, 
              Foodies is here to delight your taste buds in a cozy, welcoming atmosphere. 
              Come hungry, leave happy because at Foodies, every meal feels like home.
            </p>
             </FadeInSection>
            {/* Stats */}
            <div className="d-flex align-items-center mb-5 gap-5">
              <div className="border-end pe-4">
                <h2 className="text-danger fw-bold mb-0">| 10</h2>
                <small className="text-muted">Years of <strong>EXPERIENCE</strong></small>
              </div>
              <div>
                <h2 className="text-danger fw-bold mb-0">| 25</h2>
                <small className="text-muted">Popular <strong>MASTER CHEFS</strong></small>
              </div>
            </div>

            <button className="btn btn-danger text-white fw-semibold px-4 py-2 rounded-pill">READ MORE</button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
