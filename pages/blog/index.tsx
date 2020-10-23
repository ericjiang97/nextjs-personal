import Prismic from 'prismic-javascript';
import moment from 'moment';

import { RichText } from 'prismic-reactjs';

import { Card, Heading, Image, Stack, Paragraph } from 'bumbag';
import LinkButton from '../../components/buttons/LinkButton';
import HeroBase from '../../components/core/HeroBase';
import PageLayout from '../../containers/layouts/PageLayout';

import { client } from '../../config/prismic';

const subtitle =
  "I occassionally write on my blog about tech, projects, reviews (and will add photography and travel in the future)... so here's some of them.";

export default function BlogHome(props: any) {
  return (
    <PageLayout
      title={'Blog'}
      pageMeta={{
        description: subtitle,
        endpoint: '/blog',
      }}
      banner={
        <HeroBase backgroundImage="url(https://live.staticflickr.com/65535/49836502853_dd2b878f7b_b.jpg)">
          <Heading use="h3">Blog</Heading>
          <Paragraph marginY="1rem">{subtitle}</Paragraph>
          <LinkButton href="/blog/feed" iconBefore="solid-rss">
            RSS Feed
          </LinkButton>
        </HeroBase>
      }
    >
      <Stack>
        {props.posts.results.map((post: { uid: string; data: any }) => {
          const { uid, data } = post;
          const { title, published_time, summary } = data;
          return (
            <Card standalone key={uid}>
              {data.banner.url && (
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
                <LinkButton href={`/blog/${uid}`}>Read Article</LinkButton>
              </Card.Footer>
            </Card>
          );
        })}
      </Stack>
    </PageLayout>
  );
}

export async function getServerSideProps() {
  const posts = await client.query(Prismic.Predicates.at('document.type', 'blog-post'), {
    orderings: '[my.blog-post.published_time desc]',
  });
  return {
    props: {
      posts,
    },
  };
}
