"use client";
import React from "react";
import MainLayout from "../containers/MainLayout";

const HomePage: NextPageWithLayout = ({ children }) => {
  return (
    <MainLayout
      showHero={true}
      pageTitle="Home"
      pageMeta={{
        description: "G'day, I'm Eric. I’m a Test Engineer at Google.",
        endpoint: "/",
        imageUrl: "/images/eric-jiang-bitbybit.jpeg",
      }}
    >
      <div>Hello!</div>
    </MainLayout>
  );
};

export default HomePage;
