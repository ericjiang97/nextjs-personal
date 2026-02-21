"use client";

import { BarsArrowUpIcon } from "@heroicons/react/24/outline";
import { PrismicDocument } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { PrismicText } from "@prismicio/react";
import moment from "moment";
import { use, useEffect, useState } from "react";
import getReadingTime from "reading-time";
import PrismicRichTextWrapper from "../../../components/PrismicRichTextWrapper";
import MainLayout from "../../../containers/MainLayout";
import classNames from "../../../utils/classNames";
import NotFoundPage from "../../not-found";
import CategoryChip from "../../../components/chips/CategoryChip/CategoryChip";

const extractTextFromRichText = (richText: any[]): string => {
  return (
    richText
      ?.filter((node) => node.type === "paragraph" || node.type === "heading2")
      .map((node) => node.text)
      .join(" ") || ""
  );
};

export default function BlogContent({
  content,
}: {
  content: Promise<PrismicDocument>;
}) {
  const post = use(content);

  const { uid, data } = post;

  if (!uid || !data) return <NotFoundPage />;

  const { body, published_time, summary, title, banner, category } = data;

  const postedDate = moment(prismicH.asDate(published_time)?.toISOString());

  const endpoint = `/blog/${uid}`;
  const postUrl = `https://ericjiang.dev${endpoint}`;

  const hasBanner = !!banner.url;

  const readingTime = extractTextFromRichText(body);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const percentage = (scrollTop / totalHeight) * 100;
      setProgress(percentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MainLayout
      pageTitle={`Blog - ${prismicH.asText(title)}`}
      pageMeta={{
        endpoint,
        description: prismicH.asText(summary) || "",
        imageUrl: `https://ericjiang.dev/api/static?blog=${uid}`,
      }}
      showProgress={true}
      progress={progress}
      customHero={
        <div className="mt-24 flex flex-col gap-2">
          <span className="text-start block max-w-md text-base font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {`Posted on: ${postedDate.format("DD MMMM YYYY")}`}
          </span>
          <h1>
            <span className="text-start mt-2 block text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              <PrismicText field={title} />
            </span>
          </h1>
          <span className="mt-2 dark:text-gray-300">
            <b>Est Reading Time:</b> {getReadingTime(readingTime).text}
          </span>
          <div>
            <CategoryChip category={category} />
          </div>
        </div>
      }
    >
      <div className="py-16">
        <div className="flex flex-row flex-wrap items-start px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-10 flex max-w-prose flex-1 flex-col md:mt-0">
            {hasBanner && (
              <div className="mx-auto max-w-prose text-lg">
                <img src={banner.url} alt={banner.alt} className="" />
              </div>
            )}
            <div
              className={classNames(
                hasBanner ? "mt-10" : "",
                "first-letter:font-old-standard first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-bold dark:text-gray-300 dark:first-letter:text-white"
              )}
            >
              <PrismicRichTextWrapper page={post} />
            </div>
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-4 right-4 rounded-lg border border-gray-200 bg-white p-2 shadow-lg transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <BarsArrowUpIcon
          className="h-6 w-6 dark:text-gray-300"
          aria-hidden="true"
        />
      </button>
    </MainLayout>
  );
}
