import { COMPANY } from '@/constants/company';
import Button from '@/components/buttons/Button';

export default function EnquiryDraft({ values, subject, email = COMPANY.email, onEdit, application }) {
  const body = Object.entries(values).filter(([, value]) => value.trim()).map(([key, value]) => `${key}: ${value.trim()}`).join('\r\n');
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return (
    <div className="stack" role="status">
      <h3>Your email draft is ready.</h3>
      <p>Open your email app, review the details and press Send to contact our team.
        Nothing has been sent yet.{application && ' Please attach your CV before sending.'}</p>
      <Button href={href} icon="mail">Open email draft</Button>
      <p className="form-note">If no email app opens, email the details directly to <a href={`mailto:${email}`}>{email}</a>.</p>
      <Button variant="ghost" onClick={onEdit} showIcon={false}>Edit details</Button>
    </div>
  );
}
