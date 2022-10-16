import { GetStaticProps, NextPage } from "next";
import moment from "moment";

import SlidesViewer from "../../components/PdfViewer/SlidesViewer";
import MainLayout from "../../containers/MainLayout";

import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../config/prismic";
import { IPrismicDocumentRecord, Talk } from "../../types";
import NotFoundPage from "../404";

type TechTalksPageProps =
  | {
      talk: Talk;
      err: null;
    }
  | {
      talk: null;
      err: string;
    };

const TechTalk: NextPage<TechTalksPageProps> = ({ talk, err }) => {
  if (err || talk === null) {
    return <NotFoundPage />;
  }
  const endpoint = `/talks/${talk.slug}`;

  return (
    <MainLayout
      pageTitle={`Tech Talk - ${talk.title}`}
      pageMeta={{
        endpoint,
        description: talk.title || "",
        imageUrl: `https://ericjiang.dev/api/static?talk=${talk.slug}`,
      }}
    >
      <div className="bg-wht -ite relative overflow-hidden py-16">
        <div className="relative flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-prose grid-cols-1 divide-y-2 divide-gray-400 text-lg">
            <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              {talk.title}
            </span>
            <div className="mt-8 w-full">
              {talk.url && (
                <SlidesViewer
                  fileUrl={talk.url}
                  talkName={talk.title || "eric-talk"}
                />
              )}
            </div>
            <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Presentation Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Information about the talk.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Date of Presentation
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {moment(talk.date).format("Do MMM YYYY")}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Organisers
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {talk.org}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
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

  const [err, blogPost] = await client
    .getByUID("tech-talk", uid)
    .then((data: IPrismicDocumentRecord) => [null, data])
    .catch((err: Error) => [err, null]);

  if (!err) {
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
      props: { talk },
    };
  }

  return {
    props: { err: err.message }, // Will be passed to the page component as props
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
