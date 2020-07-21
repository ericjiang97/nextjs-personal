import React from 'react';
import Head from 'next/head';
import { PageContent, PageWithHeader } from 'bumbag';
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
    <PageWithHeader header={<Nav />}>
      <Head>
        <title>{titleString}</title>
      </Head>
      {banner && banner}
      <PageContent>{children}</PageContent>
    </PageWithHeader>
  );
};

export default PageLayout;
