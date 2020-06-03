import React from 'react';
import Head from 'next/head';

interface PageLayoutProps {
  title: string;
  banner?: JSX.Element | JSX.Element[];
  isExperimental?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, banner, children, isExperimental = false }) => {
  const titleString = `${title} - Eric Jiang`;
  return (
    <>
      {isExperimental && (
        <div className="w-full px-2 py-1 bg-warning text-warning-900 mt-2 mb-4">
          {`Warning! This page ${titleString} is experiemental and may be buggy`}
        </div>
      )}
      <div className="text-sans">
        <Head>
          <title>{titleString}</title>
        </Head>
        <div className="w-full h-screen flex flex-col items-center justify-center mw-4/5 px-2 py-2">
          <h3 className="m-0 text-3xl font-bold text-gray-500">#BlackLivesMatter #AboriginalLivesMatter</h3>
          <h4 className="m-0 text-2xl font-bold text-gray-500">Donate and Support this cause now!</h4>
        </div>
        {banner && banner}
        <div className="w-full text-gray-900">{children}</div>
      </div>
    </>
  );
};

export default PageLayout;
