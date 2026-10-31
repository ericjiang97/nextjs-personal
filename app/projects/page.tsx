import SmallHeroBanner from '../../components/SmallHeroBanner'
import ProjectCard from '../../components/ProjectCard'
import MainLayout from '../../containers/MainLayout'
import projects from '../../data/projects'
import classNames from '../../utils/classNames'

function ProjectsPage() {
  const { current, previous } = projects

  const hasCurrentProjects = current.length > 0
  const hasPreviousProjects = previous.length > 0

  return (
    <MainLayout
      pageTitle="Projects"
      customHero={
        <SmallHeroBanner
          badge="Open Source & Products"
          title="Projects"
          description="Whether it's a side project, or a product I'm working on at work, I bring my knowledge and energy to help build the most awesome, delightful, secure products for everyone."
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
                <ProjectCard key={project.name} project={project} />
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
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  )
}

export default ProjectsPage
