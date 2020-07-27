import React from 'react';
import { Container, styled } from 'bumbag';

export interface HeroBaseProps {
  backgroundImage?: string;
}

const HeroBase: React.FC<HeroBaseProps> = ({ children, backgroundImage }) => {
  const bgColor = '#09203399';
  console.log(backgroundImage, bgColor);

  const HeroBaseContainer = styled.div`
    width: 100vw;
    max-width: 100vw;
    height: 600px;
    background-image: linear-gradient(to top, ${bgColor}, ${bgColor}), ${backgroundImage};
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    color: white;
  `;

  return (
    <HeroBaseContainer>
      <Container breakpoint="desktop">{children}</Container>
    </HeroBaseContainer>
  );
};

export default HeroBase;
