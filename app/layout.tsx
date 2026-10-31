import React from 'react'
import { ThemeProvider } from '../providers/ThemeProvider'
import CoreHead from '../components/layout/CoreHead'
import Footer from '../components/layout/Footer'
import '../styles/globals.css'
import NavBar from '../components/NavBar'
import PlausibleProvider from 'next-plausible'

function MyApp({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <CoreHead />
      <body className="min-h-screen w-full overflow-x-hidden antialiased">
        <PlausibleProvider src="https://analytics.ericj.app/js/pa-lbEEBCE5mYAVgOsD_CRqQ.js">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-1 flex-col justify-between">
              <NavBar />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </PlausibleProvider>
      </body>
    </html>
  )
}

export default MyApp
