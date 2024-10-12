import { Group, Code, Burger, Drawer, ScrollArea, useMantineTheme } from '@mantine/core';
import {
  IconRegistered,
  IconLogin,
  IconSearch,
  IconCalendarMonth,
  IconBookmark
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';

export const NavbarItem = {
  Search: 'Search',
  Schedules: 'Schedules',
  Saved: 'Saved',
  Plugins: 'Plugins',
  Settings: 'Settings',
  Login: 'Login',
  Register: 'Register'
};

const data = [
  { link: '', label: NavbarItem.Search, icon: IconSearch },
  { link: '', label: NavbarItem.Schedules, icon: IconCalendarMonth },
  { link: '', label: NavbarItem.Saved, icon: IconBookmark },
];

const mobileData = [
  { link: '', label: NavbarItem.Login, icon: IconLogin },
  { link: '', label: NavbarItem.Register, icon: IconRegistered }
];

export function Navbar(props) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const theme = useMantineTheme();

  const link = (item) => (
    <a
      className={classes.link}
      data-active={item.label === props.activePage || undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault(); 
        props.setActivePage(item.label);
        if (isMobile) setIsMobileNavOpen(false); // Close the drawer on selection
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  );

  const links = data.map(link);
  const mobileLinks = mobileData.map(link);

  return (
    <>
      {!isMobile && (
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify="space-between">
              <Code fw={700} className={classes.version}>
                v3.1.2
              </Code>
            </Group>
            {links}
          </div>
          <div className={classes.footer}>
            <a href="/" className={classes.link} onClick={(event) => event.preventDefault()}>
              <IconRegistered className={classes.linkIcon} stroke={1.5} />
              <span>Register</span>
            </a>

            <a href="/" className={classes.link} onClick={(event) => event.preventDefault()}>
              <IconLogin className={classes.linkIcon} stroke={1.5} />
              <span>Login</span>
            </a>
          </div>
        </nav>
      )}

      {isMobile && (
        <>
          <Burger
            color={"white"}
            style={{ background: theme.colors.blue[9], position: "sticky", top: "32.5px", left: "32.5px"}}
            opened={isMobileNavOpen}
            onClick={() => setIsMobileNavOpen((o) => !o)}
            size="md"
            mr="xl"
          />
          <Drawer
            opened={isMobileNavOpen}
            onClose={() => setIsMobileNavOpen(false)}
            padding="md"
            size="100%"
            title="Menu"
            styles={{
              drawer: {
                heihgt: "100vh",
                backgroundColor: theme.colors.blue[9],
              },
              header: {
                backgroundColor: theme.colors.blue[9],
                color: "white",
                height: "10%"
              },
              close: {
                backgroundColor: "white",
                color: theme.colors.blue[9],
              },
              body: {
                backgroundColor: theme.colors.blue[9],
                height: "90%",
              }
            }}
          >
            <ScrollArea style={{ height: '100%' }}>
              <div style={{ padding: '20px' }}>
                {links}
                {mobileLinks}
              </div>
            </ScrollArea>
          </Drawer>
        </>
      )}
    </>
  );
}
