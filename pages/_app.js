import React from "react";
import App from "next/app";

import Footer from "../components/footer";
import Nav from "../components/nav";

import useDarkTheme from "../hooks/useDarkTheme";

import "../css/tailwind.css";
import Head from "next/head";

function RootComponent({ children }) {
  const [darkTheme, setDarkTheme] = useDarkTheme();

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <div
        className="flex flex-col min-h-screen transition-all duration-250 bg-background text-on-background"
        data-theme={darkTheme ? "dark" : "light"}
      >
        <div className="flex-1 flex flex-col ">
          <Nav
            toggleDarkTheme={() => {
              setDarkTheme(!darkTheme);
            }}
            darkTheme={darkTheme}
          />
          <div className="flex-1 flex flex-col mt-6 p-4">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  ); // The fragment is just illustrational
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <RootComponent>
        <Component {...pageProps}></Component>
      </RootComponent>
    );
  }
}

export default MyApp;
