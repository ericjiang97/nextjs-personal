import { NextPage } from "next";
import SmallHeroBanner from "../components/SmallHeroBanner";
import MainLayout from "../containers/MainLayout";
import talks from "../data/talks";

const TalksPage: NextPage = () => {
  return (
    <MainLayout
      pageTitle="Tech Talks"
      customHero={
        <SmallHeroBanner
          title="Tech Talks"
          description="I put the tech in my talks… (And also memes), just kidding. I actually love doing tech talks, hit me up if you are interested in letting me do a talk on Google Cloud, Frontend/Backend Development or my Career Journey"
        />
      }
    >
      <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="relative mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold">Previous Talks</h2>
          <div className="mx-auto mt-3 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            {talks.past.map((talk, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                >
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-600">
                        {talk.date}
                      </p>
                      <a href={talk.url} className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">
                          {talk.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {talk.org}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TalksPage;
