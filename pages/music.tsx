import React, { useEffect } from 'react';
import SITE_CONFIG from '../config';
import PageLayout from '../containers/layouts/PageLayout';
import HeroBase from '../components/core/HeroBase';
import { Heading, Paragraph, Card, Spinner, Image, Button, Link, styled } from 'bumbag';
import { LastFmRecent, LastFmTrack } from '../types/LastFmApi';
import LinkButton from '../components/buttons/LinkButton';

const { lastfm } = SITE_CONFIG;

const TrackContainer = styled.div`
  max-height: 500px;
  width: 100%;
  overflow-y: scroll;
`;

const DiskContainer = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 100%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  animation-name: spin;
  animation-duration: 10000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const MusicTrack: React.FC<{ nowPlaying?: boolean; track: LastFmTrack }> = ({ nowPlaying, track }) => {
  const linkProps = Link.useProps({
    href: track.url,
  });
  return (
    <Card
      standalone
      style={{
        display: 'flex',
        flex: 1,
        flexWrap: 'wrap',
        marginTop: '0.75rem',
        marginBottom: '0.75rem',
      }}
      variant="bordered"
    >
      <div style={{ flex: 1, minWidth: 280 }}>
        {nowPlaying && (
          <Heading color="success" use="h6" marginBottom="0">
            Now Playing...
          </Heading>
        )}
        <Heading use="h4" marginBottom="0" marginTop="0.25rem">
          {track.name}
        </Heading>
        <Heading use="h5" marginTop="0.5rem">
          {track.artist['#text']}
        </Heading>
        <LinkButton {...linkProps} iconBefore="solid-info-circle" palette="secondary">
          Track Info
        </LinkButton>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {nowPlaying ? (
          <DiskContainer
            style={{
              backgroundImage: `url(${track.image[2]['#text']})`,
            }}
          >
            <div
              style={{
                height: 30,
                width: 30,
                borderRadius: '100%',
                backgroundColor: 'white',
              }}
            />
          </DiskContainer>
        ) : (
          <Image src={track.image[2]['#text']} alt={track.name} height="100px" marginY="0.25rem" />
        )}
      </div>
    </Card>
  );
};

const Music: React.FC = () => {
  const [recentTracks, setRecentTracks] = React.useState<LastFmRecent | null>(null);
  const [shouldUpdate, setShouldUpdate] = React.useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      if (shouldUpdate) {
        const data: LastFmRecent = await fetch(
          `${lastfm.BASE_URI}/?method=user.getrecenttracks&user=${lastfm.USER_NAME}&api_key=${lastfm.API_KEY}&format=json`,
        ).then((resp) => {
          return resp.json();
        });
        setRecentTracks(data);
        setShouldUpdate(false);
      }
    }
    getData();
  }, [shouldUpdate, setShouldUpdate]);

  return (
    <PageLayout
      title="Music"
      pageMeta={{ endpoint: '/music', description: "Here's the music I'm listening to" }}
      banner={
        <HeroBase backgroundImage="url('/images/juja-han-HU-uL54pfQI-unsplash.jpg')">
          <Heading>Music</Heading>
          <Heading use="h3">Here's the music I'm currently listening to</Heading>
          <Paragraph>Powered by last.fm</Paragraph>
          <Paragraph>
            Photo by{' '}
            <Link
              href="https://unsplash.com/@juja_han?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              color="warning"
            >
              Juja Han
            </Link>{' '}
            on{' '}
            <Link
              href="https://unsplash.com/s/photos/music?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              color="warning"
            >
              Unsplash
            </Link>
          </Paragraph>
          <Button
            onClick={() => setShouldUpdate(true)}
            palette="primary"
            iconBefore="solid-sync"
            aria-label="refresh currently playing song"
          >
            Refresh
          </Button>
        </HeroBase>
      }
    >
      <Card standalone variant="bordered">
        {!recentTracks || shouldUpdate ? (
          <Card.Content display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Spinner size="medium" color="primary" />
            <Paragraph marginTop="0.75rem">Loading content...</Paragraph>
          </Card.Content>
        ) : recentTracks.recenttracks &&
          recentTracks.recenttracks.track[0]['@attr'] &&
          recentTracks.recenttracks.track[0]['@attr'].nowplaying === 'true' ? (
          <>
            <Card.Header>
              <MusicTrack nowPlaying={true} track={recentTracks.recenttracks.track[0]} />
            </Card.Header>
            <Card.Content>
              <Heading use="h5">Previously Played</Heading>
              <TrackContainer>
                {recentTracks.recenttracks.track.map((track, index) => {
                  if (index !== 0) {
                    return <MusicTrack nowPlaying={false} track={track} key={index} />;
                  }
                  return null;
                })}
              </TrackContainer>
            </Card.Content>
          </>
        ) : (
          <>
            <Card.Header display="flex" flexDirection="column">
              <Heading color="primary" use="h3">
                Currently Not Playing Anything
              </Heading>
              <Paragraph>So what? I don't listen to music 24/7</Paragraph>
            </Card.Header>
            <Card.Content>
              <Heading use="h5">Previously Played</Heading>
              <TrackContainer>
                {recentTracks.recenttracks.track.map((track, index) => {
                  return <MusicTrack nowPlaying={false} track={track} key={index} />;
                })}
              </TrackContainer>
            </Card.Content>
          </>
        )}
      </Card>
    </PageLayout>
  );
};

export default Music;
