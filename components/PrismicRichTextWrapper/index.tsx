'use client'
import React, { useState } from 'react'
import { PrismicRichText } from '@prismicio/react'
import { PrismicDocument, RichTextField } from '@prismicio/types'
import { IconCheck, IconCopy, IconExternalLink } from '@tabler/icons-react'

import YoutubeEmbed from './YouTubeEmbed'

interface PrismicRichTextWrapperProps {
  page?: PrismicDocument<Record<string, any>, string, string>
  data?: RichTextField
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function CodeBlock({ children, text }: { children: React.ReactNode; text?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const raw = text || (typeof children === 'string' ? children : '')
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
            snippet
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
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words text-sky-100">
        <code>{children}</code>
      </pre>
    </div>
  )
}

const PrismicRichTextWrapper = ({
  page,
  data,
}: React.PropsWithChildren<PrismicRichTextWrapperProps>) => {
  const _field = data || (page && page.data.body)
  return (
    <PrismicRichText
      field={_field}
      components={{
        hyperlink: ({ children, node }) => {
          const isExternal = node.data.url?.startsWith('http')
          return (
            <a
              href={node.data.url}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-0.5 font-semibold text-sky-600 underline decoration-sky-500/40 underline-offset-4 transition-colors hover:text-sky-500 hover:decoration-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
            >
              <span>{children}</span>
              {isExternal && <IconExternalLink className="h-3.5 w-3.5 shrink-0" />}
            </a>
          )
        },
        heading1: ({ children, text }) => (
          <h1
            id={text ? slugifyHeading(text) : undefined}
            className="mt-10 mb-4 scroll-mt-24 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
          >
            {children}
          </h1>
        ),
        heading2: ({ children, text }) => (
          <h2
            id={text ? slugifyHeading(text) : undefined}
            className="mt-9 mb-3 scroll-mt-24 border-b border-neutral-200/70 pb-2 text-2xl font-bold tracking-tight text-neutral-900 dark:border-white/10 dark:text-white"
          >
            {children}
          </h2>
        ),
        heading3: ({ children, text }) => (
          <h3
            id={text ? slugifyHeading(text) : undefined}
            className="mt-7 mb-2 scroll-mt-24 text-xl font-bold text-sky-700 dark:text-sky-400"
          >
            {children}
          </h3>
        ),
        heading4: ({ children, text }) => (
          <h4
            id={text ? slugifyHeading(text) : undefined}
            className="mt-6 mb-2 scroll-mt-24 text-lg font-semibold text-neutral-800 dark:text-neutral-200"
          >
            {children}
          </h4>
        ),
        paragraph: ({ children }) => (
          <p className="my-4 font-sans text-base leading-8 text-neutral-700 dark:text-neutral-300">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-neutral-900 dark:text-white">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-neutral-800 dark:text-neutral-200">
            {children}
          </em>
        ),
        list: ({ children }) => (
          <ul className="my-4 ml-6 list-disc space-y-2 text-neutral-700 marker:text-sky-500 dark:text-neutral-300">
            {children}
          </ul>
        ),
        oList: ({ children }) => (
          <ol className="my-4 ml-6 list-decimal space-y-2 text-neutral-700 marker:font-bold marker:text-sky-500 dark:text-neutral-300">
            {children}
          </ol>
        ),
        listItem: ({ children }) => (
          <li className="pl-1 leading-7">{children}</li>
        ),
        oListItem: ({ children }) => (
          <li className="pl-1 leading-7">{children}</li>
        ),
        image: ({ node }) => {
          const { url, alt } = node
          return (
            <figure className="my-8 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-2 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <img
                src={url}
                alt={alt || ''}
                className="mx-auto max-h-[540px] w-full rounded-xl object-contain"
              />
              {alt && (
                <figcaption className="mt-2.5 px-2 pb-1 text-center text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {alt}
                </figcaption>
              )}
            </figure>
          )
        },
        preformatted: ({ children, text }) => (
          <CodeBlock text={text}>{children}</CodeBlock>
        ),
        embed: (props) => {
          if (props.node.oembed.provider_name === 'YouTube') {
            return (
              <YoutubeEmbed youtubeUrl={props.node.oembed.embed_url || ''} />
            )
          }
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: props.node.oembed.html || '',
              }}
              className="my-6 w-full overflow-hidden rounded-2xl"
            />
          )
        },
      }}
    />
  )
}

export default PrismicRichTextWrapper
