import { Project, ProjectTechology } from '../types';
import { GruntIcon, JavaScriptIcon, BootstrapIcon, FlutterIcon, FirebaseIcon, ReactIcon, MaterialUIIcon } from '../components/icons';

interface Projects {
  current: Project[];
  previous: Project[];
}

const Technology: { [name: string]: ProjectTechology } = {
  Bootstrap: {
    icon: BootstrapIcon,
    name: 'Bootstrap',
    url: 'https://getbootstrap.com/',
  },
  Firebase: {
    icon: FirebaseIcon,
    name: 'Firebase',
    url: 'https://firebase.google.com',
  },
  Flutter: {
    icon: FlutterIcon,
    name: 'Flutter',
    url: 'https://flutter.dev',
  },
  Grunt: {
    icon: GruntIcon,
    name: 'Grunt',
    url: 'https://gruntjs.com/',
  },
  JavaScript: {
    icon: JavaScriptIcon,
    name: 'Javascript',
    url: undefined,
  },
  MaterialUi: {
    icon: MaterialUIIcon,
    name: 'Material UI',
    url: 'https://material-ui.com/',
  },
  React: {
    icon: ReactIcon,
    name: 'ReactJS',
    url: 'https://reactjs.org/',
  },
};

const PROJECTS: Projects = {
  current: [
    {
      description:
        'MARIE.js is a very simple and intuitive Assembly Language Simulator. It is a web-based version of the MARIE simulator.',
      imageUrl: 'https://avatars1.githubusercontent.com/u/18567331?v=4',
      name: 'MARIE.js',
      repoUrl: 'https://github.com/MARIE-js/MARIE.js',
      screenshotUrl: '/images/projects/mariejs.png',
      technologies: [Technology.Grunt, Technology.JavaScript, Technology.Bootstrap],
      url: 'https://marie.js.org',
    },
    {
      description: 'Muhnee is a new and exciting way to make managing your money simple.',
      imageUrl: 'https://avatars1.githubusercontent.com/u/58194669?v=4',
      name: 'Muhnee',
      screenshotUrl: 'https://muhneeapp.com/static/muhnee_family-d06e03678e2b783d6cac9bcbfa3fb47f.png',
      technologies: [Technology.Flutter, Technology.Firebase, Technology.React, Technology.MaterialUi],
      url: 'https://muhneeapp.com',
    },
    {
      description:
        '🐸 Gecko Download Manager is a Chrome Extension that improves downloading lectures 💾 from the Echo360 System.',
      imageUrl: 'https://avatars1.githubusercontent.com/u/26992093?v=4',
      name: 'GeckoDM',
      repoUrl: 'https://github.com/GeckoDM/GeckoDownloadManager',
      technologies: [Technology.JavaScript],
      url: 'https://geckodm.github.io/',
    },
  ],
  previous: [
    {
      description: 'MonPlan is the official Monash University enterprise course planning tool, built for students by students.',
      name: 'MonPlan',
      technologies: [Technology.React, { name: 'spring' }, { name: 'Google App Engine' }, { name: 'Cloud Firestore' }, { name: 'Cloud Storage' }, { name: 'Sendgrid' }],
      url: 'https://monplan.apps.monash.edu',
    },
    {
      description:
        'Tracks flights sourced from various Australian state government websites using automated scraping tool.',
      name: 'COVID19 Australia Flight Tracker',
      url: 'https://covid19-flights.ericjiang.dev/',
    },
  ],
};

export default PROJECTS;
