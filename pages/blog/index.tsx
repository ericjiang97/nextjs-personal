import { Heading, Stack, Paragraph } from 'bumbag';
import LinkButton from '../../components/buttons/LinkButton';
import HeroBase from '../../components/core/HeroBase';
import PageLayout from '../../containers/layouts/PageLayout';

import { PrismicBlogCategory, PrismicBlogPost } from '../../types/PrismicBlogPost';
import BlogCard from '../../components/blog/BlogCard';
import { getBlogPostContent } from '../../utils/prismic';

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
          const blogPostData = data as PrismicBlogPost<PrismicBlogCategory>;
          return <BlogCard blogPostContent={blogPostData} uid={uid} />;
        })}
      </Stack>
    </PageLayout>
  );
}

export async function getServerSideProps() {
  const posts = await getBlogPostContent();
  return {
    props: {
      posts,
    },
  };
}
