import React from 'react';
import { NextPageContext } from 'next';
import PageLayout from '../containers/layouts/PageLayout';
import { Stack, Card, Set, Heading, Paragraph } from 'bumbag';
import HeroBase from '../components/core/HeroBase';
import LinkButton from '../components/buttons/LinkButton';
import getBrowserDetails, { BrowserDetails } from '../utils/browser';

interface Props {
  _userAgent: string;
  browserDetails: BrowserDetails;
}

class Home extends React.Component<Props> {
  static async getInitialProps({ req }: NextPageContext) {
    let userAgent = '';
    if (req) {
      userAgent = req.headers['user-agent'] || '';
    } else {
      userAgent = navigator.userAgent;
    }
    return { _userAgent: userAgent, browserDetails: getBrowserDetails(userAgent) };
  }

  render() {
    const { browserDetails } = this.props;
    const heroBackground =
      browserDetails.browser === 'Safari'
        ? 'url(/images/eric-jiang-bitbybit.jpeg)'
        : 'url(/images/eric-jiang-bitbybit.webp)';
    return (
      <PageLayout
        title="Home"
        banner={
          <HeroBase backgroundImage={heroBackground}>
            <Heading use="h3" shrinkBelow="tablet">
              G'day, I'm Eric.
            </Heading>
            <Heading use="h5">I’m a Test Engineer at Google.</Heading>
            <Paragraph>
              In my spare time, I make impact by building awesome software solutions and building the communities around
              me.
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
                <LinkButton href="/projects" variant="outlined" palette="primary">
                  View Projects
                </LinkButton>
              </Set>
            }
          >
            I also work on alot of cool side projects both currently and in the past many of which still has a lot of
            users
          </Card>
          <Card
            title="🎤 Tech Talks"
            headerAddon={
              <Set>
                <LinkButton href="/talks" variant="outlined" palette="primary">
                  View Talks
                </LinkButton>
              </Set>
            }
          >
            I also do tech talks, whether its about Google Cloud, dev, cloud technologies, mobile, I will do it.
            Warning, there will be many memes inside my talks.
          </Card>
        </Stack>
      </PageLayout>
    );
  }
}

export default Home;
