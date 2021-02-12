import React, { useState } from 'react';

import { Container, Link } from 'bumbag';

interface BackgroundLinkCardProps {
  imageUrl?: string;
  href: string;
}

const BackgroundLinkCard: React.FC<BackgroundLinkCardProps> = ({ children, imageUrl, href }) => {
  const [hoverCard, setHoverCard] = useState(false);

  if (!imageUrl) {
    return (
      <Link href={href}>
        <Container backgroundColor="primary600" width="100%" minWidth="280px" height="300px" marginY="1rem">
          <Container
            background={hoverCard ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)'}
            width="100%"
            height="100%"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onMouseOver={() => {
              setHoverCard(true);
            }}
            onMouseOut={() => {
              setHoverCard(false);
            }}
          >
            {children}
          </Container>
        </Container>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <Container
        backgroundImage={`url(${imageUrl})`}
        backgroundSize="cover"
        backgroundPosition="center"
        width="100%"
        minWidth="280px"
        height="300px"
        marginY="1rem"
      >
        <Container
          background={hoverCard ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)'}
          width="100%"
          height="100%"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onMouseOver={() => {
            setHoverCard(true);
          }}
          onMouseOut={() => {
            setHoverCard(false);
          }}
        >
          {children}
        </Container>
      </Container>
    </Link>
  );
};

export default BackgroundLinkCard;
