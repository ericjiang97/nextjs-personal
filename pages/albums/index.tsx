import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';
import { Heading, Stack, Paragraph, Card, Image, Container } from 'bumbag';

import LinkButton from '../../components/buttons/LinkButton';
import HeroBase from '../../components/core/HeroBase';
import PageLayout from '../../containers/layouts/PageLayout';

import { getAlbumContent } from '../../utils/prismic';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import { PrismicFeaturedImage } from '../../types/PrismicBlogPost';

interface AlbumHomeProps {
  posts: ApiSearchResponse;
}

interface Album {
  title: RichTextBlock[];
  author: RichTextBlock[];
  description?: RichTextBlock[];
  featured_image: PrismicFeaturedImage;
}

export const getStaticProps = async () => {
  const posts = await getAlbumContent();
  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
};

export default function AlbumHome(props: AlbumHomeProps) {
  return (
    <PageLayout
      title={'Albums - Home'}
      pageMeta={{
        endpoint: '/albums',
      }}
      banner={
        <HeroBase backgroundImage="url(https://live.staticflickr.com/65535/49836502853_dd2b878f7b_b.jpg)">
          <Heading use="h3">Albums</Heading>
        </HeroBase>
      }
    >
      <Stack>
        {props.posts.results.map((post) => {
          const { uid, data } = post;
          if (uid) {
            console.log(uid, data);
            const res = data as Album;
            return (
              <Card standalone>
                <Card.Title>{RichText.asText(res.title)}</Card.Title>
                <Card.Content marginTop="1rem">
                  {res.featured_image && (
                    <Container display="flex" justifyContent="center" width="100%">
                      <Image src={res.featured_image.url} alt={res.featured_image.alt} height="280px" />
                    </Container>
                  )}
                  {res.description && <Paragraph>{RichText.asText(res.description)}</Paragraph>}
                </Card.Content>
                <Card.Footer>
                  <LinkButton href={`/albums/${uid}`}>View Album</LinkButton>
                </Card.Footer>
              </Card>
            );
          }
        })}
      </Stack>
    </PageLayout>
  );
}
