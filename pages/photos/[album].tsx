import moment from 'moment';
import { InferGetStaticPropsType } from 'next';

import PageLayout from '../../containers/layouts/PageLayout';
import Custom404 from '../404';

import { photos } from '../../data/photos';
import CONSTANTS from '../../constants';
import { FlickrPhotoset, FlickrPhotosetInfo } from '../../types/FlickrApi';
import { Heading, Paragraph, Stack, Button, Link, Container } from 'bumbag';
import HeroBase from '../../components/HeroBase';

export default function AlbumTemplate(props: InferGetStaticPropsType<typeof getServerSideProps>) {
  const { error, payload } = props;
  if (error || !payload) {
    return <Custom404 />;
  }
  const { albumData, albumInfo, meta } = payload;
  return (
    <PageLayout
      title={`Photo - ${albumData.photoset.title}`}
      pageMeta={{
        description: meta.description,
        endpoint: `/photos/${meta.albumId}`,
        imageUrl: meta.imgUrl,
      }}
      banner={
        <HeroBase backgroundImage={`url(${meta.imgUrl})`}>
          <Heading use="h3">{albumInfo.photoset.title._content}</Heading>
          <Paragraph>{albumInfo.photoset.description._content}</Paragraph>
          <Stack orientation="horizontal">
            {meta.pdfUrl && (
              <a href={meta.pdfUrl}>
                <Button iconBefore="solid-book-open" palette="primary">
                  Photobook
                </Button>
              </a>
            )}
            {meta.albumUrl && (
              <a href={meta.albumUrl}>
                <Button iconBefore="brand-flickr" palette="primary">
                  View album on Flickr
                </Button>
              </a>
            )}
          </Stack>
        </HeroBase>
      }
      inChildrenInContainer={false}
    >
      <div
        style={{
          display: 'grid',
          gridGap: '0.75rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))',
          gridTemplateRows: 'repeat(auto-fill, minmax(250px,1fr))',
        }}
      >
        {albumData.photoset &&
          albumData.photoset.photo &&
          albumData.photoset.photo.map((photo, index) => {
            const bgColor = '#09203390';
            return (
              <div
                style={{
                  backgroundImage: `linear-gradient(to top, ${bgColor}, ${bgColor}), url(${photo.url_m})`,
                  backgroundPositionX: 'center',
                  backgroundSize: 'cover',
                  color: 'white',
                  display: 'flex',
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                  flexWrap: 'wrap',
                  height: 400,
                  width: '100%',
                }}
              >
                <Container flex={1} padding="0.75rem" display="flex" flexDirection="column">
                  <div style={{ flex: 1 }}>
                    <Heading use="h5">{photo.title}</Heading>
                    <Paragraph fontSize="0.75rem">
                      <b style={{ fontWeight: 600 }}>Taken: </b>
                      {moment(photo.datetaken).format('Do MMM yyyy')}
                    </Paragraph>
                    {photo.description._content && (
                      <>
                        <Heading use="h7" fontWeight={600}>
                          Description
                        </Heading>
                        <Paragraph fontSize="0.75rem">{photo.description._content}</Paragraph>
                      </>
                    )}
                  </div>
                  <Link href={photo.url_o}>
                    <Button iconBefore="solid-download">Download</Button>
                  </Link>
                </Container>
              </div>
            );
          })}
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
