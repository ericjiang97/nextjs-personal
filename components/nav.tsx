import React from 'react';

import { Button, TopNav, useColorMode } from 'bumbag';

const Nav: React.FC = () => {
  const { colorMode, setColorMode } = useColorMode();
  const isLightMode = colorMode === 'light';
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
        <TopNav.Item href="/talks">Talks</TopNav.Item>
        <TopNav.Item href="/videos">Videos</TopNav.Item>
        <TopNav.Item href="/about">About</TopNav.Item>
      </TopNav.Section>
      <TopNav.Section marginRight="major-2">
        <TopNav.Item>
          <Button palette="primary" onClick={() => {
            if (isLightMode) {
              setColorMode('dark');
            } else {
              setColorMode('light');
            }
          }}>{`${isLightMode ? 'Light' : 'Dark'} Mode`}</Button>
        </TopNav.Item>
      </TopNav.Section>
    </TopNav>
  );
};

export default Nav;
