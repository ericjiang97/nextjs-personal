import React from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import CoreHead from "../components/layout/CoreHead";
import Footer from "../components/layout/Footer";
import "../styles/globals.css";
import NavBar from "../components/NavBar";

function MyApp({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <CoreHead />
      <body className="min-h-screen w-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex flex-1 flex-col justify-start">
            <NavBar />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default MyApp;
