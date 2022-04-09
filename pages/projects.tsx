import SmallHeroBanner from "../components/SmallHeroBanner";
import ProjectCard from "../components/ProjectCard";

import MainLayout from "../containers/MainLayout";

import projects from "../data/projects";

function ProjectsPage() {
  return (
    <MainLayout
      pageTitle="Projects"
      showHero={false}
      customHero={
        <SmallHeroBanner
          title="Projects"
          description="Whether its a side project, or a product I'm working on at work, I bring my knowledge and energy to help build the most awesome, delightful, secure products for everyone."
        />
      }
      pageMeta={{
        description:
          "These are some of the current and past software projects that I have worked on",
        endpoint: "/projects",
      }}
    >
      <div className="container flex flex-1 flex-col">
        <h3 className="text-2xl font-semibold">Current Projects</h3>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {projects.current.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-semibold">Previous Projects</h3>
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            {projects.previous.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
export default ProjectsPage;
