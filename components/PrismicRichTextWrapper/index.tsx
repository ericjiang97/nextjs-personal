import React from "react";
import { PrismicRichText } from "@prismicio/react";

import YoutubeEmbed from "./YouTubeEmbed";

import { PrismicDocument, RichTextField } from "@prismicio/types";

interface PrismicRichTextWrapperProps {
  page?: PrismicDocument<Record<string, any>, string, string>;
  data?: RichTextField;
}

const PrismicRichTextWrapper = ({ page, data }: React.PropsWithChildren<PrismicRichTextWrapperProps>) => {
  let _field = data || (page && page.data.body);
  return (
    <PrismicRichText
      field={_field}
      components={{
        hyperlink: ({ children, node }) => (
          <a
            href={node.data.url}
            className="font-semibold text-maroon dark:text-rose-400 underline"
          >
            {children}
          </a>
        ),
        heading1: ({ children }) => (
          <h1 className="mt-2 text-3xl font-semibold">{children}</h1>
        ),
        heading2: ({ children }) => (
          <h2 className="mt-2 text-2xl font-semibold text-maroon dark:text-rose-400">
            {children}
          </h2>
        ),
        heading3: ({ children }) => (
          <h3 className="mt-3 text-xl font-semibold text-maroon dark:text-rose-400">{children}</h3>
        ),
        heading4: ({ children }) => (
          <h4 className="mt-3 text-lg font-semibold text-maroon dark:text-rose-400">{children}</h4>
        ),
        paragraph: ({ children }) => (
          <p className="mt-3 font-sans text-base">{children}</p>
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
          const { url, alt } = node;
          return <img src={url} alt={alt || ""} className="mt-2 self-center" />;
        },
        preformatted: ({ children }) => <pre className="mt-2 whitespace-pre-wrap break-words">{children}</pre>,
        embed: (props) => {
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
