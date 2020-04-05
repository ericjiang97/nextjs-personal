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
      <h1 className="m-0 w-full pt-20 leading-tight text-5xl text-center font-bold">
        Welcome to Next.js!
      </h1>
      <p className="text-center my-4 text-m">
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>

      <div className="max-w-4xl mx-auto pt-20 py-auto pb-8 flex flex-row justify-around">
        <a
          href="https://nextjs.org/docs"
          className="pt-4 px-5 pb-6 w-64 text-left no-underline text-gray-800 border border-gray-400 hover:border-blue-500"
        >
          <h3 className="m-0 text-blue-500 text-lg font-bold">
            Documentation &rarr;
          </h3>
          <p className="m-0 pt-3 py-0 pb-0 text-sm text-gray-900">
            Learn more about Next.js in the documentation.
          </p>
        </a>
        <a
          href="https://nextjs.org/learn"
          className="pt-4 px-5 pb-6 w-64 text-left no-underline text-gray-800 border border-gray-400 hover:border-blue-500"
        >
          <h3 className="m-0 text-blue-500 text-lg font-bold">
            Next.js Learn &rarr;
          </h3>
          <p className="m-0 pt-3 py-0 pb-0 text-sm text-gray-900">
            Learn about Next.js by following an interactive tutorial!
          </p>
        </a>
        <a
          href="https://github.com/zeit/next.js/tree/master/examples"
          className="pt-4 px-5 pb-6 w-64 text-left no-underline text-gray-800 border border-gray-400 hover:border-blue-500"
        >
          <h3 className="m-0 text-blue-500 text-lg font-bold">
            Examples &rarr;
          </h3>
          <p className="m-0 pt-3 py-0 pb-0 text-sm text-gray-900">
            Find other example boilerplates on the Next.js GitHub.
          </p>
        </a>
      </div>
    </div>
  </div>
);

export default Home;
