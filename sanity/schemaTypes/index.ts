import { type SchemaTypeDefinition } from 'sanity'

import { portableTextType } from './objects/portableText'
import {
  beforeAfterSlice,
  imageGroupSlice,
  imageWithTextSlice,
  richTextSlice,
  singleImageSlice,
} from './objects/slices'
import { homePageType } from './singletons/homePage'
import { aboutPageType } from './singletons/aboutPage'
import { siteSettingsType } from './singletons/siteSettings'
import { categoryType } from './documents/category'
import { blogPostType } from './documents/blogPost'
import { albumType } from './documents/album'
import { projectType } from './documents/project'
import { experienceType } from './documents/experience'
import { talkType } from './documents/talk'
import { wallpaperType } from './documents/wallpaper'

export const singletonTypes = new Set(['homePage', 'aboutPage', 'siteSettings'])

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects & Slices
    portableTextType,
    singleImageSlice,
    imageGroupSlice,
    beforeAfterSlice,
    imageWithTextSlice,
    richTextSlice,
    // Singletons
    homePageType,
    aboutPageType,
    siteSettingsType,
    // Collections
    blogPostType,
    categoryType,
    albumType,
    projectType,
    experienceType,
    talkType,
    wallpaperType,
  ],
}
