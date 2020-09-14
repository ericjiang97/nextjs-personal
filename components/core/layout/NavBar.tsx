import React from 'react';

import { TopNav, Icon } from 'bumbag';
import SideBar from '../SideBar';

const Nav = () => {
  return (
    <TopNav>
      <TopNav.Section>
        <TopNav.Item marginLeft="minor-1">
          <SideBar />
        </TopNav.Item>
        <TopNav.Item href="/" marginLeft="major-2">
          <Icon aria-label="Calendar" icon="logo" fontSize="900" />
        </TopNav.Item>
      </TopNav.Section>
      <TopNav.Section marginRight="major-2"></TopNav.Section>
    </TopNav>
  );
};

export default Nav;
