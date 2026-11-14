import type { StructureResolver } from 'sanity/structure'
import { singletonTypes } from './schemaTypes'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('EricJiang.dev Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem()
        .title('Site Settings & Banners')
        .id('siteSettings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
      S.divider(),
      S.documentTypeListItem('blogPost').title('Blog Posts'),
      S.documentTypeListItem('category').title('Blog Categories'),
      S.documentTypeListItem('album').title('Photo Albums'),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('experience').title('Career Experience'),
      S.documentTypeListItem('talk').title('Tech Talks'),
      S.documentTypeListItem('wallpaper').title('Wallpapers'),
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            ...Array.from(singletonTypes),
            'blogPost',
            'category',
            'album',
            'project',
            'experience',
            'talk',
            'wallpaper',
          ].includes(item.getId() || '')
      ),
    ])
