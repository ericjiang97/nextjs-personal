import React from "react";
import App from "next/app";
import "../css/tailwind.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps}></Component>;
  }
}

export default MyApp;
