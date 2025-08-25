// src/components/Home.jsx
import React from 'react';
import './Home.css';
import { FaCircleArrowRight } from "react-icons/fa6";

const menuItems = [
  { name: 'Pizza', img: '/src/assets/pizza.jpg' },
  { name: 'Pasta', img: '/src/assets/pasta.jpg' },
  { name: 'Biryani', img: '/src/assets/biryani.jpg' },
  { name: 'Malai Tikka', img: '/src/assets/tikka.jpg' },
  { name: 'Burger', img: '/src/assets/burger.jpg' }, // Add more items for smooth loop
  { name: 'Sushi', img: '/src/assets/sushi.jpg' }
];

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section id='home' className="hero">
        <div className="overlay">
          <h2 className="hero-title mt-5">
          Where <span className="text-danger">Taste</span> Feels<br />
          <span className="outlined-text ">Your original</span>
          <p className="hero-subtext mt-2 fs-4">Discover the best food in here..</p>
          <div className="hero-buttons d-flex justify-content-center gap-4 ">
          <button className=" btn btn-lg btn-danger border-2 rounded-5 mt-3 "><a className="text-decoration-none text-white" href='#menu'>Order Now</a></button>
          <button className=" btn btn-lg btn-outline-secondary  border-2 rounded-5 mt-3 text-light"><a className='text-white text-decoration-none' href='#about'>About </a> <FaCircleArrowRight className='me-'size={25} /></button>
          </div>
         </h2>
        </div>
      </section>
      
    </>
  );
};

export default Home;
