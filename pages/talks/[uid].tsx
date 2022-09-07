import { GetStaticProps, NextPage } from "next";
import { createClient } from "../../config/prismic";
import { Talk } from "../../types";

import * as prismicH from "@prismicio/helpers";
import MainLayout from "../../containers/MainLayout";
import { useState } from "react";
import SlidesViewer from "../../components/PdfViewer/SlidesViewer";

interface TechTalksPageProps {
  talk: Talk;
}

const TechTalk: NextPage<TechTalksPageProps> = ({ talk }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const endpoint = `/talks/${talk.slug}`;

  return (
    <MainLayout
      pageTitle={`Tech Talk - ${talk.title}`}
      pageMeta={{
        endpoint,
        description: talk.title || "",
      }}
    >
      <div className="relative overflow-hidden bg-white py-16">
        <div className="relative flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-prose grid-cols-1 divide-y-2 divide-gray-400 text-lg">
            <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              {talk.title}
            </span>
            <span>{talk.url}</span>
            {talk.url && <SlidesViewer fileUrl={talk.url} />}
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

  const uid = params?.uid as string;

  const blogPost = await client.getByUID("tech-talk", uid);

  const { data } = blogPost;

  const isLinkValid =
    data.link.kind === "document" && data.link.name.endsWith(".pdf");

  const talk: Talk = {
    slug: uid,
    date: data.date,
    org: prismicH.asText(data.org),
    url: isLinkValid ? data.link.url : null,
    title: prismicH.asText(data.title),
  };

  return {
    props: { talk }, // Will be passed to the page component as props
  };
};

export const getStaticPaths = async () => {
  const client = createClient();

  const techTalks = await client.getAllByType("tech-talk", {
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
  });

  const paths = techTalks.map((post) => {
    return { params: { uid: post.uid } };
  });
  return { paths, fallback: "blocking" };
};

export default TechTalk;
