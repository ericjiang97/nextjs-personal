import React from 'react';

import { RichText } from 'prismic-reactjs';
import { RichText as CustomRichText } from 'prismic-reactjs-custom';
import { Container, Heading, Image, Icon, Link, Paragraph, styled, Stack } from 'bumbag';

import HeroBase from '../../components/core/HeroBase';

import PageLayout from '../../containers/layouts/PageLayout';
import Custom404 from '../404';

import { client } from '../../config/prismic';
import { getAlbumContent } from '../../utils/prismic';
import GalleryModal from '../../components/modals/GalleryModal';
import LinkButton from '../../components/buttons/LinkButton';

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
              return (
                <CustomRichText
                  richText={slice.primary.text}
                  paragraph={(props: any) => {
                    return <Paragraph marginY="1.25rem" {...props} />;
                  }}
                  image={(props: any) => {
                    return <Image width="100%" src={props.src} alt={props.alt} {...props} />;
                  }}
                  hyperlink={(props: any) => {
                    return <Link {...props} />;
                  }}
                  preformatted={(props: any) => {
                    return (
                      <pre
                        style={{
                          maxWidth: '80vw',
                          overflowY: 'scroll',
                        }}
                      >
                        {props.children}
                      </pre>
                    );
                  }}
                  key={i}
                />
              );
            case 'image_stack':
              return (
                <Stack orientation="horizontal" width="100%" key={i}>
                  {slice.items.map((stackedImage: any, key: number) => {
                    console.log(stackedImage);
                    return (
                      <Container key={key}>
                        <Image src={stackedImage.stacked_image.url} width="100%" />

                        <CustomRichText
                          richText={stackedImage.image_stack_description}
                          paragraph={(props: any) => {
                            return <Paragraph marginY="1.25rem" fontSize="0.75rem" color="#777" {...props} />;
                          }}
                          image={(props: any) => {
                            return <Image width="100%" src={props.src} alt={props.alt} {...props} />;
                          }}
                          hyperlink={(props: any) => {
                            return <Link {...props} />;
                          }}
                        />
                      </Container>
                    );
                  })}
                </Stack>
              );
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
