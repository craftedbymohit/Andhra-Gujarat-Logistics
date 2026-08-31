import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '@/components/shared/Icon';
import { revealItem } from '@/components/animations/Reveal';

const SHORT_DESCRIPTIONS = {
  'road-freight': 'Scheduled capacity for full and part loads.',
  'project-cargo': 'Route-led execution for heavy and oversized cargo.',
  'customized-solutions': 'Logistics programmes shaped around your operation.',
  interstate: 'Disciplined lanes between regional and national hubs.',
};

export default function ExpertiseShowcase({ services }) {
  return (
    <motion.div
      className="expertise-showcase"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
    >
      {services.map((service, index) => (
        <motion.article
          className="expertise-item"
          key={service.id}
          variants={revealItem}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="expertise-item__number numeric">0{index + 1}</span>
          <span className="expertise-item__icon">
            <Icon name={service.icon} size={20} />
          </span>
          <div className="expertise-item__body">
            <h3>{service.title}</h3>
            <p>{SHORT_DESCRIPTIONS[service.id]}</p>
          </div>
          <Link to={service.to} className="expertise-item__link" aria-label={`Explore ${service.title}`}>
            <Icon name="arrowRight" size={18} />
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}
