import { ImageResponse } from "@vercel/og";

import { createClient } from "../../config/prismic";
import * as prismicH from "@prismicio/helpers";

import { IPrismicDocumentRecord } from "../../types";

export const config = {
  runtime: "experimental-edge",
};

const dateFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const OpenGraphPage = async (req: any) => {
  const { searchParams } = req.nextUrl;

  const blogPost = searchParams.get("blog");
  const techTalk = searchParams.get("talk");

  const searchParamShouldHideLogo = searchParams.get("hideLogo");
  const searchParamTitle = searchParams.get("title");
  const searchParamSubHeading = searchParams.get("subheading");

  const prismicClient = createClient({});

  let imageTitle = searchParamTitle || "EricJiang.dev";
  let subHeading = searchParamSubHeading || null;

  let description = null;

  let shouldHideLogo = Boolean(searchParamShouldHideLogo) || false;

  if (blogPost) {
    const post = (await prismicClient
      .getByUID("blog-post", blogPost)
      .catch(() => null)) as IPrismicDocumentRecord;
    if (post) {
      const { title } = post.data;
      if (title) {
        subHeading = "📝 Blog Post";
        imageTitle = prismicH.asText(title) || imageTitle;

        const postedDate = prismicH
          .asDate(post.data.published_time)
          ?.toLocaleDateString("en-AU", dateFormat);

        description = `Published on ${postedDate}`;
      }
    }
  }

  if (techTalk) {
    const talk = (await prismicClient
      .getByUID("tech-talk", techTalk)
      .catch(() => null)) as IPrismicDocumentRecord;

    if (talk) {
      const { title, date } = talk.data;
      if (title) {
        subHeading = "🎤 Tech Talk";
        imageTitle = prismicH.asText(title) || imageTitle;

        const talkDate = prismicH
          .asDate(date)
          ?.toLocaleDateString("en-AU", dateFormat);
        description = `Talk Presented on ${talkDate}`;
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
            <img
              src="https://ericjiang.dev/icons/android-icon-96x96.png"
              width="1.25rem"
              height="1.25rem"
              style={{
                borderRadius: "100%",
              }}
            />
            <span tw="ml-2 text-xl font-semibold">ericjiang.dev</span>
          </div>
        )}
        <div tw="flex items-center justify-center flex-col px-2 py-2 bg-gray-100 bg-opacity-50 max-w-screen-md">
          {subHeading && (
            <div tw="text-2xl font-semibold text-gray-400">{subHeading}</div>
          )}
          <div tw="text-6xl font-extrabold">{imageTitle}</div>
          {description && (
            <div tw="text-lg mt-2 font-semibold text-gray-900">
              {description}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "twemoji",
    }
  );
};

export default OpenGraphPage;
