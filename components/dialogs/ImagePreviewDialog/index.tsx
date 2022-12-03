import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import DownloadImageButton from "../../buttons/DownloadImageButton";

import {
  hideModal,
  useImagePreviewDispatch,
  useImagePreviewState,
} from "../../../contexts/ImagePreviewContext";

const ImagePreviewDialog: React.FC = () => {
  const { showModal, image } = useImagePreviewState();
  const dispatch = useImagePreviewDispatch();

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          hideModal(dispatch);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-sm sm:p-6 md:max-w-4xl">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    {/* <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Payment successful
                    </Dialog.Title> */}
                    {/* <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequatur amet labore.
                      </p>
                    </div>*/}
                    {image && image.url && (
                      <>
                        <img src={image.url} alt={image.alt || ""} />
                        <div className="mt-1 flex w-full justify-end">
                          <DownloadImageButton image={image} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => {
                      hideModal(dispatch);
                    }}
                  >
                    Hide Preview
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ImagePreviewDialog;
