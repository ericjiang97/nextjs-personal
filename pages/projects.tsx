import ProjectCard from '../components/cards/ProjectCard';
import PageLayout from '../containers/layouts/PageLayout';
import PROJECTS from '../data/projects';
import { Heading, Stack, Paragraph, Container } from 'bumbag';
import HeroBase from '../components/core/HeroBase';

const Projects = () => (
  <PageLayout
    title="Projects"
    pageMeta={{
      description: 'These are some of the current and past software projects that I have worked on',
      endpoint: '/projects',
    }}
    banner={
      <HeroBase backgroundVariant="image" backgroundImageUri="/images/monplan-futureyou.webp">
        <Heading>Projects</Heading>
        <Paragraph>These are some of the current and past software projects that I have worked on</Paragraph>
        <Paragraph fontSize="0.75rem">Background Image: MonPlan and FutureYou team</Paragraph>
      </HeroBase>
    }
  >
    <Container>
      <Heading use="h3">Current Projects</Heading>
      <Stack orientation="horizontal" verticalBelow="mobile">
        {PROJECTS.current.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </Stack>
    </Container>
    <Container marginTop="1.25rem">
      <Heading use="h3">Previous Projects</Heading>
      <Stack orientation="horizontal">
        {PROJECTS.previous.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </Stack>
    </Container>
  </PageLayout>
);

export default Projects;
