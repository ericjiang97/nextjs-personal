import React from 'react';

interface ProjectCardProps {
  url: string;
  imageUrl?: string;
  repoUrl?: string;
  name: string;
  description: string;
  screenshotUrl?: string;
  technologies?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ url, imageUrl, name, description, screenshotUrl, repoUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-surface my-2 mx-2 flex flex-col">
      {screenshotUrl && <img className="w-full" src={screenshotUrl} alt={name} />}
      <div className="flex-column flex-1 px-6 py-6 pb-2 flex-1">
        <div className="max-w-4xl mx-auto py-auto flex flex-1 flex-row items-center">
          {imageUrl && <img src={imageUrl} className="object-contain h-5 mr-1" />}
          <h3 className="m-0 text-brand text-lg">{name}</h3>
        </div>
        <div>
          <p className="m-0 pt-3 py-0 pb-0 text-sm text-gray-900">{description}</p>
        </div>
        <div className="m-0 py-2 flex flex-1 justify-around">
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="bg-transparent hover:bg-brand text-blue-700 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded flex items-center mx-2"
          >
            Product Url
          </a>
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-transparent hover:bg-brand text-blue-700 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded flex items-center mx-2"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
