const SITE_CONFIG = {
  site: {
    description: `
    I’m a Test Engineer at Google. \n
In my spare time, I make impact by building awesome software solutions and building the communities around me.
    `,
    title: 'Eric Jiang',
  },
  social: {
    FACEBOOK: 'https://facebook.com/ericjiang97',
    FLICKR: 'https://flickr.com/people/lorderikir',
    GITHUB: 'https://github.com/ericjiang97',
    INSTAGRAM: 'https://instagram.com/lorderikir',
    LINKEDIN: 'https://linkedin.com/in/ericjiang97',
    TWITTER: 'https://twitter.com/ericjiang97',
  },
  urls: {
    BASE_URL: 'https://ericjiang.dev',
    REPO_URL: 'https://github.com/ericjiang97/nextjs-personal',
  },
  disqus: {
    shortname: 'ericjiang',
  },
  lastfm: {
    API_KEY: process.env.NEXT_PUBLIC_LASTFM_API_KEY,
    BASE_URI: 'https://ws.audioscrobbler.com/2.0/',
    USER_NAME: 'lorderikir',
  },
};

export default SITE_CONFIG;
