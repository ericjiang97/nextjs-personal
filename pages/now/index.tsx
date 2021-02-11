import { Container, Heading, Link, List, ListItem, Paragraph } from 'bumbag';
import React from 'react';
import HeroBase from '../../components/core/HeroBase';
import PageLayout from '../../containers/layouts/PageLayout';

// This function must be named otherwise it disables Fast Refresh.
const NowPage: React.FC = () => {
  return (
    <PageLayout
      title={'Now'}
      pageMeta={{
        endpoint: '/now',
        description: 'Now Page! :)',
      }}
      banner={
        <HeroBase backgroundVariant="color" backgroundColor="primary">
          <Heading use="h3">Now</Heading>
          <Heading use="h6" fontWeight="400" marginY="1.25rem">
            Last Updated: 8th October 2020
          </Heading>
        </HeroBase>
      }
    >
      <Container>
        <Paragraph marginY="1.5em">
          I’m currently still in Melbourne, Australia, although I’m planning for a relocation soon.
        </Paragraph>
        <Paragraph marginY="1.5rem">
          I’m currently working as a Test Engineer at <Link href="https://about.google/">Google</Link> within the Pixel
          Team, just working on Automation Test Tooling and Infrastructure.
        </Paragraph>
        <Paragraph marginY="1.5rem">
          In my spare time, I take and edit <Link href="/photos">photos</Link>, making{' '}
          <Link href="/wallpapers">wallpapers</Link> and{' '}
          <Link href="https://steamcommunity.com/id/lorderikir">playing games</Link>. I've been recently obsessed with
          flight simulators such as X-Plane and MSFS.
        </Paragraph>
      </Container>
      <Container>
        <Heading use="h4" marginY="1.75rem">
          Listening to
        </Heading>

        <Heading use="h5" marginY="1.75rem">
          Podcasts
        </Heading>
        <Paragraph>Currently not listening to any podcasts.</Paragraph>
        <Heading use="h5" marginY="1.75rem">
          Music
        </Heading>
        <List listStyleType="disc" listStylePosition="inside">
          <ListItem>
            A custom playlist I've made:{' '}
            <Link href="https://music.youtube.com/playlist?list=PLOzcfvWqaYaw7I7kVC0WgR-Ybf46w9pXm">
              Best Pop - Try not to React
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://bandcamp.materiacollective.com/album/hollow-knight-piano-collections">
              Hollow Knight Piano Collections
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://uma.lnk.to/HisaishiDreamSongs">Dream Songs: The Essential Joe Hisaishi</Link>
          </ListItem>
        </List>
      </Container>
      <Container>
        <Heading use="h4" marginY="1.75rem">
          Playing
        </Heading>
        <List listStyleType="disc" listStylePosition="inside">
          <ListItem>
            <Link href="https://store.steampowered.com/app/945360/Among_Us/">Among Us</Link>
          </ListItem>
          <ListItem>
            <Link href="https://store.steampowered.com/app/269950/XPlane_11/">X-Plane 11</Link>
          </ListItem>
          <ListItem>
            <Link href="https://store.steampowered.com/app/359550/Tom_Clancys_Rainbow_Six_Siege/">
              Tom Clancy's: Rainbow Six Siege
            </Link>
          </ListItem>
        </List>
      </Container>
    </PageLayout>
  );
};

export default NowPage;
