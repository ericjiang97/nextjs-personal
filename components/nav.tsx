import React from 'react';

import { Button, TopNav } from 'bumbag';

interface NavProps {
  toggleDarkTheme?: () => void;
  // TODO: remove this as a dependency
  darkTheme?: boolean;
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

  render() {
    return (
      <TopNav>
        <TopNav.Section>
          <TopNav.Item href="/">
            {/** TODO: Make a SVG logo for this */}
            <Button palette="primary" variant="ghost">
              Eric Jiang
            </Button>
          </TopNav.Item>
          <TopNav.Item href="/blog">Blog</TopNav.Item>
          <TopNav.Item href="/projects">Projects</TopNav.Item>
          <TopNav.Item href="/photos">Photos</TopNav.Item>
          <TopNav.Item href="/philanthropy">Philanthropy</TopNav.Item>
          <TopNav.Item href="/videos">Videos</TopNav.Item>
          <TopNav.Item href="/about">About</TopNav.Item>
        </TopNav.Section>
      </TopNav>
    );
  }
}

export default Nav;
