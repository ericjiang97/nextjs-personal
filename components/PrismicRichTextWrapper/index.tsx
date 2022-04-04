import React from "react";
import { PrismicRichText } from "@prismicio/react";

import YoutubeEmbed from "./YouTubeEmbed";

import { PrismicDocument } from "@prismicio/types";

interface PrismicRichTextWrapperProps {
  page: PrismicDocument<Record<string, any>, string, string>;
}

const PrismicRichTextWrapper: React.FC<PrismicRichTextWrapperProps> = ({
  page,
}) => {
  return (
    <PrismicRichText
      field={page.data.body}
      components={{
        heading1: ({ children }) => (
          <h1 className="text-3xl font-semibold">{children}</h1>
        ),
        heading2: ({ children }) => (
          <h2 className="mt-2 text-2xl font-semibold text-maroon">
            {children}
          </h2>
        ),
        heading3: ({ children }) => (
          <h3 className="mt-2 text-xl font-semibold text-maroon">{children}</h3>
        ),
        heading4: ({ children }) => (
          <h4 className="mt-2 text-lg font-semibold text-maroon">{children}</h4>
        ),
        paragraph: ({ children }) => (
          <p className="mt-2 font-sans text-base">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        list: ({ children }) => <ul className="mt-1 list-disc">{children}</ul>,
        oList: ({ children }) => (
          <ol className="mt-1 list-decimal">{children}</ol>
        ),
        listItem: ({ children }) => <li className="mt-1/2">{children}</li>,
        image: ({ node }) => {
          return (
            <img
              src={node.url}
              alt={node.alt || ""}
              className="mt-2 self-center"
            />
          );
        },
        embed: (props) => {
          console.log(props);
          if (props.node.oembed.provider_name === "YouTube") {
            return <YoutubeEmbed youtubeUrl={props.node.oembed.embed_url} />;
          }
          return (
            <div
              dangerouslySetInnerHTML={{ __html: props.node.oembed.html || "" }}
              className="mt-2 w-full"
            />
          );
        },
      }}
    />
  );
};

export default PrismicRichTextWrapper;
