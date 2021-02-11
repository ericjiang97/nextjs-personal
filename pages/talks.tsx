import React from 'react';

import { Card, Columns, Container, Heading, Image, Label, Paragraph } from 'bumbag';
import { NextPageContext } from 'next';
import LinkButton from '../components/buttons/LinkButton';
import HeroBase from '../components/core/HeroBase';
import PageLayout from '../containers/layouts/PageLayout';
import talks from '../data/talks';
import { Talk } from '../types/talks';
import getBrowserDetails, { BrowserDetails } from '../utils/browser';

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
        <LinkButton href={talk.url}>View Talk</LinkButton>
      </Card.Footer>
    </Card>
  );
};

interface Props {
  _userAgent: string;
  browserDetails: BrowserDetails;
}

class TechTalks extends React.Component<Props> {
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
      browserDetails.browser === 'Safari' ? '/images/gcp-juniordev-talk.jpeg' : '/images/gcp-juniordev-talk.webp';
    return (
      <PageLayout
        title="Tech Talks"
        banner={
          <HeroBase backgroundVariant="color" backgroundColor="primary600">
            <Columns>
              <Columns.Column>
                <Heading use="h3">Tech Talks</Heading>
                <Paragraph marginTop="1.5rem">
                  I put the tech in my talks… And also memes), just kidding. I actually love doing tech talks, hit me up
                  if you are interested in letting me do a talk on Google Cloud, Frontend/Backend Development or my
                  Career Journey
                </Paragraph>
              </Columns.Column>
              <Columns.Column>
                <Image src={heroBackground} width="100%" />
              </Columns.Column>
            </Columns>
          </HeroBase>
        }
        pageMeta={{
          description: `I put the tech in my talks… And also memes), just kidding. I actually love doing tech talks, hit me up if you
    are interested in letting me do a talk on Google Cloud, Frontend/Backend Development or my Career Journey`,
          endpoint: '/talks',
          imageUrl: '/images/gcp-juniordev-talk.webp',
        }}
      >
        <Container>
          <Columns>
            <Columns.Column spread={3}>
              <Heading use="h4">Upcoming Talks</Heading>
            </Columns.Column>
            <Columns.Column>
              {talks.upcoming.length === 0 && <Paragraph>No talks upcoming... Hit me up!</Paragraph>}
              {talks.upcoming.map((talk: Talk, i) => {
                return <TalkCard {...talk} key={i} />;
              })}
            </Columns.Column>
          </Columns>

          <hr />
          <Heading use="h4">Past talks</Heading>
          {talks.past.map((talk: Talk, i) => {
            return (
              <Columns key={i}>
                <Columns.Column spread={3}>{talk.date}</Columns.Column>
                <Columns.Column key={i}>
                  <TalkCard {...talk} key={i} />
                </Columns.Column>
              </Columns>
            );
          })}
        </Container>
      </PageLayout>
    );
  }
}

export default TechTalks;
