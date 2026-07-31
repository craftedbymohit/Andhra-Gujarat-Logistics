import { motion } from 'framer-motion';
import Icon from '@/components/shared/Icon';
import { revealItem } from '@/components/animations/Reveal';
import { cn } from '@/utils/cn';

/** Generic icon + title + text card. Used for differentiators, tech, values, CSR. */
export default function FeatureCard({ icon, title, text, dark, className }) {
  return (
    <motion.article variants={revealItem} className={cn('card', dark && 'card--dark', className)}>
      {icon && (
        <span className="card__icon">
          <Icon name={icon} size={21} />
        </span>
      )}
      <h3 className="card__title">{title}</h3>
      <p className="card__text">{text}</p>
    </motion.article>
  );
}
