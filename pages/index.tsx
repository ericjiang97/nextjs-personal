import React from 'react';
import { GetStaticProps } from 'next';
import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';

import { Box, Heading, Paragraph, Icon, PageContent, Text, Columns, Image } from 'bumbag';

import { BlogSubtitle } from './blog';
import HeroBase from '../components/core/HeroBase';
import BlogCard from '../components/blog/BlogCard';
import LinkButton from '../components/buttons/LinkButton';
import PageLayout from '../containers/layouts/PageLayout';

import { getBlogPostContent } from '../utils/prismic';

import { PrismicBlogCategory, PrismicBlogPost } from '../types/PrismicBlogPost';

interface HomePageProps {
  posts: ApiSearchResponse;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const posts = await getBlogPostContent();
  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
};

const Home = ({ posts }: HomePageProps) => {
  return (
    <PageLayout
      title="Home"
      banner={
        <HeroBase backgroundVariant="color" backgroundColor="primary600" textColor="white">
          <PageContent breakpoint="tablet" margin="auto">
            <Columns>
              <Columns.Column>
                <Heading fontSize="600" textAlign="left">
                  G'day I'm <Text color="secondary">Eric</Text> &amp;
                </Heading>
                <Heading fontSize="400" marginTop="1.25rem">
                  I’m a <Text color="secondary">Test Engineer </Text> at <Text color="secondary">Google</Text>.
                </Heading>
                <Paragraph marginTop="2rem">
                  In my spare time, I make impact by building awesome software solutions and building the communities
                  around me.
                </Paragraph>
              </Columns.Column>
              <Columns.Column>
                <Image src="/images/eric-jiang-bitbybit.jpeg" width="300px" />
              </Columns.Column>
            </Columns>
          </PageContent>
        </HeroBase>
      }
      pageMeta={{
        description: "G'day, I'm Eric. I’m a Test Engineer at Google.",
        endpoint: '/',
        imageUrl: '/images/eric-jiang-bitbybit.jpeg',
      }}
      isChildrenPadded={false}
    >
      <Box width="100vw" backgroundColor="green700" color="white">
        <PageContent>
          <Columns>
            <Columns.Column>
              <Image src="/images/projects/monplan.png" width="100%" />
            </Columns.Column>
            <Columns.Column>
              <Heading use="h4">🎤 Projects</Heading>
              <Paragraph marginTop="1.5rem">
                I also work on alot of cool side projects both currently and in the past many of which still has a lot
                of users
              </Paragraph>
              <LinkButton href="/projects" variant="outlined" palette="primary">
                View Projects
              </LinkButton>
            </Columns.Column>
          </Columns>
        </PageContent>
      </Box>
      <HeroBase backgroundVariant="image" height="300px" backgroundImage="url(/images/gcp-juniordev-talk.jpg)">
        <PageContent>
          <Heading use="h4">🎤 Tech Talks</Heading>
          <Paragraph>
            I also do tech talks, whether its about Google Cloud, dev, cloud technologies, mobile, I will do it.
            Warning, there will be many memes inside my talks.
          </Paragraph>
          <LinkButton href="/talks" variant="outlined" palette="primary">
            View Talks
          </LinkButton>
        </PageContent>
      </HeroBase>
      <PageContent>
        <Columns>
          <Columns.Column spread={4}>
            <Heading use="h3">
              <Icon icon="solid-feather-alt" marginRight="0.5rem" />
              Latest Posts
            </Heading>
            <Paragraph marginTop="1.5rem" marginBottom="1rem">
              {BlogSubtitle}
            </Paragraph>
            <LinkButton href="/blog">Read More</LinkButton>
          </Columns.Column>
          <Columns.Column spread={8}>
            {posts.results.slice(0, 3).map((post, i) => {
              const { uid, data } = post;
              if (uid) {
                const blogPostData = data as PrismicBlogPost<PrismicBlogCategory>;
                return (
                  <BlogCard
                    blogPostContent={blogPostData}
                    uid={uid}
                    cardProps={{ marginBottom: '1rem' }}
                    showCoverImage={false}
                    maxWordCount={50}
                    key={i}
                  />
                );
              }
            })}
          </Columns.Column>
        </Columns>
      </PageContent>
    </PageLayout>
  );
};

export default Home;
