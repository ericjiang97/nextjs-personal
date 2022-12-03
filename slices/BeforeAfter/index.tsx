import React from "react";

import { DownloadIcon } from "@heroicons/react/solid";

import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

import { ImageField, KeyTextField } from "@prismicio/types";
import DownloadImageButton from "../../components/buttons/DownloadImageButton";

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
    <div className="my-3">
      {title && (
        <div className="mt-1">
          <h2 className="text-lg font-semibold text-blue-700">{title}</h2>
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
          <DownloadImageButton image={after_image} />
        </div>
      )}
    </div>
  );
};

export default BeforeAfter;
