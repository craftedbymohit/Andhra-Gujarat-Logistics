import FormField from './FormField';
import FormSuccess from './FormSuccess';
import Button from '@/components/buttons/Button';

import useForm from '@/hooks/useForm';
import { SERVICES } from '@/data/services';
import { BRANCHES } from '@/data/branches';

const INITIAL = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  origin: '',
  destination: '',
  commodity: '',
  message: '',
};

const REQUIRED = ['name', 'phone', 'email', 'origin', 'destination'];

const CITIES = ['Select city', ...new Set(BRANCHES.map((b) => b.city)), 'Other'];

/** The main lead-capture form — used inside the quote modal and on Contact. */
export default function QuoteForm({ compact }) {
  const { values, errors, status, handleChange, handleSubmit } = useForm({
    initial: INITIAL,
    required: REQUIRED,
    onSubmit: async (data) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'quote' }),
      });

      // A static host or a deploy without the serverless function will answer
      // the SPA fallback (index.html) with a 200. Never treat a bare 200 as
      // delivery — require the endpoint's explicit JSON acknowledgement.
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || 'We could not send your request. Please call us instead.');
      }
    },
  });

  if (status === 'success') {
    return (
      <FormSuccess>
        <strong>Request received.</strong> Our operations desk will respond with a rate and vehicle
        availability within one working day. For urgent movement, call the 24×7 control tower.
      </FormSuccess>
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
        <FormField
          label="Origin"
          name="origin"
          as="select"
          options={CITIES}
          value={values.origin}
          onChange={handleChange}
          error={errors.origin}
          required
        />
        <FormField
          label="Destination"
          name="destination"
          as="select"
          options={CITIES}
          value={values.destination}
          onChange={handleChange}
          error={errors.destination}
          required
        />
      </div>

      <div className="grid grid--2">
        <FormField
          label="Service required"
          name="service"
          as="select"
          options={['Select service', ...SERVICES.map((s) => s.title)]}
          value={values.service}
          onChange={handleChange}
        />
        <FormField
          label="Commodity"
          name="commodity"
          value={values.commodity}
          onChange={handleChange}
          placeholder="e.g. Packed chemicals, 12 T"
        />
      </div>

      {!compact && (
        <FormField
          label="Movement details"
          name="message"
          as="textarea"
          value={values.message}
          onChange={handleChange}
          placeholder="Dimensions, weight, expected dispatch date, special handling requirements…"
        />
      )}

      <Button type="submit" disabled={status === 'submitting'} showIcon={status !== 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Request a Quote'}
      </Button>

      {status === 'error' && (
        <p className="form-note" role="alert">
          We could not send your request. Please try again or contact us directly.
        </p>
      )}

      <p className="form-note">
        We respond to quote requests within one working day. Your details are used only to prepare this
        quotation.
      </p>
    </form>
  );
}



