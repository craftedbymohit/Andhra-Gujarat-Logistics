import { Link } from 'react-router-dom';
import { COMPANY } from '@/constants/company';
import { cn } from '@/utils/cn';

/** Wordmark + mark. Swap `.logo__mark` for the client's supplied logo file. */
export default function Logo({ light, className }) {
  return (
    <Link to="/" className={cn('logo', light && 'logo--light', className)} aria-label={COMPANY.name}>
      <span className="logo__mark">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 16h4l3-9h5l-3 9h5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="17.5" cy="18" r="1.8" fill="currentColor" />
        </svg>
      </span>
      <span className="logo__text">
        <span className="logo__name">Andhra Gujarat</span>
        <span className="logo__sub">Logistics</span>
      </span>
    </Link>
  );
}
