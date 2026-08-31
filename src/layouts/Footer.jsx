import { Link } from 'react-router-dom';
import Logo from '@/components/navigation/Logo';
import Icon from '@/components/shared/Icon';
import { COMPANY } from '@/constants/company';
import { FOOTER_COLUMNS } from '@/constants/navigation';
import { BRANCHES } from '@/data/branches';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div>
            <Logo light />
            <p className="footer__blurb">
              A regional transportation infrastructure company moving India&apos;s industrial output across
              Gujarat, Andhra Pradesh, Telangana and the national corridor — through a branch network built inside the
              belts we serve.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="footer__heading">{col.heading}</h4>
              <div className="footer__links">
                {col.links.map((link) => (
                  <Link key={link.label} to={link.to}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h4 className="footer__heading">Corporate Office</h4>
            <div className="footer__contact">
              <div className="footer__contact-row">
                <Icon name="pin" size={16} />
                <span>{COMPANY.hq.lines.join(', ')}</span>
              </div>
              <div className="footer__contact-row">
                <Icon name="phone" size={16} />
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}>{COMPANY.phone}</a>
              </div>
              <div className="footer__contact-row">
                <Icon name="mail" size={16} />
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </div>
              <div className="footer__contact-row">
                <Icon name="clock" size={16} />
                <span>Control tower operational 24 × 7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__branches">
          <h4 className="footer__heading">Branch Network</h4>
          <div className="footer__branch-list">
            {BRANCHES.map((b) => (
              <Link key={b.id} to={`/branch-network?branch=${b.id}`}>
                {b.city}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {COMPANY.legalName}. All rights reserved.
          </span>
          <div className="footer__socials">
            {COMPANY.socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                <Icon name={s.icon} size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
