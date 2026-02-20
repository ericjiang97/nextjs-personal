import React from "react";
import Head from "next/head";

import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

import { MainLayoutProps } from "./MainLayout";
import { SITE_CONFIG } from "../../config";

const MainLayout = ({
  pageTitle = "",
  customHero,
  children,
  pageMeta,
  showProgress = false,
  progress = 0,
}: React.PropsWithChildren<MainLayoutProps>) => {
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

      <main className="flex flex-1 flex-col justify-start">
        <NavBar />

        {showProgress && <div className="sticky top-16 w-full bg-white dark:bg-gray-900 z-50">
          <div className="h-1 bg-blue-500 transition-[width] duration-100" style={{ width: `${progress}%` }}></div>
        </div>}
        <div className={customHero && "flex flex-row flex-wrap items-start px-4 sm:px-6 lg:px-8"}>

          {customHero ?
            <div className="2xl:sticky top-20 text-lg flex flex-col max-w-md">
              {customHero}
            </div> :
            null}

          <div>
            <div className="max-w-5xl container mx-auto flex flex-1 flex-col self-center py-12 px-4 ">
              {children}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
