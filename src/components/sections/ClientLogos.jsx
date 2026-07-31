import Icon from '@/components/shared/Icon';
import { CLIENT_MARKS } from '@/data/testimonials';

/** Infinite marquee. The list is duplicated so the loop has no visible seam. */
export default function ClientLogos({ items = CLIENT_MARKS }) {
  return (
    <div className="marquee">
      <div className="marquee__track">
        {[...items, ...items].map((name, i) => (
          <span className="marquee__item" key={`${name}-${i}`}>
            <Icon name="box" size={17} />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
