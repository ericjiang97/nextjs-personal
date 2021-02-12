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
          <BackgroundLinkCard
            imageUrl="https://photos.ericjiang.dev/uploads/medium/fe93e95c350eeafae2017a1857521d7d.jpg"
            href="https://photos.ericjiang.dev"
          >
            <Container
              border="1px solid white"
              width="75%"
              height="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="400" fontWeight="semibold">
                Photos
              </Text>
            </Container>
          </BackgroundLinkCard>
          <BackgroundLinkCard imageUrl="/images/gcp-juniordev-talk.webp" href="/talks">
            <Container
              border="1px solid white"
              width="75%"
              height="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="400" fontWeight="semibold">
                Tech Talks
              </Text>
            </Container>
          </BackgroundLinkCard>
          <BackgroundLinkCard href="https://linktr.ee/ericjiang97">
            <Container
              border="1px solid white"
              width="75%"
              height="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="400" fontWeight="semibold">
                Linktree
              </Text>
            </Container>
          </BackgroundLinkCard>
        </Columns.Column>
      </Columns>
    </PageLayout>
  );
}
