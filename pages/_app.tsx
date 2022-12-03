import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Worker } from "@react-pdf-viewer/core";

import { linkResolver, repositoryName } from "../config/prismic";

import { ImagePreviewContextProvider } from "../contexts/ImagePreviewContext";

import "../styles/globals.css";
import packageJson from "../package.json";

const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];

ChartJS.register(
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RootComponent: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#145DA0" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for ericjiang.dev blog"
          href="/blog/feed.xml"
        />
        <link
          rel="alternate"
          type="application/rss+json"
          title="RSS Feed for ericjiang.dev blog"
          href="/blog/feed.json"
        />
      </Head>
      <>{children}</>
    </React.Fragment>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
    >
      <ImagePreviewContextProvider>
        <PrismicProvider
          linkResolver={linkResolver}
          internalLinkComponent={({ href, children, ...props }) => (
            <Link href={href}>
              <a {...props}>{children}</a>
            </Link>
          )}
        >
          <PrismicPreview repositoryName={repositoryName}>
            <RootComponent>
              <Component {...pageProps} />
            </RootComponent>
          </PrismicPreview>
        </PrismicProvider>
      </ImagePreviewContextProvider>
    </Worker>
  );
}

export default MyApp;
