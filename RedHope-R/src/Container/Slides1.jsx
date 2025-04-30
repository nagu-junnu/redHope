import React, { useState, useEffect } from "react";
 

const images = [
  "../1.jpeg",
  "../2.jpeg",
  "../3.jpeg",
  "../4.jpeg",
  "../6.jpeg",
  "../7.jpeg",
];

const Slides1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-container-01">
      <button className="prev-btn" onClick={prevSlide}>❮</button>
      <img src={images[currentIndex]} alt="Slide" className="slide-image" />
      <button className="next-btn" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default Slides1;
