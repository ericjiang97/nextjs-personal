import React from "react";
import Link from "next/link";

const Nav = () => (
  <nav className="text-center">
    <ul className="flex justify-between px-4 my-4 py-1">
      <li className="flex px-2 py-1">
        <Link href="/">
          <a className="text-blue-500 no-underline text-sm">Eric Jiang</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
