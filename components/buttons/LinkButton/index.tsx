import Link from 'next/link'
import React from 'react'

interface LinkButtonProps {
  href?: string
  background?: string
}

const LinkButton = ({
  href = '#',
  background = 'white',
  children,
}: React.PropsWithChildren<LinkButtonProps>) => {
  return (
    <Link href={href} passHref>
      <div
        className={`shadow-xs focus:outline-hiddenfocus:ring-2 inline-flex items-center rounded-md border border-gray-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        {children}
      </div>
    </Link>
  )
}

export default LinkButton
