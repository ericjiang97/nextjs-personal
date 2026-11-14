import { stegaClean } from 'next-sanity'
import { BlogPosts } from '../../posts'
import MainLayout from '../../../../containers/MainLayout'
import SmallHeroBanner from '../../../../components/SmallHeroBanner'
import NotFoundPage from '../../../not-found'
import { sanityFetch } from '../../../../sanity/lib/live'
import { client } from '../../../../sanity/lib/client'
import {
  CATEGORY_PAGE_QUERY,
  CATEGORY_SLUGS_QUERY,
} from '../../../../sanity/lib/queries'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ uid: string }>
}) {
  const { uid } = await params
  let data: any = null
  try {
    const res = await sanityFetch({
      query: CATEGORY_PAGE_QUERY,
      params: { slug: uid },
    })
    data = res.data
  } catch {
    data = null
  }

  const category = data?.category
  if (!category) return <NotFoundPage />

  const categoryName = category.title
  const cleanName = stegaClean(categoryName)
  const title = `Blog - ${cleanName}`

  return (
    <MainLayout
      pageTitle={title}
      customHero={
        <SmallHeroBanner
          badge="Category Archive"
          title={categoryName}
          description={`Articles and thoughts filed under ${cleanName}.`}
        />
      }
      pageMeta={{
        description: title,
        endpoint: `/blog/categories/${stegaClean(category.slug)}`,
      }}
    >
      <BlogPosts posts={data?.posts || []} />
    </MainLayout>
  )
}

export const generateStaticParams = async () => {
  try {
    const slugs = await client.fetch(CATEGORY_SLUGS_QUERY, {}, { stega: false })
    return (slugs || []).filter((s: any) => s?.uid)
  } catch {
    return []
  }
}
