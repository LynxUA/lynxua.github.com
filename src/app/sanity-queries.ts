import { defineQuery } from "next-sanity"
import { sanityFetch } from "../../sanity/lib/live"

const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...$limit]`)

export async function getBlogPosts() {
  // Mock data for demonstration purposes
  const {data: posts} = await sanityFetch({
    query: POSTS_QUERY,
    params: {limit: 10},
    stega: false,
    perspective: 'published',
  })
  console.log(posts)
  return posts
}