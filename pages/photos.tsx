import React from "react";

import Head from "next/head";
import PhotoAlbumCard from "../components/cards/PhotoAlbumCard";

const PhotosPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Photos - Eric Jiang</title>
      </Head>

      <div className="w-full text-gray-900">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around">
          <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
            <h1 className="m-0 w-full pt-14 leading-tight text-5xl text-center font-bold">
              Photography
            </h1>
            <p className="text-center my-4 text-m">
              I love travelling, taking and editing photos in my spare time.
              Here's a couple of albums that I reckon look amazing, feel free to
              download these images and use them as your wallpaper.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto pt-20 py-auto pb-8 flex flex-row flex-wrap justify-around">
          <PhotoAlbumCard
            date="October 2019"
            imgUrl="https://live.staticflickr.com/65535/48999565828_2a4c9afbe0_c_d.jpg"
            albumTitle="Melbourne in Spring (2019)"
            albumUrl="https://www.flickr.com/photos/lorderikir/albums/72157711561759951"
            description="This collection was taken in Spring 2019, during a photowalk of Melbourne and highlights the beauty of inner Melbourne during Spring time."
            tags={["melbourne", "photowalk", "spring"]}
          />
          <PhotoAlbumCard
            date="November - December 2018"
            imgUrl="https://live.staticflickr.com/65535/48812674842_0090bc752e_c_d.jpg"
            albumTitle="Landscapes of Japan & China"
            albumUrl="https://www.flickr.com/photos/lorderikir/albums/72157711187396608"
            description="This collection features the amazing landscapes captured during my trip to Japan and China in December 2018."
            tags={["japan", "china", "landscapes"]}
          />
          <PhotoAlbumCard
            date="December 2018"
            imgUrl="https://live.staticflickr.com/4833/46706146861_26b6a33c31_c_d.jpg"
            albumTitle="Best of China"
            albumUrl="https://www.flickr.com/photos/lorderikir/albums/72157705698643954"
            description="This collection was taken in December 2018 in China and highlights some famous sites around China."
            tags={["japan", "nara", "deers"]}
          />
          <PhotoAlbumCard
            date="November 2018"
            imgUrl="https://live.staticflickr.com/65535/48956243723_8daafb8076_c_d.jpg"
            albumTitle="Deers of Nara"
            albumUrl="https://www.flickr.com/photos/lorderikir/albums/72157711478836948"
            description="This collection was taken in November 2018 in Nara, Japan - during a holiday to Japan with friends, and highlights the famous deers of Nara"
            tags={["japan", "nara", "deers"]}
          />
          <PhotoAlbumCard
            date="November 2018"
            imgUrl="https://live.staticflickr.com/65535/49094351646_7536d51624_c_d.jpg"
            albumTitle="Best of Japan"
            albumUrl="https://www.flickr.com/photos/lorderikir/albums/72157688634271683"
            description="This collection was taken in November 2018 in Japan - during a holiday to Japan with friends, and highlights the culture and landscapes of Japan"
            tags={["japan"]}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotosPage;
