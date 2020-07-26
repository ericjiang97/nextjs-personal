import React from 'react';
import Head from 'next/head';
import { PageContent, PageWithHeader, Callout, Container, Link } from 'bumbag';
import Nav from '../../components/nav';

interface PageLayoutProps {
  title: string;
  banner?: JSX.Element | JSX.Element[];
  isExperimental?: boolean;
  ignoreHorizontalPadding?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, banner, children }) => {
  const titleString = `${title} - Eric Jiang`;
  return (
    <PageWithHeader header={<Nav />} display="flex" flexDirection="column">
      <Head>
        <title>{titleString}</title>
      </Head>
      {banner && banner}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

        <PageContent flex={1}>
          <Container>
            <Callout type="info" title="Warning: Experimental Site" maxWidth="800px" width="100%" marginY="1rem">
              This site is experimental, please report any bugs to <Link href="https://github.com/ericjiang97/nextjs-personal/issues">https://github.com/ericjiang97/nextjs-personal/issues</Link>
            </Callout>
          </Container>
          {children}
        </PageContent>
      </div>
    </PageWithHeader>
  );
};

export default PageLayout;
