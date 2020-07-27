import experience from '../data/experience';
import { Experience } from '../types';
import PageLayout from '../containers/layouts/PageLayout';
import { Heading, Paragraph, Link, Button, Container, Card, Stack, Label, List } from 'bumbag';

const AboutMe = () => (
  <PageLayout
    title="About Me"
    pageMeta={{
      description: `Hi, I’m Eric. I recently finished my course in Bachelor of Information Technology at Monash University in
        Melbourne, Australia where I majored in Computer networks and security.`,
      endpoint: '/about',
    }}
  >
    <Heading use="h3">About Me</Heading>
    <Container>
      <Paragraph>
        Hi, I’m Eric. I recently finished my course in Bachelor of Information Technology at Monash University in
        Melbourne, Australia where I majored in Computer networks and security. You can read more about me and why I
        choose an IT degree at Monash{' '}
        <Link href="https://www.monash.edu/it/future-students/meet-our-students/eric-jiang">here</Link>.
      </Paragraph>
      <Paragraph>
        I am known for founding and delivering MonPlan which is the Monash University enterprise course planning tool,
        built for students by students and was awarded the Rising Star category of the 2019 itnews Benchmark Awards -
        this is a National Award which recognizes a young IT professional who displays exceptional promise and has
        already clocked up impressive achievements.
      </Paragraph>
      <Paragraph>
        I'd like to bring my passion for programming to building software and mechanisms to keep user data safe and
        ensuring that end users have the best user experience when using software. If you are a recruiter, I am best
        contacted via email at <Link href="mailto:recruiting@ericjiang.dev">recruiting@ericjiang.dev</Link>
      </Paragraph>
      <a href="https://resume.ericjiang.dev" target="_blank" rel="noreferrer noopener">
        <Button palette="primary">Download my resume</Button>
      </a>
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
