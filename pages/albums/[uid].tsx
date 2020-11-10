import React from 'react';

import { RichText } from 'prismic-reactjs';
import { Container, Heading, Icon, Paragraph, styled } from 'bumbag';

import HeroBase from '../../components/core/HeroBase';

import PageLayout from '../../containers/layouts/PageLayout';
import Custom404 from '../404';

import { client } from '../../config/prismic';
import { getAlbumContent } from '../../utils/prismic';
import GalleryModal from '../../components/modals/GalleryModal';
import LinkButton from '../../components/buttons/LinkButton';
import StackedImageRow, { StackedImage } from '../../components/StackedImage';
import PrismicRichTextWrapper from '../../components/PrismicRichTextWrapper';

const HeadingContainer = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 0.75rem 0.9rem;
`;

export default function Post({ uid, data, error }: { uid: string; data: any; error: string }) {
  if (error) {
    return <Custom404 />;
  }
  const { title, preview } = data;

  const fullUri = `https://ericjiang.dev/albums/${uid}`;
  return (
    <PageLayout
      title={`Albums - ${RichText.asText(title)}`}
      ignoreHorizontalPadding={true}
      banner={
        <>
          {preview && (
            <Container
              backgroundColor="primary"
              color="white"
              width="100vw"
              maxWidth="100vw"
              paddingX="1rem"
              paddingY="1.5rem"
              display="flex"
              alignItems="center"
            >
              <Icon icon="solid-info-circle" marginRight="1.5rem" />
              <Paragraph marginTop="0">
                This is a <strong>preview</strong> article used for testing and sharing purposes, please DO NOT share
                this article until it has been published.
              </Paragraph>
            </Container>
          )}
          <HeroBase backgroundImage={`url('${data.featured_image && data.featured_image.url}')`}></HeroBase>
        </>
      }
      pageMeta={{
        endpoint: `/blog/${uid}`,
        imageUrl: data.featured_image && data.featured_image.url,
        description: data.description && RichText.asText(data.description),
      }}
    >
      <Container maxWidth="80vw">
        {data.body.map((slice: any, i: number) => {
          switch (slice.slice_type) {
            case 'title_and_description_':
              return (
                <Container display="flex" flexWrap="wrap" key={i}>
                  <HeadingContainer>
                    <Heading use="h3">{slice.primary.title1[0].text}</Heading>
                    {slice.primary.subheading[0] && (
                      <Heading use="h5" fontWeight="400" color="gray400" fontSize="1rem">
                        {slice.primary.subheading[0].text}
                      </Heading>
                    )}
                    {slice.primary.album_link && (
                      <Container marginY="0.75rem">
                        <LinkButton href={slice.primary.album_link.url} iconBefore="brand-flickr">
                          View Album on Flickr
                        </LinkButton>
                      </Container>
                    )}
                  </HeadingContainer>
                  <HeadingContainer>
                    <Paragraph>{slice.primary.description1[0].text}</Paragraph>
                  </HeadingContainer>
                </Container>
              );
            case 'image_gallery':
              const galleryContent = slice.items.map((image: any) => {
                return {
                  source: {
                    regular: image.gallery_image.url,
                  },
                  caption: image.image_captions[0] && image.image_captions[0].text,
                };
              });
              return <GalleryModal images={galleryContent} key={i} />;
            case 'text':
              return <PrismicRichTextWrapper richText={slice.primary.text} />;
            case 'image_stack':
              return <StackedImageRow images={slice.items as StackedImage[]} />;
            default:
              return null;
          }
        })}
      </Container>
      <Container>
        <LinkButton iconBefore="brand-facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${fullUri}`}>
          Share on Facebook
        </LinkButton>
        <LinkButton
          iconBefore="brand-twitter"
          href={`https://twitter.com/intent/tweet?text=Check out this album by Eric Jiang! ${fullUri}`}
        >
          Tweet this
        </LinkButton>
      </Container>
    </PageLayout>
  );
}

export async function getStaticProps({ params }: { params: { uid: string } }) {
  const { uid } = params;
  console.log(uid);
  const document = await client.getByUID('album', uid, {});
  if (!document) {
    return {
      props: {
        error: 'Not Found',
      },
    };
  }

  return {
    props: { uid, data: document.data },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const documents = await getAlbumContent();
  const paths = documents.results.map((post) => {
    return { params: { uid: post.uid } };
  });
  return {
    paths,
    fallback: 'blocking',
  };
}
