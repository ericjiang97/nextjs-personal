import Link from "next/link";
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Link href="/">
        <img
          src="/images/transparent-eric-profile.png"
          className="h-12 w-12 rounded-full"
        />
      </Link>
      <Link href="/">
        <div className="hidden sm:block ml-2 text-lg font-bold">Eric Jiang</div>
      </Link>
    </div>
  );
};

export default Logo;
