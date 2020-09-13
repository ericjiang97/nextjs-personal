import React from 'react';
import { Button, Link } from 'bumbag';

interface LinkButtonProps {
  href: string;
  iconBefore?: string;
  palette?: 'primary' | 'secondary' | 'ghost' | 'outlined';
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, href, iconBefore, palette = 'primary' }) => {
  const linkProps = Link.useProps({ href: `${href}` });
  return (
    <Button
      use={Link}
      palette={palette}
      margin="0.25rem"
      iconBefore={iconBefore}
      {...linkProps}
      aria-label={`link button to ${href}`}
    >
      {children}
    </Button>
  );
};

export default LinkButton;
