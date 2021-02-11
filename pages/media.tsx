import React from 'react';

import { Columns, Container, Heading, Paragraph, Text } from 'bumbag';

import BackgroundLinkCard from '../components/cards/BackgroundLinkCard';
import HeroBase from '../components/core/HeroBase';

import PageLayout from '../containers/layouts/PageLayout';

export default function Media() {
  return (
    <PageLayout
      title="Media"
      pageMeta={{
        description: '',
      }}
      banner={
        <HeroBase backgroundVariant="color" backgroundColor="primary600">
          <Heading use="h3">Media</Heading>
          <Paragraph marginY="1.25rem"></Paragraph>
        </HeroBase>
      }
    >
      <Columns>
        <Columns.Column>
          <BackgroundLinkCard imageUrl="/downloads/wallpapers/himeji-castle-1/preview.webp" href="/wallpapers">
            <Container
              border="1px solid white"
              width="75%"
              height="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="400" fontWeight="semibold">
                Wallpapers
              </Text>
            </Container>
          </BackgroundLinkCard>
        </Columns.Column>
      </Columns>
    </PageLayout>
  );
}
