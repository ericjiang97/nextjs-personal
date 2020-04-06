import React from "react";

const ProjectCard = ({ url, imageUrl, name, description }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="pt-4 px-5 pb-6 w-64 mt-2 mb-2 text-left no-underline text-gray-800 border border-gray-400 hover:border-blue-500"
    >
      <div className="max-w-4xl mx-auto py-auto flex flex-row items-center">
        {imageUrl && <img src={imageUrl} className="object-contain h-5 mr-1" />}
        <h3 className="m-0 text-brand text-lg">{name}</h3>
      </div>
      <p className="m-0 pt-3 py-0 pb-0 text-sm text-gray-900">{description}</p>
    </a>
  );
};

export default ProjectCard;
