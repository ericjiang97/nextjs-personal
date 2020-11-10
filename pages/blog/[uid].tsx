import React from 'react';
import moment from 'moment';
import Prismic from 'prismic-javascript';

import { RichText } from 'prismic-reactjs';
import { Container, Heading, Icon, Label, Link, Paragraph, Tag, Divider } from 'bumbag';

import HeroBase from '../../components/core/HeroBase';
import ShareModal from '../../components/modals/ShareModal';

import PageLayout from '../../containers/layouts/PageLayout';
import Custom404 from '../404';

import { client } from '../../config/prismic';
import { PrismicBlogCategory, PrismicBlogPost } from '../../types/PrismicBlogPost';
import { getBlogPostContent } from '../../utils/prismic';
import BlogCard from '../../components/blog/BlogCard';
import PrismicRichTextWrapper from '../../components/PrismicRichTextWrapper';

export default function Post({
  uid,
  data,
  error,
  similarPosts,
}: {
  uid: string;
  data: PrismicBlogPost<PrismicBlogCategory>;
  error: string;
  similarPosts: { results: { uid: string; data: PrismicBlogPost<PrismicBlogCategory> }[] };
}) {
  if (error) {
    return <Custom404 />;
  }
  const { title, author, preview, published_time, category, summary } = data;

  const categoryLinkProps = Link.useProps({ href: `/blog/categories/${category.uid}` });
  return (
    <PageLayout
      title={`Blog - ${RichText.asText(title)}`}
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
          <HeroBase backgroundImage={`url('${data.banner && data.banner.url}')`}>
            <Container>
              <Container marginY="1rem">
                <Tag use={Link} {...categoryLinkProps} color="white">
                  {category.data.category_name}
                </Tag>
              </Container>
              <Heading use="h3">{RichText.asText(title)}</Heading>
              <Container marginY="1.5rem">
                <Label>By</Label>
                <Paragraph>{RichText.asText(author)}</Paragraph>
                <Label>Published on</Label>
                <Paragraph>{moment(published_time).format('ddd Do MMM YYYY')}</Paragraph>
              </Container>
            </Container>
          </HeroBase>
        </>
      }
      pageMeta={{
        endpoint: `/blog/${uid}`,
        description: RichText.asText(summary),
        imageUrl: data.banner && data.banner.url,
      }}
    >
      <Container maxWidth="80vw">
        <PrismicRichTextWrapper richText={data.body} />
      </Container>
      <Container marginY="1rem" display="flex" flexWrap="wrap" justifyContent="space-between">
        <ShareModal title={RichText.asText(title)} slug={`/blog/${uid}`} />
      </Container>
      <Divider />
      <Container marginY="1.25rem">
        <Heading use="h5">Similar Posts</Heading>
        {similarPosts.results.map((post) => {
          return <BlogCard blogPostContent={post.data} uid={post.uid} showCoverImage={false} />;
        })}
      </Container>
    </PageLayout>
  );
}

export async function getStaticProps({ params }: { params: { uid: string } }) {
  const { uid } = params;
  console.log(uid);
  const blogPost = await client.getByUID('blog-post', uid, { fetchLinks: ['category.uid', 'category.category_name'] });
  if (!blogPost) {
    return {
      props: {
        error: 'Not Found',
      },
    };
  }
  const data = blogPost.data as PrismicBlogPost<PrismicBlogCategory>;

  const similarPosts = await getBlogPostContent(
    [Prismic.Predicates.at('my.blog-post.category', data.category.id), Prismic.Predicates.not('my.blog-post.uid', uid)],
    false,
    3,
  );
  return {
    props: { uid, data, similarPosts },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const blogPosts = await getBlogPostContent();
  const paths = blogPosts.results.map((post) => {
    return { params: { uid: post.uid } };
  });
  return {
    paths,
    fallback: 'blocking',
  };
}
