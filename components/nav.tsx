import React from 'react';

import { Button, TopNav, useColorMode, Icon, useBreakpoint, Popover, Switch, DropdownMenu, Link } from 'bumbag';
import SideBar from './SideBar';
import { navItems } from '../config/navItems';

const Nav = () => {
  const { colorMode, setColorMode } = useColorMode();
  const isDesktopOrLarger = useBreakpoint('min-desktop');

  const isLightMode = colorMode === 'light';

  return (
    <TopNav>
      <TopNav.Section>
        {!isDesktopOrLarger && (
          <TopNav.Item marginLeft="minor-1">
            <SideBar />
          </TopNav.Item>
        )}
        <TopNav.Item href="/" marginLeft="major-2">
          Eric Jiang
        </TopNav.Item>
      </TopNav.Section>
      {isDesktopOrLarger && (
        <TopNav.Section>
          {navItems.map((item, navTopItemIndex) => {
            if (!item.childNav) {
              return (
                <TopNav.Item href={item.href} key={navTopItemIndex}>
                  {item.label}
                </TopNav.Item>
              );
            }
            return (
              <TopNav.Item key={navTopItemIndex}>
                <DropdownMenu
                  menu={
                    <>
                      {item.childNav.map((childItem, childItemIndex) => {
                        return (
                          <DropdownMenu.Item key={childItemIndex}>
                            <Link href={childItem.href}>{childItem.label}</Link>
                          </DropdownMenu.Item>
                        );
                      })}
                    </>
                  }
                >
                  <Button variant="ghost" iconAfter="solid-chevron-down">
                    {item.label}
                  </Button>
                </DropdownMenu>
              </TopNav.Item>
            );
          })}
        </TopNav.Section>
      )}
      <TopNav.Section marginRight="major-2">
        <TopNav.Item>
          <Popover.State placement="bottom">
            <Popover.Disclosure use={Button}>
              <Icon icon="solid-cog" />
            </Popover.Disclosure>
            <Popover title="Settings">
              {/* <Heading use="h6">User Settings</Heading> */}
              <Switch
                label={`${isLightMode ? 'Light' : 'Dark'} Mode`}
                checked={isLightMode}
                onChange={() => {
                  if (isLightMode) {
                    setColorMode('dark');
                  } else {
                    setColorMode('light');
                  }
                }}
              />
            </Popover>
          </Popover.State>
        </TopNav.Item>
      </TopNav.Section>
    </TopNav>
  );
};

export default Nav;
