import { Container, Heading, Image, Paragraph, Text } from 'bumbag';
import React from 'react';
import HeroBase from '../components/core/HeroBase';
import PageLayout from '../containers/layouts/PageLayout';

const Strike: React.FC<{ children: string }> = ({ children }) => {
  return <Text style={{ textDecoration: 'line-through' }}>{children}</Text>;
};

export default function Custom404() {
  return (
    <PageLayout
      title="404"
      pageMeta={{ description: '404: Droids Not found' }}
      banner={
        <HeroBase backgroundVariant="color" backgroundColor="primary600">
          <Container paddingY="2rem" display="flex" flexDirection="column" alignItems="center">
            <Heading use="h3">
              404 - <Strike>Droids</Strike> Page Not Found
            </Heading>
            <Image width="100%" src="/images/hello_there.webp" marginTop="1rem" />
            <Heading use="h4" marginTop="2rem">
              Hello there. <Strike>These are not the droids</Strike> This is not the page, you are looking for.
            </Heading>
            <Paragraph>
              What are you doing?? Either you're here by accident... or are you trying to find hidden features? 🤔
            </Paragraph>
          </Container>
        </HeroBase>
      }
    ></PageLayout>
  );
}
