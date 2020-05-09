import React from 'react';

const Hero = () => {
  return (
    <div className="max-w-4xl mx-auto py-auto flex flex-row justify-around">
      <div className="max-w-4xl mx-auto py-auto p-8 flex flex-col justify-around">
        <h1 className="m-0 w-full pt-20 leading-tight text-4xl text-left font-bold">G'day, I'm Eric.</h1>
        <h3 className="m-0 w-full pt-10 leading-tight text-3xl text-left font-bold">I’m a Test Engineer at Google.</h3>
        <p className="text-left my-4 text-m">
          In my spare time, I make impact by building awesome software solutions and building the communities around me.
        </p>
      </div>
      <div className="max-w-4xl mx-auto py-auto pb-8 flex flex-col justify-end">
        <img className="hidden md:inline" src="/images/transparent_profile_min.png" alt="Eric" />
      </div>
    </div>
  );
};

export default Hero;
