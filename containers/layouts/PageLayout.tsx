import React from 'react';
import Head from 'next/head';
import { PageContent, PageWithHeader } from 'bumbag';
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
        {imageUrl && <meta name="og:image" content={imageUrl} />}
      </Head>
      {banner && banner}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '90vh', flexWrap: 'wrap' }}>
        {isChildrenPadded ? <PageContent style={{ flex: 1 }}>{children}</PageContent> : children}
      </div>
    </>
  );
};

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  banner,
  children,
  pageMeta,
  isChildrenPadded = true,
  ...props
}) => {
  const titleString = `${title} - Eric Jiang`;
  return (
    <PageWithHeader header={<Nav />} display="flex" flexDirection="column" defaultIsVisible={true}>
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
