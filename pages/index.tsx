import Hero from '../components/hero';
import PageLayout from '../containers/layouts/PageLayout';
import { Stack, Card, Set, Button, Link } from 'bumbag';

const Home = () => (
  <PageLayout title="Home">
    <Hero />

    <Stack orientation="horizontal" marginTop="1rem">
      <Card
        title="Projects"
        headerAddon={
          <Set>
            <Link href="/projects">
              <Button variant="link">View Projects</Button>
            </Link>
          </Set>
        }
      >
        I also work on alot of cool side projects both currently and in the past many of which still has a lot of users
      </Card>
      <Card
        title="🎤 Tech Talks"
        headerAddon={
          <Set>
            <Link href="/talks">
              <Button variant="link">View Talks</Button>
            </Link>
          </Set>
        }
      >
        I also do tech talks, whether its about Google Cloud, dev, cloud technologies, mobile, I will do it. Warning,
        there will be many memes inside my talks.
      </Card>
    </Stack>
  </PageLayout>
);

export default Home;
