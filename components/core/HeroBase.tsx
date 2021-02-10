import React from 'react';
import { Container, styled } from 'bumbag';

import { HeroBaseProps } from './HeroBaseTypes';

const HeroBase: React.FC<HeroBaseProps> = ({ children, height = '600px', textColor = 'white', ...props }) => {
  const bgColor = '#09203399';

  if (props.backgroundVariant === 'color') {
    return (
      <Container
        minWidth="100%"
        maxWidth="100%"
        height={height}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        backgroundColor={props.backgroundColor}
        color={textColor}
      >
        <Container breakpoint="desktop" paddingX="1.5rem">
          {children}
        </Container>
      </Container>
    );
  }
  const actualTextColor = props.backgroundImageUri ? 'white' : textColor || 'black';

  const HeroBaseContainer = styled.div`
    width: 100%;
    max-width: 100%;
    height: ${height};
    background-image: ${props.backgroundImageUri &&
    `linear-gradient(to top, ${bgColor}, ${bgColor}), url('${props.backgroundImageUri}')`};
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
