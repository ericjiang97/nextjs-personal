import React from 'react';
import { Button, ButtonProps, Link } from 'bumbag';

interface LinkButtonProps extends ButtonProps {
  href: string;
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
