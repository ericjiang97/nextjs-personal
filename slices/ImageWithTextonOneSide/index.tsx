import React from "react";
import { ImageField, RichTextField } from "@prismicio/types";
import PrismicRichTextWrapper from "../../components/PrismicRichTextWrapper";
import { Nullable } from "../../types";

type TextPosition = "left" | "right";

interface ImageWithTextOnOneSideProps {
  slice: {
    primary: {
      image: ImageField;
      text: RichTextField;
      position: Nullable<TextPosition>;
    };
  };
}

/**
 * @typedef {import("@prismicio/client").Content.ImageLeftSlice} ImageLeftSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImageLeftSlice>} ImageLeftProps
 * @param { ImageLeftProps }
 */
const ImageWithTextOnOneSide: React.FC<ImageWithTextOnOneSideProps> = ({
  slice,
}) => {
  const { image, text, position } = slice.primary;
  return (
    <section className="mt-3 flex flex-wrap">
      {(position === null || position === "left") && image.url && (
        <div className="flex-2">
          <img src={image.url} alt={image.alt || ""} />
        </div>
      )}
      <div className="flex-1 py-2 px-1">
        <PrismicRichTextWrapper data={text} />
      </div>
      {position === "right" && image.url && (
        <div className="flex-1">
          <img src={image.url} alt={image.alt || ""} />
        </div>
      )}
    </section>
  );
};

export default ImageWithTextOnOneSide;
