'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type Theme = 'light' | 'dark' | 'system'

export interface ThemeProviderProps {
  children?: React.ReactNode
  attribute?: string
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
}

interface UseThemeProps {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<UseThemeProps | undefined>(undefined)

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  storageKey = 'theme',
}: React.PropsWithChildren<ThemeProviderProps>) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    try {
      const saved = window.localStorage.getItem(storageKey) as Theme | null
      return saved || defaultTheme
    } catch {
      return defaultTheme
    }
  })

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() =>
    getSystemTheme()
  )

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' && enableSystem
      ? systemTheme
      : theme === 'light'
        ? 'light'
        : 'dark'

  const applyThemeToDOM = useCallback((resolved: 'light' | 'dark') => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolved)
    root.style.colorScheme = resolved
  }, [])

  useEffect(() => {
    applyThemeToDOM(resolvedTheme)
  }, [resolvedTheme, applyThemeToDOM])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme)
      try {
        window.localStorage.setItem(storageKey, nextTheme)
      } catch {
        // Ignore storage errors
      }
    },
    [storageKey]
  )

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): UseThemeProps {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    return {
      theme: 'system',
      resolvedTheme: 'dark',
      setTheme: () => {},
    }
  }
  return ctx
}
