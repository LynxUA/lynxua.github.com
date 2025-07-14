import {POSTS_QUERYResult, POST_QUERYResult} from "../../sanity/sanity.types";
import {defineQuery} from "groq"
import {client} from "../../sanity/lib/client";
//import Slug from "sanity/src/core/schema/types/slug";

const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...$limit]{
  _id,
  title,
  slug,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  author->{
    name,
    image{
      asset->{
        _id,
        url
      }
    }
  },
  categories[]->{
    title,
    slug
  },
  publishedAt,
  body,
  _createdAt
} | order(publishedAt desc)`)

const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  author->{
    name,
    image{
      asset->{
        _id,
        url
      }
    },
    bio
  },
  categories[]->{
    title,
    slug
  },
  publishedAt,
  body,
  _createdAt
}`)

export async function getBlogPosts(): Promise<POSTS_QUERYResult> {
  //Mock data for demonstration purposes
  return await client.fetch<POSTS_QUERYResult>(POSTS_QUERY, {
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

export async function getBlogPost(slug: string): Promise<POST_QUERYResult> {
  return await client.fetch<POST_QUERYResult>(POST_QUERY,
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