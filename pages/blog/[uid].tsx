import React from 'react';
import moment from 'moment';
import Prismic from 'prismic-javascript';

import { RichText } from 'prismic-reactjs';
import { Container, Heading, Icon, Label, Link, Paragraph, Tag, Divider, Stack, Columns, useBreakpoint } from 'bumbag';

import HeroBase from '../../components/core/HeroBase';
import ShareModal from '../../components/modals/ShareModal';

import PageLayout from '../../containers/layouts/PageLayout';
import Custom404 from '../404';

import { client } from '../../config/prismic';
import { PrismicBlogCategory, PrismicBlogPost } from '../../types/PrismicBlogPost';
import { getBlogPostContent } from '../../utils/prismic';
import BlogCard from '../../components/blog/BlogCard';
import PrismicRichTextWrapper from '../../components/PrismicRichTextWrapper';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

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
          <HeroBase backgroundImage={`url('${data.banner && data.banner.url}')`}>
            <Columns>
              {isTabletOrLarger && <Columns.Column spread={1} />}
              <Columns.Column>
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
              </Columns.Column>
            </Columns>
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
      <Container marginY="1.25rem">
        <Heading use="h3" fontSize="400">
          Read similar posts...
        </Heading>
        <Stack orientation="vertical" marginTop="0.75rem">
          {similarPosts.results.map((post) => {
            return <BlogCard blogPostContent={post.data} uid={post.uid} showCoverImage={false} />;
          })}
        </Stack>
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
