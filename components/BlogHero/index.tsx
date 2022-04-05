import React from "react";

import * as prismicH from "@prismicio/helpers";

import { IPrismicDocumentRecord } from "../../types";
import moment from "moment";

interface BlogHeroProps {
  posts: IPrismicDocumentRecord[];
}

const BlogHero: React.FC<BlogHeroProps> = ({ posts }) => {
  return (
    <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            I occassionally write on my blog about tech, projects, reviews (and
            will add photography and travel in the future)... so here's some of
            them.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => {
            console.log(post);
            const postLength = (prismicH.asText(post.data.body) || "").split(
              " "
            ).length;
            const readingTime = Math.floor(postLength / 200);
            return (
              <div
                key={post.uid}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg"
              >
                {post.data.banner.url ? (
                  <div className="flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover"
                      src={post.data.banner.url}
                      alt={post.data.banner.alt}
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 bg-light-cyan-300">
                    <img
                      className="h-48 w-full object-cover"
                      src="/images/content_creation_flag.png"
                      alt="Blog post"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <a
                        href={`/blog/category/${post.data.category.uid}`}
                        className="hover:underline"
                      >
                        {post.data.category.slug}
                      </a>
                    </p>
                    <a href={post.href} className="mt-2 block">
                      <p className="text-xl font-semibold text-gray-900">
                        {prismicH.asText(post.data.title)}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        {prismicH.asText(post.data.summary)}
                      </p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time
                        dateTime={prismicH
                          .asDate(post.data.published_time)
                          ?.toISOString()}
                      >
                        {moment(
                          prismicH.asDate(post.data.published_time)
                        ).format("Do MMMM YYYY")}
                      </time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
