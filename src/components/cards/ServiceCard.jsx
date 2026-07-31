import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '@/components/shared/Icon';
import { revealItem } from '@/components/animations/Reveal';
import { cn } from '@/utils/cn';

export default function ServiceCard({ service, index, dark }) {
  return (
    <motion.article variants={revealItem} className={cn('card', dark && 'card--dark')}>
      {typeof index === 'number' && <span className="card__index numeric">{String(index + 1).padStart(2, '0')}</span>}

      <span className="card__icon">
        <Icon name={service.icon} size={21} />
      </span>

      <h3 className="card__title">{service.title}</h3>
      <p className="card__text">{service.summary}</p>

      {service.points && (
        <ul className="tick-list" style={{ marginTop: '0.35rem' }}>
          {service.points.map((p) => (
            <li key={p}>
              <Icon name="check" size={14} />
              {p}
            </li>
          ))}
        </ul>
      )}

      <div className="card__foot">
        <Link to={service.to} className="link-arrow">
          Learn more
          <Icon name="arrowRight" size={15} />
        </Link>
      </div>
    </motion.article>
  );
}
