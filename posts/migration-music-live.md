---
title: Migration of Live/Music
author: Eric Jiang <eric@ericjiang.dev>
date: '2020-08-03T22:00:00+1000'
summary: A few days ago whilst browsing through my old repositories on GitHub, I've discovered a really old app which showcased chaining some really awesome technologies together. This app showed what music I was playing anytime on Spotify or iTunes via Last.fm.
tags: ['announcements']
category: 'Development'
coverImageUrl: '/images/juja-han-HU-uL54pfQI-unsplash.jpg'
---

A few days ago whilst browsing through [my old repositories on GitHub](https://github.com/ericjiang97?tab=repositories), I've discovered a really old app which showcased chaining some really awesome technologies together. This app showed what music I was playing anytime on Spotify or iTunes via Last.fm.

![old version](/images/blog/migration-music-live/music.ericjiang.dev.png)

This older version was built in ReactJS + Material UI (v2) you can tell its really old :P

I recently migrated this to be part of this website, the technology is still pretty much the same, basically on my computer/laptop, I have the last.fm scrobbler which 'observes' what music I'm playing,whether its through iTunes or Spotify and broadcasts it on the app.

Then the page uses the Last.fm API to grab the latest information.

![old version](/images/blog/migration-music-live/new_version.png)

I reckon the new version looks pretty cool!!
