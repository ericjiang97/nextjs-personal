import Link from 'next/link'
import React from 'react'

const Logo: React.FC = () => {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-500 p-[1.5px] shadow-sm transition-transform duration-300 group-hover:scale-105">
        <img
          src="/images/transparent-eric-profile.png"
          alt="Eric Jiang"
          className="h-full w-full rounded-full bg-white object-cover dark:bg-neutral-900"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
          Eric Jiang
        </span>
        <span className="hidden text-[10px] font-medium text-neutral-500 sm:block dark:text-neutral-400">
          SWE @ Google
        </span>
      </div>
    </Link>
  )
}

export default Logo
