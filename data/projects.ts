import { Project } from '../types';

interface Projects {
  current: Project[];
  previous: Project[];
}

const PROJECTS: Projects = {
  current: [
    {
      name: 'MARIE.js',
      url: 'https://marie.js.org',
      imageUrl: 'https://avatars1.githubusercontent.com/u/18567331?v=4',
      description:
        'MARIE.js is a very simple and intuitive Assembly Language Simulator. It is a web-based version of the MARIE simulator.',
      screenshotUrl: '/images/projects/mariejs.png',
      repoUrl: 'https://github.com/MARIE-js/MARIE.js',
      technologies: ['grunt', 'javascript', 'bootstrap'],
    },
    {
      name: 'Muhnee',
      imageUrl: 'https://avatars1.githubusercontent.com/u/58194669?v=4',
      screenshotUrl: 'https://muhneeapp.com/static/muhnee_family-d06e03678e2b783d6cac9bcbfa3fb47f.png',
      url: 'https://muhneeapp.com',
      description: 'Muhnee is a new and exciting way to make managing your money simple.',
      technologies: ['flutter', 'firebase', 'react', 'material-ui'],
    },
    {
      name: 'GeckoDM',
      imageUrl: 'https://avatars1.githubusercontent.com/u/26992093?v=4',
      url: 'https://geckodm.github.io/',
      description:
        '🐸 Gecko Download Manager is a Chrome Extension that improves downloading lectures 💾 from the Echo360 System.',
      repoUrl: 'https://github.com/GeckoDM/GeckoDownloadManager',
      technologies: ['javascript', 'Chrome Extensions'],
    },
  ],
  previous: [
    {
      name: 'MonPlan',
      url: 'https://monplan.apps.monash.edu',
      description:
        'MonPlan is the official Monash University enterprise course planning tool, built for students by students.',
      technologies: ['react', 'spring', 'Google App Engine', 'Cloud Firestore', 'Cloud Storage', 'Sendgrid'],
    },
    {
      name: 'COVID19 Australia Flight Tracker',
      url: 'https://covid19-flights.ericjiang.dev/',
      description:
        'Tracks flights sourced from various Australian state government websites using automated scraping tool.',
    },
  ],
};

export default PROJECTS;
