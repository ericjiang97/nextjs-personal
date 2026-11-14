import { ImageResponse } from '@vercel/og'
import { client } from '../../sanity/lib/client'
import { OG_BLOG_QUERY, OG_TALK_QUERY } from '../../sanity/lib/queries'

export const config = {
  runtime: 'experimental-edge',
}

const dateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export const OpenGraphPage = async (req: any) => {
  const { searchParams } = req.nextUrl

  const blogPost = searchParams.get('blog')
  const techTalk = searchParams.get('talk')

  const searchParamShouldHideLogo = searchParams.get('hideLogo')
  const searchParamTitle = searchParams.get('title')
  const searchParamSubHeading = searchParams.get('subheading')

  let imageTitle = searchParamTitle || 'EricJiang.dev'
  let subHeading = searchParamSubHeading || null
  let description = null
  const shouldHideLogo = Boolean(searchParamShouldHideLogo) || false

  if (blogPost) {
    const post = await client
      .fetch(OG_BLOG_QUERY, { slug: blogPost }, { stega: false })
      .catch(() => null)
    if (post?.title) {
      subHeading = '📝 Blog Post'
      imageTitle = post.title || imageTitle
      const rawDate = post.publishedAt || post._createdAt
      if (rawDate) {
        const postedDate = new Date(rawDate).toLocaleDateString(
          'en-AU',
          dateFormat
        )
        description = `Published on ${postedDate}`
      }
    }
  }

  if (techTalk) {
    const talk = await client
      .fetch(OG_TALK_QUERY, { slug: techTalk }, { stega: false })
      .catch(() => null)

    if (talk?.title) {
      subHeading = '🎤 Tech Talk'
      imageTitle = talk.title || imageTitle
      if (talk.talkDate) {
        const talkDate = new Date(talk.talkDate).toLocaleDateString(
          'en-AU',
          dateFormat
        )
        description = `Talk Presented on ${talkDate}`
      } else if (talk.date) {
        description = `Talk Presented on ${talk.date}`
      }
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(to bottom, #a4d6f3, #d9feeb)',
        }}
        tw="bg-gray-100"
      >
        {!shouldHideLogo && (
          <div
            style={{
              left: 42,
              top: 42,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src="https://ericjiang.dev/icons/android-icon-96x96.png"
              width="1.25rem"
              height="1.25rem"
              style={{
                borderRadius: '100%',
              }}
            />
            <span tw="ml-2 text-xl font-semibold">ericjiang.dev</span>
          </div>
        )}
        <div tw="flex items-center justify-center flex-col px-2 py-2 bg-gray-100 bg-black/50 max-w-screen-md">
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
      emoji: 'twemoji',
    }
  )
}

export default OpenGraphPage
