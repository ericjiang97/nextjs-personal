import { PrismicText, PrismicRichText } from "@prismicio/react";
import { GetStaticProps, NextPage } from "next";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../config/prismic";

import PrismicRichTextWrapper from "../../components/PrismicRichTextWrapper";
import MainLayout from "../../containers/MainLayout";
import { PrismicDocument } from "@prismicio/types";
import moment from "moment";

interface BlogPostProps {
  page: PrismicDocument<Record<string, any>, string, string>;
}

const BlogPost: NextPage<BlogPostProps> = ({ page }) => {
  const postedDate = moment(
    prismicH.asDate(page.data.published_time)?.toISOString()
  );

  return (
    <MainLayout>
      <div className="relative overflow-hidden bg-white py-16">
        <div className="relative flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="block text-center text-base font-semibold uppercase tracking-wide text-gray-500">
                {`Posted on: ${postedDate.format("DD MMMM YYYY")}`}
              </span>
              <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                <PrismicText field={page.data.title} />
              </span>
            </h1>
          </div>
          <div className="mx-auto my-8 max-w-prose text-lg">
            <img
              src={page.data.banner.url}
              alt={page.data.banner.alt}
              className=""
            />
          </div>
          <div className="mx-auto mt-4 flex w-full max-w-prose flex-col">
            <PrismicRichTextWrapper page={page} />
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

  const page = await client.getByUID("blog-post", params?.uid as string);

  return {
    props: { page }, // Will be passed to the page component as props
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
