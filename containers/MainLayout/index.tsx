import React from "react";
import Head from "next/head";

import HeroBanner from "../../components/HeroBanner";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

interface MainLayoutProps {
  showHero?: boolean;
  pageTitle?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  pageTitle = "",
  showHero = false,
  children,
}) => {
  let _pageTitle = "Eric Jiang";
  if (pageTitle) _pageTitle += ` - ${pageTitle}`;

  return (
    <div className="flex min-h-screen flex-col" style={{ minHeight: "100vh" }}>
      <Head>
        <title>{_pageTitle}</title>
        <meta name="description" content="Hi I'm Eric." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container flex flex-1 flex-col">
        <NavBar />
        {showHero && <HeroBanner />}
        <div className="flex-1">{children}</div>

        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
