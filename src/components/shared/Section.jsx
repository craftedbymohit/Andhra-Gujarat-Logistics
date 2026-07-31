import { cn } from '@/utils/cn';

/** Full-bleed band. `tone` picks the background treatment. */
export function Section({ tone, tight, edge, id, className, containerClass, children }) {
  return (
    <section
      id={id}
      className={cn(
        'section',
        tone && `section--${tone}`,
        tight && 'section--tight',
        edge && 'section--edge',
        className
      )}
    >
      <div className={cn('container', containerClass)}>{children}</div>
    </section>
  );
}

export function Container({ size, className, children }) {
  return <div className={cn('container', size && `container--${size}`, className)}>{children}</div>;
}
