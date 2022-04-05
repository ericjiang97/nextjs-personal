import React from "react";

import * as prismicH from "@prismicio/helpers";
import classNames from "../../../utils/classNames";

import { IPrismicDocumentRecord } from "../../../types";
import { PrismicText } from "@prismicio/react";

interface BlogCardProps {
  post: IPrismicDocumentRecord;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div>
      <div>
        <a
          href={`/blog/categories/${post.data.category.uid}`}
          className="inline-block"
        >
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
          dateTime={prismicH.asDate(post.data.published_time)?.toISOString()}
        >
          {prismicH.asDate(post.data.published_time)?.toLocaleString()}
        </time>
      </p>
      <a href={`/blog/${post.uid}`} className="mt-2 block">
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
};

export default BlogCard;
