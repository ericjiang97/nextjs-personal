import React from "react";
import App from "next/app";
import "../css/tailwind.css";
import Footer from "../components/footer";
import Nav from "../components/nav";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div
        className="flex flex-col min-h-screen transition-all duration-250 bg-background text-on-background  "
        data-theme="dark"
      >
        <Nav />
        <div className="flex-1 m-6 flex flex-col ">
          <Component {...pageProps}></Component>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MyApp;
