import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';

import { Heading, Paragraph, Stack } from 'bumbag';

import BlogCard from '../../components/blog/BlogCard';
import LinkButton from '../../components/buttons/LinkButton';
import HeroBase from '../../components/core/HeroBase';
import PageLayout from '../../containers/layouts/PageLayout';

import { getBlogPostContent } from '../../utils/prismic';

import routes from '../../config/routes';
import { PrismicBlogCategory, PrismicBlogPost } from '../../types/PrismicBlogPost';

export const BlogSubtitle =
  "I occassionally write on my blog about tech, projects, reviews (and will add photography and travel in the future)... so here's some of them.";

interface BlogHomeProps {
  posts: ApiSearchResponse;
}

export const getStaticProps = async () => {
  const posts = await getBlogPostContent();
  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
};

export default function BlogHome(props: BlogHomeProps) {
  return (
    <PageLayout
      title={'Blog'}
      pageMeta={{
        description: BlogSubtitle,
        endpoint: '/blog',
      }}
      banner={
        <HeroBase
          backgroundVariant="image"
          backgroundImageUri="https://live.staticflickr.com/65535/49836502853_dd2b878f7b_b.jpg"
        >
          <Heading use="h3">Blog</Heading>
          <Paragraph marginY="1rem">{BlogSubtitle}</Paragraph>
          <LinkButton href={routes.RSS_FEED} iconBefore="solid-rss">
            RSS Feed
          </LinkButton>
        </HeroBase>
      }
      hideSearch={false}
    >
      <Stack>
        {props.posts.results.map((post) => {
          const { uid, data } = post;
          if (uid) {
            const blogPostData = data as PrismicBlogPost<PrismicBlogCategory>;
            return <BlogCard blogPostContent={blogPostData} uid={uid} showCoverImage={true} key={uid} />;
          }
        })}
      </Stack>
    </PageLayout>
  );
}
