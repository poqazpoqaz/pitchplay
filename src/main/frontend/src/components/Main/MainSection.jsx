import React, { useState } from 'react';
import './MainSection.css';

const MainSection = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [setHoveredImage] = useState(null);
  const images = [
    {
      src: '1.jpg',
      alt: 'Image 1',
      link: 'https://example.com/1',
      text: '소셜',
      linkText: '소셜로 이동하기',
    },
    {
      src: 'team.jpg',
      alt: 'Team',
      link: 'https://example.com/team',
      text: '팀',
      linkText: '팀으로 이동하기',
    },
    {
      src: 'gujang.png',
      alt: 'Gujang',
      link: 'https://example.com/gujang',
      text: '구장',
      linkText: '구장으로 이동하기',
    },
  ];

  const handleClick = (index) => {
    if (activeImage === index) {
      setActiveImage(null);
    } else {
      setActiveImage(index);
    }
  };

  const handleHover = (index) => {
    setHoveredImage(index);
  };

  const handleLeave = () => {
    setHoveredImage(null);
  };

  const scrollToImage = (index) => {
    const imageElement = document.getElementById(`image-${index}`);
    if (imageElement) {
      imageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });


      setActiveImage(index);
    }
  };

  return (
    <div className="main-section">
      <div className="image-buttons">
        {images.map((_, index) => (
          <button
            key={index}
            className="image-nav-button"
            onClick={() => scrollToImage(index)}
          >
            {images[index].text}
          </button>
        ))}
      </div>

      {images.map((image, index) => (
        <div
          key={image.src}
          id={`image-${index}`}
          className={`image ${activeImage === index ? 'active' : ''}`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleHover(index)}
          onMouseLeave={handleLeave}
        >
          <img
            src={`/imgs/${image.src}`}
            alt={image.alt}
          />
          <div className={`text-overlay ${activeImage === index || activeImage === null ? 'show' : ''}`}>
            <span>{image.text}</span>
          </div>
          <div
            className={`link-overlay ${activeImage === index ? 'show' : ''}`}
          >
            <a href={image.link} target="_blank" rel="noopener noreferrer">
              {image.linkText}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainSection;