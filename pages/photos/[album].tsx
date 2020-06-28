import moment from 'moment';
import { InferGetStaticPropsType } from 'next';

import { BookOpen } from 'react-feather';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Icons from '../../components/icons';
import PageLayout from '../../containers/layouts/PageLayout';
import Custom404 from '../404';

import { photos } from '../../data/photos';
import CONSTANTS from '../../constants';
import { FlickrPhotoset, FlickrPhotosetInfo } from '../../types/FlickrApi';

export default function AlbumTemplate(props: InferGetStaticPropsType<typeof getServerSideProps>) {
  const { error, payload } = props;
  if (error || !payload) {
    return <Custom404 />;
  }
  const { albumData, albumInfo, meta } = payload;

  return (
    <PageLayout title={`Photo - ${albumData.photoset.title}`}>
      <div className="w-full text-gray-900">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <div className="flex flex-1 flex-col">
            <h3 className="text-3xl font-semibold self-center">{albumInfo.photoset.title._content}</h3>
            <h3 className="text-xl font-regular text-italics">{albumInfo.photoset.description._content}</h3>
          </div>

          <div className="px-6 py-4 flex flex-wrap justify-evenly">
            {meta.pdfUrl && (
              <a
                href={meta.pdfUrl}
                className="bg-transparent hover:bg-brand text-blue-700 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded flex items-center mx-2"
              >
                <BookOpen className="mr-2" />
                Photobook
              </a>
            )}
            {meta.pdfUrl && (
              <a
                href={meta.pdfUrl}
                className="bg-transparent hover:bg-brand text-blue-700 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded flex items-center mx-2"
              >
                <Icons.Flickr className="fill-current h-5 w-5 mx-2" />
                View album
              </a>
            )}
          </div>
          <div className="flex-1 flex flex-col mt-2">
            {albumData.photoset &&
              albumData.photoset.photo &&
              albumData.photoset.photo.map((photo, index) => {
                const isEven = index % 2 === 0;
                const text = (
                  <div className="flex-1 flex flex-col  p-2 justify-center" style={{ minWidth: 280 }}>
                    <h4 className="text-xl font-light">{photo.title}</h4>
                    <div className="text-xs mt-1">
                      <b className="font-semibold">Taken: </b>
                      {moment(photo.datetaken).format('Do MMM yyyy')}
                    </div>
                    {photo.description._content && (
                      <div className="mt-2" style={{ minWidth: 280 }}>
                        <b className="text-xs font-semibold">Description</b>
                        <p className="text-sm">{photo.description._content}</p>
                      </div>
                    )}
                    <div className="mt-2" style={{ minWidth: 280 }}>
                      <a
                        className="text-xs font-semibold underline text-brand "
                        href={photo.url_o}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                );
                return (
                  <div className="flex-1 flex my-2 flex-wrap bg-surface" key={index}>
                    {isEven && text}
                    <LazyLoadImage
                      src={photo.url_m}
                      alt={photo.title}
                      height={photo.height_m}
                      width={photo.width_m}
                      effect="blur"
                    />
                    {!isEven && text}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps({ ...ctx }) {
  const { album } = ctx.params;
  let error = false;
  const albumData: FlickrPhotoset = await fetch(
    `${CONSTANTS.FLICKR_API.BASE_URI}?method=flickr.photosets.getPhotos` +
      `&api_key=${process.env.NEXT_PUBLIC_FLICKR_API_KEY}&photoset_id=${album}` +
      `&user_id=${process.env.NEXT_PUBLIC_FLICKR_API_USER_ID}&format=json&nojsoncallback=1` +
      '&extras=date_upload, tags, path_alias, url_m, url_o, date_taken, description',
  ).then((resp) => {
    return resp.json();
  });
  const albumInfo: FlickrPhotosetInfo = await fetch(
    `${CONSTANTS.FLICKR_API.BASE_URI}?method=flickr.photosets.getInfo` +
      `&api_key=${process.env.NEXT_PUBLIC_FLICKR_API_KEY}&photoset_id=${album}` +
      `&user_id=${process.env.NEXT_PUBLIC_FLICKR_API_USER_ID}&format=json&nojsoncallback=1`,
  ).then((resp) => {
    return resp.json();
  });
  const index = photos.findIndex((ele) => {
    return ele.albumId === album;
  });
  if (index === -1) {
    error = true;
  }
  const meta = photos[index];
  return { props: { error, payload: error ? null : { album, albumData, meta, albumInfo } } };
}
