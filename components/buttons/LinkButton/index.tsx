import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  href?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href = "#", children }) => {
  return (
    <Link href={href} passHref>
      <div className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        {children}
      </div>
    </Link>
  );
};

export default LinkButton;
