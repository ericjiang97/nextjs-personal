import React from 'react';
import moment from 'moment';

import PageLayout from '../../../containers/layouts/PageLayout';
import SITE_CONFIG from '../../../config';
import { Container, Divider, Heading, Paragraph, Stack, Text } from 'bumbag';
import LinkButton from '../../../components/buttons/LinkButton';
import HeroBase from '../../../components/core/HeroBase';
import { InferGetStaticPropsType } from 'next';
import { FrontMatterAlbum } from '../../../layouts/album-page';

export const getStaticProps = async () => {
  // getposts & context from folder
  const albums = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);
    console.log(values);

    return keys.map((key, index) => {
      console.log(key);
      // Create slug from filename
      const filePath = key.split('/');
      const slug = filePath[filePath.length - 1].replace('.mdx', '');

      const value = values[index] as any;

      return {
        slug,
        frontmatter: value.frontMatter as FrontMatterAlbum,
      };
    });
  })(require.context('./', true, /\.mdx$/)).sort((a, b) => {
    if (moment(a.frontmatter.date).isAfter(moment(b.frontmatter.date))) {
      return -1;
    }
    return 1;
  });

  return {
    props: {
      allAlbums: albums,
    },
  };
};
const bgColor = '#09203399';

function PhotosPage({ allAlbums }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(allAlbums);
  return (
    <PageLayout
      title="Photos"
      pageMeta={{
        description:
          "I love travelling, taking and editing photos in my spare time. Here's a couple of albums that I reckon look amazing, feel free to download these images and use them as your wallpaper.",
        endpoint: '/photos',
        imageUrl: 'https://live.staticflickr.com/65535/48812674842_0090bc752e_c_d.jpg',
      }}
      banner={
        <HeroBase backgroundImage="url(https://live.staticflickr.com/65535/49836502853_a863b15543_k_d.jpg)">
          <Heading use="h3" marginY="1rem">
            Photography
          </Heading>
          <Paragraph marginY="1rem">
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
        </HeroBase>
      }
      isChildrenPadded={false}
    >
      <Container padding="0.25rem 0.5rem">
        {allAlbums.map((album, index) => {
          const { frontmatter, slug } = album;
          const { title, subheading, albumImage } = frontmatter;
          return (
            <a key={index} href={`/albums/${slug}`}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 500,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'none',
                  color: 'white',
                  backgroundImage: `linear-gradient(to top, ${bgColor}, ${bgColor}), url(${albumImage})`,
                }}
              >
                <Container maxWidth="75%" textAlign="center">
                  <Heading use="h4" marginY="0.5rem">
                    {title}
                  </Heading>
                  <Divider />
                  <Heading use="h6" marginY="0.5rem">
                    {subheading}
                  </Heading>
                </Container>
              </div>
            </a>
          );
        })}
      </Container>
    </PageLayout>
  );
}

export default PhotosPage;
