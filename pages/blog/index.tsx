import { PrismicText } from "@prismicio/react";

import SmallHeroBanner from "../../components/SmallHeroBanner";

import MainLayout from "../../containers/MainLayout";

import * as prismicH from "@prismicio/helpers";
import { createClient } from "../../config/prismic";
import classNames from "../../utils/classNames";

import { PrismicDocument } from "@prismicio/types";
import { GetStaticProps } from "next";
interface BlogPageProps {
  page: PrismicDocument<Record<string, any>, string, string>[];
}

function BlogPage(props: BlogPageProps) {
  return (
    <MainLayout
      pageTitle="Blog"
      customHero={
        <SmallHeroBanner
          title="Blog"
          description="I occassionally write on my blog about tech, projects, food, reviews (and will add photography and travel in the future)... so here's some of them."
        />
      }
    >
      <div className="bg-white px-4 pt-0 pb-20 sm:px-6 lg:px-4 lg:pt-0 lg:pb-28">
        <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-1 lg:gap-x-5 lg:gap-y-12">
            {props.page.map((post) => {
              return (
                <div key={post.uid}>
                  <div>
                    <a href={post.data.category.uid} className="inline-block">
                      <span
                        className={classNames(
                          "bg-indigo-100 text-indigo-800",
                          "inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium"
                        )}
                      >
                        {post.data.category.slug}
                      </span>
                    </a>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    <time
                      dateTime={prismicH
                        .asDate(post.data.published_time)
                        ?.toISOString()}
                    >
                      {prismicH
                        .asDate(post.data.published_time)
                        ?.toLocaleString()}
                    </time>
                  </p>
                  <a href="#" className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                      <PrismicText field={post.data.title} />
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      <PrismicText field={post.data.summary} />
                    </p>
                  </a>
                  <div className="mt-3">
                    <a
                      href={`/blog/${post.uid}`}
                      className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Read full story
                    </a>
                  </div>
                </div>
              );
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
