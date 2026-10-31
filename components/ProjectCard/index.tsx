'use client'
import React from 'react'
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react'

import { Project } from '../../types'
import { CardContainer, CardBody, CardItem } from '../ui/3d-card'

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({
  project,
}: React.PropsWithChildren<ProjectCardProps>) => {
  const { screenshotUrl, imageUrl } = project

  return (
    <CardContainer className="inter-var h-full w-full" containerClassName="h-full">
      <CardBody className="group/card relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/85 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-sky-500/40 hover:shadow-xl dark:border-white/[0.09] dark:bg-neutral-900/80 dark:hover:border-sky-400/30 dark:hover:shadow-sky-500/[0.08]">
        <div>
          <CardItem translateZ="60" className="w-full">
            {screenshotUrl ? (
              <div className="relative mb-5 h-44 w-full overflow-hidden rounded-xl border border-neutral-200/60 dark:border-white/10">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                  src={screenshotUrl}
                  alt={project.name}
                />
              </div>
            ) : (
              <div className="relative mb-5 flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-200/60 bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-purple-500/10 dark:border-white/10 dark:from-sky-500/15 dark:via-indigo-500/15 dark:to-purple-500/15">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={project.name}
                    className="h-16 w-16 rounded-2xl object-cover shadow-md transition-transform duration-300 group-hover/card:scale-110"
                  />
                ) : (
                  <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-3xl font-extrabold text-transparent">
                    {project.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
            )}
          </CardItem>

          <CardItem
            translateZ="40"
            className="text-xl font-bold text-neutral-900 dark:text-white"
          >
            {project.name}
          </CardItem>

          <CardItem
            as="p"
            translateZ="30"
            className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            {project.description}
          </CardItem>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-neutral-200/60 pt-4 dark:border-white/10">
          <CardItem
            translateZ={25}
            as="a"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 transition-colors hover:text-sky-500 dark:text-sky-400"
          >
            <span>Launch Project</span>
            <IconExternalLink className="h-3.5 w-3.5" />
          </CardItem>

          {project.repoUrl && (
            <CardItem
              translateZ={25}
              as="a"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-100/80 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:border-sky-500/40 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-sky-400"
            >
              <IconBrandGithub className="h-3.5 w-3.5" />
              <span>Source</span>
            </CardItem>
          )}
        </div>
      </CardBody>
    </CardContainer>
  )
}

export default ProjectCard
