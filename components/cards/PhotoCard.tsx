import React from 'react';
import moment from 'moment';

import { Heading, Link, Button, Paragraph } from 'bumbag';
import { FlickrPhoto } from '../../types/FlickrApi';

interface PhotoCardProps {
  photo: FlickrPhoto;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const [isHover, setIsHover] = React.useState(false);
  const bgColor = '#09203390';

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top, ${bgColor}, ${bgColor}), url(${photo.url_m})`,
        backgroundPositionX: 'center',
        backgroundSize: 'cover',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: 400,
        padding: '0.75rem',
        width: '100%',
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div style={{ flex: 1 }}>
        <Heading use="h5">{photo.title}</Heading>
        {isHover && (
          <>
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
          </>
        )}
      </div>
      <Link href={photo.url_o}>
        <Button iconBefore="solid-download">Download</Button>
      </Link>
    </div>
  );
};

export default PhotoCard;
