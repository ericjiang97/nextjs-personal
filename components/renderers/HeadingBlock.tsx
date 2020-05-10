import React from 'react';

interface HeadingBlockProps {
  level: number;
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({ level, children }) => {
  switch (level) {
    case 2:
      return <h2 className="m-0 w-full pt-14 leading-tight text-2xl text-left font-semibold">{children}</h2>;
    case 3:
      return <h3 className="m-0 w-full pt-14 leading-tight text-xl text-left font-semibold">{children}</h3>;
    case 4:
      return <h4 className="m-0 w-full pt-14 leading-tight text-xl text-left font-medium">{children}</h4>;
    case 5:
      return <h5 className="m-0 w-full pt-14 leading-tight text-lg text-left font-medium">{children}</h5>;
    default:
      return <p>{children}</p>;
  }
};

export default HeadingBlock;
