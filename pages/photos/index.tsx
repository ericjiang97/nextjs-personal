import React from 'react';

import PhotoAlbumCard from '../../components/cards/PhotoAlbumCard';
import PageLayout from '../../containers/layouts/PageLayout';
import SITE_CONFIG from '../../config';
import { photos } from '../../data/photos';
import { Container, Heading, Paragraph, Stack, Text, styled } from 'bumbag';
import LinkButton from '../../components/LinkButton';

const PhotoPageLayoutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 0px;
  flex: 1;
`;

const PhotosPage: React.FC = () => {
  return (
    <PageLayout
      title="Photos"
      pageMeta={{
        description:
          "I love travelling, taking and editing photos in my spare time. Here's a couple of albums that I reckon look amazing, feel free to download these images and use them as your wallpaper.",
        endpoint: '/photos',
        imageUrl: 'https://live.staticflickr.com/65535/48812674842_0090bc752e_c_d.jpg',
      }}
      isChildrenPadded={false}
    >
      <PhotoPageLayoutContainer>
        <Container
          flex="1"
          padding="0.75rem 1.25rem"
          backgroundImage="linear-gradient(to top, #09203399, #09203399),  url('https://live.staticflickr.com/65535/49836502853_a863b15543_k_d.jpg')"
          backgroundRepeat="none"
          backgroundSize="cover"
          backgroundPosition="center center"
          color="white"
          minWidth="280px"
        >
          <Heading use="h3">Photography</Heading>
          <Paragraph>
            I love travelling, taking and editing photos in my spare time. Here's a couple of albums that I reckon look
            amazing, feel free to download these images and use them as your wallpaper.
          </Paragraph>
          <Heading use="h4" marginTop="0.5rem">
            Follow me
          </Heading>
          <Stack orientation="horizontal">
            <LinkButton href={SITE_CONFIG.social.INSTAGRAM} iconBefore="brand-instagram" palette="primary">
              Instagram
            </LinkButton>
            <LinkButton href={SITE_CONFIG.social.FLICKR} iconBefore="brand-flickr" palette="primary">
              Flickr
            </LinkButton>
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
        </Container>
        <Container flex="2" padding="0.75rem 1.25rem" paddingTop="0" overflowY="scroll" minWidth="280px">
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
        </Container>
      </PhotoPageLayoutContainer>
    </PageLayout>
  );
};

export default PhotosPage;
