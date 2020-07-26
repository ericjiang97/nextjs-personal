import React from 'react';
import { Heading, Paragraph } from 'bumbag';

interface HeadingBlockProps {
  level: number;
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({ level, children }) => {
  switch (level) {
    case 2:
    case 3:
    case 4:
    case 5:
      return <Heading use={`h${level + 2}`}>{children}</Heading>;
    default:
      return <Paragraph>{children}</Paragraph>;
  }
};

export default HeadingBlock;
