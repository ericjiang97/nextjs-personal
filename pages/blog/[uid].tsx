import moment from 'moment';
import Prismic from 'prismic-javascript';
import React from 'react';

import { Columns, Container, Divider, Heading, Icon, Image, Link, Paragraph, Stack, Tag, useBreakpoint } from 'bumbag';
import { RichText } from 'prismic-reactjs';

import HeroBase from '../../components/core/HeroBase';
import ShareModal from '../../components/modals/ShareModal';

import PageLayout from '../../containers/layouts/PageLayout';
import Custom404 from '../404';

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import BlogCard from '../../components/blog/BlogCard';
import PrismicRichTextWrapper from '../../components/PrismicRichTextWrapper';
import { client } from '../../config/prismic';
import { PrismicBlogCategory, PrismicBlogPost } from '../../types/PrismicBlogPost';
import { getBlogPostContent } from '../../utils/prismic';

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
  const isTabletOrLarger = useBreakpoint('min-tablet');

  if (error) {
    return <Custom404 />;
  }
  const { title, author, preview, published_time, category, summary } = data;

  const categoryLinkProps = Link.useProps({ href: `/blog/categories/${category.uid}` });

  const endpoint = `/blog/${uid}`;
  const postUrl = `https://ericjiang.dev${endpoint}`;

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
          <HeroBase
            backgroundVariant="color"
            backgroundColor={data.banner && data.banner.url ? 'white' : 'primary600'}
            textColor={data.banner && data.banner.url ? 'textPrimary' : 'white'}
          >
            {data.banner && (
              <Container paddingX="0.75rem" paddingY="0.5rem">
                <Image src={data.banner.url} width="100%" maxHeight={300} objectPosition="center" objectFit="cover" />
              </Container>
            )}
            <Container marginY="1rem" display="flex" alignItems="center" justifyContent="center">
              <Tag use={Link} {...categoryLinkProps} color="white" palette="primary">
                {category.data.category_name}
              </Tag>
              <Paragraph marginTop="0px" marginLeft="1rem">
                {moment(published_time).format('Do MMM YYYY')}
              </Paragraph>
            </Container>
            <Container marginY="1.5rem" display="flex" flexDirection="column" alignItems="center">
              <Heading use="h3">{RichText.asText(title)}</Heading>
              <Paragraph>by {RichText.asText(author)}</Paragraph>
            </Container>
          </HeroBase>
        </>
      }
      pageMeta={{
        endpoint,
        description: RichText.asText(summary),
        imageUrl: data.banner && data.banner.url,
      }}
    >
      <Container maxWidth="80vw">
        <Columns>
          {isTabletOrLarger && (
            <Columns.Column spread={1}>
              <Stack orientation="vertical" position="sticky" top="75px">
                <EmailShareButton url={postUrl}>
                  <EmailIcon size={48} round={true} />
                </EmailShareButton>
                <TwitterShareButton url={postUrl} title={`${title} by Eric Jiang!`}>
                  <TwitterIcon size={48} round={true} />
                </TwitterShareButton>
                <LinkedinShareButton url={postUrl} title={`${title} by Eric Jiang!`} source={'https://ericjiang.dev'}>
                  <LinkedinIcon size={48} round={true} />
                </LinkedinShareButton>
                <FacebookShareButton url={postUrl}>
                  <FacebookIcon size={48} round={true} />
                </FacebookShareButton>
              </Stack>
            </Columns.Column>
          )}
          <Columns.Column>
            <PrismicRichTextWrapper richText={data.body} />
          </Columns.Column>
        </Columns>
      </Container>
      {!isTabletOrLarger && (
        <Container marginY="1rem" display="flex" flexWrap="wrap" justifyContent="space-between">
          <ShareModal title={RichText.asText(title)} slug={`/blog/${uid}`} />
        </Container>
      )}
      <Divider />
      <Container marginY="1.25rem" padding="1rem">
        <Heading use="h3" fontSize="400">
          Enjoyed the post? You might want to read similar posts:
        </Heading>
        <Columns marginTop="1rem">
          {similarPosts.results.map((post) => {
            return (
              <Columns.Column key={post.uid} display="flex" spread={4}>
                <BlogCard blogPostContent={post.data} uid={post.uid} showCoverImage={false} flex={1} />
              </Columns.Column>
            );
          })}
        </Columns>
      </Container>
    </PageLayout>
  );
}

export async function getStaticProps({ params }: { params: { uid: string } }) {
  const { uid } = params;
  console.log(`/blog/${uid}`);
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
