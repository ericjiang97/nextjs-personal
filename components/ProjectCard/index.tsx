import React from "react";

import { Project } from "../../types";
import LinkButton from "../buttons/LinkButton";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { screenshotUrl } = project;
  return (
    <div
      key={project.name}
      className="flex flex-col overflow-hidden rounded-lg shadow-lg"
    >
      {screenshotUrl && (
        <div className="flex-shrink-0">
          <img
            className="h-48 w-full object-cover"
            src={screenshotUrl}
            alt=""
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <a href={project.url} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900">
              {project.name}
            </p>
            <p className="mt-3 text-base text-gray-500">
              {project.description}
            </p>
          </a>
        </div>
        {project.repoUrl && (
          <div className="mt-3">
            <LinkButton href={project.repoUrl}>Visit the Repo</LinkButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
