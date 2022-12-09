import moment from "moment";
import { GetStaticProps, NextPage } from "next";

import * as prismicH from "@prismicio/helpers";

import SmallHeroBanner from "../../components/SmallHeroBanner";
import MainLayout from "../../containers/MainLayout";

import { createClient } from "../../config/prismic";
import { Talk } from "../../types";

interface PageProps {
  talks: Talk[];
}

const TalksPage: NextPage<PageProps> = ({ talks }) => {
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
      <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mt-3 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            {talks.map((talk, index) => {
              if (talk.slug == null) {
                return null;
              }
              return (
                <div
                  key={talk.slug}
                  className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                >
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-600">
                        {moment(talk.date).format("Do MMM YYYY")}
                      </p>
                      <a href={`/talks/${talk.slug}`} className="mt-2 block">
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

  const talks: Talk[] = page
    .map((page) => {
      console.log(page);
      const { data, uid } = page;
      const isLinkValid =
        data.link.kind === "document" && data.link.name.endsWith(".pdf");

      return {
        slug: uid,
        date: data.date,
        org: prismicH.asText(data.org),
        url: isLinkValid ? page.data.link.url : null,
        title: prismicH.asText(data.title),
      };
    })
    .sort((a, b) => (moment(a.date).isAfter(moment(b.date)) ? -1 : 1));

  return {
    props: { talks },
  };
};

export default TalksPage;
