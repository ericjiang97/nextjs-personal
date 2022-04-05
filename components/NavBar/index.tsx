import { useRouter } from "next/router";
import Link from "next/link";

import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import Logo from "../Logo";

import { Navigation } from "../../types/Navigation";

const navigation: Navigation[] = [
  { name: "Blog", href: "/blog" },
  { name: "Talks", href: "/talks" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const router = useRouter();
  const currentPath = router.pathname;

  const parentPath = router.pathname.split("/")[1];

  return (
    <Disclosure as="nav" className="bg-light-cyan-500">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Logo />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      const isCurrent =
                        parentPath === item.href.replace("/", "");
                      return (
                        <div
                          key={item.href}
                          className={classNames(
                            isCurrent
                              ? "bg-gray-900 text-white"
                              : "text-gray-699 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          <Link
                            key={item.name}
                            href={item.href}
                            aria-current={isCurrent ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => {
                const isCurrent = currentPath === item.href;

                return (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      isCurrent
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
