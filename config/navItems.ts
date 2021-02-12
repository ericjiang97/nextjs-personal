type NavItem = NavItemMain | NavItemChild;

interface NavItemMain {
  label: string;
  href?: string;
  childNav?: never;
}

interface NavItemChild {
  label: string;
  href?: never;
  childNav?: ChildNavItem[];
}

interface ChildNavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Philanthropy',
    href: '/philanthropy',
  },
  {
    label: 'Media',
    href: '/media',
  },
  {
    label: 'About...',
    childNav: [
      {
        href: '/about',
        label: 'About Me',
      },
      {
        href: '/projects',
        label: 'About My Projects',
      },
    ],
  },
];
