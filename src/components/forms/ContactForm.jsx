import { COMPANY } from '@/constants/company';
import FormField from './FormField';
import FormError from './FormError';
import Button from '@/components/buttons/Button';

import useForm from '@/hooks/useForm';

const INITIAL = { name: '', company: '', email: '', phone: '', subject: '', message: '' };
const REQUIRED = ['name', 'email', 'phone', 'message'];

const SUBJECTS = [
  'Select a subject',
  'New business enquiry',
  'Existing consignment / tracking',
  'Project cargo enquiry',
  'Dedicated fleet / contract logistics',
  'Billing & documentation',
  'Careers',
  'Other',
];

/** Quick inquiry form on the Contact page. */
export default function ContactForm() {
  const { values, errors, status, submitError, handleChange, handleSubmit, retry } = useForm({
    initial: INITIAL,
    required: REQUIRED,
    onSubmit: async (data) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // A static host or a deploy without the serverless function will answer
      // the SPA fallback (index.html) with a 200. Never treat a bare 200 as
      // delivery — require the endpoint's explicit JSON acknowledgement.
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || 'We could not send your enquiry. Please call us instead.');
      }
    },
  });

  if (status === 'error') {
    return (
      <FormError onRetry={retry}>
        <strong>Your message could not be sent.</strong> {submitError} You can reach the 24×7 control
        tower on <a href={`tel:${COMPANY.emergency}`}>{COMPANY.emergency}</a> or email{' '}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </FormError>
    );
  }

  if (status === 'success') {
    return (
      <div className="form-success" role="status">
        <strong>Thank you — your message has reached us.</strong> Our team responds within one working day.
        For anything urgent, the 24×7 control tower is the fastest route.
      </div>
    );
  }

  return (
    <form className="stack" onSubmit={handleSubmit} noValidate>
      <div className="grid grid--2">
        <FormField
          label="Full name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
          required
        />
        <FormField
          label="Company"
          name="company"
          value={values.company}
          onChange={handleChange}
          placeholder="Organisation name"
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="name@company.com"
          required
        />
        <FormField
          label="Contact number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="+91 00000 00000"
          required
        />
      </div>

      <FormField
        label="Subject"
        name="subject"
        as="select"
        options={SUBJECTS}
        value={values.subject}
        onChange={handleChange}
      />

      <FormField
        label="Message"
        name="message"
        as="textarea"
        value={values.message}
        onChange={handleChange}
        error={errors.message}
        placeholder="How can we help?"
        required
      />

      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Send enquiry'}
      </Button>

      <p className="form-note">
        We use your details only to respond to this enquiry. They are never shared with third parties.
      </p>
    </form>
  );
}