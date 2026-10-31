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

// Cosine color palette for silky ribbon gradients
vec3 ribbonPalette(float t, float darkMode) {
  vec3 a = mix(vec3(0.45, 0.65, 0.95), vec3(0.18, 0.42, 0.85), darkMode);
  vec3 b = mix(vec3(0.35, 0.30, 0.45), vec3(0.45, 0.38, 0.60), darkMode);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.05, 0.35, 0.68);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 mouse = (u_mouse * 2.0 - 1.0);

  // Subtle mouse parallax warp
  uv += mouse * 0.06 * exp(-length(uv - mouse) * 1.2);

  float t = u_time * 0.35;

  // Base background colors for Light and Dark modes
  vec3 lightBg = vec3(0.973, 0.980, 0.988);
  vec3 darkBg  = vec3(0.012, 0.020, 0.042);
  vec3 bgColor = mix(lightBg, darkBg, u_dark);

  vec3 ribbonAccum = vec3(0.0);
  float alphaAccum = 0.0;

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
    float core = 0.014 / (dist + 0.018);
    float halo = smoothstep(0.55, 0.0, dist) * 0.45;
    float intensity = pow(core, 1.15) * 0.42 + halo;

    // Twist shimmer along the ribbon length
    float shimmer = 0.65 + 0.35 * sin(p.x * 3.5 - t * 1.8 + i * 1.7);
    intensity *= shimmer;

    vec3 col = ribbonPalette(p.x * 0.28 + i * 0.19 + t * 0.12, u_dark);

    ribbonAccum += col * intensity;
    alphaAccum += intensity * 0.22;
  }

  // Soft vignette so edges stay clean
  float vignette = smoothstep(2.2, 0.35, length(uv * vec2(0.75, 0.95)));
  ribbonAccum *= vignette;

  // Composite differently for Dark vs Light mode for optimal contrast
  vec3 darkResult = bgColor + ribbonAccum * 0.55;
  vec3 lightResult = mix(
    bgColor,
     vec3(0.22, 0.52, 0.96) * 0.35 + ribbonAccum * 0.45,
    clamp(alphaAccum * vignette * 0.42, 0.0, 0.38)
  );

  vec3 finalColor = mix(lightResult, darkResult, u_dark);

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

    // Fullscreen quad
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
    let currentDark = isDarkRef.current

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001

      // Smoothly interpolate mouse and theme uniform
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.06
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.06
      currentDark += (isDarkRef.current - currentDark) * 0.08

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
        'pointer-events-none fixed inset-0 -z-10 h-full w-full',
        className
      )}
    />
  )
}
