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
    childNav: [
      {
        href: '/blog',
        label: 'Read All',
      },
      {
        href: '/blog/category/Review',
        label: 'Review',
      },
      {
        href: '/blog/category/Careers',
        label: 'Careers',
      },
      {
        href: '/blog/category/Technology',
        label: 'Technology',
      },
      {
        href: '/blog/category/Development',
        label: 'Development',
      },
    ],
  },
  {
    label: 'Philanthropy',
    href: '/philanthropy',
  },
  {
    label: 'Media',
    childNav: [
      {
        label: 'Photos',
        href: '/photos',
      },
      {
        href: '/talks',
        label: 'Tech Talks',
      },
      {
        href: '/videos',
        label: 'Videos',
      },
    ],
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
      {
        href: '/contact',
        label: 'Contact',
      },
    ],
  },
];
