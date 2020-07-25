import React from 'react';
import { Card, Heading, Text, Paragraph, Button, Link } from 'bumbag';

export interface PhotoAlbumCardItem {
  albumId: string;
  imgUrl: string;
  albumUrl: string;
  date: string;
  albumTitle: string;
  description?: string;
  tags?: string[];
  pdfUrl?: string;
}

const PhotoAlbumCard: React.FC<PhotoAlbumCardItem> = ({ albumId, imgUrl, date, albumTitle, description }) => {
  return (
    <Card minWidth="300px" standalone marginY="0.5rem">
      <img className="w-full" src={imgUrl} alt={albumTitle} />
      <Card.Title>
        <Text fontSize="0.75rem">{date}</Text>
        <Heading use="h5">{albumTitle}</Heading>
      </Card.Title>
      <Card.Content>
        <Paragraph fontSize="0.9rem">{description}</Paragraph>
      </Card.Content>
      <Card.Footer>
        <Link href={`/photos/${albumId}`}>
          <Button>View Album</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default PhotoAlbumCard;
