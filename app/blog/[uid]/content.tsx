"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "../../../config/prismic";
import MainLayout from "../../../containers/MainLayout";
import NotFoundPage from "../../not-found";
import BlogContent from "./blogcontent";
import SmallHeroBanner from "../../../components/SmallHeroBanner";

export default function Content() {
  const uid = useParams().uid as string;
  if (!uid || uid.length === 0) return <NotFoundPage />;

  const post = createClient().getByUID("blog-post", uid);
  if (!post) return <NotFoundPage />;

  const endpoint = `/blog/${uid}`;

  return (
    <Suspense
      fallback={
        <MainLayout
          pageTitle="Blog"
          pageMeta={{
            endpoint,
            description: "",
            imageUrl: `https://ericjiang.dev/api/static?blog=${uid}`,
          }}
          customHero={
            <div className="mt-24 flex flex-col gap-2">
              <span className="text-start block max-w-md text-base font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {`Posted on: Loading...`}
              </span>
              <h1>
                <span className="text-start mt-2 block text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  Loading...
                </span>
              </h1>
              <span className="mt-2 dark:text-gray-300">
                <b>Est Reading Time:</b> Loading...
              </span>
              <div>Loading...</div>
            </div>
          }
        >
          <div>Loading...</div>
        </MainLayout>
      }
    >
      <BlogContent content={post} />
    </Suspense>
  );
}
