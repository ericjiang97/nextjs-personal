import React from 'react';
import { GetStaticProps } from 'next';
import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';

import { Heading, Paragraph, Container, Icon, PageContent, Text, Columns, Image } from 'bumbag';

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
        <HeroBase>
          <PageContent breakpoint="tablet">
            <Columns>
              <Columns.Column>
                <Heading fontSize="600" textAlign="left">
                  Hello I'm <Text color="info600">Eric Jiang</Text>
                </Heading>
                <Heading fontSize="400">
                  And I’m a <Text color="info600">Test Engineer </Text> at <Text color="info600">Google</Text>.
                </Heading>
                <Paragraph marginTop="1.25rem">
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
      <PageContent>
        <Container style={{ flex: 1 }} breakpoint="desktop" height={300} padding="2rem">
          <Container>
            <Heading use="h4">🎤 Projects</Heading>
            <Paragraph>
              I also work on alot of cool side projects both currently and in the past many of which still has a lot of
              users
            </Paragraph>
            <LinkButton href="/projects" variant="outlined" palette="primary">
              View Projects
            </LinkButton>
          </Container>
        </Container>
      </PageContent>
      <HeroBase height="300px" backgroundImage="url(/images/gcp-juniordev-talk.jpg)">
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
        <Container marginTop="1rem" width="100%">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <div style={{ minWidth: 280, flex: 1, padding: '0.5rem 1rem' }}>
              <Heading use="h3">
                <Icon icon="solid-feather-alt" marginRight="0.5rem" />
                Latest Posts
              </Heading>
              <Paragraph marginTop="1.5rem" marginBottom="1rem">
                {BlogSubtitle}
              </Paragraph>
              <LinkButton href="/blog">Read More</LinkButton>
            </div>
            <Container flex="2" minWidth={280}>
              {posts.results.slice(0, 3).map((post) => {
                const { uid, data } = post;
                if (uid) {
                  const blogPostData = data as PrismicBlogPost<PrismicBlogCategory>;
                  return (
                    <BlogCard
                      blogPostContent={blogPostData}
                      uid={uid}
                      cardProps={{ marginY: '1rem' }}
                      showCoverImage={false}
                      maxWordCount={50}
                    />
                  );
                }
              })}
            </Container>
          </div>
        </Container>
      </PageContent>
    </PageLayout>
  );
};

export default Home;
