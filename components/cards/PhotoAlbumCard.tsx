import { Card, Heading, Image, Paragraph, Text } from 'bumbag';
import React from 'react';
import LinkButton from '../buttons/LinkButton';

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
      <Image width="100%" src={imgUrl} alt={albumTitle} />
      <Card.Title>
        <Text fontSize="0.75rem">{date}</Text>
        <Heading use="h5">{albumTitle}</Heading>
      </Card.Title>
      <Card.Content>
        <Paragraph fontSize="0.9rem">{description}</Paragraph>
      </Card.Content>
      <Card.Footer>
        <LinkButton href={`/photos/${albumId}`}>View Album</LinkButton>
      </Card.Footer>
    </Card>
  );
};

export default PhotoAlbumCard;
