import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const draft = await draftMode()
  draft.disable()
  const redirectUrl = new URL(
    request.nextUrl.searchParams.get('redirect') || '/',
    request.url
  )
  return NextResponse.redirect(redirectUrl)
}
