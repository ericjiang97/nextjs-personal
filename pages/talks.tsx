import talks from '../data/talks';
import { Talk } from '../types/talks';
import PageLayout from '../containers/layouts/PageLayout';

const TechTalks = () => (
  <PageLayout title="Tech Talks">
    <div className="w-full text-gray-900">
      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around">
        <div className="max-w-xl mx-auto py-auto pb-4 flex flex-col">
          <h1 className="m-0 w-full pt-14 leading-tight text-5xl text-left font-bold">Tech Talks</h1>
          <p className="text-left my-4 text-m">
            I put the tech in my talks… And also memes), just kidding. I actually love doing tech talks, hit me up if
            you are interested in letting me do a talk on Google Cloud, Frontend/Backend Development or my Career
            Journey
          </p>
        </div>
        <div className="max-w-md mx-auto py-auto pb-8 flex flex-col justify-end">
          <img className="hidden md:inline" src="/images/gcp-juniordev-talk.jpg" alt="Eric" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-20 py-auto pb-8 flex flex-col justify-around">
        <h3 className="m-0 w-full pt-14 leading-tight text-2xl text-left font-bold mb-3">Upcoming talks</h3>
        {talks.upcoming.length === 0 && (
          <h3 className="m-0 w-full pt-14 leading-tight text-,d text-left font-bold mb-6">
            No talks upcoming... Hit me up!
          </h3>
        )}
        {talks.upcoming.map((talk: Talk, i) => {
          return (
            <a
              key={i}
              href={talk.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 text-left no-underline text-gray-800"
            >
              <span className="m-0 text-xs">{talk.date}</span>
              <h4 className="m-0 text-brand text-lg">{talk.title}</h4>
              <p className="m-0 text-md">{talk.org}</p>
            </a>
          );
        })}
        <hr />
        <h3 className="m-0 w-full pt-14 leading-tight text-2xl text-left font-bold mt-2 mb-3">Past talks</h3>
        {talks.past.map((talk: Talk, i) => {
          return (
            <a
              key={i}
              href={talk.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 text-left no-underline text-gray-800"
            >
              <span className="m-0 text-xs">{talk.date}</span>
              <h4 className="m-0 text-brand text-lg">{talk.title}</h4>
              <p className="m-0 text-md">{talk.org}</p>
            </a>
          );
        })}
      </div>
    </div>
  </PageLayout>
);

export default TechTalks;
