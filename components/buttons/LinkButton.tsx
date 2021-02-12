import { Button, ButtonProps, Link } from 'bumbag';
import React from 'react';

interface LinkButtonProps extends ButtonProps {
  href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  href,
  iconBefore,
  palette = 'primary',
  variant,
  ...otherProps
}) => {
  const linkProps = Link.useProps({ href: `${href}` });
  return (
    <Button
      use={Link}
      palette={palette}
      margin="0.25rem"
      iconBefore={iconBefore}
      variant={variant}
      aria-label={`link button to ${href}`}
      borderRadius="2"
      {...otherProps}
      {...linkProps}
    >
      {children}
    </Button>
  );
};

export default LinkButton;
