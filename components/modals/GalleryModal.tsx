import React, { useState } from 'react';
import Carousel, { Modal, ModalGateway, ViewType } from 'react-images';
import { Button } from 'bumbag';

const GalleryModal: React.FC<{ images: ViewType[] }> = ({ images }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(images);
  return (
    <>
      <ModalGateway>
        {modalOpen ? (
          <Modal
            onClose={() => {
              setModalOpen(false);
              setCurrentIndex(0);
            }}
          >
            <Carousel views={images} currentIndex={currentIndex} />
          </Modal>
        ) : null}
      </ModalGateway>
      <Carousel
        trackProps={{
          onViewChange: (index) => {
            setCurrentIndex(index);
          },
        }}
        views={images}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => setModalOpen(true)} iconBefore="solid-expand" variant="ghost" palette="primary">
          View Larger Image
        </Button>
      </div>
    </>
  );
};

export default GalleryModal;
