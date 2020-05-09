import React from 'react';

import PhotoAlbumCard from '../components/cards/PhotoAlbumCard';
import PageLayout from '../containers/layouts/PageLayout';
import icons from '../components/icons';
import SITE_CONFIG from '../config';
import { photos } from '../data/photos';

const PhotosPage: React.FC = () => {
  return (
    <PageLayout title="Photos">
      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <h1 className="m-0 w-full pt-14 leading-tight text-5xl text-center font-bold">Photography</h1>
          <p className="text-center my-4 text-m">
            I love travelling, taking and editing photos in my spare time. Here's a couple of albums that I reckon look
            amazing, feel free to download these images and use them as your wallpaper.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
        <h2 className="my-3 w-full leading-tight text-3xl text-center font-bold">Follow me</h2>
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row flex-wrap justify-around flex-1">
          <a
            className="bg-transparent hover:bg-brand text-blue-700 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded flex items-center mx-2"
            href={SITE_CONFIG.social.INSTAGRAM}
            rel="noreferrer noopener"
            target="_blank"
          >
            <icons.Instagram className="fill-current h-5 w-5 mr-2" /> Instagram
          </a>
          <a
            className="bg-transparent hover:bg-brand text-blue-700 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded flex items-center mx-2"
            href={SITE_CONFIG.social.FLICKR}
            rel="noreferrer noopener"
            target="_blank"
          >
            <icons.Flickr className="fill-current h-5 w-5 mr-2" /> Flickr
          </a>
        </div>
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col flex-wrap justify-around flex-1 my-3">
          <h2 className="my-4 w-full max-w-xl leading-tight text-sm text-center font-light">
            Images and Media Work are licensed under Creative-Commons Attribution-NonCommercial License unless otherwise
            stated.
          </h2>
          <div className="flex-1 flex justify-center">
            <a href="https://creativecommons.org/licenses/by-nc/2.0/">
              <img src="https://licensebuttons.net/l/by-nc/3.0/88x31.png" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto pt-20 py-auto pb-8 flex flex-row flex-wrap justify-around">
        {photos.map((photo, index) => {
          const { date, imgUrl, albumTitle, albumUrl, description, tags, pdfUrl } = photo;
          return (
            <PhotoAlbumCard
              date={date}
              imgUrl={imgUrl}
              albumTitle={albumTitle}
              albumUrl={albumUrl}
              description={description}
              tags={tags}
              key={index}
              pdfUrl={pdfUrl}
            />
          );
        })}
      </div>
    </PageLayout>
  );
};

export default PhotosPage;
