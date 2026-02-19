import React from "react";
import type { GetStaticProps, NextPage } from "next";

import MainLayout from "../containers/MainLayout";
import BlogHero from "../components/BlogHero";

import { createClient } from "../config/prismic";
import { IPrismicDocumentRecord } from "../types";

interface HomePageProps {
  posts: IPrismicDocumentRecord[];
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <MainLayout
      pageTitle="Home"
      pageMeta={{
        description: "G'day, I'm Eric. I’m a Software Engineer at Google.",
        endpoint: "/",
        imageUrl: "/images/eric-jiang-bitbybit.jpeg",
      }}
    >
      <main>
        <div className="pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-0">
          <div className="mx-auto lg:px-8">
            <div className="flex flex-row flex-wrap mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
              <div className="lg:py-24">
                <h1 className="mt-4 text-7xl font-extrabold tracking-tight sm:mt-5 ">
                  <span className="block">G&apos;day I&apos;m <span className="italic underline">Eric</span></span>
                  <span className="block text-rich-black">
                    & I&apos;m a Software Engineer at Google
                  </span>
                </h1>
              </div>
              <p className="mt-3 text-gray-600 text-xl">
                Technology has been rapidly growing and is at the forefront of
                bringing change. I&apos;ve always wanted to build awesome &
                secure products which delight users and impact their lives. I
                currently build delightful & beautiful tools to make Pixel devices more secure!
              </p>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

