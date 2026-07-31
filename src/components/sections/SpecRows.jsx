import Reveal from '@/components/animations/Reveal';

/**
 * Numbered three-column rows: index · title · description.
 * Used for advantages, execution steps, safety practices and standards.
 */
export default function SpecRows({ items, startAt = 1 }) {
  return (
    <div className="spec-rows">
      {items.map((item, i) => (
        <Reveal className="spec-row" key={item.title} delay={i * 0.04} y={16}>
          <span className="spec-row__num">{String(startAt + i).padStart(2, '0')}</span>
          <h3 className="spec-row__title">{item.title}</h3>
          <p className="spec-row__text">{item.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
