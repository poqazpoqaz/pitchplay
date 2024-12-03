import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainSection.css';

const MainSection = ({ gridArea }) => {
  const [activeImage, setActiveImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const images = [
    {
      src: 'team.jpg',
      alt: 'Image 1',
      link: '/social',
      text: '소셜',
      linkText: '소셜로 이동하기',
    },
    {
      src: '1.jpg',
      alt: 'Team',
      link: '/team',
      text: '팀',
      linkText: '팀으로 이동하기',
    },
    {
      src: 'team.jpg',
      alt: 'Gujang',
      link: '/reservation',
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

  return (
    <div className="main-section" style={{ gridArea: gridArea }} >
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
            <Link to={image.link} rel="noopener noreferrer">
              {image.linkText}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainSection;
