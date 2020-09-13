import React from 'react';
import App from 'next/app';
import { Provider as BumbagProvider, ToastManager } from 'bumbag';

import 'react-lazy-load-image-component/src/effects/blur.css';
import Head from 'next/head';
import theme from '../config/theme';
import Footer from '../components/footer';
import { NextWebVitalsMetrics } from '../types/Next.canary';

const RootComponent: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      <div>
        <div>{children}</div>
      </div>
      <Footer />
    </>
  ); // The fragment is just illustrational
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <BumbagProvider theme={theme} collapseBelow="desktop" isSSR>
        <RootComponent>
          <Component {...pageProps}></Component>
        </RootComponent>
        <ToastManager />
      </BumbagProvider>
    );
  }
}

export function reportWebVitals(metric: NextWebVitalsMetrics) {
  const { id, name, label, value } = metric;
  window.gtag('send', 'event', {
    eventCategory: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}

export default MyApp;
