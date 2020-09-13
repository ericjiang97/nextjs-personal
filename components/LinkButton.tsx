import React from 'react';
import { Button, Link } from 'bumbag';

interface LinkButtonProps {
  href: string;
  iconBefore?: string;
  palette?: 'primary' | 'secondary';
  variant?: 'outlined' | 'ghost' | 'link';
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, href, iconBefore, palette = 'primary', variant }) => {
  const linkProps = Link.useProps({ href: `${href}` });
  return (
    <Button
      use={Link}
      palette={palette}
      margin="0.25rem"
      iconBefore={iconBefore}
      variant={variant}
      aria-label={`link button to ${href}`}
      {...linkProps}
    >
      {children}
    </Button>
  );
};

export default LinkButton;
