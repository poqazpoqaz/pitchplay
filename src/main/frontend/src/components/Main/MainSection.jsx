import React, { useState } from 'react';
import './MainSection.css';

const MainSection = () => {
  const [activeImage, setActiveImage] = useState(null); // 클릭된 이미지를 추적
  const [hoveredImage, setHoveredImage] = useState(null); // 호버된 이미지 추적
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
  ]; // 이미지와 링크 정보

  const handleClick = (index) => {
    if (activeImage === index) {
      setActiveImage(null); // 이미 클릭된 이미지를 다시 클릭하면 원래 상태로 돌아감
    } else {
      setActiveImage(index); // 클릭한 이미지만 확장
    }
  };

  const handleHover = (index) => {
    setHoveredImage(index); // 호버된 이미지 추적
  };

  const handleLeave = () => {
    setHoveredImage(null); // 호버에서 벗어나면 상태 초기화
  };

  const scrollToImage = (index) => {
    const imageElement = document.getElementById(`image-${index}`);
    if (imageElement) {
      imageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center', // 이미지가 화면의 중앙에 위치하도록
      });

      // 스크롤 후 해당 이미지를 active 상태로 설정
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
            onClick={() => scrollToImage(index)} // 버튼 클릭 시 해당 이미지로 스크롤 이동
          >
            {images[index].text} {/* 버튼 텍스트를 이미지의 text 속성으로 설정 */}
          </button>
        ))}
      </div>

      {images.map((image, index) => (
        <div
          key={image.src}
          id={`image-${index}`} // 각 이미지에 고유 id 추가
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
