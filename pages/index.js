import Head from "next/head";
import Nav from "../components/nav";

const Home = () => (
  <div className="text-sans">
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <div className="w-full text-gray-900">
      <div className="max-w-4xl mx-auto py-auto flex flex-row justify-around">
        <div className="max-w-4xl mx-auto py-auto p-8 flex flex-col justify-around">
          <h1 className="m-0 w-full pt-20 leading-tight text-5xl text-left font-bold">
            Hello I'm Eric.
          </h1>
          <h3 className="m-0 w-full pt-10 leading-tight text-4xl text-left font-bold">
            I’m a Software Engineer
          </h3>
          <p className="text-left my-4 text-m">
            And I make impact by building awesome software solutions and I love
            building the communities around me.
          </p>
        </div>
        <div className="max-w-4xl mx-auto py-auto pb-8 flex flex-col justify-around">
          <img
            className="hidden md:inline"
            src="/images/transparent_profile.png"
            alt="Eric"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-20 py-auto pb-8 flex flex-row flex-wrap justify-around">
        <a
          href="/projects"
          className="pt-4 px-5 pb-6 w-64 text-left no-underline text-gray-800 border border-gray-400 hover:border-blue-500"
        >
          <h3 className="m-0 text-blue-500 text-lg font-bold">
            Projects &rarr;
          </h3>
          <p className="m-0 pt-3 py-0 pb-0 text-sm text-gray-900">
            Find out about my projects.
          </p>
        </a>
      </div>
    </div>
  </div>
);

export default Home;
