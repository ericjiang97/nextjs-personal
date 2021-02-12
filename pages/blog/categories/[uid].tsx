import Prismic from 'prismic-javascript';

import { Heading, Paragraph, Stack } from 'bumbag';
import LinkButton from '../../../components/buttons/LinkButton';
import HeroBase from '../../../components/core/HeroBase';

import PageLayout from '../../../containers/layouts/PageLayout';
import Custom404 from '../../404';

import BlogCard from '../../../components/blog/BlogCard';
import { client } from '../../../config/prismic';
import { PrismicBlogCategory, PrismicBlogPost } from '../../../types/PrismicBlogPost';
import { getBlogPostContent } from '../../../utils/prismic';

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
        <HeroBase
          backgroundVariant="image"
          backgroundImageUri="https://live.staticflickr.com/65535/49836502853_dd2b878f7b_b.jpg"
        >
          <Heading use="h3">{title}</Heading>
          <Paragraph marginY="1rem">{subtitle}</Paragraph>
          <LinkButton href="/blog/feed.xml" iconBefore="solid-rss">
            RSS Feed
          </LinkButton>
          <LinkButton href="/blog">Back to Blog</LinkButton>
        </HeroBase>
      }
    >
      <Stack>
        {props.posts.results.map((post: { uid: string; data: any }) => {
          const { uid, data } = post;
          const blogData = data as PrismicBlogPost<PrismicBlogCategory>;
          return <BlogCard blogPostContent={blogData} uid={uid} />;
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
  const posts = await getBlogPostContent([Prismic.Predicates.at('my.blog-post.category', category.id)]);
  return {
    props: {
      category,
      posts,
    },
  };
}
