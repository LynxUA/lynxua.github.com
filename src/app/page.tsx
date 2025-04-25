// app/page.tsx
import './home.scss';
import { Post } from '../../sanity/sanity.types';
import { getBlogPosts } from './sanity-queries';

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return [{}]; // Empty object for the index page
}

export default async function Home() {
  const posts = await getBlogPosts();

  return (
          <div className="posts-grid">
            {posts.map((post: Post) => (
                <article key={post._id} className="post-card">
                  <div className="post-card__content">
                    <h2 className="post-card__title">{post.title}</h2>
                    {/* <p className="post-card__excerpt">{post.excerpt}</p> */}
                    <div className="post-card__footer">
                      <time className="post-card__date">
                        {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                      <a href={`/blog/${post.slug?.current}`} className="post-card__link">
                        Read more
                      </a>
                    </div>
                  </div>
                </article>
            ))}
          </div>
  );
}
