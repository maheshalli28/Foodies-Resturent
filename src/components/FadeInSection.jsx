// src/components/FadeInSection.jsx
import React, { useRef, useEffect, useState } from 'react';
import 'animate.css';

const FadeInSection = ({ children, animation = 'animate__fadeIn' }) => {
  const ref = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`animate__animated ${
        isVisible ? animation : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
