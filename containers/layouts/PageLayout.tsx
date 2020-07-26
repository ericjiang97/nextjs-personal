import React from 'react';
import Head from 'next/head';
import { PageContent, PageWithSidebar, PageWithHeader, Callout, Container, Link, useBreakpoint } from 'bumbag';
import Nav from '../../components/nav';
import SideBar from '../../components/SideBar';

interface PageLayoutProps {
  title: string;
  banner?: JSX.Element | JSX.Element[];
  isExperimental?: boolean;
  ignoreHorizontalPadding?: boolean;
}

interface PageInnerProps {
  title?: string;
  banner?: JSX.Element | JSX.Element[];
}

const PageChildren: React.FC<PageInnerProps> = ({ title, banner, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
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

const PageLayout: React.FC<PageLayoutProps> = ({ title, banner, children }) => {
  const titleString = `${title} - Eric Jiang`;
  const isTabletOrSmaller = useBreakpoint('max-tablet');
  return (
    <PageWithHeader header={<Nav />} display="flex" flexDirection="column" defaultIsVisible={true}>
      <PageWithSidebar sidebar={<SideBar />} defaultIsVisible={isTabletOrSmaller}>
        <PageChildren title={titleString} banner={banner}>
          {children}
        </PageChildren>
      </PageWithSidebar>
    </PageWithHeader>
  );
};

export default PageLayout;
