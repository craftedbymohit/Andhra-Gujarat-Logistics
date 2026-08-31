import { motion } from 'framer-motion';
import { RevealGroup, revealItem } from '@/components/animations/Reveal';
import { FLEET } from '@/data/fleet';

export default function FleetShowcase({ items = FLEET }) {
  return (
    <RevealGroup className="fleet-showcase">
      {items.map((v, i) => (
        <motion.article variants={revealItem} className="fleet-card" key={v.id}>
          <div className="fleet-card__media">
            <img className="fleet-card__image" src={v.image} alt={v.name} loading="lazy" />
            <span className="fleet-card__index numeric">0{i + 1}</span>
            <span className="fleet-card__tag">Fleet format</span>
          </div>
          <div className="fleet-card__body">
            <h3 className="fleet-card__title">{v.name}</h3>
            <p className="fleet-card__text">{v.use}</p>
            <dl className="fleet-card__spec">
              <div>
                <dt>Payload</dt>
                <dd>{v.payload}</dd>
              </div>
              <div>
                <dt>Deck length</dt>
                <dd>{v.length}</dd>
              </div>
            </dl>
          </div>
        </motion.article>
      ))}
    </RevealGroup>
  );
}
