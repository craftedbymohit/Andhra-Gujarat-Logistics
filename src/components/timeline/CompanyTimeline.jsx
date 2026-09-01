import Reveal from '@/components/animations/Reveal';
import { MILESTONES } from '@/data/company';

/** Vertical company history with a drawn spine. */
export default function CompanyTimeline({ items = MILESTONES }) {
  return (
    <div className="vtimeline">
      {items.map((item, i) => (
        <Reveal className="vtimeline__item" data-future={item.future || undefined} key={item.year} delay={i * 0.05}>
          <span className="vtimeline__dot" />
          <div className="vtimeline__meta">
            <div className="vtimeline__year numeric">{item.year}</div>
            {item.future && <span className="vtimeline__status">Next target</span>}
          </div>
          <h3 className="vtimeline__title">{item.title}</h3>
          <p className="vtimeline__text">{item.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
