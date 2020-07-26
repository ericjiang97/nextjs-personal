import React from 'react';

import { Button, SideNav } from 'bumbag';

const SideBar: React.FC = () => {
  return (
    <SideNav defaultSelectedId="list">
      <SideNav.Level>
        <SideNav.Item href="/">
          {/** TODO: Make a SVG logo for this */}
          <Button palette="primary" variant="ghost">
            Eric Jiang
          </Button>
        </SideNav.Item>

        <SideNav.Item href="/blog">Blog</SideNav.Item>
        <SideNav.Item href="/projects">Projects</SideNav.Item>
        <SideNav.Item href="/photos">Photos</SideNav.Item>
        <SideNav.Item href="/philanthropy">Philanthropy</SideNav.Item>
        <SideNav.Item href="/talks">Talks</SideNav.Item>
        <SideNav.Item href="/videos">Videos</SideNav.Item>
        <SideNav.Item href="/about">About</SideNav.Item>
      </SideNav.Level>
    </SideNav>
  );
};

export default SideBar;
