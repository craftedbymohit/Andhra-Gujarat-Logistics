import Reveal from '@/components/animations/Reveal';
import { cn } from '@/utils/cn';

/** Eyebrow + title on the left, supporting copy (or an action) on the right. */
export default function SectionHeading({ eyebrow, title, lead, aside, center, className }) {
  return (
    <Reveal className={cn('sec-head', center && 'sec-head--center', className)}>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="sec-head__title">{title}</h2>
      </div>
      {(lead || aside) && (
        <div>
          {lead && <p className="lead">{lead}</p>}
          {aside}
        </div>
      )}
    </Reveal>
  );
}
