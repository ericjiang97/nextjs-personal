import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import {
  BriefcaseIcon,
  ArrowDownTrayIcon as DocumentDownloadIcon,
} from "@heroicons/react/24/outline";
import MainLayout from "../../containers/MainLayout";
import experience from "../../data/experience";
import classNames from "../../utils/classNames";
import SmallHeroBanner from "../../components/SmallHeroBanner";

const AboutPage: React.FC = () => {
  return (
    <MainLayout
      pageTitle="About"
      customHero={
        <SmallHeroBanner
          title="About"
          description="I bring my passion for technology to build awesome, delightful &amp; secure software for everyone."
        />
      }
      pageMeta={{
        description: `I recently finished my course in Bachelor of Information Technology at Monash University in
      Melbourne, Australia where I majored in Computer networks and security.`,
        endpoint: "/about",
      }}
    >
      <div className="relative mx-auto mt-6 max-w-lg dark:text-gray-300 lg:max-w-7xl">
        <p className="first-letter:font-old-standard my-1 first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-bold dark:first-letter:text-white">
          As a Software Engineer on the Android SDLC BizTools Team within the
          Android Software Development Lifecycle team at{" "}
          <Link
            href="https://about.google"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="underline">Google</span>
          </Link>
          {". "}I work on building and maintaining business tools such as test
          infrastructure, as well as shaping better processes to enable software
          and hardware teams to build the best products possible.
        </p>
        <p className="my-1">
          If you are a recruiter, I am best contacted via email at{" "}
          <Link href="mailto:recruiting@ericjiang.dev">
            <span className="underline">recruiting@ericjiang.dev</span>
          </Link>
        </p>
        <div className="mt-2">
          <a
            href="https://resume.ericjiang.dev"
            className="focus:outline-hiddenfocus:ring-4 inline-flex items-center rounded-lg border border-gray-400 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:text-blue-700 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            <DocumentDownloadIcon className="mr-2 h-4 w-4" />
            <span>View Resume</span>
          </a>
        </div>
      </div>
      <div className="container mt-10 flex flex-1 flex-col px-2">
        <div>
          <h3 className="text-2xl font-semibold">Experience</h3>
        </div>
        <div className="mt-8">
          <ol className="relative border-l border-gray-300 dark:border-gray-700">
            {experience.map((exp, index) => {
              const isCompanyGoogle = exp.company === "Google";

              return (
                <li className="mb-10 ml-10" key={index}>
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-2 ring-blue-800 dark:bg-gray-800">
                    <BriefcaseIcon className="h-3 w-3 text-blue-800 dark:text-blue-400" />
                  </span>
                  <Link
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3
                      className={classNames(
                        "mb-1 text-lg font-semibold text-gray-900 dark:text-white",
                        isCompanyGoogle ? "font-google-sans" : ""
                      )}
                    >
                      {exp.company}
                    </h3>
                  </Link>
                  {exp.positions.map((pos, j) => {
                    const { title, description, dates } = pos;
                    const { startDate, endDate } = dates;
                    return (
                      <div className="mb-8" key={j}>
                        <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                          {title}
                        </h4>
                        <span className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          {`${startDate.format("MMM YYYY")} - ${
                            endDate ? endDate.format("MMM YYYY") : "Present"
                          }`}
                        </span>
                        {description && (
                          <ul className="ml-4 max-w-prose list-disc text-gray-600 dark:text-gray-400">
                            {description.map((descrip, index) => (
                              <li key={index}>{descrip}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
