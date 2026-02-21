import React from "react";

import * as prismicH from "@prismicio/helpers";
import classNames from "../../../utils/classNames";

import { IPrismicDocumentRecord } from "../../../types";
import { PrismicText } from "@prismicio/react";
import moment from "moment";
import CategoryChip from "../../chips/CategoryChip/CategoryChip";

interface BlogCardProps {
  post: IPrismicDocumentRecord;
}

const BlogCard = ({ post }: React.PropsWithChildren<BlogCardProps>) => {
  const postedDate = moment(
    prismicH.asDate(post.data.published_time)?.toISOString()
  );

  const { summary, category, title } = post.data;

  const hasSummary = summary.length > 0;

  return (
    <div className="flex flex-col rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
      <div>
        <CategoryChip category={category} />
      </div>

      <a href={`/blog/${post.uid}`} className="mt-2 block">
        <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          <PrismicText field={title} />
        </p>
        {hasSummary && (
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            <PrismicText field={summary} />
          </p>
        )}
      </a>
      <p
        className={classNames(
          "text-sm text-gray-500 dark:text-gray-400",
          hasSummary ? "mt-3" : "mt-2"
        )}
      >
        {postedDate.format("DD MMMM YYYY")}
      </p>
    </div>
  );
};

export default BlogCard;
