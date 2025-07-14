'use client';

import React from 'react';
import Link from 'next/link';
import './floating-home-button.scss';

const FloatingHomeButton: React.FC = () => {
  return (
    <Link 
      href="/" 
      className="floating-home-button"
      aria-label="Back to Home"
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    </Link>
  );
};

export default FloatingHomeButton;
