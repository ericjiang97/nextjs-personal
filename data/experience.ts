import { Experience } from '../types';

const experience: Experience[] = [
  {
    company: 'Google',
    companyUrl: 'https://about.google',
    description: [],
    positions: [
      {
        dates: 'April 2020 - Present',
        title: 'Test Engineer',
      },
    ],
  },
  {
    company: 'Monash University',
    companyUrl: 'https://monash.edu/esolutions',
    description: [
      `Successfully founded and delivered MonPlan which is the
        enterprise course planning application for Monash University,
        from ideation all the way up to an enterprise production
        application through the multi-million dollar, high-profile
        Student First program. Which delivered impact to 70000+ students
        and around 300+ staff. The application enhanced the business
        processes and the student experience.`,
      ` Finalist and Winner for itNews 2019 Benchmark Awards – Rising
        Star Category which is a National Award which recognises a young
        IT professional who displays exceptional promise and has already
        clocked up impressive achievements.`,
      ` Mentored other student development teams which successfully
        delivered products like SwapMe (class swapping application) and
        Project Portal (Final Year Project management platform for the
        Faculty of Engineering) which delivered impact to over 70000
        students, and overhauled existing tedious processes.`,
      `
        Lead the development and replatform of the Student Booklist App
        and Bulk Messaging Service as part of the University’s
        Cybersecurity Uplift Project to reduce risk across legacy
        systems`,
    ],
    positions: [
      {
        dates: 'Apr 2019 – Nov 2019',
        title: 'Software Engineer - Google Cloud',
      },
      {
        dates: 'Dec 2016 – Mar 2019',
        title: 'Junior Software Engineer – MonPlan Founder and Tech Lead',
      },
    ],
  },
  {
    company: 'Localz',
    companyUrl: 'https://localz.com',
    description: [
      'Designed and Built various React Native (RN) ‘Core’ Components for future use in RN Apps, which are highly customisable through internal APIs which allowed components to be reused.',
      'Designed and built various components for react-native applications which are highly reusable and maintainable through OO Design, ReactJS and Redux Principles, such as the introduction of a modal stack into the core framework of the app.',
    ],
    positions: [
      {
        dates: 'Dec 2017 – Feb 2018',
        title: 'Intern Software Engineer',
      },
    ],
  },
];

export default experience;
