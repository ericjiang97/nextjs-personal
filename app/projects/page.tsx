import { stegaClean } from 'next-sanity'
import SmallHeroBanner from '../../components/SmallHeroBanner'
import ProjectCard from '../../components/ProjectCard'
import MainLayout from '../../containers/MainLayout'
import classNames from '../../utils/classNames'
import { sanityFetch } from '../../sanity/lib/live'
import { PROJECTS_PAGE_QUERY, SanityProject } from '../../sanity/lib/queries'
import {
  DEFAULT_PROJECTS,
  DEFAULT_SITE_SETTINGS,
} from '../../sanity/lib/defaults'

export default async function ProjectsPage() {
  let data: any = null
  try {
    const res = await sanityFetch({ query: PROJECTS_PAGE_QUERY })
    data = res.data
  } catch {
    data = null
  }

  const settings = { ...DEFAULT_SITE_SETTINGS, ...(data?.settings || {}) }
  const allProjects: SanityProject[] =
    data?.projects && data.projects.length > 0
      ? data.projects
      : DEFAULT_PROJECTS

  const current = allProjects.filter(
    (p) => stegaClean(p.status) === 'current'
  )
  const previous = allProjects.filter(
    (p) => stegaClean(p.status) !== 'current'
  )

  const hasCurrentProjects = current.length > 0
  const hasPreviousProjects = previous.length > 0

  return (
    <MainLayout
      pageTitle="Projects"
      customHero={
        <SmallHeroBanner
          badge={settings.projectsHeroBadge}
          title={settings.projectsHeroTitle || 'Projects'}
          description={settings.projectsHeroDescription || ''}
        />
      }
      pageMeta={{
        description:
          'These are some of the current and past software projects that I have worked on',
        endpoint: '/projects',
      }}
    >
      <div className="mx-auto w-full">
        {hasCurrentProjects && (
          <section className="mb-14">
            <div className="mb-6">
              <span className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
                Active
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Current Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {current.map((project) => (
                <ProjectCard
                  key={project._id || project.name}
                  project={project}
                />
              ))}
            </div>
          </section>
        )}

        {hasPreviousProjects && (
          <section className={classNames(hasCurrentProjects ? 'mt-12' : '')}>
            <div className="mb-6">
              <span className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
                Archive &amp; Highlights
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Previous Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {previous.map((project) => (
                <ProjectCard
                  key={project._id || project.name}
                  project={project}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  )
}
