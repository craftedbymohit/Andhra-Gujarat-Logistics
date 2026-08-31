import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '@/components/shared/Icon';
import { revealItem } from '@/components/animations/Reveal';

const SHORT_DESCRIPTIONS = {
  chemical: 'Safe, compliant movement.',
  textile: 'Protected, scheduled distribution.',
  engineering: 'Heavy and specialised loads.',
  steel: 'Plant-to-port capacity.',
  infrastructure: 'Project-led delivery windows.',
  automobile: 'Sequenced inbound supply.',
  fmcg: 'High-frequency distribution.',
  healthcare: 'Batch-integrity control.',
};

export default function IndustryShowcase({ industries }) {
  return (
    <motion.div
      className="industry-showcase"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    >
      {industries.map((industry, index) => (
        <motion.article
          className="industry-showcase__item"
          key={industry.id}
          variants={revealItem}
          whileHover={{ y: -6, scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="industry-showcase__topline">
            <span className="industry-showcase__number numeric">0{index + 1}</span>
            <span className="industry-showcase__icon">
              <Icon name={industry.icon} size={19} />
            </span>
          </div>
          <h3>{industry.title}</h3>
          <p>{SHORT_DESCRIPTIONS[industry.id]}</p>
          <Link to={`/industries#${industry.id}`} className="industry-showcase__link" aria-label={`View ${industry.title}`}>
            <Icon name="arrowRight" size={17} />
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}
