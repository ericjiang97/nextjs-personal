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
          title="Projects"
          description="Whether its a side project, or a product I'm working on at work, I bring my knowledge and energy to help build the most awesome, delightful, secure products for everyone."
        />
      }
      pageMeta={{
        description:
          'These are some of the current and past software projects that I have worked on',
        endpoint: '/projects',
      }}
    >
      <div className="relative mx-auto mt-6 max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div className="container flex flex-1 flex-col">
          {hasCurrentProjects && (
            <>
              <h3 className="text-2xl font-semibold dark:text-white">
                Current Projects
              </h3>
              <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                {current.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </>
          )}
          {hasPreviousProjects && (
            <div className={classNames(hasCurrentProjects ? 'mt-12' : 'mt-8')}>
              <h3 className="text-2xl font-semibold dark:text-white">
                Previous Projects
              </h3>
              <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                {previous.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
export default ProjectsPage
