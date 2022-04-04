import React from "react";
import type { NextPage } from "next";

import MainLayout from "../containers/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout showHero={true} pageTitle="Home">
    <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-0 lg:overflow-hidden">
      <div className="mx-auto max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold">Deez nuts</h1>
      </div>
    </div>

    </MainLayout>
  );
};

export default Home;
