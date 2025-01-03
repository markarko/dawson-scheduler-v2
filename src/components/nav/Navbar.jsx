import { Group, Code, Burger, Drawer, ScrollArea, useMantineTheme } from '@mantine/core';
import {
  IconRegistered,
  IconLogin,
  IconSearch,
  IconCalendarMonth,
  IconBookmark
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import React from 'react';
import useIsMobile from '../../hooks/UseIsMobile';
import { toast } from 'react-toastify';

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
  { label: NavbarItem.Search, icon: IconSearch, disabled: false },
  { label: NavbarItem.Schedules, icon: IconCalendarMonth, disabled: false },
  { label: NavbarItem.Saved, icon: IconBookmark, disabled: false },
];

const mobileData = [
  { label: NavbarItem.Login, icon: IconLogin, disabled: true },
  { label: NavbarItem.Register, icon: IconRegistered, disabled: true }
];

export function Navbar(props) {
  const isMobile = useIsMobile();
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const theme = useMantineTheme();

  const link = (item) => (
    <a
      className={classes.link}
      data-active={item.label === props.activePage || undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        if (item.disabled) {
          toast.error("This feature is currently disabled", {
            autoClose: 1500
          });
          return;
        }
        props.setActivePage(item.label);
        if (isMobile) setIsMobileNavOpen(false);
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
            <a href="/" className={classes.link} onClick={(event) => {
              event.preventDefault();
              toast.error("This feature is currently disabled", {
                autoClose: 2000
              })
            }}>
              <IconRegistered className={classes.linkIcon} stroke={1.5} />
              <span>Register</span>
            </a>

            <a href="/" className={classes.link} onClick={(event) => {
              event.preventDefault();
              toast.error("This feature is currently disabled", {
                autoClose: 2000
              });
              }}>
              <IconLogin className={classes.linkIcon} stroke={1.5} />
              <span>Login</span>
            </a>
          </div>
        </nav>
      )}

      {isMobile && (
        <nav className={classes.MobileNav}>
          <a href="https://discord.com/users/439861053543940097"><img src={"/icons/discord-icon.png"} alt="discord" /></a>
          <div>
            <Burger
              color={theme.colors.blue[9]}
              style={{ background: "white", position: "sticky", top: "32.5px", left: "32.5px"}}
              opened={isMobileNavOpen}
              onClick={() => setIsMobileNavOpen((o) => !o)}
              size="md"
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
          </div>
        </nav>
      )}
    </>
  );
}
