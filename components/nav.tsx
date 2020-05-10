import React from 'react';

import Link from 'next/link';

import Icons from './icons';

interface NavProps {
  toggleDarkTheme: () => void;
  darkTheme: boolean;
}

interface NavState {
  expanded: boolean;
}

class Nav extends React.Component<NavProps, NavState> {
  constructor(props: NavProps) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  setExpanded = (expanded: boolean) => {
    this.setState({
      expanded,
    });
  }

  render() {
    const { toggleDarkTheme, darkTheme } = this.props;
    const { expanded } = this.state;

    return (
      <nav
        className="sticky top-0 flex items-center justify-between flex-wrap p-6 text-on-surface bg-navigation-secondary"
        style={{ zIndex: 1 }}
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/">
            <a className="text-brand no-underline text-lg font-semibold">Eric Jiang</a>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-brand border-brand hover:text-blue-700 hover:border-blue-700"
            onClick={() => this.setExpanded(!expanded)}
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className={`w-full block flex-grow lg:flex md:items-center lg:w-auto ${!expanded && 'hidden'}`}>
          <div className="text-sm lg:flex-grow">
            <a href="/blog" className="block mt-4 mx-2 lg:inline-block lg:mt-0 text-brand hover:text-brand">
              Blog
            </a>
            <a href="/projects" className="block mt-4 mx-2 lg:inline-block lg:mt-0 text-brand hover:text-brand">
              Projects
            </a>
            <a href="/talks" className="block mt-4 mx-2 lg:inline-block lg:mt-0 text-brand hover:text-brand">
              Tech Talks
            </a>
            <a href="/photos" className="block mt-4 mx-2 lg:inline-block lg:mt-0 text-brand hover:text-brand">
              Photography
            </a>
            <a href="/about" className="block mt-4 mx-2 lg:inline-block lg:mt-0 text-brand hover:text-brand">
              About
            </a>
          </div>
          <div>
            <button
              className="flex items-center px-3 py-2 text-brand hover:text-blue-700 "
              onClick={() => toggleDarkTheme()}
            >
              {darkTheme ? (
                <Icons.Moon className="fill-current h-5 w-5" />
              ) : (
                  <Icons.Sun className="fill-current h-5 w-5" />
                )}
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
