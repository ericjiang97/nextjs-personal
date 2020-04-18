import React from 'react';

import Head from 'next/head';
import PhotoAlbumCard from '../components/cards/PhotoAlbumCard';
import PageLayout from '../layouts/PageLayout';
import icons from '../components/icons';
import SITE_CONFIG from '../config';

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
      </div>

      <div className="max-w-screen-xl mx-auto pt-20 py-auto pb-8 flex flex-row flex-wrap justify-around">
        <PhotoAlbumCard
          date="April 2020"
          imgUrl="https://live.staticflickr.com/65535/49786504693_24a3911632_k_d.jpg"
          albumTitle="Photo Picks (2018 - 2019)"
          albumUrl="https://www.flickr.com/photos/lorderikir/albums/72157713935845637"
          description="This collection features unpublished and unshared photos taken in the past two years, and highlights the world more."
          tags={['melbourne', 'japan', 'spring']}
        />
        <PhotoAlbumCard
          date="October 2019"
          imgUrl="https://live.staticflickr.com/65535/48999565828_2a4c9afbe0_c_d.jpg"
          albumTitle="Melbourne in Spring (2019)"
          albumUrl="https://www.flickr.com/photos/lorderikir/albums/72157711561759951"
          description="This collection was taken in Spring 2019, during a photowalk of Melbourne and highlights the beauty of inner Melbourne during Spring time."
          tags={['melbourne', 'photowalk', 'spring']}
        />
        <PhotoAlbumCard
          date="November - December 2018"
          imgUrl="https://live.staticflickr.com/65535/48812674842_0090bc752e_c_d.jpg"
          albumTitle="Landscapes of Japan & China"
          albumUrl="https://www.flickr.com/photos/lorderikir/albums/72157711187396608"
          description="This collection features the amazing landscapes captured during my trip to Japan and China in December 2018."
          tags={['japan', 'china', 'landscapes']}
        />
        <PhotoAlbumCard
          date="December 2018"
          imgUrl="https://live.staticflickr.com/4833/46706146861_26b6a33c31_c_d.jpg"
          albumTitle="Best of China"
          albumUrl="https://www.flickr.com/photos/lorderikir/albums/72157705698643954"
          description="This collection was taken in December 2018 in China and highlights some famous sites around China."
          tags={['china', 'landscapes']}
        />
        <PhotoAlbumCard
          date="November 2018"
          imgUrl="https://live.staticflickr.com/65535/48956243723_8daafb8076_c_d.jpg"
          albumTitle="Deers of Nara"
          albumUrl="https://www.flickr.com/photos/lorderikir/albums/72157711478836948"
          description="This collection was taken in November 2018 in Nara, Japan - during a holiday to Japan with friends, and highlights the famous deers of Nara"
          tags={['japan', 'nara', 'deers']}
        />
        <PhotoAlbumCard
          date="November 2018"
          imgUrl="https://live.staticflickr.com/65535/49094351646_7536d51624_c_d.jpg"
          albumTitle="Best of Japan"
          albumUrl="https://www.flickr.com/photos/lorderikir/albums/72157688634271683"
          description="This collection was taken in November 2018 in Japan - during a holiday to Japan with friends, and highlights the culture and landscapes of Japan"
          tags={['japan']}
        />
      </div>
    </PageLayout>
  );
};

export default PhotosPage;
