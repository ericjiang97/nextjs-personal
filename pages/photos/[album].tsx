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
import { Card, Heading, Paragraph, Stack, Button } from 'bumbag';

export default function AlbumTemplate(props: InferGetStaticPropsType<typeof getServerSideProps>) {
  const { error, payload } = props;
  if (error || !payload) {
    return <Custom404 />;
  }
  const { albumData, albumInfo, meta } = payload;

  return (
    <PageLayout title={`Photo - ${albumData.photoset.title}`}>
      <Heading use="h3">{albumInfo.photoset.title._content}</Heading>
      <Paragraph>{albumInfo.photoset.description._content}</Paragraph>
      <Stack orientation="horizontal">
        {meta.pdfUrl && (
          <a href={meta.pdfUrl}>
            <Button>
              <BookOpen className="mr-2" />
              Photobook
            </Button>
          </a>
        )}
        {meta.pdfUrl && (
          <a href={meta.albumUrl}>
            <Button>
              <Icons.Flickr className="fill-current h-5 w-5 mx-2" />
              View album
            </Button>
          </a>
        )}
      </Stack>
      <Stack>
        {albumData.photoset &&
          albumData.photoset.photo &&
          albumData.photoset.photo.map((photo, index) => {
            return (
              <Card standalone key={index}>
                <LazyLoadImage src={photo.url_m} alt={photo.title} width={'100%'} effect="blur" />
                <Card.Title>{photo.title}</Card.Title>
                <Card.Content>
                  <Paragraph fontSize="0.75rem">
                    <b className="font-semibold">Taken: </b>
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
                </Card.Content>
                <Card.Footer>
                  <a href={photo.url_o} target="_blank" rel="noreferrer noopener">
                    <Button>Download</Button>
                  </a>
                </Card.Footer>
              </Card>
            );
          })}
      </Stack>
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
