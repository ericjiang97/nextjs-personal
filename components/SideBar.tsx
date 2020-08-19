import React from 'react';

import { Drawer, Menu, Icon, Link, Disclosure, Button } from 'bumbag';
import { navItems } from '../config/navItems';

const SideBar: React.FC = () => {
  const drawer = Drawer.useState();

  return (
    <>
      <Drawer.Disclosure {...drawer} marginLeft="1rem">
        <Icon aria-label="toggle sidebar" icon="solid-bars" color="primary" />
      </Drawer.Disclosure>
      <Drawer {...drawer}>
        <Menu marginTop="2rem">
          <Menu.Item>
            <Button
              onClick={() => {
                drawer.setVisible(false);
              }}
              palette="primary"
              marginY="1rem"
              iconBefore="solid-times"
            >
              Close Drawer
            </Button>
          </Menu.Item>
          {navItems.map((item, navTopItemIndex) => {
            if (!item.childNav) {
              return (
                <Menu.Item key={navTopItemIndex}>
                  <Link href={item.href}>{item.label}</Link>
                </Menu.Item>
              );
            }
            return (
              <Disclosure.State key={navTopItemIndex}>
                {(disclosure) => {
                  return (
                    <>
                      <Disclosure {...disclosure}>
                        {(disclosureProps) => {
                          return (
                            <Menu.Item {...disclosureProps} iconAfter="solid-chevron-down">
                              {item.label}
                            </Menu.Item>
                          );
                        }}
                      </Disclosure>
                      <Disclosure.Content paddingLeft="0.5rem">
                        {item.childNav?.map((childItem, childItemIndex) => {
                          return (
                            <Menu.Item key={childItemIndex}>
                              <Link href={childItem.href}>{childItem.label}</Link>
                            </Menu.Item>
                          );
                        })}
                      </Disclosure.Content>
                    </>
                  );
                }}
              </Disclosure.State>
            );
          })}
        </Menu>
      </Drawer>
    </>
  );
};

export default SideBar;
