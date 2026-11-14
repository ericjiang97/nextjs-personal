'use client'

import React, { useState } from 'react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { stegaClean } from 'next-sanity'
import { IconCheck, IconCopy, IconExternalLink } from '@tabler/icons-react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component'
import 'react-before-after-slider-component/dist/build.css'

import YoutubeEmbed from './YouTubeEmbed'
import DownloadImageButton from '../buttons/DownloadImageButton'
import { urlFor } from '../../sanity/lib/image'

export function slugifyHeading(text: string): string {
  return stegaClean(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function getBlockPlainText(value: any): string {
  if (!value?.children || !Array.isArray(value.children)) return ''
  return value.children.map((c: any) => c.text || '').join('')
}

function CodeBlock({
  code,
  language,
}: {
  code?: string
  language?: string
}) {
  const [copied, setCopied] = useState(false)
  const raw = stegaClean(code) || ''

  const handleCopy = () => {
    if (!raw && typeof window !== 'undefined') return
    navigator.clipboard?.writeText(raw)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-950 text-neutral-100 shadow-lg dark:border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/90 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] text-neutral-400">
            {language || 'snippet'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <>
              <IconCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <IconCopy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed break-words whitespace-pre-wrap text-sky-100">
        <code>{code}</code>
      </pre>
    </div>
  )
}

const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = stegaClean(value?.href) || '#'
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-0.5 font-semibold text-sky-600 underline decoration-sky-500/40 underline-offset-4 transition-colors hover:text-sky-500 hover:decoration-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
        >
          <span>{children}</span>
          {isExternal && <IconExternalLink className="h-3.5 w-3.5 shrink-0" />}
        </a>
      )
    },
    strong: ({ children }) => (
      <strong className="font-bold text-neutral-900 dark:text-white">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="text-neutral-800 italic dark:text-neutral-200">
        {children}
      </em>
    ),
    code: ({ children }) => (
      <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-sm text-sky-700 dark:bg-white/10 dark:text-sky-300">
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children, value }) => {
      const text = getBlockPlainText(value)
      return (
        <h1
          id={text ? slugifyHeading(text) : undefined}
          className="mt-10 mb-4 scroll-mt-24 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
        >
          {children}
        </h1>
      )
    },
    h2: ({ children, value }) => {
      const text = getBlockPlainText(value)
      return (
        <h2
          id={text ? slugifyHeading(text) : undefined}
          className="mt-9 mb-3 scroll-mt-24 border-b border-neutral-200/70 pb-2 text-2xl font-bold tracking-tight text-neutral-900 dark:border-white/10 dark:text-white"
        >
          {children}
        </h2>
      )
    },
    h3: ({ children, value }) => {
      const text = getBlockPlainText(value)
      return (
        <h3
          id={text ? slugifyHeading(text) : undefined}
          className="mt-7 mb-2 scroll-mt-24 text-xl font-bold text-sky-700 dark:text-sky-400"
        >
          {children}
        </h3>
      )
    },
    h4: ({ children, value }) => {
      const text = getBlockPlainText(value)
      return (
        <h4
          id={text ? slugifyHeading(text) : undefined}
          className="mt-6 mb-2 scroll-mt-24 text-lg font-semibold text-neutral-800 dark:text-neutral-200"
        >
          {children}
        </h4>
      )
    },
    blockquote: ({ children }) => (
      <blockquote className="my-5 border-l-4 border-sky-500/60 pl-4 text-neutral-600 italic dark:text-neutral-300">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-4 font-sans text-base leading-8 text-neutral-700 dark:text-neutral-300">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-neutral-700 marker:text-sky-500 dark:text-neutral-300">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-neutral-700 marker:font-bold marker:text-sky-500 dark:text-neutral-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
    number: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const src =
        stegaClean(value?.url) ||
        (value?.asset ? urlFor(value).auto('format').url() : null)
      if (!src) return null
      return (
        <figure className="my-8 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-2 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <img
            src={src}
            alt={stegaClean(value?.alt) || ''}
            className="mx-auto max-h-[540px] w-full rounded-xl object-contain"
          />
          {value?.alt && (
            <figcaption className="mt-2.5 px-2 pb-1 text-center text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
    codeBlock: ({ value }) => (
      <CodeBlock code={value?.code} language={value?.language} />
    ),
    youtubeEmbed: ({ value }) => {
      if (value?.url) {
        return <YoutubeEmbed youtubeUrl={value.url} />
      }
      if (value?.html) {
        return (
          <div
            dangerouslySetInnerHTML={{ __html: stegaClean(value.html) }}
            className="my-6 w-full overflow-hidden rounded-2xl"
          />
        )
      }
      return null
    },
    beforeAfterSlice: ({ value }) => {
      const beforeUrl =
        stegaClean(value?.beforeImage?.url) ||
        (value?.beforeImage?.asset
          ? urlFor(value.beforeImage).auto('format').url()
          : '')
      const afterUrl =
        stegaClean(value?.afterImage?.url) ||
        (value?.afterImage?.asset
          ? urlFor(value.afterImage).auto('format').url()
          : '')
      if (!beforeUrl || !afterUrl) return null
      return (
        <div className="my-8 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-4 dark:border-white/10 dark:bg-white/[0.03]">
          {value?.title && (
            <h2 className="mb-3 text-lg font-bold text-neutral-900 dark:text-white">
              {value.title}
            </h2>
          )}
          <div className="w-full overflow-hidden rounded-xl">
            <ReactBeforeSliderComponent
              firstImage={{
                alt: stegaClean(value?.beforeImage?.alt) || '',
                imageUrl: beforeUrl,
              }}
              secondImage={{
                alt: stegaClean(value?.afterImage?.alt) || '',
                imageUrl: afterUrl,
              }}
              className="w-full"
            />
          </div>
          <div className="mt-3 flex w-full justify-end">
            <DownloadImageButton
              image={{ url: afterUrl, alt: value?.afterImage?.alt }}
            />
          </div>
        </div>
      )
    },
  },
}

export default function SanityPortableText({ value }: { value?: any[] | null }) {
  if (!value || !Array.isArray(value) || value.length === 0) return null
  return <PortableText value={value} components={portableTextComponents} />
}
