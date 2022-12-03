import React from "react";
import { PrismicRichText, SliceComponentType } from "@prismicio/react";

import { ImageField } from "@prismicio/types";
import {
  showModal,
  useImagePreviewDispatch,
} from "../../contexts/ImagePreviewContext";

/**
 * @typedef {import("@prismicio/client").Content.ImageGroupSlice} ImageGroupSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImageGroupSlice>} ImageGroupProps
 * @param { ImageGroupProps }
 */
const ImageGroup: SliceComponentType = ({ slice }) => {
  const dispatch = useImagePreviewDispatch();

  const { title } = slice.primary;

  return (
    <div className="my-3">
      {title && (
        <div className="mt-1">
          <h2 className="text-lg font-semibold text-blue-700">{title}</h2>
        </div>
      )}
      <div className="container mx-auto">
        <div className="grid-cols-2 space-y-1 p-20 lg:grid lg:gap-1 lg:space-y-0">
          {slice.items.map((item: { image: ImageField }, i: number) => {
            let span = "";
            if ((i + 1) % 3 == 0) {
              span = "col-span-2 row-span-2";
            }
            if (!item.image.url) {
              return null;
            }
            return (
              <div
                className={`w-full ${span} rounded`}
                key={i}
                onClick={() => {
                  showModal(dispatch, item.image);
                }}
              >
                <img src={item.image.url} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageGroup;
