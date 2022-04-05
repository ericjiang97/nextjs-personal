import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  href?: string;
  background?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  href = "#",
  background = "white",
  children,
}) => {
  return (
    <Link href={href} passHref>
      <div
        className={`inline-flex items-center rounded-md border border-gray-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-900 shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        {children}
      </div>
    </Link>
  );
};

export default LinkButton;
