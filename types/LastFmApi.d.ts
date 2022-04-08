export interface LastFmTrackAttr {
  nowplaying: "true" | "false";
}

export interface LastFmText {
  mbid: string;
  "#text": string;
}

export interface LastFmTrackImage {
  size: "small" | "medium" | "large" | "extralarge";
  "#text": string;
}

export interface LastFmTrack {
  "@attr"?: LastFmTrackAttr;
  album: LastFmText;
  artist: LastFmText;
  mbid?: string;
  name: string;
  streamable: string;
  image: LastFmTrackImage[];
  url: string;
}

export interface LastFmRecent {
  recenttracks: { track: LastFmTrack[] };
}
