import {Post} from "../../sanity/sanity.types";
import {defineQuery} from "groq"
import {client} from "../../sanity/lib/client";
//import Slug from "sanity/src/core/schema/types/slug";

const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...$limit]`)
const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]`)

export async function getBlogPosts(): Promise<Post[]> {
  //Mock data for demonstration purposes
  return await client.fetch<Post[]>(POSTS_QUERY, {
    limit: 10
  })
  // return [{
  //   slug: {current: "hello", _type: "slug"},
  //   title: "Hello",
  //   _createdAt: "234546",
  //   _id: "hello",
  //   _rev: "1",
  //   _type: "post",
  //   _updatedAt: "234546",
  // }]
}

export async function getBlogPost(slug: string): Promise<Post> {
  return await client.fetch<Post>(POST_QUERY,
      {
      slug
    }
  );
  // return {
  //   slug: {current: slug, _type: "slug"},
  //   title: "Hello",
  //       _createdAt: "234546",
  //     _id: "hello",
  //     _rev: "1",
  //     _type: "post",
  //     _updatedAt: "234546",
  // }
}