import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.5s ease, opacity 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ isActive, isHovered }) => (isActive || isHovered ? '1' : '0.8')};
  width: ${({ isActive, isAnyActive }) =>
    isActive ? '70%' : isAnyActive ? '15%' : '33.3%'}; /* 초기에는 33.3% */
  height: 100%;
  z-index: ${({ isActive }) => (isActive ? '2' : '1')};

   @media (max-width: 786px) {
    object-fit : cover;
    height: ${({ isActive , isAnyActive }) => (isActive ? '60%' : isAnyActive ? '20%' : '33.3%')};
    width : 100%;
  }

  &:hover {
    opacity: 1;
  }
`;

const MainSectionWrapper = styled.div`
transition: flex-direction 0.5s ease, height 0.5s ease; 
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  overflow: hidden;
  min-width: 700px;

   @media (max-width: 786px) {
    flex-direction: column; /* 모바일에서는 세로 방향으로 변경 */
    height: auto; /* 높이를 내용에 맞게 조정 */
  }

`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 3.4rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  transition: opacity 0.3s ease;

  @media (max-width: 1024px) {
    font-size: 3.4rem;
  }
`;

const LinkOverlay = styled.div`
  position: absolute;
  color: white;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 5px;
  right: 0;
  bottom: 0;

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }
        @media (max-width : 768px) {
    font-size : 1.8rem;
    }
`;

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
      src: 'team.jpg',
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
  const isAnyActive = activeImage !== null;

  const handleClick = (index) => {
    setActiveImage(activeImage === index ? null : index);
  };

  const handleHover = (index) => {
    setHoveredImage(index);
  };

  const handleLeave = () => {
    setHoveredImage(null);
  };

  return (
    <MainSectionWrapper style={{ gridArea }}>
      {images.map((image, index) => (
        <ImageContainer
          key={image.src}
          isActive={activeImage === index}
          isHovered={hoveredImage === index}
          isAnyActive={isAnyActive}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleHover(index)}
          onMouseLeave={handleLeave}
        >
          <Image src={`/imgs/${image.src}`} alt={image.alt} />
          <TextOverlay isActive={activeImage === index || activeImage === null}>
            <span>{image.text}</span>
          </TextOverlay>
          <LinkOverlay isActive={activeImage === index}>
            <Link to={image.link} rel="noopener noreferrer">
              {image.linkText}
            </Link>
          </LinkOverlay>
        </ImageContainer>
      ))}
    </MainSectionWrapper>
  );
};

export default MainSection;
