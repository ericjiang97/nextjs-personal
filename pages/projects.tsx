import { Columns, Container, Heading, Image, Paragraph, Stack } from 'bumbag';
import ProjectCard from '../components/cards/ProjectCard';
import HeroBase from '../components/core/HeroBase';
import PageLayout from '../containers/layouts/PageLayout';
import PROJECTS from '../data/projects';

const Projects = () => (
  <PageLayout
    title="Projects"
    pageMeta={{
      description: 'These are some of the current and past software projects that I have worked on',
      endpoint: '/projects',
    }}
    banner={
      <HeroBase backgroundVariant="color" backgroundColor="primary600">
        <Columns>
          <Columns.Column>
            <Heading use="h2" color="secondary">
              Projects
            </Heading>
            <Paragraph marginTop="2rem">
              Whether its a side project, or a product I'm working on at work, I bring my knowledge and energy to help
              build the most awesome, delightful, secure products for everyone.
            </Paragraph>
          </Columns.Column>
          <Columns.Column>
            <Image src="/images/monplan-futureyou.webp" width="100%" />
            <Paragraph fontSize="0.75rem">Image: MonPlan and FutureYou team</Paragraph>
          </Columns.Column>
        </Columns>
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
