import React from 'react';

import PhotoAlbumCard from '../../components/cards/PhotoAlbumCard';
import PageLayout from '../../containers/layouts/PageLayout';
import SITE_CONFIG from '../../config';
import { photos } from '../../data/photos';
import { Container, Heading, Paragraph, Stack, Text, Button } from 'bumbag';

const PhotosPage: React.FC = () => {
  return (
    <PageLayout title="Photos">
      <Heading use="h3">Photography</Heading>
      <Paragraph>
        I love travelling, taking and editing photos in my spare time. Here's a couple of albums that I reckon look
        amazing, feel free to download these images and use them as your wallpaper.
      </Paragraph>
      <Heading use="h4" marginTop="0.5rem">
        Follow me
      </Heading>
      <Stack orientation="horizontal">
        <a href={SITE_CONFIG.social.INSTAGRAM} rel="noreferrer noopener" target="_blank">
          <Button iconBefore="brand-instagram" palette="primary" variant="outlined"> Instagram
          </Button>
        </a>
        <a href={SITE_CONFIG.social.FLICKR} rel="noreferrer noopener" target="_blank">
          <Button iconBefore="brand-flickr" palette="primary" variant="outlined"> Flickr
          </Button>
        </a>
      </Stack>
      <Text fontSize="0.6rem" marginTop="0.7rem">
        Images and Media Work are licensed under Creative-Commons Attribution-NonCommercial License unless otherwise
        stated.
      </Text>
      <Container>
        <a href="https://creativecommons.org/licenses/by-nc/2.0/">
          <img src="https://licensebuttons.net/l/by-nc/3.0/88x31.png" />
        </a>
      </Container>
      <Stack orientation="horizontal" flexWrap="wrap">
        {photos.map((photo, index) => {
          const { date, imgUrl, albumTitle, albumUrl, description, tags, pdfUrl, albumId } = photo;
          return (
            <PhotoAlbumCard
              albumId={albumId}
              date={date}
              imgUrl={imgUrl}
              albumTitle={albumTitle}
              albumUrl={albumUrl}
              description={description}
              tags={tags}
              key={index}
              pdfUrl={pdfUrl}
            />
          );
        })}
      </Stack>
    </PageLayout>
  );
};

export default PhotosPage;
