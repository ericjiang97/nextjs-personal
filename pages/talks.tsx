import talks from '../data/talks';
import { Talk } from '../types/talks';
import PageLayout from '../containers/layouts/PageLayout';
import { Heading, Paragraph, Stack, Container, Card, Button, Label } from 'bumbag';
import HeroBase from '../components/HeroBase';

const TalkCard: React.FC<Talk> = (talk) => {
  return (
    <Card variant="bordered" standalone>
      <Card.Title>
        <Label fontSize="0.75rem" marginBottom="0.25rem">
          {talk.date}
        </Label>
        <Heading use="h5">{talk.title}</Heading>
      </Card.Title>
      <Card.Content>
        <Paragraph>{talk.org}</Paragraph>
      </Card.Content>
      <Card.Footer>
        <a href={talk.url} target="_blank" rel="noopener noreferrer">
          <Button>View Talk</Button>
        </a>
      </Card.Footer>
    </Card>
  );
};

const TechTalks = () => (
  <PageLayout title="Tech Talks" banner={
    <HeroBase backgroundImage="url('/images/gcp-juniordev-talk.jpg')">
      <Heading use="h3">Tech Talks</Heading>
      <Paragraph>
        I put the tech in my talks… And also memes), just kidding. I actually love doing tech talks, hit me up if you
        are interested in letting me do a talk on Google Cloud, Frontend/Backend Development or my Career Journey
    </Paragraph>
    </HeroBase>
  }>

    <Container>
      <Heading use="h4">Upcoming Talks</Heading>
      {talks.upcoming.length === 0 && <Paragraph>No talks upcoming... Hit me up!</Paragraph>}
      {talks.upcoming.map((talk: Talk, i) => {
        return <TalkCard {...talk} key={i} />;
      })}
      <hr />
      <Heading use="h4">Past talks</Heading>
      <Stack>
        {talks.past.map((talk: Talk, i) => {
          return <TalkCard {...talk} key={i} />;
        })}
      </Stack>
    </Container>
  </PageLayout>
);

export default TechTalks;
