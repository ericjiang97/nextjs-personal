import React from "react";
import App from "next/app";

import Footer from "../components/footer";
import Nav from "../components/nav";

import useLocalStorage from "../hooks/useLocalStorage";

import "../css/tailwind.css";

function RootComponent({ children }) {
  // You can use hooks here
  const [darkTheme, setDarkTheme] = useLocalStorage("darkTheme", true);

  return (
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
        <div className="flex-1 flex flex-col mt-6">{children}</div>
        <Footer />
      </div>
    </div>
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
