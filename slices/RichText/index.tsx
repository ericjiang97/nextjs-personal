import React from "react";
import { SliceComponentType } from "@prismicio/react";
import PrismicRichTextWrapper from "../../components/PrismicRichTextWrapper";

/**
 * @typedef {import("@prismicio/client").Content.RichTextSlice} RichTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<RichTextSlice>} RichTextProps
 * @param { RichTextProps }
 */
const RichText: SliceComponentType = ({ slice }) => {
  return <PrismicRichTextWrapper data={slice.primary.text} />;
};

export default RichText;
