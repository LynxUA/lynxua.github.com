// app/blog/[slug]/page.tsx
import { defineQuery } from "next-sanity";
import { Post } from "../../../../sanity/sanity.types";
import { getBlogPosts } from "@/app/sanity-queries";
import { sanityFetch } from "../../../../sanity/lib/live";

export const dynamic = "force-static";
export const revalidate = 3600;

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post: Post) => ({
    slug: post.slug?.current,
  }));
}

type Props = {
  params: Promise<{slug: string}>
}
// Fetch data for each static page
export default async function BlogPost({params}: Props) {
  const {data: post} = await sanityFetch({
    query: defineQuery(`*[_type == "post" && slug.current == $slug][0]`),
    params,
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      {/* Rest of your blog post component */}
    </article>
  );
}
