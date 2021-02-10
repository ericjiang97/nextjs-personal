import React, { useState } from 'react';

import { TopNav, Icon, TopNavProps, Input, useBreakpoint, Container } from 'bumbag';
import SideBar from './SideBar';
import { useRouter } from 'next/dist/client/router';

const topNavItems: { title: string; url: string }[] = [
  {
    title: 'Blog',
    url: '/blog',
  },
  {
    title: 'Projects',
    url: '/projects',
  },
  {
    title: 'About',
    url: '/about',
  },
];

const Nav = ({ navProps, searchValue }: { navProps?: TopNavProps; searchValue?: string }) => {
  const router = useRouter();
  const [displaySearch, setDisplaySearch] = useState(false);
  const isMobile = useBreakpoint('max-mobile');

  return (
    <TopNav {...navProps} backgroundColor="primary600" justifyContent="space-around">
      <Container breakpoint="desktop" display="flex" alignItems="center">
        <TopNav.Section display="flex" alignItems="center" flex="1">
          {isMobile && (
            <TopNav.Item marginLeft="minor-1">
              <SideBar />
            </TopNav.Item>
          )}
          <TopNav.Item href="/" marginLeft="major-2">
            <Icon aria-label="logo" icon="logo" fontSize="900" color="white" />
          </TopNav.Item>
        </TopNav.Section>
        {!isMobile && (
          <TopNav.Section marginY="major-2" display="flex" flex="1" justifyContent="flex-end">
            <Input
              placeholder="Search for something"
              defaultValue={searchValue}
              width={displaySearch ? '100%' : '-100px'}
              transition="width 0.3s"
              minWidth="0px"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  const searchTarget = e.currentTarget.value;
                  router.push(`/search?q=${searchTarget}`);
                }
              }}
            />
            <TopNav.Item palette="secondary" color="white" onClick={() => setDisplaySearch(!displaySearch)}>
              <Icon icon="search" />
            </TopNav.Item>
            {topNavItems.map((item) => {
              return (
                <TopNav.Item href={item.url} key={item.url} palette="secondary" color="white">
                  {item.title}
                </TopNav.Item>
              );
            })}
          </TopNav.Section>
        )}
      </Container>
    </TopNav>
  );
};

export default Nav;
