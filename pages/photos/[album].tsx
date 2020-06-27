import moment from 'moment';

import PageLayout from '../../containers/layouts/PageLayout';
import { photos } from '../../data/photos';
import { FlickrPhotoset, FlickrPhotosetInfo } from '../../types/FlickrApi';
import CONSTANTS from '../../constants';

interface AlbumTemplateProps {
  album: string;
  albumData: FlickrPhotoset;
  albumInfo: FlickrPhotosetInfo;
}

export default function AlbumTemplate(props: AlbumTemplateProps) {
  const { albumData, albumInfo } = props;
  return (
    <PageLayout title={`Photo - ${albumData.photoset && albumData.photoset.title}`}>
      <div className="w-full text-gray-900">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <h3 className="text-3xl font-semibold">{albumInfo.photoset && albumInfo.photoset.title._content}</h3>
          <h3 className="text-2xl font-regular">{albumInfo.photoset && albumInfo.photoset.description._content}</h3>

          <div className="flex-1 flex flex-col mt-2">
            {albumData.photoset.photo &&
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
                  </div>
                );
                return (
                  <div
                    className="flex-1 flex my-2 flex-wrap"
                    key={index}
                    style={{ backgroundColor: isEven ? '#222' : 'inherit' }}
                  >
                    {isEven && text}
                    <img src={photo.url_m} alt={photo.title} />
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

export async function getStaticProps({ ...ctx }) {
  const { album } = ctx.params;
  const albumData = await fetch(
    `${CONSTANTS.FLICKR_API.BASE_URI}?method=flickr.photosets.getPhotos` +
      `&api_key=${process.env.NEXT_PUBLIC_FLICKR_API_KEY}&photoset_id=${album}` +
      `&user_id=${process.env.NEXT_PUBLIC_FLICKR_API_USER_ID}&format=json&nojsoncallback=1` +
      '&extras=date_upload, tags, path_alias, url_m, url_o, date_taken, description',
  ).then((resp) => {
    return resp.json();
  });
  const albumInfo = await fetch(
    `${CONSTANTS.FLICKR_API.BASE_URI}?method=flickr.photosets.getInfo` +
      `&api_key=${process.env.NEXT_PUBLIC_FLICKR_API_KEY}&photoset_id=${album}` +
      `&user_id=${process.env.NEXT_PUBLIC_FLICKR_API_USER_ID}&format=json&nojsoncallback=1`,
  ).then((resp) => {
    return resp.json();
  });
  return { props: { album, albumData, albumInfo } };
}

export async function getStaticPaths() {
  const paths = photos.map((photo) => {
    return `/photos/${photo.albumId}`;
  });

  return {
    fallback: false,
    paths: [...paths],
  };
}
