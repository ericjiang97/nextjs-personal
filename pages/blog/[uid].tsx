"use client"
import { GetStaticProps, NextPage } from "next";
import { PrismicText } from "@prismicio/react";

import { createClient } from "../../config/prismic";

import PrismicRichTextWrapper from "../../components/PrismicRichTextWrapper";
import MainLayout from "../../containers/MainLayout";

import moment from "moment";
import * as prismicH from "@prismicio/helpers";

import { IPrismicDocumentRecord } from "../../types";
import BlogCard from "../../components/cards/BlogCard";

interface BlogPostProps {
  post: IPrismicDocumentRecord;
}

const BlogPost: NextPage<BlogPostProps> = ({ post }) => {
  const postedDate = moment(
    prismicH.asDate(post.data.published_time)?.toISOString()
  );

  const endpoint = `/blog/${post.uid}`;
  const postUrl = `https://ericjiang.dev${endpoint}`;

  return (
    <MainLayout
      pageTitle={`Blog - ${prismicH.asText(post.data.title)}`}
      pageMeta={{
        endpoint,
        description: prismicH.asText(post.data.summary) || "",
        imageUrl: `https://ericjiang.dev/api/static?blog=${post.uid}`,
      }}
    >
      <div className="relative overflow-hidden bg-white py-16">
        <div className="relative flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-prose grid-cols-1 divide-y-2 divide-gray-400 text-lg">
            <h1>
              <span className="block text-center text-base font-semibold uppercase tracking-wide text-gray-500">
                {`Posted on: ${postedDate.format("DD MMMM YYYY")}`}
              </span>
              <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                <PrismicText field={post.data.title} />
              </span>
            </h1>
          </div>
          <div className="mx-auto my-8 max-w-prose text-lg">
            <img
              src={post.data.banner.url}
              alt={post.data.banner.alt}
              className=""
            />
          </div>
          <div className="mx-auto mt-4 flex w-full max-w-prose flex-col">
            <PrismicRichTextWrapper page={post} />
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

  const post = await client.getByUID("blog-post", uid);

  return {
    props: { post }, // Will be passed to the page component as props
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

export default BlogPost;
