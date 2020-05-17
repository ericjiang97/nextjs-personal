import React from 'react';
import { Project } from '../../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { url, imageUrl, name, description, screenshotUrl, repoUrl, technologies } = project;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-surface my-2 mx-2 flex flex-col">
      {screenshotUrl && (
        <div className="flex-1 flex items-center">
          <img className="w-full" src={screenshotUrl} alt={name} />
        </div>
      )}
      <div className="flex-column px-6 py-6 pb-2">
        <div className="max-w-4xl mx-auto py-auto flex flex-1 flex-row items-center">
          {imageUrl && <img src={imageUrl} className="object-contain h-5 mr-1" />}
          <h3 className="m-0 text-brand text-lg">{name}</h3>
        </div>
        <div>
          <p className="m-0 pt-3 py-0 pb-0 text-sm text-gray-900">{description}</p>
        </div>
        {technologies && (
          <div>
            <h4 className="m-0 py-4 pb-0 text-sm text-gray-900 font-semibold">Technologies Used</h4>
            <ul className="list-inside list-disc">
              {technologies.map((tech, index) => (
                <li className="text-sm text-gray-900" key={index}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="m-0 mt-2 py-2 flex flex-1 justify-around">
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
