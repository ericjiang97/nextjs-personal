import Head from "next/head";
import ProjectCard from "../components/cards/ProjectCard";
import experience from "../data/experience";

const Projects = () => (
  <div className="text-sans">
    <Head>
      <title>About - Eric jiang</title>
    </Head>

    <div className="w-full text-gray-900">
      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around">
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <h1 className="m-0 w-full pt-14 leading-tight text-5xl text-center font-semibold">
            About Me
          </h1>
          <p className="text-left my-4 text-m">
            Hi, I’m Eric. I recently finished my course in Bachelor of
            Information Technology at Monash University in Melbourne, Australia
            where I majored in Computer networks and security. You can read more
            about me and why I choose an IT degree at Monash{" "}
            <a
              href="https://www.monash.edu/it/future-students/meet-our-students/eric-jiang"
              className="w-64 text-left underline text-brand"
            >
              here
            </a>
            . Not only do I love writing awesome software and cybersecurity, I
            also love incorporating other sides of the tech field such as
            DevOps, Product Management, Software Engineering and
            Web/CloudTechnologies into my development practices.
          </p>
          <p className="text-left my-4 text-m">
            Something that I’m currently proud of is winning the Rising Star
            Category of the 2019 itNews Benchmark Awards for founding and
            delivering MonPlan whilst I was still a student. I also love
            impacting to everyone in the community, that is why I love mentoring
            other fellow developers, friends and family, and why I also love
            participating in many community events such as hackathons,
            conferences and meetups.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-20 py-auto pb-8 flex flex-row flex-wrap justify-around">
        <h2 className="m-0 w-full pt-14 leading-tight text-xl text-left font-bold">
          Experience
        </h2>
        {experience.map((experience, index) => {
          return (
            <div
              className="max-w-4xl mx-auto py-auto flex flex-row justify-around py-6 px-4"
              key={index}
            >
              <div className="w-1/3 mx-auto py-auto flex flex-col justify-start">
                <h3 className="w-full leading-tight text-lg text-left font-semibold">
                  {experience.company}
                </h3>
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
              <div className="max-w-2xl mx-auto py-auto ml-4 flex flex-1 flex-col justify-end">
                <ul className="list-disc list-outside">
                  {experience.description.map((descrip, descipIndex) => (
                    <li key={descipIndex}>{descrip}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default Projects;
