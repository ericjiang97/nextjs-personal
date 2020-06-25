import PageLayout from '../../containers/layouts/PageLayout';
import { photos } from '../../data/photos';

export default function AlbumTemplate(props: {}) {
  const {} = props;
  return (
    <PageLayout title={`Blog - ${'Hello'}`}>
      <div className="w-full text-gray-900">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around"></div>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { album } = ctx.params;
  return { props: { album } };
}

export async function getStaticPaths() {
  const paths = photos.map((photo) => {
    return { params: { album: `/photos/${photo.albumUrl.split('/')[photo.albumUrl.split('/').length - 1]}` } };
  });

  return {
    fallback: false,
    paths: [...paths],
  };
}
