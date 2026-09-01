import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '@/components/shared/Icon';
import { cn } from '@/utils/cn';

/** Dark banner used at the top of every interior page. */
export default function PageHero({ eyebrow, title, lead, crumbs = [], meta = [], children, art, className }) {
  return (
    <section className={cn('page-hero', className)}>
      <div className="grid-backdrop" />
      <div className="bloom page-hero__bloom" />

      <div className="container page-hero__inner">
        <motion.nav
          className="breadcrumb"
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">Home</Link>
          {crumbs.map((c, i) => (
            <span key={c.label} style={{ display: 'contents' }}>
              <Icon name="chevronDown" size={11} style={{ transform: 'rotate(-90deg)' }} />
              {i === crumbs.length - 1 || !c.to ? (
                <span aria-current="page">{c.label}</span>
              ) : (
                <Link to={c.to}>{c.label}</Link>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.div
          className="page-hero__copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <span className="eyebrow" style={{ marginTop: '1.25rem' }}>
              {eyebrow}
            </span>
          )}
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </motion.div>

        {art && (
          <motion.div
            className="page-hero__art"
            initial={{ opacity: 0, x: 24, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {art}
          </motion.div>
        )}

        {meta.length > 0 && (
          <motion.div
            className="page-hero__meta"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {meta.map((m) => (
              <div key={m.label}>
                <div className="page-hero__meta-value numeric">{m.value}</div>
                <div className="page-hero__meta-label">{m.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
