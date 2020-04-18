import React from "react";

interface PhotoAlbumCardProps {
  imgUrl: string;
  albumUrl: string;
  date: string;
  albumTitle: string;
  description?: string;
  tags?: string[];
}

const PhotoAlbumCard: React.FC<PhotoAlbumCardProps> = ({
  imgUrl,
  albumUrl,
  date,
  albumTitle,
  description,
  tags,
}) => {
  return (
    <a
      className="max-w-sm rounded overflow-hidden shadow-lg bg-surface my-2 flex flex-col"
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
              className="inline-block bg-gray-200 border rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-1"
              key={index}
            >
              {`#${tag}`}
            </span>
          ))}
      </div>
    </a>
  );
};

export default PhotoAlbumCard;