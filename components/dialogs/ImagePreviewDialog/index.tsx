'use client'

import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import DownloadImageButton from '../../buttons/DownloadImageButton'
import {
  hideModal,
  useImagePreviewDispatch,
  useImagePreviewState,
} from '../../../contexts/ImagePreviewContext'

const ImagePreviewDialog: React.FC = () => {
  const { showModal, image } = useImagePreviewState()
  const dispatch = useImagePreviewDispatch()

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          hideModal(dispatch)
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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/95 p-5 text-left shadow-2xl backdrop-blur-xl transition-all dark:border-white/10 dark:bg-neutral-900/95">
                {image && image.url && (
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={image.url}
                      alt={image.alt || ''}
                      className="max-h-[75vh] w-full object-contain"
                    />
                  </div>
                )}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-200 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                    onClick={() => {
                      hideModal(dispatch)
                    }}
                  >
                    Close Preview
                  </button>
                  <div>{image && <DownloadImageButton image={image} />}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ImagePreviewDialog
