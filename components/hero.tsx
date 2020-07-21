import React from 'react';

import { Container, Heading, Image, Paragraph } from 'bumbag';

const Hero = () => {
  return (
    <Container isFluid display="flex">
      <Container padding="0.5rem" flex={1} display="flex" flexDirection="column" justifyItems="center">
        <Heading use="h3" shrinkBelow="tablet">
          G'day, I'm Eric.
        </Heading>
        <Heading use="h5">I’m a Test Engineer at Google.</Heading>
        <Paragraph>
          In my spare time, I make impact by building awesome software solutions and building the communities around me.
        </Paragraph>
      </Container>
      <Container padding="0.5rem" flex={1} minWidth="280px">
        <Image src="/images/transparent_profile_min.png" alt="Eric" />
      </Container>
    </Container>
  );
};

export default Hero;
