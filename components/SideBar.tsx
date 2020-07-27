import React from 'react';

import { Drawer, Menu, Icon, Link } from 'bumbag';

const SideBar: React.FC = () => {
  const drawer = Drawer.useState();

  return (
    <>
      <Drawer.Disclosure {...drawer}>
        <Icon aria-label="toggle sidebar" icon="solid-bars" color="primary" />
      </Drawer.Disclosure>
      <Drawer {...drawer}>
        <Menu marginTop="2rem">
          <Menu.Item>
            <Link href="/blog">Blog</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/projects">Projects</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/photos">Photos</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/philanthropy">Philanthropy</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/talks">Talks</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/videos">Videos</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/about">About</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default SideBar;
