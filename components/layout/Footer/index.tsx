import Link from 'next/link'
import { IconProps } from './types'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Albums', href: '/albums' },
    { name: 'Wallpapers', href: '/media/wallpapers' },
    { name: 'Photos', href: 'https://ericj.photos' },
    { name: 'About', href: '/about' },
  ],
  socials: [
    {
      name: 'Instagram',
      href: 'https://instagram.com/lorderikir',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/ericjiang97',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/ericjiang97',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/ericjiang97',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

export default function Footer() {
  const todaysYear = new Date().getFullYear().toString()

  return (
    <footer className="relative mt-20 border-t border-neutral-200/80 bg-white/50 backdrop-blur-md dark:border-white/[0.08] dark:bg-neutral-950/60">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
      <div className="mx-auto max-w-6xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-sky-600 dark:text-neutral-400 dark:hover:text-sky-400"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex justify-center space-x-4">
          {navigation.socials.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200/80 bg-white text-neutral-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-500/40 hover:text-sky-600 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-sky-400/40 dark:hover:text-sky-400"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Copyright &copy; {`2016 - ${todaysYear} Eric Jiang.`}
        </p>

        <div className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-500">
          Powered by{' '}
          <Link
            href="https://vercel.com"
            className="underline decoration-neutral-400/50 underline-offset-4 transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            Vercel
          </Link>{' '}
          &amp;{' '}
          <Link
            href="https://prismic.io/"
            className="underline decoration-neutral-400/50 underline-offset-4 transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            Prismic
          </Link>
          . Built with{' '}
          <Link
            href="https://nextjs.org/"
            className="underline decoration-neutral-400/50 underline-offset-4 transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            Next.js
          </Link>
          ,{' '}
          <Link
            href="https://tailwindcss.com"
            className="underline decoration-neutral-400/50 underline-offset-4 transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            Tailwind CSS
          </Link>{' '}
          &amp;{' '}
          <Link
            href="https://ui.aceternity.com"
            className="underline decoration-neutral-400/50 underline-offset-4 transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            Aceternity UI
          </Link>
          . Profile Picture by{' '}
          <Link
            href="https://twitter.com/sushisamaou"
            className="underline decoration-neutral-400/50 underline-offset-4 transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            sushisamaou
          </Link>
          .
        </div>
        <div className="mt-1.5 text-center text-xs text-neutral-500 dark:text-neutral-500">
          Encountering issues?{' '}
          <Link
            href="https://github.com/ericjiang97/nextjs-personal/issues/new"
            className="underline decoration-neutral-400/50 underline-offset-4 transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            Submit an issue
          </Link>
          .
        </div>
      </div>
    </footer>
  )
}
