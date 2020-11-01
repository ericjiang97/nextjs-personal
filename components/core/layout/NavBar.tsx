import React from 'react';

import { TopNav, Icon, TopNavProps, Input } from 'bumbag';
import SideBar from './SideBar';
import { useRouter } from 'next/dist/client/router';

const Nav = ({
  navProps,
  searchValue,
  hideSearch = false,
}: {
  navProps?: TopNavProps;
  searchValue?: string;
  hideSearch?: boolean;
}) => {
  const router = useRouter();
  return (
    <TopNav {...navProps} display="flex" alignItems="center">
      <TopNav.Section display="flex" alignItems="center">
        <TopNav.Item marginLeft="minor-1">
          <SideBar />
        </TopNav.Item>
        <TopNav.Item href="/" marginLeft="major-2">
          <Icon aria-label="logo" icon="logo" fontSize="900" />
        </TopNav.Item>
      </TopNav.Section>
      {!hideSearch && (
        <>
          <TopNav.Section marginY="major-2" display="flex" alignItems="center" flex="1" justifyContent="space-around">
            <Input
              before={<Input.Icon icon="solid-search" />}
              placeholder="Search for something"
              flex="1"
              maxWidth="700"
              defaultValue={searchValue}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  const searchTarget = e.currentTarget.value;
                  router.push(`/search?q=${searchTarget}`);
                }
              }}
            />
          </TopNav.Section>
          <TopNav.Section marginLeft="major-2" display="flex" alignItems="center" />
        </>
      )}
    </TopNav>
  );
};

export default Nav;
