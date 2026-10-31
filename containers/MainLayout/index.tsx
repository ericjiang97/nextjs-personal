import React from 'react'
import { MainLayoutProps } from './MainLayout'
import { AmbientBackground } from '../../components/ui/ambient-background'

const MainLayout = ({
  customHero,
  children,
  showProgress = false,
  progress = 0,
}: React.PropsWithChildren<MainLayoutProps>) => {
  return (
    <div className="relative flex min-h-[calc(100vh-12rem)] flex-1 flex-col">
      {/* Multi-Layer Aceternity Ambient Background (WebGL Ribbon Shader + Grid) */}
      <AmbientBackground />

      {showProgress && (
        <div className="fixed top-0 right-0 left-0 z-[60] h-1 bg-transparent">
          <div
            className="h-1 rounded-r-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(56,189,248,0.8)] transition-[width] duration-100"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-4 pb-16 sm:px-6 lg:px-8">
        {customHero && <div className="mb-10 w-full">{customHero}</div>}
        <div className="w-full flex-1">{children}</div>
      </main>
    </div>
  )
}

export default MainLayout
