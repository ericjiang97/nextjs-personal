import React from "react";
import Head from "next/head";

import HeroBanner from "../../components/HeroBanner";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

interface MainLayoutProps {
  showHero?: boolean;
  pageTitle?: string;
  customHero?: React.ReactElement;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  pageTitle = "",
  showHero = false,
  customHero,
  children,
}) => {
  let _pageTitle = "Eric Jiang";
  if (pageTitle) _pageTitle += ` - ${pageTitle}`;

  return (
    <div
      className="flex min-h-screen w-screen flex-col"
      style={{ minHeight: "100vh" }}
    >
      <Head>
        <title>{_pageTitle}</title>
        <meta name="description" content="Hi I'm Eric." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col">
        <NavBar />
        {showHero && <HeroBanner />}
        {customHero ? customHero : null}
        <div className="container mx-auto flex flex-1 flex-col self-center py-12 px-4">
          {children}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
