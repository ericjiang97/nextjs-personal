import React from "react";

import {
  ChevronRightIcon,
  ChevronLeftIcon,
  DownloadIcon,
} from "@heroicons/react/solid";

import {
  Button,
  Position,
  SpecialZoomLevel,
  Tooltip,
  Viewer,
} from "@react-pdf-viewer/core";
import {
  NumberOfPagesProps,
  pageNavigationPlugin,
  RenderCurrentPageLabelProps,
  RenderGoToPageProps,
  RenderNumberOfPagesProps,
} from "@react-pdf-viewer/page-navigation";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import disableScrollPlugin from "./plugins/disableScrollPlugin";

interface SlidesViewerProps {
  fileUrl: string;
}

const SlidesViewer: React.FC<SlidesViewerProps> = ({ fileUrl }) => {
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const disableScrollPluginInstance = disableScrollPlugin();

  const { GoToNextPage, GoToPreviousPage, NumberOfPages, CurrentPageLabel } =
    pageNavigationPluginInstance;
  return (
    <div className="rpv-core__viewer">
      <div
        style={{
          height: "400px",
          position: "relative",
        }}
      >
        <Viewer
          fileUrl={fileUrl}
          plugins={[pageNavigationPluginInstance, disableScrollPluginInstance]}
          defaultScale={SpecialZoomLevel.PageFit}
        />
      </div>
      <div className="mt-2 flex w-full flex-row items-center bg-gray-900 px-4 py-2">
        <GoToPreviousPage>
          {({ onClick, isDisabled }: RenderGoToPageProps) => (
            <Tooltip
              position={Position.BottomCenter}
              target={
                <button
                  onClick={onClick}
                  disabled={isDisabled}
                  className="mx-2 text-gray-100 disabled:text-gray-400"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
                </button>
              }
              content={() => "Previous page"}
              offset={{ left: 0, top: 8 }}
            />
          )}
        </GoToPreviousPage>
        <GoToNextPage>
          {({ onClick, isDisabled }: RenderGoToPageProps) => (
            <Tooltip
              position={Position.BottomCenter}
              target={
                <button onClick={onClick} disabled={isDisabled}>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </button>
              }
              content={() => "Next page"}
              offset={{ left: 0, top: 8 }}
            />
          )}
        </GoToNextPage>
        <CurrentPageLabel>
          {(props: RenderCurrentPageLabelProps) => {
            return (
              <div className="flex flex-1 justify-center text-white">
                <div>{`${props.currentPage} / ${props.numberOfPages}`}</div>
              </div>
            );
          }}
        </CurrentPageLabel>
        <a
          type="button"
          href={fileUrl}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <DownloadIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Download
        </a>
      </div>
    </div>
  );
};

export default SlidesViewer;
