import React, { useState } from 'react';

import { TopNav, Icon, TopNavProps, Input, useBreakpoint } from 'bumbag';
import SideBar from './SideBar';
import { useRouter } from 'next/dist/client/router';

const Nav = ({ navProps, searchValue }: { navProps?: TopNavProps; searchValue?: string }) => {
  const router = useRouter();
  const [displaySearch, setDisplaySearch] = useState(false);
  const isMobile = useBreakpoint('max-mobile');

  return (
    <TopNav {...navProps} display="flex" alignItems="center" backgroundColor="primary600">
      <TopNav.Section display="flex" alignItems="center">
        {isMobile && (
          <TopNav.Item marginLeft="minor-1">
            <SideBar />
          </TopNav.Item>
        )}
        <TopNav.Item href="/" marginLeft="major-2">
          <Icon aria-label="logo" icon="logo" fontSize="900" color="white" />
        </TopNav.Item>
      </TopNav.Section>
      <TopNav.Section marginY="major-2" display="flex" alignItems="center" flex="1" justifyContent="space-around" />

      <TopNav.Section marginY="major-2" display="flex" flex="1" justifyContent="flex-end">
        <Input
          placeholder="Search for something"
          defaultValue={searchValue}
          width={displaySearch ? '100%' : '0px'}
          transition="width 0.3s"
          minWidth="0px"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              const searchTarget = e.currentTarget.value;
              router.push(`/search?q=${searchTarget}`);
            }
          }}
        />
        <TopNav.Item palette="secondary" onClick={() => setDisplaySearch(!displaySearch)}>
          Search
        </TopNav.Item>
      </TopNav.Section>
      <TopNav.Section display="flex" alignItems="center" color="white">
        <TopNav.Item href="/blog" palette="secondary">
          Blog
        </TopNav.Item>
        <TopNav.Item href="/projects" palette="secondary">
          Projects
        </TopNav.Item>
        <TopNav.Item href="/about" palette="secondary">
          About
        </TopNav.Item>
      </TopNav.Section>
    </TopNav>
  );
};

export default Nav;
