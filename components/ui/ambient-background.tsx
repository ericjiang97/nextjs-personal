'use client'
import React from 'react'
import { RibbonShader } from './ribbon-shader'

export const AmbientBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* GPU WebGL Ribbon Gradient Shader */}
      <RibbonShader />

      {/* Subtle architectural grid overlay for depth */}
      <div className="bg-grid-pattern absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_25%,black_25%,transparent_100%)]" />
    </div>
  )
}
