import { Project } from '../types';

interface Projects {
  current: Project[];
  previous: Project[];
}

const projects: Projects = {
  current: [
    {
      description:
        'MARIE.js is a very simple and intuitive Assembly Language Simulator. It is a web-based version of the MARIE simulator.',
      imageUrl: 'https://avatars1.githubusercontent.com/u/18567331?v=4',
      name: 'MARIE.js',
      repoUrl: 'https://github.com/MARIE-js/MARIE.js',
      screenshotUrl: '/images/projects/mariejs.png',
      url: 'https://marie.js.org',
    },
  ],
  previous: [
    {
      description:
        '🐸 Gecko Download Manager is a Chrome Extension that improves downloading lectures 💾 from the Echo360 System.',
      imageUrl: 'https://avatars1.githubusercontent.com/u/26992093?v=4',
      name: 'GeckoDM',
      repoUrl: 'https://github.com/GeckoDM/GeckoDownloadManager',
      url: 'https://geckodm.github.io/',
    },
    {
      description:
        'MonPlan is the official Monash University enterprise course planning tool, built for students by students.',
      name: 'MonPlan',
      url: 'https://monplan.apps.monash.edu',
    },
    {
      description:
        'Tracks flights sourced from various Australian state government websites using automated scraping tool.',
      name: 'COVID19 Australia Flight Tracker',
      url: 'https://covid19-flights.ericjiang.dev/',
    },
    {
      description: 'Muhnee is a new and exciting way to make managing your money simple.',
      imageUrl: 'https://avatars1.githubusercontent.com/u/58194669?v=4',
      name: 'Muhnee',
      url: 'https://muhneeapp.com',
    },
  ],
};

export default projects