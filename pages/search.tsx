import React from 'react';
import { NextPageContext } from 'next';
import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';

import { Heading, Stack, Paragraph, Container } from 'bumbag';

import HeroBase from '../components/core/HeroBase';
import BlogCard from '../components/blog/BlogCard';
import PageLayout from '../containers/layouts/PageLayout';

import { searchPrismic } from '../utils/prismic';

import { BlogSubtitle } from './blog';
import { PrismicBlogCategory, PrismicBlogPost } from '../types/PrismicBlogPost';

interface SearchPageProps {
  results: ApiSearchResponse;
  searchQuery: string;
}
const SearchPage: React.FC<SearchPageProps> = ({ results, searchQuery }) => {
  return (
    <PageLayout
      title={'Blog - Search results'}
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
        </HeroBase>
      }
      hideSearch={false}
      searchQuery={searchQuery}
    >
      <Container>
        <Heading use="h5">{`${results.results_size} results for query: ${searchQuery}`}</Heading>
        <Stack>
          {results.results.map((post: any) => {
            const { uid, data } = post;
            if (uid) {
              const blogPostData = data as PrismicBlogPost<PrismicBlogCategory>;
              return <BlogCard blogPostContent={blogPostData} uid={uid} showCoverImage={false} />;
            }
          })}
        </Stack>
      </Container>
    </PageLayout>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const searchTarget = query['q'];
  const results = await searchPrismic(searchTarget as string);
  return {
    props: {
      results,
      searchQuery: searchTarget,
    },
  };
};

export default SearchPage;
