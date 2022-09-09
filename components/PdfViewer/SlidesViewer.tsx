import React from "react";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";

import {
  Icon,
  MinimalButton,
  Position,
  SpecialZoomLevel,
  Tooltip,
  Viewer,
} from "@react-pdf-viewer/core";
import {
  pageNavigationPlugin,
  RenderGoToPageProps,
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

  const { GoToNextPage, GoToPreviousPage } = pageNavigationPluginInstance;
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
      <div className="mt-2 flex w-full flex-row bg-gray-900">
        <div>
          <GoToPreviousPage>
            {(props: RenderGoToPageProps) => (
              <Tooltip
                position={Position.BottomCenter}
                target={
                  <MinimalButton onClick={props.onClick}>
                    <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
                  </MinimalButton>
                }
                content={() => "Previous page"}
                offset={{ left: 0, top: 8 }}
              />
            )}
          </GoToPreviousPage>
        </div>
        <GoToNextPage>
          {(props: RenderGoToPageProps) => (
            <Tooltip
              position={Position.BottomCenter}
              target={
                <MinimalButton onClick={props.onClick}>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </MinimalButton>
              }
              content={() => "Next page"}
              offset={{ left: 0, top: 8 }}
            />
          )}
        </GoToNextPage>
      </div>
    </div>
  );
};

export default SlidesViewer;
