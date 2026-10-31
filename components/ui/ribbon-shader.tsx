'use client'

import React, { useEffect, useRef } from 'react'
import { useTheme } from '../../providers/ThemeProvider'
import { cn } from '../../utils/cn'

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_dark;

// Cosine color palette for dark mode neon ribbons
vec3 darkRibbonPalette(float t) {
  vec3 a = vec3(0.18, 0.42, 0.85);
  vec3 b = vec3(0.45, 0.38, 0.60);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.05, 0.35, 0.68);
  return a + b * cos(6.28318 * (c * t + d));
}

// Vivid pigment palette for light mode silk ribbons
vec3 lightRibbonPalette(float t) {
  vec3 a = vec3(0.32, 0.52, 0.96);
  vec3 b = vec3(0.36, 0.32, 0.48);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.00, 0.30, 0.65);
  return clamp(a + b * cos(6.28318 * (c * t + d)), 0.0, 1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 mouse = (u_mouse * 2.0 - 1.0);

  // Subtle mouse parallax warp
  uv += mouse * 0.07 * exp(-length(uv - mouse) * 1.1);

  float t = u_time * 0.38;

  // Base background colors for Light and Dark modes
  vec3 lightBg = vec3(0.965, 0.976, 0.996);
  vec3 darkBg  = vec3(0.012, 0.020, 0.042);

  vec3 darkAccum = vec3(0.0);
  vec3 lightColor = lightBg;

  // Soft vignette
  float vignette = smoothstep(2.3, 0.3, length(uv * vec2(0.75, 0.95)));

  // Render 5 layered flowing silk ribbons
  for (float i = 0.0; i < 5.0; i++) {
    float fi = i * 0.65;
    vec2 p = uv;

    // Domain warp for organic silk-like folding
    p.x += 0.35 * sin(p.y * 1.6 + t * 0.9 + fi);
    p.y += 0.28 * cos(p.x * 1.4 - t * 0.7 + fi * 1.3);

    // Ribbon wave curve across screen
    float wave = sin(p.x * (1.3 + i * 0.18) + t + fi) * 0.42
               + cos(p.x * (0.7 - i * 0.08) - t * 0.6 + fi) * 0.25;

    float dist = abs(p.y - wave + (i - 2.0) * 0.18);

    // Core silk strand + soft atmospheric bloom
    float core = 0.015 / (dist + 0.018);
    float halo = smoothstep(0.58, 0.0, dist) * 0.48;
    float intensity = pow(core, 1.12) * 0.42 + halo;

    // Twist shimmer along the ribbon length
    float shimmer = 0.65 + 0.35 * sin(p.x * 3.5 - t * 1.8 + i * 1.7);
    intensity *= shimmer;

    float colorPhase = p.x * 0.28 + i * 0.21 + t * 0.14;

    // Dark mode additive glow
    vec3 dCol = darkRibbonPalette(colorPhase);
    darkAccum += dCol * intensity * vignette;

    // Light mode pigment alpha-blending over light pearl canvas
    vec3 lCol = lightRibbonPalette(colorPhase);
    float ribbonAlpha = clamp((smoothstep(0.45, 0.0, dist) * 0.38 + clamp(core * 0.28, 0.0, 0.55)) * shimmer * vignette, 0.0, 0.68);
    lightColor = mix(lightColor, lCol, ribbonAlpha);
  }

  vec3 darkResult = darkBg + darkAccum * 0.55;
  vec3 finalColor = mix(lightColor, darkResult, u_dark);

  gl_FragColor = vec4(finalColor, 1.0);
}
`

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export const RibbonShader = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { resolvedTheme } = useTheme()
  const isDarkRef = useRef<number>(1)

  useEffect(() => {
    isDarkRef.current = resolvedTheme === 'light' ? 0 : 1
  }, [resolvedTheme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      canvas.getContext('webgl', { antialias: false, depth: false }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)
    if (!gl) return

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )

    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uDark = gl.getUniformLocation(program, 'u_dark')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const mouseTarget = { x: 0.5, y: 0.5 }
    const mouseCurrent = { x: 0.5, y: 0.5 }

    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.x = e.clientX / Math.max(1, window.innerWidth)
      mouseTarget.y = 1.0 - e.clientY / Math.max(1, window.innerHeight)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    let rafId = 0
    const startTime = performance.now()
    let currentDark =
      typeof document !== 'undefined' &&
      !document.documentElement.classList.contains('dark')
        ? 0
        : isDarkRef.current

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001

      // Also check DOM class directly in case theme changed
      const domDark = document.documentElement.classList.contains('dark')
        ? 1
        : 0
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.06
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.06
      currentDark += (domDark - currentDark) * 0.08

      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform1f(uTime, elapsed)
      gl.uniform2f(uMouse, mouseCurrent.x, mouseCurrent.y)
      gl.uniform1f(uDark, currentDark)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 z-0 h-full w-full',
        className
      )}
    />
  )
}
