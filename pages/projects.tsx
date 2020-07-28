import ProjectCard from '../components/cards/ProjectCard';
import PageLayout from '../containers/layouts/PageLayout';
import PROJECTS from '../data/projects';
import { Text, Heading, Stack } from 'bumbag';

const Projects = () => (
  <PageLayout
    title="Projects"
    pageMeta={{
      description: 'These are some of the current and past software projects that I have worked on',
      endpoint: '/projects',
    }}
  >
    <Heading>Projects</Heading>
    <Text>These are some of the current and past software projects that I have worked on</Text>
    <Heading use="h3">Current Projects</Heading>
    <Stack variant="horizontal">
      {PROJECTS.current.map((project, index) => (
        <ProjectCard project={project} key={index} />
      ))}
    </Stack>

    <Heading use="h3">Previous Projects</Heading>
    <Stack orientation="horizontal">
      {PROJECTS.previous.map((project, index) => (
        <ProjectCard project={project} key={index} />
      ))}
    </Stack>
  </PageLayout>
);

export default Projects;
