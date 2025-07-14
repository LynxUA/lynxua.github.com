// app/blog/[slug]/page.tsx
import {getBlogPost, getBlogPosts} from "@/app/sanity-queries";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { urlFor } from "@/common/img-helper";
import Comments from './Comments';
import SocialShare from './SocialShare';
import './blog-post.scss';

export const dynamic = "force-static";
export const revalidate = 3600;

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug?.current,
  }));
}

type Props = {
  params: Promise<{slug: string}>
}

// Fetch data for each static page
export default async function BlogPost({params}: Props) {
  const post = await getBlogPost((await params).slug)

  if (!post) {
    return <div>Post not found</div>;
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get reading time estimate
  const getReadingTime = (body: string | undefined) => {
    if (!body) return '5 min read';
    const wordsPerMinute = 200;
    const words = body.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="blog-post-container">
      <article className="blog-post">
        {/* Hero Image */}
        {post.mainImage && (
          <div className="blog-post__hero">
            <div 
              className="blog-post__hero-image"
              style={{
                backgroundImage: `url(${urlFor(post.mainImage)})`
              }}
            />
          </div>
        )}

        {/* Post Header */}
        <header className="blog-post__header">
          {/* Title */}
          <h1 className="blog-post__title">{post.title}</h1>

          {/* Meta Information */}
          <div className="blog-post__meta">
            <div className="blog-post__meta-simple">
              {post.publishedAt && (
                <time className="blog-post__date">
                  {formatDate(post.publishedAt)}
                </time>
              )}
              <span className="blog-post__reading-time">
                {getReadingTime(post.body)}
              </span>
            </div>
          </div>
        </header>

        {/* Post Content */}
        <div className="blog-post__content">
          <Markdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({children}) => <h2 className="blog-post__content-h1">{children}</h2>,
              h2: ({children}) => <h3 className="blog-post__content-h2">{children}</h3>,
              h3: ({children}) => <h4 className="blog-post__content-h3">{children}</h4>,
              p: ({children}) => <p className="blog-post__content-p">{children}</p>,
              blockquote: ({children}) => <blockquote className="blog-post__content-quote">{children}</blockquote>,
              code: ({children}) => <code className="blog-post__content-code">{children}</code>,
              pre: ({children}) => <pre className="blog-post__content-pre">{children}</pre>,
            }}
          >
            {post.body}
          </Markdown>
        </div>

        {/* Social Share */}
        <SocialShare 
          title={post.title || 'Blog Post'} 
          url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${(await params).slug}`}
        />

        {/* Comments Section */}
        <Comments slug={(await params).slug} />
      </article>
    </div>
  );
}
