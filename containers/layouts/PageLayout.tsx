import { PageContent, PageWithHeader } from 'bumbag';
import Head from 'next/head';
import React from 'react';
import Nav from '../../components/core/layout/NavBar';
import SITE_CONFIG from '../../config';

import { PageInnerProps, PageLayoutProps } from './PageLayoutProps';

const PageChildren: React.FC<PageInnerProps> = ({ title, banner, children, pageMeta, isChildrenPadded = true }) => {
  const { endpoint, description, keywords, imageUrl } = pageMeta;
  const siteDescription = description || SITE_CONFIG.site.description;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={siteDescription} />
        <meta name="og:title" content={title} />
        <meta name="description" content={siteDescription} />
        {keywords && <meta name="keywords" content={keywords.join(', ')} />}
        {endpoint && <meta name="og:url" content={`${SITE_CONFIG.urls.BASE_URL}${endpoint}`} />}
        <meta name="og:description" content={siteDescription} />
        {imageUrl ? (
          <>
            <meta name="og:image" content={imageUrl} />
            <meta name="twitter:image" content={imageUrl}></meta>
          </>
        ) : (
          <>
            <meta name="og:image" content={`https://og-image.ericjiang.dev${endpoint}`} />
            <meta name="twitter:image" content={`https://og-image.ericjiang.dev${endpoint}`}></meta>
          </>
        )}
        <meta property="twitter:url" content={`${SITE_CONFIG.urls.BASE_URL}${endpoint}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={siteDescription} />
      </Head>
      {banner && banner}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, flexWrap: 'wrap' }}>
        {isChildrenPadded
          ? children && (
              <PageContent style={{ flex: 1 }} breakpoint="desktop">
                {children}
              </PageContent>
            )
          : children}
      </div>
    </>
  );
};

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  banner,
  children,
  pageMeta,
  navProps,
  isChildrenPadded = true,
  hideSearch = true,
  searchQuery,
  ...props
}) => {
  const titleString = `${title} - Eric Jiang`;
  return (
    <PageWithHeader
      header={<Nav {...navProps} searchValue={searchQuery} />}
      display="flex"
      flexDirection="column"
      defaultIsVisible={true}
      sticky
      minHeight="50vh"
    >
      <PageChildren
        title={titleString}
        banner={banner}
        pageMeta={pageMeta}
        isChildrenPadded={isChildrenPadded}
        {...props}
      >
        {children}
      </PageChildren>
    </PageWithHeader>
  );
};

export default PageLayout;
