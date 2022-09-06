import moment from "moment";
import { GetStaticProps, NextPage } from "next";

import * as prismicH from "@prismicio/helpers";

import SmallHeroBanner from "../../components/SmallHeroBanner";
import MainLayout from "../../containers/MainLayout";

import { createClient } from "../../config/prismic";
import talks from "../../data/talks";
import { Talk } from "../../types";

interface PageProps {
  result: Talk[];
}

interface NextPageProps {
  props: PageProps;
}

const TalksPage: NextPage<NextPageProps> = ({ page }) => {
  return (
    <MainLayout
      pageTitle="Tech Talks"
      customHero={
        <SmallHeroBanner
          title="Tech Talks"
          description="I put the tech in my talks… (And also memes), just kidding. I actually love doing tech talks, hit me up if you are interested in letting me do a talk on Google Cloud, Frontend/Backend Development or my Career Journey"
        />
      }
      pageMeta={{
        description: `I put the tech in my talks… And also memes), just kidding. I actually love doing tech talks, hit me up if you
  are interested in letting me do a talk on Google Cloud, Frontend/Backend Development or my Career Journey`,
        endpoint: "/talks",
        imageUrl: "/images/gcp-juniordev-talk.webp",
      }}
    >
      <pre>{JSON.stringify(page, null, 2)}</pre>
      <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="relative mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold">Previous Talks</h2>
          <div className="mx-auto mt-3 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            {talks.past.map((talk, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                >
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-600">
                        {talk.date}
                      </p>
                      <a href={talk.url} className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">
                          {talk.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {talk.org}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const page = await client.getAllByType("tech-talk", {
    orderings: {
      field: "document.date",
      direction: "desc",
    },
  });

  console.log(page);

  const result: Talk[] = page.map((page, i) => {
    console.log(page.data);
    const { data } = page;

    const isLinkValid =
      data.link.kind === "document" && document.nodeName.endsWith(".pdf");

    return {
      date: moment(data.date),
      org: prismicH.asText(data.org),
      url: isLinkValid ? prismicH.asText(page.data.link.url) : null,
      title: prismicH.asText(data.title),
    };
  });

  return {
    props: { result },
  };
};

export default TalksPage;
