import React from 'react';

import { Container } from 'bumbag';

import { HeroBaseProps } from './HeroBaseTypes';

const HeroBase: React.FC<HeroBaseProps> = ({ children, height = '600px', textColor = 'white', ...props }) => {
  if (props.backgroundVariant === 'color') {
    return (
      <Container
        minWidth="100%"
        maxWidth="100%"
        minHeight={height}
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

  return (
    <Container
      width="100%"
      maxWidth="100vw"
      height={height}
      maxHeight={height}
      backgroundImage={`url(${props.backgroundImageUri})`}
      backgroundSize="cover"
      backgroundPosition="center"
      color={textColor}
    >
      <Container
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        background="rgba(0,0,0,0.3)"
        width="100%"
        height="100%"
        margin="0px"
        maxWidth="100%"
        maxHeight="100%"
      >
        <Container breakpoint="desktop">{children}</Container>
      </Container>
    </Container>
  );
};

export default HeroBase;
