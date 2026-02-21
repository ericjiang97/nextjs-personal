import React from 'react'
import Head from 'next/head'
import { MainLayoutProps } from './MainLayout'
import { SITE_CONFIG } from '../../config'

const MainLayout = ({
  pageTitle = '',
  customHero,
  children,
  pageMeta,
  showProgress = false,
  progress = 0,
}: React.PropsWithChildren<MainLayoutProps>) => {
  const { endpoint, description, keywords, imageUrl } = pageMeta
  let _pageTitle = 'Eric Jiang'
  if (pageTitle) _pageTitle += ` - ${pageTitle}`

  const siteDescription = description || SITE_CONFIG.description

  return (
    <div className="flex flex-col">
      <Head>
        <title>{_pageTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="og:title" content={_pageTitle} />
        <meta name="description" content={siteDescription} />
        {keywords && <meta name="keywords" content={keywords.join(', ')} />}
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
        {showProgress && (
          <div className="sticky top-16 z-50 w-full bg-white dark:bg-gray-900">
            <div
              className="h-1 rounded-r-full bg-rose-400 transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        <div
          className={
            customHero &&
            'flex flex-row flex-wrap items-start px-4 sm:px-6 lg:px-8'
          }
        >
          {customHero ? (
            <div className="top-8 mt-12 flex max-w-md flex-col text-lg 2xl:sticky">
              {customHero}
            </div>
          ) : null}

          <div className="mt-8">
            <div className="container mx-auto flex max-w-5xl flex-1 flex-col self-center  px-4 ">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MainLayout
