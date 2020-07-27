import React from 'react';
import Head from 'next/head';
import { PageContent, PageWithHeader, Callout, Container, Link } from 'bumbag';
import Nav from '../../components/nav';
import SITE_CONFIG from '../../config';

interface PageLayoutProps {
  title: string;
  pageMeta?: PageMeta;
  banner?: JSX.Element | JSX.Element[];
  isExperimental?: boolean;
  ignoreHorizontalPadding?: boolean;
}

interface PageMeta {
  endpoint?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
}

interface PageInnerProps {
  title?: string;
  pageMeta?: PageMeta;
  banner?: JSX.Element | JSX.Element[];
}

const PageChildren: React.FC<PageInnerProps> = ({ title, banner, children, pageMeta }) => {
  const siteDescription = pageMeta?.description || SITE_CONFIG.site.description;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={siteDescription} />
        <meta name="og:title" content={title} />
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={pageMeta?.keywords?.join(', ')} />
        <meta name="og:url" content={`${SITE_CONFIG.urls.BASE_URL}${pageMeta?.endpoint}`} />
        <meta name="og:description" content={siteDescription} />
        <meta name="og:image" content={pageMeta?.imageUrl} />
      </Head>
      {banner && banner}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <PageContent flex={1}>
          <Container>
            <Callout type="info" title="Warning: Experimental Site" maxWidth="800px" width="100%" marginY="1rem">
              This site is experimental, please report any bugs to{' '}
              <Link href="https://github.com/ericjiang97/nextjs-personal/issues">
                https://github.com/ericjiang97/nextjs-personal/issues
              </Link>
            </Callout>
          </Container>
          {children}
        </PageContent>
      </div>
    </>
  );
};

const PageLayout: React.FC<PageLayoutProps> = ({ title, banner, children, pageMeta }) => {
  const titleString = `${title} - Eric Jiang`;
  return (
    <PageWithHeader header={<Nav />} display="flex" flexDirection="column" defaultIsVisible={true}>
      <PageChildren title={titleString} banner={banner} pageMeta={pageMeta}>
        {children}
      </PageChildren>
    </PageWithHeader>
  );
};

export default PageLayout;
