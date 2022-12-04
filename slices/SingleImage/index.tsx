import React from "react";
import { PrismicText } from "@prismicio/react";

import { ImageField, KeyTextField } from "@prismicio/types";
import DownloadImageButton from "../../components/buttons/DownloadImageButton";
import {
  showModal,
  useImagePreviewDispatch,
} from "../../contexts/ImagePreviewContext";

interface SingleImageProps {
  slice: {
    primary: {
      image: ImageField;
      description: KeyTextField;
    };
  };
}
/**
 * @typedef {import("@prismicio/client").Content.SingleImageSlice} SingleImageSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SingleImageSlice>} SingleImageProps
 * @param { SingleImageProps }
 */
const SingleImage: React.FC<SingleImageProps> = ({ slice }) => {
  const dispatch = useImagePreviewDispatch();

  const { image, description } = slice.primary;
  return (
    <div className="my-3">
      {image && image.url && (
        <img
          src={image.url}
          alt={image.alt || description || ""}
          onClick={() => {
            showModal(dispatch, image);
          }}
        />
      )}
      <div className="mt-2 flex items-center">
        {description && (
          <div className="font-semibold text-gray-700">{description}</div>
        )}
        <div className="flex-1" />
        <DownloadImageButton image={image} />
      </div>
    </div>
  );
};

export default SingleImage;
