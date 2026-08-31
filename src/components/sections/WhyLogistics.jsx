import { motion } from 'framer-motion';
import Icon from '@/components/shared/Icon';
import { revealItem } from '@/components/animations/Reveal';

const PILLARS = [
  {
    icon: 'network',
    title: 'Regional depth',
    text: 'A connected operating network across Gujarat, Andhra Pradesh and Telangana.',
  },
  {
    icon: 'users',
    title: 'One accountable owner',
    text: 'A named operations lead from the first booking to proof of delivery.',
  },
  {
    icon: 'monitor',
    title: 'Control in motion',
    text: 'Clear status, verified documents and quick action when plans change.',
  },
];

export default function WhyLogistics() {
  return (
    <motion.div
      className="why-logistics__grid"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      {PILLARS.map((pillar, index) => (
        <motion.article
          className="why-logistics__pillar"
          key={pillar.title}
          variants={revealItem}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="why-logistics__topline">
            <span className="why-logistics__number numeric">0{index + 1}</span>
            <span className="why-logistics__icon">
              <Icon name={pillar.icon} size={19} />
            </span>
          </div>
          <h3>{pillar.title}</h3>
          <p>{pillar.text}</p>
          <span className="why-logistics__rule" aria-hidden="true" />
        </motion.article>
      ))}
    </motion.div>
  );
}
