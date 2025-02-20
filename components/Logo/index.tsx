import Link from "next/link";
import React from "react";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div className="flex items-center">
        <img
          src="/images/transparent-eric-profile.png"
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-2 hidden text-white text-lg font-bold sm:block">Eric Jiang</div>
      </div>
    </Link>
  );
};

export default Logo;
