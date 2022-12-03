import React from "react";

import { DownloadIcon } from "@heroicons/react/solid";

import { ImageField } from "@prismicio/types";

interface DownloadImageButtonProps {
  image: ImageField;
}

const DownloadImageButton: React.FC<DownloadImageButtonProps> = ({ image }) => {
  if (!image.url) {
    return null;
  }
  return (
    <a
      href={image.url.replace("?auto=compress,format", "")}
      target="_blank"
      rel="noreferrer noopener"
      type="button"
      className="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <DownloadIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
      Download Image
    </a>
  );
};

export default DownloadImageButton;
