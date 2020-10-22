import Prismic from 'prismic-javascript';
import moment from 'moment';

import { RichText } from 'prismic-reactjs';

import { Card, Heading, Image, Stack, Paragraph } from 'bumbag';
import LinkButton from '../../../components/buttons/LinkButton';
import HeroBase from '../../../components/core/HeroBase';
import PageLayout from '../../../containers/layouts/PageLayout';

import { client } from '../../../config/prismic';

export default function BlogHome(props: any) {
  return (
    <PageLayout
      title={'Blog'}
      pageMeta={{
        description: 'Blog',
        endpoint: '/blog',
      }}
      banner={
        <HeroBase backgroundImage="url(https://live.staticflickr.com/65535/49836502853_dd2b878f7b_b.jpg)">
          <Heading use="h3">Blog</Heading>
        </HeroBase>
      }
    >
      <Stack>
        {props.posts.results.map((post: { uid: string; data: any }) => {
          const { uid, data } = post;
          const { title, published_time, summary } = data;
          return (
            <Card standalone key={uid}>
              {data.banner && (
                <Image src={data.banner.url} alt={`cover image for ${RichText.asText(title)}`} width="100%" />
              )}
              <Card.Header flexDirection="column" alignItems="start">
                <Card.Title fontPalette="primary">{RichText.asText(title)}</Card.Title>
              </Card.Header>
              <Card.Content>
                <Heading use="h7">{moment(published_time).format('ddd Do MMM YYYY')}</Heading>
                <Paragraph>{RichText.asText(summary)}</Paragraph>
              </Card.Content>
              <Card.Footer>
                <LinkButton href={`/v2/blog/${uid}`}>Read Article</LinkButton>
              </Card.Footer>
            </Card>
          );
        })}
      </Stack>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const posts = await client.query(Prismic.Predicates.at('document.type', 'blog-post'), {
    orderings: '[my.post.date desc]',
  });
  return {
    props: {
      posts,
    },
  };
}
