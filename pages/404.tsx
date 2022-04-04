import Image from "next/image";
import Link from "next/link";
import React from "react";
import MainLayout from "../containers/MainLayout";

const NotFoundPage = () => {
  return (
    <MainLayout pageTitle="404: Page Not Found" showHero={false}>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-4xl font-bold">Page Not found</h2>
        <h3 className="mt-3 flex text-2xl font-semibold text-gray-500">
          perhaps its been deleted. Go back{" "}
          <span className="ml-2 text-maroon underline">
            <Link href="/">Home</Link>
          </span>
        </h3>
        <img src="/images/ericshrug.png" className="block h-1/2 w-1/2" />
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
