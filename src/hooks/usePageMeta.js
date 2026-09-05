import { useEffect } from 'react';
import { COMPANY } from '@/constants/company';

/** Sets the document title and meta description per route. */
export default function usePageMeta(title, description, noindex = false) {
  useEffect(() => {
    document.title = title ? `${title} | ${COMPANY.name}` : COMPANY.name;
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = noindex ? 'noindex, follow' : 'index, follow';
    document.head.appendChild(robots);

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
    return () => robots.remove();
  }, [title, description, noindex]);
}
