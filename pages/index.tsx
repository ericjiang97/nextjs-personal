import React from "react";
import type { GetStaticProps, NextPage } from "next";

import MainLayout from "../containers/MainLayout";
import BlogHero from "../components/BlogHero";

import { createClient } from "../config/prismic";
import { IPrismicDocumentRecord } from "../types";

interface HomePageProps {
  posts: IPrismicDocumentRecord[];
}

const Home: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <MainLayout showHero={true} pageTitle="Home">
      <div className="pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-0">
        <BlogHero posts={posts} />
      </div>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const posts = await client.getAllByType("blog-post", {
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
    pageSize: 3,
  });

  return {
    props: { posts }, // Will be passed to the page component as props
  };
};
export default Home;
