import Prismic from 'prismic-javascript';
import moment from 'moment';

import { RichText } from 'prismic-reactjs';

import { Card, Heading, Image, Stack, Paragraph } from 'bumbag';
import LinkButton from '../../../components/buttons/LinkButton';
import HeroBase from '../../../components/core/HeroBase';

import PageLayout from '../../../containers/layouts/PageLayout';
import Custom404 from '../../404';

import { client } from '../../../config/prismic';

export default function BlogHome(props: any) {
  if (props.error) {
    return <Custom404 />;
  }
  const title = `Blog - Category: ${props.category.data.category_name}`;
  const subtitle = `Number of Posts: ${props.posts.results_size} `;
  return (
    <PageLayout
      title={'Blog'}
      pageMeta={{
        description: subtitle,
        endpoint: '/blog',
      }}
      banner={
        <HeroBase backgroundImage="url(https://live.staticflickr.com/65535/49836502853_dd2b878f7b_b.jpg)">
          <Heading use="h3">{title}</Heading>
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

export async function getServerSideProps({ params }: { params: { uid: string } }) {
  const { uid } = params;

  const category = await client.getByUID('category', uid, {});
  if (!category) {
    return {
      props: {
        error: 'Category Not Found',
      },
    };
  }
  const posts = await client.query(
    [Prismic.Predicates.at('document.type', 'blog-post'), Prismic.Predicates.at('my.blog-post.category', category.id)],
    {
      orderings: '[my.blog-post.published_time desc]',
    },
  );
  return {
    props: {
      category,
      posts,
    },
  };
}
