import { Link } from 'react-router-dom';
import { COMPANY } from '@/constants/company';
import { cn } from '@/utils/cn';
import logoIcon from '../../../assets/agl_logo_icon.png';

export default function Logo({ light, className }) {
  return (
    <Link to="/" className={cn('logo', light && 'logo--light', className)} aria-label={COMPANY.name}>
      <span className="logo__mark">
        <img src={logoIcon} alt="" aria-hidden="true" />
      </span>
      <span className="logo__text">
        <span className="logo__name">Andhra Gujarat</span>
        <span className="logo__sub">Logistic</span>
      </span>
    </Link>
  );
}
