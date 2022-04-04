import "../styles/globals.css";
import type { AppProps } from "next/app";

import { PrismicProvider } from "@prismicio/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider>
      <Component {...pageProps} />
    </PrismicProvider>
  );
}

export default MyApp;
