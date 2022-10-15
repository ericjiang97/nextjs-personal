import { ImageResponse } from "@vercel/og";

import { createClient } from "../../config/prismic";
import * as prismicH from "@prismicio/helpers";

import { IPrismicDocumentRecord } from "../../types";

export const config = {
  runtime: "experimental-edge",
};

export const OpenGraphPage = async (req: any) => {
  const { searchParams } = req.nextUrl;

  const blogPost = searchParams.get("blog");

  const searchParamHideWebsite = searchParams.get("hideWebsite");
  const searchParamTitle = searchParams.get("title");
  const searchParamSubHeading = searchParams.get("subheading");

  let imageTitle = searchParamTitle || "EricJiang.dev";
  let subHeading = searchParamSubHeading || null;

  let shouldHideLogo = Boolean(searchParamHideWebsite) || false;

  if (blogPost) {
    const client = createClient({});
    const post = (await client
      .getByUID("blog-post", blogPost)
      .catch(() => null)) as IPrismicDocumentRecord;
    if (post) {
      const { title } = post.data;
      if (title) {
        subHeading = "Blog Post";
        imageTitle = prismicH.asText(title) || imageTitle;
      }
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(to bottom, #a4d6f3, #d9feeb)",
        }}
        tw="bg-gray-100"
      >
        {!shouldHideLogo && (
          <div
            style={{
              left: 42,
              top: 42,
              position: "absolute",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span tw="ml-2 text-base font-semibold">ericjiang.dev</span>
          </div>
        )}
        <div tw="flex flex-1 items-center justify-center flex-col">
          {subHeading && (
            <div tw="text-xl font-semibold text-grey-500">{subHeading}</div>
          )}
          <div tw="text-4xl font-bold">{imageTitle}</div>
        </div>
      </div>
    ),
    {
      width: 1366,
      height: 768,
      emoji: "twemoji",
    }
  );
};

export default OpenGraphPage;
