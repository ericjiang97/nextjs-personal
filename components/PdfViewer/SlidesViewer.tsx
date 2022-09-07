import React from "react";

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
          left: 0,
          position: "absolute",
          top: "50%",
          transform: "translate(24px, -50%)",
          zIndex: 1,
        }}
      >
        <GoToPreviousPage>
          {(props: RenderGoToPageProps) => (
            <Tooltip
              position={Position.BottomCenter}
              target={
                <MinimalButton onClick={props.onClick}>
                  <Icon size={16}>
                    <path d="M18.4.5,5.825,11.626a.5.5,0,0,0,0,.748L18.4,23.5" />
                  </Icon>
                </MinimalButton>
              }
              content={() => "Previous page"}
              offset={{ left: 0, top: 8 }}
            />
          )}
        </GoToPreviousPage>
      </div>

      <div
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translate(-24px, -50%)",
          zIndex: 1,
        }}
      >
        <GoToNextPage>
          {(props: RenderGoToPageProps) => (
            <Tooltip
              position={Position.BottomCenter}
              target={
                <MinimalButton onClick={props.onClick}>
                  <Icon size={16}>
                    <path d="M5.651,23.5,18.227,12.374a.5.5,0,0,0,0-.748L5.651.5" />
                  </Icon>
                </MinimalButton>
              }
              content={() => "Next page"}
              offset={{ left: 0, top: 8 }}
            />
          )}
        </GoToNextPage>
      </div>

      <Viewer
        fileUrl={fileUrl}
        plugins={[pageNavigationPluginInstance, disableScrollPluginInstance]}
        defaultScale={SpecialZoomLevel.ActualSize}
      />
    </div>
  );
};

export default SlidesViewer;
