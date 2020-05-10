import React from 'react';
import Head from 'next/head';

interface PageLayoutProps {
  title: string;
  banner?: JSX.Element | JSX.Element[];
  isExperimental?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, banner, children, isExperimental = false }) => {
  return (
    <>
      {isExperimental && (
        <div className="w-full px-2 py-1 bg-error text-gray-900 mt-2 mb-4">
          Warning! This Page is is experiemental and may be buggy
        </div>
      )}
      <div className="text-sans">
        <Head>
          <title>{`${title} - Eric Jiang`}</title>
        </Head>
        {banner && banner}
        <div className="w-full text-gray-900">{children}</div>
      </div>
    </>
  );
};

export default PageLayout;
