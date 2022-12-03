import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import moment from "moment";

import { createClient } from "../../config/prismic";
import * as prismicH from "@prismicio/helpers";

import { PrismicText, SliceZone } from "@prismicio/react";
import { components } from "../../slices";

import MainLayout from "../../containers/MainLayout";

import { IPrismicDocumentRecord } from "../../types";

import ImagePreviewDialog from "../../components/dialogs/ImagePreviewDialog";

interface AlbumPageProps {
  album: IPrismicDocumentRecord;
}

const AlbumPage: NextPage<AlbumPageProps> = ({ album, ...props }) => {
  const endpoint = `/album/${album.uid}`;
  const firstPosted = moment(
    prismicH.asDate(album.first_publication_date)?.toISOString()
  );
  const lastUpdated = moment(
    prismicH.asDate(album.last_publication_date)?.toISOString()
  );

  const isDateSame = firstPosted.isSameOrBefore(lastUpdated);

  return (
    <MainLayout
      pageTitle={`Album`}
      pageMeta={{
        endpoint,
      }}
    >
      <div className="relative overflow-hidden bg-white py-16">
        <div className="relative flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-prose grid-cols-1 divide-y-2 divide-none text-lg">
            <span className="block text-center text-base font-semibold uppercase tracking-wide text-gray-500">
              {!isDateSame
                ? `Posted on: ${firstPosted.format("DD MMMM YYYY")}`
                : `Last Updated: ${lastUpdated.format("DD MMMM YYYY")}`}
            </span>
            <h1>
              <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                <PrismicText field={album.data.title} />
              </span>
            </h1>
          </div>

          <div className="mx-auto mt-4 flex w-full max-w-4xl flex-col">
            <SliceZone components={components} slices={album.data.body} />
          </div>
        </div>
      </div>
      <ImagePreviewDialog />
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  previewData,
  params,
}) => {
  const client = createClient({ previewData });

  const uid = params?.uid as string;

  const album = await client.getByUID("album", uid);

  return {
    props: {
      album,
    },
  };
};

export const getStaticPaths = async () => {
  const client = createClient();

  const albumPages = await client.getAllByType("album", {
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
  });
  const paths = albumPages.map((album) => {
    return { params: { uid: album.uid } };
  });
  return { paths, fallback: "blocking" };
};

export default AlbumPage;
