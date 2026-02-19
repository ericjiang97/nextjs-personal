"use client"
import * as prismicH from "@prismicio/helpers";
import { PrismicText } from "@prismicio/react";
import moment from "moment";
import { GetStaticProps, NextPage } from "next";
import getReadingTime from "reading-time";
import PrismicRichTextWrapper from "../../components/PrismicRichTextWrapper";
import { createClient } from "../../config/prismic";
import MainLayout from "../../containers/MainLayout";
import { IPrismicDocumentRecord } from "../../types";
import { BarsArrowUpIcon } from "@heroicons/react/24/outline";
import classNames from "../../utils/classNames";

interface BlogPostProps {
  post: IPrismicDocumentRecord;
}

const extractTextFromRichText = (richText: any[]): string => {
  console.log(richText);

  return richText?.filter((node) => node.type === "paragraph" || node.type === "heading2")
    .map((node) => node.text)
    .join(" ") || "";
};

const BlogPost: NextPage<BlogPostProps> = ({ post }) => {
  console.log(post);

  const { body, published_time, summary, title, banner, category } = post.data;

  const postedDate = moment(
    prismicH.asDate(published_time)?.toISOString()
  );

  const endpoint = `/blog/${post.uid}`;
  const postUrl = `https://ericjiang.dev${endpoint}`;

  const hasBanner = !!banner.url;

  const readingTime = extractTextFromRichText(body)

  return (
    <MainLayout
      pageTitle={`Blog - ${prismicH.asText(title)}`}
      pageMeta={{
        endpoint,
        description: prismicH.asText(summary) || "",
        imageUrl: `https://ericjiang.dev/api/static?blog=${post.uid}`,
      }}
    >
      <div className="py-16">
        <div className="flex flex-row flex-wrap items-start px-4 sm:px-6 lg:px-8">
          <div className="md:sticky top-20 text-lg flex flex-col max-w-md">
            <span className="block text-start max-w-md text-base font-semibold uppercase tracking-wide text-gray-500">
              {`Posted on: ${postedDate.format("DD MMMM YYYY")}`}
            </span>
            <h1>
              <span className="mt-2 block text-start text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                <PrismicText field={post.data.title} />
              </span>
            </h1>
            <span className="mt-2">
              <b>Est Reading Time:</b> {getReadingTime(readingTime).text}
            </span>
          </div>


          <div className="mx-auto mt-10 md:mt-0 flex flex-1 max-w-prose flex-col">
            {
              hasBanner && <div className="mx-auto max-w-prose text-lg">
                <img
                  src={post.data.banner.url}
                  alt={post.data.banner.alt}
                  className=""
                />
              </div>
            }
            <div className={classNames(hasBanner ? "mt-10" : "", "first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:font-old-standard")}>
              <PrismicRichTextWrapper page={post} />
            </div>
          </div>
        </div>
      </div>
      <button className="fixed bottom-4 right-4 border border-gray-200 p-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <BarsArrowUpIcon className="h-6 w-6" aria-hidden="true" />
      </button>
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
