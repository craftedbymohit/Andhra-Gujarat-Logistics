import { motion } from 'framer-motion';
import Icon from '@/components/shared/Icon';
import { revealItem } from '@/components/animations/Reveal';

export default function IndustryCard({ industry, detailed }) {
  return (
    <motion.article variants={revealItem} className="industry-card" id={industry.id}>
      <span className="card__icon">
        <Icon name={industry.icon} size={21} />
      </span>

      <h3 className="card__title">{industry.title}</h3>
      <p className="card__text">{industry.summary}</p>

      {detailed && (
        <ul className="tick-list" style={{ marginTop: '0.35rem' }}>
          {industry.highlights.map((h) => (
            <li key={h}>
              <Icon name="check" size={14} />
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="industry-card__meta">
        {industry.metrics.map((m) => (
          <div key={m.label}>
            <strong>{m.value}</strong>
            {m.label}
          </div>
        ))}
      </div>
    </motion.article>
  );
}
