import React from "react";
import Head from "next/head";

interface PageLayoutProps {
  title: string;
  banner?: JSX.Element | JSX.Element[];
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, banner, children }) => {
  return (
    <div className="text-sans">
      <Head>
        <title>{`${title} - Eric Jiang`}</title>
      </Head>
      {banner && banner}
      <div className="w-full text-gray-900">{children}</div>
    </div>
  );
};

export default PageLayout;
