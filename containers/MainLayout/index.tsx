import React from "react";
import Head from "next/head";

import HeroBanner from "../../components/HeroBanner";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

import { MainLayoutProps } from "./MainLayout";
import { SITE_CONFIG } from "../../config";

const MainLayout: React.FC<MainLayoutProps> = ({
  pageTitle = "",
  showHero = false,
  customHero,
  children,
  pageMeta,
}) => {
  const { endpoint, description, keywords, imageUrl } = pageMeta;
  let _pageTitle = "Eric Jiang";
  if (pageTitle) _pageTitle += ` - ${pageTitle}`;

  const siteDescription = description || SITE_CONFIG.description;

  return (
    <div
      className="flex min-h-screen w-screen flex-col"
      style={{ minHeight: "100vh" }}
    >
      <Head>
        <title>{_pageTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="og:title" content={_pageTitle} />
        <meta name="description" content={siteDescription} />
        {keywords && <meta name="keywords" content={keywords.join(", ")} />}
        {endpoint && (
          <meta
            name="og:url"
            content={`${SITE_CONFIG.urls.BASE_URL}${endpoint}`}
          />
        )}
        <meta name="og:description" content={siteDescription} />
        {imageUrl ? (
          <>
            <meta name="og:image" content={imageUrl} />
            <meta name="twitter:image" content={imageUrl}></meta>
          </>
        ) : (
          <>
            <meta
              name="og:image"
              content={`https://ericjiang.dev/api/static?title=${_pageTitle}`}
            />
            <meta
              name="twitter:image"
              content={`https://ericjiang.dev/api/static?title=${_pageTitle}`}
            ></meta>
          </>
        )}
        <meta
          property="twitter:url"
          content={`${SITE_CONFIG.urls.BASE_URL}${endpoint}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={siteDescription} />
      </Head>

      <main className="flex flex-1 flex-col">
        <NavBar />
        {customHero ? customHero : null}
        <div>
          <div className="max-screen-lg container mx-auto flex flex-1 flex-col self-center py-12 px-4 ">
            {children}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
