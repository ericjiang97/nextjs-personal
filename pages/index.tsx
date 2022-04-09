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
    <MainLayout
      showHero={true}
      pageTitle="Home"
      pageMeta={{
        description: "G'day, I'm Eric. I’m a Test Engineer at Google.",
        endpoint: "/",
        imageUrl: "/images/eric-jiang-bitbybit.jpeg",
      }}
    >
      <div className="container flex flex-1 flex-col">
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
