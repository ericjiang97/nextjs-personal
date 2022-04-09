import React, { useEffect } from "react";
import { NextPage } from "next";
import SmallHeroBanner from "../components/SmallHeroBanner";
import MainLayout from "../containers/MainLayout";
import { LastFmRecent, LastFmTrack } from "../types/LastFmApi";
import config from "../config";
import Image from "next/image";
import LinkButton from "../components/buttons/LinkButton";

const MusicTrack: React.FC<{ nowPlaying?: boolean; track: LastFmTrack }> = ({
  nowPlaying,
  track,
}) => {
  return (
    <div className="my-1 flex flex-1 flex-wrap ">
      <div className="min-w-md flex-1">
        {nowPlaying && (
          <h6 className="mb-0 text-sm font-semibold text-green-600">
            Now Playing...
          </h6>
        )}
        <div>
          <h4 className="text-grey-600 mt-1 mb-0 text-xl font-semibold">
            {track.name}
          </h4>
          <h5 className="text-grey-900 text-md mt-1">
            {track.artist["#text"]}
          </h5>
        </div>
        <LinkButton>Track Info</LinkButton>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {nowPlaying ? (
          <div
            className="flex h-32 w-32 animate-disc-spin items-center justify-center"
            style={{
              backgroundImage: `url(${track.image[2]["#text"]})`,
              backgroundPosition: "center",
              borderRadius: "100%",
            }}
          >
            <div
              className="h-5 w-5 bg-white"
              style={{
                borderRadius: "100%",
              }}
            />
          </div>
        ) : (
          <img src={track.image[2]["#text"]} alt={track.name} height="100px" />
        )}
      </div>
    </div>
  );
};

const PreviousPlayerContainer: React.FC<{ tracks: LastFmTrack[] }> = ({
  tracks,
}) => {
  return (
    <div className="mt-2">
      <h5 className="text-md text-2xl font-semibold">Previously Played</h5>
      <div className="mt-4 grid max-h-96 grid-cols-1 overflow-auto px-4">
        {tracks.map((track, index) => {
          if (index !== 0) {
            return <MusicTrack nowPlaying={false} track={track} key={index} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const LiveMusicPage: NextPage = () => {
  const [recentTracks, setRecentTracks] = React.useState<LastFmRecent | null>(
    null
  );

  useEffect(() => {
    async function getData() {
      console.log("fetching data...");
      const data: LastFmRecent = await fetch(
        `${config.LASTFM.BASE_URI}/?method=user.getrecenttracks&user=${config.LASTFM.USER_NAME}&api_key=${config.LASTFM.API_KEY}&format=json`
      ).then((resp) => {
        return resp.json();
      });
      setRecentTracks(data);
    }
    getData();
    const intervalId = setInterval(() => {
      console.log("fetching data...");
      getData();
    }, 30 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <MainLayout
      pageTitle="Live Music"
      customHero={
        <SmallHeroBanner
          title="Live Music"
          description="Here's the music I'm currently listening to, feel free to listen along with me!"
        />
      }
      pageMeta={{
        endpoint: "/music",
        description: "Here's the music I'm listening to",
      }}
    >
      <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="relative mx-auto max-w-4xl">
          <div>
            {!recentTracks ? (
              <div className="flex flex-col items-center justify-center">
                <p className="mt-1">Loading content...</p>
              </div>
            ) : recentTracks.recenttracks &&
              recentTracks.recenttracks.track[0]["@attr"] &&
              recentTracks.recenttracks.track[0]["@attr"].nowplaying ===
                "true" ? (
              <>
                <div>
                  <MusicTrack
                    nowPlaying={true}
                    track={recentTracks.recenttracks.track[0]}
                  />
                  <PreviousPlayerContainer
                    tracks={recentTracks.recenttracks.track.slice(
                      1,
                      recentTracks.recenttracks.track.length
                    )}
                  />
                </div>
              </>
            ) : (
              <React.Fragment>
                <div className="my-4 flex flex-col items-center bg-gray-50 py-4">
                  <h3 className="mb-2 text-2xl font-semibold">
                    Currently Not Playing Anything
                  </h3>
                  <p className="text-sm font-semibold text-gray-800">
                    So what? I don&apos;t listen to music 24/7
                  </p>
                </div>
                <PreviousPlayerContainer
                  tracks={recentTracks.recenttracks.track}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LiveMusicPage;
