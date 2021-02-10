import React from 'react';

import { Drawer, Menu, Icon, Link, Switch, useColorMode, Divider } from 'bumbag';
import { navItems } from '../../../config/navItems';

const SideBar: React.FC = () => {
  const drawer = Drawer.useState({ animated: true });
  const { colorMode, setColorMode } = useColorMode();

  const isLightMode = colorMode !== 'dark';

  return (
    <>
      <Drawer.Disclosure {...drawer} marginLeft="1rem">
        <Icon aria-label="toggle sidebar" icon="solid-bars" color="white" />
      </Drawer.Disclosure>
      <Drawer {...drawer} fade slide overflowY="scroll" maxWidth="280px">
        <Menu marginTop="2rem">
          <Menu.Item paddingY="1rem">
            <Icon aria-label="Calendar" icon="logo" fontSize="100px" />
          </Menu.Item>
          {navItems.map((item, navTopItemIndex) => {
            if (!item.childNav) {
              return (
                <React.Fragment>
                  <Menu.Group title={item.label} key={navTopItemIndex}>
                    <Menu.Item>
                      <Link href={item.href}>{item.label}</Link>
                    </Menu.Item>
                  </Menu.Group>
                  <Divider />
                </React.Fragment>
              );
            }
            return (
              <>
                <Menu.Group title={item.label} key={navTopItemIndex}>
                  {item.childNav?.map((childItem, childItemIndex) => {
                    return (
                      <Menu.Item key={childItemIndex}>
                        <Link href={childItem.href}>{childItem.label}</Link>
                      </Menu.Item>
                    );
                  })}
                </Menu.Group>
                <Divider />
              </>
            );
          })}
        </Menu>
        <Menu.Group title="Settings">
          <div style={{ padding: '0.25rem 1rem' }}>
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
          </div>
        </Menu.Group>
      </Drawer>
    </>
  );
};

export default SideBar;
