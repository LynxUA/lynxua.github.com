'use client';
import './comments.scss';

import { useEffect, useRef } from 'react';

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    scriptElem.setAttribute('data-repo', 'LynxUA/comments.lynxua.github.com');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOPMfuew');
    scriptElem.setAttribute('data-category', 'Announcements');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOPMfue84Cs8vC');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'top');
    scriptElem.setAttribute('data-theme', 'light');
    scriptElem.setAttribute('data-lang', 'uk');

    ref.current.appendChild(scriptElem);
  }, [slug]);

  // Because giscus loads dynamically, we don't need to worry about SSR
  return <div ref={ref} className="comments-section" />;
}
