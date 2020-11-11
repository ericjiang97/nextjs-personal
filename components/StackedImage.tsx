import React from 'react';

import { Button, Card, Container, Image, Modal, Stack } from 'bumbag';

import { PrismicImage } from '../types/PrismicBlogPost';
import { PrismicRichText } from 'prismic-reactjs-custom/dist/es/RichText.model';
import PrismicRichTextWrapper from './PrismicRichTextWrapper';

export interface StackedImage {
  stacked_image: PrismicImage;
  image_stack_description: PrismicRichText;
}

interface StackedImageRowProps {
  images: StackedImage[];
}

const StackedImageRow: React.FC<StackedImageRowProps> = ({ images }) => {
  const modal = Modal.useState();
  const [displayedImage, setDisplayedImage] = React.useState<StackedImage | null>(null);

  return (
    <React.Fragment>
      <Modal {...modal}>
        <Card>
          {displayedImage && (
            <>
              <Image
                src={displayedImage.stacked_image.url}
                width="100%"
                onClick={() => {
                  modal.setVisible(true);
                }}
              />
              <PrismicRichTextWrapper richText={displayedImage.image_stack_description} />
            </>
          )}
          <Modal.Disclosure
            use={Button}
            onClick={() => {
              modal.setVisible(false);
            }}
          >
            Close
          </Modal.Disclosure>
        </Card>
      </Modal>
      <Stack orientation="horizontal">
        {images.map((stackedImage, key: number) => {
          return (
            <Container key={key}>
              <Image
                src={stackedImage.stacked_image.url}
                width="100%"
                onClick={() => {
                  modal.setVisible(true);
                  setDisplayedImage(stackedImage);
                }}
              />
              <PrismicRichTextWrapper richText={stackedImage.image_stack_description} />
            </Container>
          );
        })}
      </Stack>
    </React.Fragment>
  );
};

export default StackedImageRow;
