import React, { useState } from 'react';
import Carousel, { Modal, ModalGateway, ViewType } from 'react-images';

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
    </>
  );
};

export default GalleryModal;
