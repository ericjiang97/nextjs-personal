import { GetStaticProps } from 'next';
import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';
import React from 'react';

import { Columns, Heading, Image, Link, PageContent, Paragraph, Text } from 'bumbag';

import BlogCard from '../components/blog/BlogCard';
import LinkButton from '../components/buttons/LinkButton';
import HeroBase from '../components/core/HeroBase';
import PageLayout from '../containers/layouts/PageLayout';
import { BlogSubtitle } from './blog';

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
                  Technology has been rapidly growing and is at the forefront of bringing change. I've always wanted to
                  build awesome &amp; secure products which delight users and impact their lives.
                </Paragraph>
              </Columns.Column>
              <Columns.Column>
                <Image src="/images/eric-jiang-bitbybit.jpeg" width="300px" />
              </Columns.Column>
            </Columns>
            <LinkButton palette="secondary" href="/about">
              About me
            </LinkButton>
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
      <HeroBase backgroundVariant="color" backgroundColor="onyx" height="auto" textColor="platinum">
        <PageContent marginY="2rem">
          <Columns>
            <Columns.Column marginLeft="1rem">
              <Heading use="h3">I build awesome products</Heading>
              <Paragraph marginTop="1.5rem">
                Whether its a side project, or a product I'm working on at work, I bring my knowledge and energy to help
                build the most awesome, delightful, secure products for everyone.
              </Paragraph>
              <LinkButton href="/projects" palette="secondary" marginTop="1.5rem">
                View Projects
              </LinkButton>
            </Columns.Column>
            <Columns.Column>
              <Image src="/images/projects/monplan.png" width="100%" />
              <Text fontSize="100">
                Image: A Course Plan in MonPlan, thanks{' '}
                <Link href="https://nicholas.cloud" color="white">
                  Nick
                </Link>{' '}
                for the screenshot.
              </Text>
            </Columns.Column>
          </Columns>
        </PageContent>
        <PageContent marginY="2rem">
          <Columns>
            <Columns.Column>
              <Image src="/images/gcp-juniordev-talk.jpg" width="100%" />
            </Columns.Column>
            <Columns.Column marginLeft="1rem">
              <Heading use="h3">I spread my knowledge and experiences</Heading>
              <Paragraph marginTop="1.5rem">
                I do tech talks, whether its about cloud (i.e. Google Cloud), dev, cloud technologies, mobile, I will do
                it. Warning, there will be many memes inside my talks.
              </Paragraph>
              <LinkButton href="/talks" palette="coral" marginTop="1.5rem">
                View Talks
              </LinkButton>
            </Columns.Column>
          </Columns>
        </PageContent>
        <PageContent marginY="2rem">
          <Columns>
            <Columns.Column spread={4}>
              <Heading use="h3">I write random things</Heading>
              <Paragraph marginTop="1.5rem" marginBottom="1rem">
                {BlogSubtitle}
              </Paragraph>
              <LinkButton href="/blog">Read More</LinkButton>
            </Columns.Column>
            <Columns.Column spread={8} color="textPrimary">
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
      </HeroBase>
    </PageLayout>
  );
};

export default Home;
