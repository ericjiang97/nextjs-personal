import moment from "moment";
import { Experience } from "../types";

const experience: Experience[] = [
  {
    company: "Google",
    companyUrl: "https://about.google",
    positions: [
      {
        dates: {
          startDate: moment("1 Jan 2023 00:00 +0800"),
        },
        title: "Software Engineer, Pixel Test Engineering",
      },
      {
        dates: {
          startDate: moment("1 Jan 2021 00:00 +0800"),
          endDate: moment("1 Feb 2023 00:00 +0800"),
        },
        title: "Test Engineer, Pixel Software Security",
      },
      {
        dates: {
          startDate: moment("20 Apr 2020 00:00 +1000"),
          endDate: moment("1 Jan 2021 00:00 +0800"),
        },
        title: "Test Engineer, Script Automation",
      },
    ],
  },
  {
    company: "Monash University",
    companyUrl: "https://monash.edu/esolutions",
    positions: [
      {
        dates: {
          startDate: moment("1 Apr 2019 00:00 +1000"),
          endDate: moment("5 Nov 2019 00:00 +1000"),
        },
        title: "Software Engineer - Google Cloud",
      },
      {
        dates: {
          startDate: moment("5 Dec 2016 00:00 +1000"),
          endDate: moment("31 Mar 2019 00:00 +1000"),
        },
        title: "Junior Software Engineer – MonPlan Founder and Tech Lead",
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
      },
    ],
  },
  {
    company: "Localz",
    companyUrl: "https://localz.com",
    positions: [
      {
        dates: {
          startDate: moment("5 Dec 2017 00:00 +1000"),
          endDate: moment("28 Feb 2018 00:00 +1000"),
        },
        title: "Intern Software Engineer",
        description: [
          "Designed and Built various React Native (RN) ‘Core’ Components for future use in RN Apps, which are highly customisable through internal APIs which allowed components to be reused.",
          "Designed and built various components for react-native applications which are highly reusable and maintainable through OO Design, ReactJS and Redux Principles, such as the introduction of a modal stack into the core framework of the app.",
        ],
      },
    ],
  },
];

export default experience;
