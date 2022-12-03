import React, { Fragment } from "react";
import { ImageField } from "@prismicio/types";
import { PrismicRichText } from "@prismicio/react";
import { Url } from "url";
import Image from "next/image";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

interface BeforeAfterSlice {
  slice: {
    primary: {
      before_image: ImageField;
      after_image: ImageField;
    };
  };
}
/**
 * @typedef {import("@prismicio/client").Content.BeforeAfterSlice} BeforeAfterSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BeforeAfterSlice>} BeforeAfterProps
 * @param { BeforeAfterProps }
 */
const BeforeAfter: React.FC<BeforeAfterSlice> = ({ slice }) => {
  const { before_image, after_image } = slice.primary;
  console.log(before_image, after_image);
  return (
    <Fragment>
      {before_image.url && after_image.url && (
        <ReactBeforeSliderComponent
          firstImage={{
            imageUrl: before_image.url,
          }}
          secondImage={{
            imageUrl: after_image.url,
          }}
        />
      )}
    </Fragment>
  );
};

export default BeforeAfter;
