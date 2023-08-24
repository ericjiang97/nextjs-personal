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
        description: "G'day, I'm Eric. I’m a Software Engineer at Google.",
        endpoint: "/",
        imageUrl: "/images/eric-jiang-bitbybit.jpeg",
      }}
    >
      <div className="container flex flex-1 flex-col">
        <BlogHero posts={posts} />

        <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Awards
              </h2>
            </div>
            <div className="mt-3">
              <a href="https://holopin.io/@ericjiang97">
                <img
                  src="https://holopin.io/api/user/board?user=ericjiang97"
                  width="100%"
                  alt="@ericjiang97's holopin"
                />
              </a>
            </div>
          </div>
        </div>
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
