// app/page.tsx
import './home.scss';
import { getBlogPosts } from './sanity-queries';
import PostCard from './PostCard';
import TypewriterProfile from './TypewriterProfile';

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return [{}]; // Empty object for the index page
}

export default async function Home() {
  const posts = await getBlogPosts();

  // Typewriter texts to cycle through
  const typewriterTexts = [
    'Denys Burlakov',
    'Kyiv, Ukraine',
    'React & Golang Lead',
    'OSS/BSS configuration forefront'
  ];

  return (
    <div className="content-container">
      <TypewriterProfile 
        avatar="/avatar.jpeg"
        texts={typewriterTexts}
      />
      <section>
        <h2 className="section-title">Featured Posts</h2>
        <div className="posts-grid featured">
          {posts.slice(0, 4).map((post) => (
            <PostCard key={post._id} post={post} featured />
          ))}
        </div>
      </section>
      <section>
        <h2 className="section-title">All Posts</h2>
        <div className="posts-grid all">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} showFooter />
          ))}
        </div>
      </section>
    </div>
  );
}
