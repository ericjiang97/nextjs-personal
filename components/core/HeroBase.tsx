import React from 'react';
import { Container, styled } from 'bumbag';

export interface HeroBaseProps {
  backgroundImage?: string;
  height?: string;
  textColor?: string;
}

const HeroBase: React.FC<HeroBaseProps> = ({ children, backgroundImage, height = '600px', textColor }) => {
  const bgColor = '#09203399';

  const actualTextColor = backgroundImage ? 'white' : textColor || 'black';

  const HeroBaseContainer = styled.div`
    width: 100%;
    max-width: 100%;
    height: ${height};
    background-image: ${backgroundImage && `linear-gradient(to top, ${bgColor}, ${bgColor}), ${backgroundImage}`};
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    color: ${actualTextColor};
  `;

  return (
    <HeroBaseContainer>
      <Container breakpoint="desktop">{children}</Container>
    </HeroBaseContainer>
  );
};

export default HeroBase;
