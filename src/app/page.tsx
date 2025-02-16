// app/page.tsx
import './home.scss';
import {FacebookFilled, LinkedinFilled, MailFilled, TwitterSquareFilled} from "@ant-design/icons";
import { Post } from '../../sanity/sanity.types';
import { getBlogPosts } from './sanity-queries';

export const dynamic = 'force-static'

const SOCIAL_LINKS = [
  {
    icon: FacebookFilled,
    href: 'https://github.com/yourusername',
    label: 'GitHub'
  },
  {
    icon: TwitterSquareFilled,
    href: 'https://twitter.com/yourusername',
    label: 'Twitter'
  },
  {
    icon: LinkedinFilled,
    href: 'https://linkedin.com/in/yourusername',
    label: 'LinkedIn'
  },
  {
    icon: MailFilled,
    href: 'mailto:your@email.com',
    label: 'Email'
  }
];

export async function generateStaticParams() {
  return [{}]; // Empty object for the index page
}

export default async function Home() {
  const posts = await getBlogPosts();

  return (
      <div className="page-container">
        <header className="header">
          <div className="header__container">
            <div className="header__social-links">
              {SOCIAL_LINKS.map((link) => (
                  <a
                      key={link.label}
                      href={link.href}
                      className="header__social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    <link.icon />
                    <span className="sr-only">{link.label}</span>
                  </a>
              ))}
            </div>
          </div>
        </header>

        <main className="main-content">
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
        </main>
      </div>
  );
}
