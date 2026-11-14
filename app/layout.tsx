import React from 'react'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import PlausibleProvider from 'next-plausible'

import { ThemeProvider } from '../providers/ThemeProvider'
import CoreHead from '../components/layout/CoreHead'
import SiteChrome from '../components/layout/SiteChrome'
import { SanityLive } from '../sanity/lib/live'
import '../styles/globals.css'

async function MyApp({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode()

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
            <SiteChrome isDraftMode={isDraftMode}>{children}</SiteChrome>
            <SanityLive />
            {isDraftMode && <VisualEditing />}
          </ThemeProvider>
        </PlausibleProvider>
      </body>
    </html>
  )
}

export default MyApp
