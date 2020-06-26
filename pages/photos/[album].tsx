import PageLayout from '../../containers/layouts/PageLayout';
import { photos } from '../../data/photos';
import { FlickrPhotoset } from '../../types/FlickrApi';

interface AlbumTemplateProps {
  album: string;
  albumData: FlickrPhotoset;
}

export default function AlbumTemplate(props: AlbumTemplateProps) {
  const { albumData } = props;
  return (
    <PageLayout title={`Photo - ${albumData.photoset.title}`}>
      <div className="w-full text-gray-900">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <h3 className="text-3xl font-semibold">{albumData.photoset.title}</h3>
          <pre>{JSON.stringify(props.albumData, null, 2)}</pre>
        </div>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { album } = ctx.params;
  const albumData = await fetch(
    'https://www.flickr.com/services/rest?method=flickr.photosets.getPhotos' +
      `&api_key=${process.env.NEXT_PUBLIC_FLICKR_API_KEY}&photoset_id=${album}` +
      `&user_id=${process.env.NEXT_PUBLIC_FLICKR_API_USER_ID}&format=json&nojsoncallback=1` +
      '&extras=date_upload, tags, path_alias, url_m, url_o',
  ).then((resp) => {
    return resp.json();
  });
  return { props: { albumData, album: `${album}` } };
}

export async function getStaticPaths() {
  const paths = photos.map((photo) => {
    return `/photos/${photo.albumUrl.split('/')[photo.albumUrl.split('/').length - 1]}`;
  });

  return {
    fallback: false,
    paths: [...paths],
  };
}
