import PageLayout from '../containers/layouts/PageLayout';
import { Stack, Card, Set, Button, Link, Heading, Paragraph } from 'bumbag';
import HeroBase from '../components/HeroBase';

const Home = () => (
  <PageLayout
    title="Home"
    banner={
      <HeroBase backgroundImage="url(/images/eric-jiang-bitbybit.jpeg)">
        {' '}
        <Heading use="h3" shrinkBelow="tablet">
          G'day, I'm Eric.
        </Heading>
        <Heading use="h5">I’m a Test Engineer at Google.</Heading>
        <Paragraph>
          In my spare time, I make impact by building awesome software solutions and building the communities around me.
        </Paragraph>
      </HeroBase>
    }
    pageMeta={{
      description: "G'day, I'm Eric. I’m a Test Engineer at Google.",
      endpoint: '/',
      imageUrl: '/images/eric-jiang-bitbybit.jpeg',
    }}
  >
    <Stack orientation="horizontal" marginTop="1rem">
      <Card
        title="Projects"
        headerAddon={
          <Set>
            <Link href="/projects">
              <Button variant="outlined" palette="primary">
                View Projects
              </Button>
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
              <Button variant="outlined" palette="primary">
                View Talks
              </Button>
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
