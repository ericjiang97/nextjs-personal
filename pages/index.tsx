import Head from 'next/head';
import Hero from '../components/hero';
import CallToAction from '../components/CallToAction';
import PageLayout from '../layouts/PageLayout';

const Home = () => (
  <PageLayout title="Home" banner={<CallToAction />}>
    <Hero />

    <div className="max-w-4xl mx-auto pt-20 py-auto pb-8 flex flex-row flex-wrap justify-around">
      <a
        href="/projects"
        className="pt-4 px-5 pb-6 w-64 mx-2 my-4 text-left no-underline text-gray-800 border border-gray-400 hover:border-blue-500 rounded"
      >
        <h3 className="m-0 text-brand text-lg font-bold">Projects &rarr;</h3>
        <p className="m-0 pt-3 py-0 pb-0 text-sm text-gray-500">
          Find out about my projects.
        </p>
      </a>
      <a
        href="/talks"
        className="pt-4 px-5 pb-6 w-64 mx-2 my-4 text-left no-underline text-gray-800 border border-gray-400 hover:border-blue-500 rounded"
      >
        <h3 className="m-0 text-brand text-lg font-bold">🎤 Tech Talks</h3>
        <p className="m-0 pt-3 py-0 pb-0 text-sm text-gray-500">
          I also do tech talks, whether its about Google Cloud, dev, cloud
          technologies, mobile, I will do it. Warning, there will be many memes
          inside my talks.
        </p>
      </a>
    </div>
  </PageLayout>
);

export default Home;
