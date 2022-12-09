import { GetStaticProps, NextPage } from "next";
import moment from 'moment'

import SmallHeroBanner from "../../components/SmallHeroBanner";

import { createClient } from "../../config/prismic";
import MainLayout from "../../containers/MainLayout";
import * as prismicH from "@prismicio/helpers";
import { IPrismicDocumentRecord } from "../../types";

interface AlbumHomePageProps {
  albums: IPrismicDocumentRecord[]
}

const AlbumHomePage: NextPage<AlbumHomePageProps> = ({ albums }) => {
  return <MainLayout
    customHero={
      <SmallHeroBanner
        title="Albums"
        description="I take photos in my spare time."
      />
    }
    pageTitle="Albums" pageMeta={{ description: 'Photography Albums', endpoint: '/albums' }}>
    <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mt-3 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-2">
          {
            albums.map((album, i) => {
              const firstPosted = moment(
                prismicH.asDate(album.first_publication_date)?.toISOString()
              );
              const lastUpdated = moment(
                prismicH.asDate(album.last_publication_date)?.toISOString()
              );

              const isDateSame = firstPosted.isSameOrBefore(lastUpdated);


              return <div
                key={i}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg"
              >
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    {album.data.featured_image && <div>
                      <img src={album.data.featured_image.url} alt={album.data.featured_image.alt} />
                    </div>}
                    <div className="mt-2">
                      <a href={`/albums/${album.uid}`} className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">
                          {prismicH.asText(album.data.title)}
                        </p>
                      </a>
                      <p className="text-sm font-medium text-gray-600">
                        {!isDateSame
                          ? `Posted on: ${firstPosted.format("DD MMMM YYYY")}`
                          : `Last Updated on: ${lastUpdated.format("DD MMMM YYYY")}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  </MainLayout>;
};

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const pages = await client.getAllByType("album", {
    orderings: {
      field: "document.date",
      direction: "desc"
    }
  })

  const albums = pages.map((page) => {
    return page
  })

  return {
    props: { albums }
  }
}

export default AlbumHomePage;
