import Head from "next/head";
import ProjectCard from "../components/cards/ProjectCard";
import experience from "../data/experience";
import { Experience } from "../types";
import Link from "next/link";
import PageLayout from "../layouts/PageLayout";

const AboutMe = () => (
  <PageLayout title="About Me">
    <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around">
      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
        <h1 className="m-0 w-full pt-14 leading-tight text-5xl text-center font-semibold">
          About Me
        </h1>
        <p className="text-left my-4 text-m">
          Hi, I’m Eric. I recently finished my course in Bachelor of Information
          Technology at Monash University in Melbourne, Australia where I
          majored in Computer networks and security. You can read more about me
          and why I choose an IT degree at Monash{" "}
          <a
            href="https://www.monash.edu/it/future-students/meet-our-students/eric-jiang"
            className="w-64 text-left underline text-brand"
          >
            here
          </a>
          .
        </p>
        <p className="text-left my-4 text-m">
          I am known for founding and delivering MonPlan which is the Monash
          University enterprise course planning tool, built for students by
          students and was awarded the Rising Star category of the 2019 itnews
          Benchmark Awards - this is a National Award which recognizes a young
          IT professional who displays exceptional promise and has already
          clocked up impressive achievements.
        </p>
        <p className="text-left my-4 text-m">
          I'd like to bring my passion for programming to building software and
          mechanisms to keep user data safe and ensuring that end users have the
          best user experience when using software. If you are a recruiter, I am
          best contacted via email at recruiting@ericjiang.dev
        </p>
        <div className="flex-1 flex justify-center">
          <a
            className="bg-transparent border border-brand hover:bg-brand text-gray-500 hover:text-white font-bold py-2 px-4 rounded-full"
            href="https://resume.ericjiang.dev"
            target="_blank"
            rel="noreferrer noopener"
          >
            Download my resume
          </a>
        </div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto pt-10 py-auto pb-8 flex flex-col flex-wrap justify-around">
      <h2 className="m-0 w-full pt-14 leading-tight text-xl text-left font-bold">
        Experience
      </h2>
      {experience.map((experience: Experience, index) => {
        return (
          <div
            className="max-w-4xl py-auto flex flex-row flex-wrap justify-around py-6 px-4 flex-1"
            key={index}
          >
            <div className="w-1/3 mx-auto py-auto flex flex-1 flex-col justify-start">
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-left underline"
              >
                <h3 className="w-full leading-tight text-lg text-left font-semibold">
                  {experience.company}
                </h3>
              </a>
              <div className="px-4 py-2">
                {experience.positions.map((position, posIndex) => (
                  <div key={posIndex}>
                    <span className="text-xs">{position.dates}</span>
                    <h4 className="w-full leading-tight text-md text-left mb-2">
                      {position.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="max-w-2xl mx-auto py-auto ml-4 flex flex-3 flex-col"
              style={{ minWidth: 280 }}
            >
              <ul className="list-disc list-outside">
                {experience.description.map((descrip, descipIndex) => (
                  <li key={descipIndex}>{descrip}</li>
                ))}
              </ul>
              {/* <div className="flex flex-1 my-2 justify-around">
                  Embed Media
                </div> */}
            </div>
          </div>
        );
      })}
    </div>
  </PageLayout>
);

export default AboutMe;
