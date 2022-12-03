import React, { useReducer } from "react";

import { ImageField } from "@prismicio/types";
import { Nullable } from "../types";

type Action =
  | {
      type: "@@IMAGE_PREVIEW_DISPATCH/SHOW_IMAGE";
      image: ImageField;
    }
  | {
      type: "@@IMAGE_PREVIEW_DISPATCH/DISMISS_PREVIEW";
    };

type Dispatch = (action: Action) => void;

export interface ImagePreviewContextState {
  image: Nullable<ImageField>;
  showModal: boolean;
}

const ImageProviderContext = React.createContext<
  ImagePreviewContextState | undefined
>(undefined);

const ImageDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const reducer = (
  state: ImagePreviewContextState,
  action: Action
): ImagePreviewContextState => {
  switch (action.type) {
    case "@@IMAGE_PREVIEW_DISPATCH/SHOW_IMAGE":
      return {
        image: action.image,
        showModal: true,
      };
    case "@@IMAGE_PREVIEW_DISPATCH/DISMISS_PREVIEW":
      return {
        image: null,
        showModal: false,
      };
    default:
      return { ...state };
  }
};

export const ImagePreviewContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    showModal: false,
    image: null,
  });

  return (
    <ImageProviderContext.Provider value={state}>
      <ImageDispatchContext.Provider value={dispatch}>
        {children}
      </ImageDispatchContext.Provider>
    </ImageProviderContext.Provider>
  );
};

function useImagePreviewState() {
  const context = React.useContext(ImageProviderContext);
  if (context === undefined) {
    throw new Error(
      "useImagePreviewState must be used within a ImagePreviewProvider"
    );
  }
  return context;
}

function useImagePreviewDispatch() {
  const context = React.useContext(ImageDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useImagePreviewDispatch must be used within a ImagePreviewProvider"
    );
  }
  return context;
}

async function showModal(dispatch: Dispatch, image: ImageField) {
  dispatch({
    type: "@@IMAGE_PREVIEW_DISPATCH/SHOW_IMAGE",
    image: image,
  });
}

function hideModal(dispatch: Dispatch) {
  dispatch({
    type: "@@IMAGE_PREVIEW_DISPATCH/DISMISS_PREVIEW",
  });
}

export { useImagePreviewState, useImagePreviewDispatch, showModal, hideModal };
