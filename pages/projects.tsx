import ProjectCard from '../components/cards/ProjectCard';
import PageLayout from '../layouts/PageLayout';

const Projects = () => (
  <PageLayout title="Projects">
    <div className="w-full text-gray-900">
      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <h1 className="m-0 w-full pt-14 leading-tight text-5xl text-center font-bold">
            Projects
          </h1>
          <p className="text-center my-4 text-m">
            These are some of the current and past software projects that I have
            worked on
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-20 py-auto pb-8 flex flex-row flex-wrap justify-around">
        <ProjectCard
          name="MARIE.js"
          url="https://marie.js.org"
          imageUrl="https://avatars1.githubusercontent.com/u/18567331?v=4"
          description="MARIE.js is a very simple and intuitive Assembly Language Simulator.
      It is a web-based version of the MARIE simulator."
        />
        <ProjectCard
          name="MonPlan"
          url="https://monplan.apps.monash.edu"
          description="MonPlan is the official Monash University enterprise course planning tool, built for students by students."
        />
        <ProjectCard
          name="Muhnee"
          imageUrl="https://avatars1.githubusercontent.com/u/58194669?v=4"
          url="https://muhneeapp.com"
          description="Muhnee is a new and exciting way to make managing your money simple."
        />
        <ProjectCard
          name="COVID19 Australia Flight Tracker"
          url="https://covid19-flights.ericjiang.dev/"
          description="Tracks flights sourced from various Australian state government websites using automated scraping tool."
        />
        <ProjectCard
          name="GeckoDM"
          imageUrl="https://avatars1.githubusercontent.com/u/26992093?v=4"
          url="https://geckodm.github.io/"
          description="🐸 Gecko Download Manager is a Chrome Extension that improves downloading lectures 💾 from the Echo360 System."
        />
      </div>
    </div>
  </PageLayout>
);

export default Projects;
