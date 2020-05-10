import React from 'react';

export interface PhotoAlbumCardItem {
  imgUrl: string;
  albumUrl: string;
  date: string;
  albumTitle: string;
  description?: string;
  tags?: string[];
  pdfUrl?: string;
}

const PhotoAlbumCard: React.FC<PhotoAlbumCardItem> = ({
  imgUrl,
  albumUrl,
  date,
  albumTitle,
  description,
  tags,
  pdfUrl,
}) => {
  return (
    <a
      className="max-w-sm rounded overflow-hidden shadow-lg bg-surface my-2 mx-2 flex flex-col"
      href={albumUrl}
      target="_blank"
      rel="noreferer noopener"
    >
      <img className="w-full" src={imgUrl} alt={albumTitle} />
      <div className="px-6 py-4 flex-1">
        <div className="text-sm mb-1">{date}</div>
        <div className="font-semibold text-xl mb-2">{albumTitle}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4 flex flex-wrap justify-around">
        {tags &&
          tags.map((tag, index) => (
            <span
              className="inline-block bg-gray-200 border rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-1 my-1"
              key={index}
            >
              {`#${tag}`}
            </span>
          ))}
      </div>
      <div className="px-6 py-4 flex flex-wrap justify-center">
        {pdfUrl && (
          <a
            href={pdfUrl}
            className="bg-transparent hover:bg-brand text-blue-700 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded flex items-center mx-2"
          >
            Download Album
          </a>
        )}
      </div>
    </a>
  );
};

export default PhotoAlbumCard;
