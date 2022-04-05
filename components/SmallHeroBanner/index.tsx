import React from "react";

interface SmallHeroBanner {
  title?: string;
  description?: string;
}

const SmallHeroBanner: React.FC<SmallHeroBanner> = ({ title, description }) => {
  return (
    <div className="bg-light-cyan-500">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:flex lg:justify-between lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold text-space-cadet sm:text-5xl sm:tracking-tight lg:text-6xl">
            {title}
          </h2>
          <p className="mt-5 text-xl text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SmallHeroBanner;
