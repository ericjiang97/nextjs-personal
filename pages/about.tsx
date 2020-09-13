import experience from '../data/experience';
import { Experience } from '../types';
import PageLayout from '../containers/layouts/PageLayout';
import { Heading, Paragraph, Link, Container, Card, Stack, Label, List } from 'bumbag';
import HeroBase from '../components/HeroBase';
import LinkButton from '../components/LinkButton';

const AboutMe = () => (
  <PageLayout
    title="About Me"
    pageMeta={{
      description: `Hi, I’m Eric. I recently finished my course in Bachelor of Information Technology at Monash University in
        Melbourne, Australia where I majored in Computer networks and security.`,
      endpoint: '/about',
    }}
    banner={
      <HeroBase backgroundImage="url(/images/itnews-2019benchmarkmain.jpg)">
        <Heading use="h3">About Me</Heading>
        <Paragraph>
          Hi, I’m Eric. Technology has been rapidly growing and is at the forefront of bringing change. I've always
          wanted to build products for everyone which are delightful, stable and secure.
        </Paragraph>
      </HeroBase>
    }
  >
    <Container>
      <Paragraph>
        As a Test Engineer on the Script Automation Team within the Pixel Software Product Area at{' '}
        <Link href="https://about.google">Google</Link> I work on building and maintaining test automation tools, as
        well as shaping better processes to enable software and hardware teams to build the best products possible.
      </Paragraph>
      <Paragraph>
        I'd like to bring my passion for programming to building software and mechanisms to keep user data safe and
        ensuring that end users have the best user experience when using software. If you are a recruiter, I am best
        contacted via email at <Link href="mailto:recruiting@ericjiang.dev">recruiting@ericjiang.dev</Link>
      </Paragraph>
      <LinkButton palette="primary" href="https://resume.ericjiang.dev">
        Download my resume
      </LinkButton>
    </Container>
    <Container>
      <Heading use="h4">Experience</Heading>
      <Stack>
        {experience.map((experience: Experience, index) => {
          return (
            <Card variant="outlined" standalone key={index}>
              <Card.Title>
                <Heading use="h5">{experience.company}</Heading>
                {experience.positions.map((position, posIndex) => (
                  <Container marginY="0.5rem" key={posIndex}>
                    <Label fontSize="0.75rem">{position.dates}</Label>
                    <Heading use="h6">{position.title}</Heading>
                  </Container>
                ))}
              </Card.Title>
              <Card.Content>
                <Container>
                  <List listStyleType="disc" listStylePosition="outside">
                    {experience.description.map((descrip, descipIndex) => (
                      <List.Item key={descipIndex}>{descrip}</List.Item>
                    ))}
                  </List>
                </Container>
              </Card.Content>
            </Card>
          );
        })}
      </Stack>
    </Container>
  </PageLayout>
);

export default AboutMe;
