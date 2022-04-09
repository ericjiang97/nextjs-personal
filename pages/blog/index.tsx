import { PrismicText } from "@prismicio/react";

import SmallHeroBanner from "../../components/SmallHeroBanner";

import MainLayout from "../../containers/MainLayout";

import * as prismicH from "@prismicio/helpers";
import { createClient } from "../../config/prismic";
import classNames from "../../utils/classNames";

import { GetStaticProps } from "next";
import { IPrismicDocumentRecord } from "../../types";
import BlogCard from "../../components/cards/BlogCard";
interface BlogPageProps {
  page: IPrismicDocumentRecord[];
}

function BlogPage(props: BlogPageProps) {
  return (
    <MainLayout
      pageTitle="Blog"
      customHero={
        <SmallHeroBanner
          title="Blog"
          description="I occasionally write on my blog about tech, projects, food, reviews (and will add photography and travel in the future)... so here's some of them."
        />
      }
      pageMeta={{
        description:
          "I occassionally write on my blog about tech, projects, reviews (and will add photography and travel in the future)... so here's some of them",
        endpoint: "/blog",
      }}
    >
      <div className="bg-white px-4 pt-0 pb-20 sm:px-6 lg:px-4 lg:pt-0 lg:pb-28">
        <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-1 lg:gap-x-5 lg:gap-y-12">
            {props.page.map((post) => {
              return <BlogCard post={post} key={post.uid} />;
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const page = await client.getAllByType("blog-post", {
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
  });

  return {
    props: { page }, // Will be passed to the page component as props
  };
};

export default BlogPage;
