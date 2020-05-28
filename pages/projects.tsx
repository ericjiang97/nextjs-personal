import ProjectCard from '../components/cards/ProjectCard';
import PageLayout from '../containers/layouts/PageLayout';
import PROJECTS from '../data/projects';

const Projects = () => (
  <PageLayout title="Projects">
    <div className="w-full text-gray-900">
      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <h1 className="m-0 w-full pt-14 leading-tight text-5xl text-center font-bold">Projects</h1>
          <p className="text-center my-4 text-m">
            These are some of the current and past software projects that I have worked on
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
        <div className="max-w-4xl w-full mx-auto py-auto pb-2 flex flex-1 flex-col justify-around">
          <h2 className="m-0 w-full pt-14 leading-tight text-3xl text-left font-bold">Current Projects</h2>
          <div className="max-w-4xl mx-auto pt-5 py-auto pb-8 flex flex-row flex-wrap justify-around">
            {PROJECTS.current.map((project, index) => (
              <ProjectCard project={project} key={index} />
            ))}
          </div>
        </div>

        <div className="max-w-4xl w-full mx-auto py-auto pb-2 flex flex-1 flex-col justify-around">
          <h2 className="m-0 w-full pt-14 leading-tight text-3xl text-left font-bold">Previous Projects</h2>
          <div className="max-w-4xl mx-auto pt-5 py-auto pb-8 flex flex-row flex-wrap justify-around">
            {PROJECTS.previous.map((project, index) => (
              <ProjectCard project={project} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);

export default Projects;
