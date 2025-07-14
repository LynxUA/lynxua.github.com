import React from 'react';
import { POSTS_QUERYResult } from '../../sanity/sanity.types';
import { urlFor } from '@/common/img-helper';

interface PostCardProps {
  post: POSTS_QUERYResult[0];
  showFooter?: boolean;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showFooter = false, featured = false }) => {
  const postUrl = `/blog/${post.slug?.current}`;
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-Uk', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get reading time estimate (rough calculation)
  const getReadingTime = (body: string | undefined) => {
    if (!body) return '5 хвилин читання';
    const wordsPerMinute = 200;
    const words = body.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} ${minutes < 5 ? 'хвилини' : 'хвилин'} читання`;
  };

  return (
    <article className={`post-card ${featured ? 'post-card--featured' : ''}`}>
      <a href={postUrl} className="post-card__link">
        <div className="post-card__image-container">
          <div
            className="post-card__image"
            style={{
              backgroundImage: post.mainImage
                ? `url(${urlFor(post.mainImage)})`
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          />
          {/* We'll add categories when types are fixed */}
        </div>
        
        <div className="post-card__content">
          <h3 className="post-card__title">{post.title}</h3>
          
          <div className="post-card__meta">
            {/* We'll add author info when types are fixed */}
            
            <div className="post-card__details">
              {post.publishedAt && (
                <time className="post-card__date">
                  {formatDate(post.publishedAt)}
                </time>
              )}
              <span className="post-card__reading-time">
                {getReadingTime(post.body)}
              </span>
            </div>
          </div>

          {showFooter && (
            <div className="post-card__footer">
              <span className="post-card__read-more">Читати →</span>
            </div>
          )}
        </div>
      </a>
    </article>
  );
};

export default PostCard;
