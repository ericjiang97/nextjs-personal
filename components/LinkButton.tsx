import React from 'react';
import { Button, Link } from 'bumbag';

const LinkButton: React.FC<{ href: string; iconBefore?: string }> = ({ children, href, iconBefore }) => {
  const linkProps = Link.useProps({ href: `${href}` });
  return (
    <Button use={Link} palette="primary" margin="0.25rem" iconBefore={iconBefore} {...linkProps}>
      {children}
    </Button>
  );
};

export default LinkButton;
