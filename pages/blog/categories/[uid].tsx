import { PrismicText } from "@prismicio/react";

import SmallHeroBanner from "../../../components/SmallHeroBanner";

import MainLayout from "../../../containers/MainLayout";

import * as prismicH from "@prismicio/helpers";
import { createClient } from "../../../config/prismic";
import classNames from "../../../utils/classNames";

import { GetStaticProps, NextPage } from "next";
import { IPrismicDocumentRecord } from "../../../types";
import BlogCard from "../../../components/cards/BlogCard";
import { predicate } from "@prismicio/client";
import NotFoundPage from "../../404";

interface BlogPageProps {
  posts: IPrismicDocumentRecord[];
  category: IPrismicDocumentRecord;
  error?: string;
}

const BlogPage: NextPage<BlogPageProps> = ({ posts, category, error }) => {
  if (error) {
    return <NotFoundPage reason={error} />;
  }

  const title = `Blog - Category: ${category.data.category_name}`;

  return (
    <MainLayout
      pageTitle="Blog"
      customHero={
        <SmallHeroBanner
          title={`Blog - Category - ${category.data.category_name}`}
          description="I occasionally write on my blog about tech, projects, food, reviews (and will add photography and travel in the future)... so here's some of them."
        />
      }
      pageMeta={{
        description: title,
        endpoint: `/posts/categories/${category.uid}`,
      }}
    >
      <div className="bg-white px-4 pt-0 pb-20 sm:px-6 lg:px-4 lg:pt-0 lg:pb-28">
        <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-1 lg:gap-x-5 lg:gap-y-12">
            {posts.map((post) => {
              return <BlogCard post={post} key={post.uid} />;
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  previewData,
  params,
}) => {
  const client = createClient({ previewData });

  const uid = params?.uid as string;

  let category;
  try {
    category = await client.getByUID("category", uid);
  } catch (e) {
    return {
      props: {
        error: "Category Not Found",
        posts: [],
      },
    };
  }

  const posts = await client.getAllByType("blog-post", {
    predicates: [predicate.at("my.blog-post.category", category.id as string)],
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
  });

  return {
    props: { posts, category }, // Will be passed to the page component as props
  };
};

export const getStaticPaths = async () => {
  const client = createClient();

  const blogPosts = await client.getAllByType("blog-post", {
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
  });

  const paths = blogPosts.map((post) => {
    return { params: { uid: post.uid } };
  });
  return { paths, fallback: "blocking" };
};
export default BlogPage;
