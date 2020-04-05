import Head from "next/head";
import Nav from "../components/nav";

const Projects = () => (
  <div className="text-sans">
    <Head>
      <title>Projects</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <div className="w-full text-gray-900">
      <div className="max-w-4xl mx-auto pt-20 py-auto pb-8 flex flex-row justify-around">
        <a
          href="https://marie.js.org"
          className="pt-4 px-5 pb-6 w-64 text-left no-underline text-gray-800 border border-gray-400 hover:border-blue-500"
        >
          <div className="max-w-4xl mx-auto py-auto flex flex-row items-center">
            <img
              src="https://avatars1.githubusercontent.com/u/18567331?v=4"
              className="object-contain h-5 mr-1    "
            />
            <h3 className="m-0 text-blue-500 text-lg font-bold">MARIE.js</h3>
          </div>
          <p className="m-0 pt-3 py-0 pb-0 text-sm text-gray-900">
            MARIE.js is a very simple and intuitive Assembly Language Simulator.
            It is a web-based version of the MARIE simulator.
          </p>
        </a>
      </div>
    </div>
  </div>
);

export default Projects;
