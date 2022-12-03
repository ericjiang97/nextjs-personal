import React from "react";

import { DownloadIcon } from "@heroicons/react/solid";

import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

import { ImageField, KeyTextField } from "@prismicio/types";

interface BeforeAfterSlice {
  slice: {
    primary: {
      before_image: ImageField;
      after_image: ImageField;
      title: KeyTextField;
    };
  };
}
/**
 * @typedef {import("@prismicio/client").Content.BeforeAfterSlice} BeforeAfterSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BeforeAfterSlice>} BeforeAfterProps
 * @param { BeforeAfterProps }
 */
const BeforeAfter: React.FC<BeforeAfterSlice> = ({ slice }) => {
  const { before_image, after_image, title } = slice.primary;
  return (
    <div className="mt-2">
      {title && (
        <div className="mt-1">
          <h2 className="text-2xl font-semibold text-maroon">{title}</h2>
        </div>
      )}
      <div className="mt-2 w-full">
        {before_image.url && after_image.url && (
          <ReactBeforeSliderComponent
            firstImage={{
              alt: before_image.alt || "",
              imageUrl: before_image.url,
            }}
            secondImage={{
              alt: after_image.alt || "",
              imageUrl: after_image.url,
            }}
            className="w-full"
          />
        )}
      </div>
      {after_image.url && (
        <div className="mt-1 flex w-full justify-end">
          <a
            href={after_image.url}
            target="_blank"
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <DownloadIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default BeforeAfter;
