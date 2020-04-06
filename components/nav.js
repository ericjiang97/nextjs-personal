import React, { useState } from "react";
import Link from "next/link";

const Nav = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <nav className="sticky top-0 flex items-center justify-between bg-blue-100 flex-wrap p-6 text-on-surface bg-surface">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/">
          <a className="text-brand no-underline text-lg">Eric Jiang</a>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-brand border-brand hover:text-blue-700 hover:border-blue-700"
          onClick={() => setExpanded(!expanded)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex md:items-end lg:w-auto ${
          !expanded && "hidden"
        }`}
      >
        <div className="text-sm lg:flex-grow">
          <a
            href="/blog"
            className="block mt-4 lg:inline-block lg:mt-0 text-brand hover:text-brand"
          >
            Blog
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
