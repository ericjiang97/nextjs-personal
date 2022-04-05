import React from "react";

interface YoutubeEmbedProps {
  youtubeUrl: string;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ youtubeUrl }) => {
  let youtubeUrlComponents = youtubeUrl.split("/");

  const youtubeId = youtubeUrlComponents[youtubeUrlComponents.length - 1];

  return (
    <iframe
      width="100%"
      height="315"
      src={`https://www.youtube.com/embed/${youtubeId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      className="mt-2"
      allowFullScreen
    ></iframe>
  );
};

export default YoutubeEmbed;
