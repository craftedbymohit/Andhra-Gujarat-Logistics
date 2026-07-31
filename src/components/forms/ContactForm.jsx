import FormField from './FormField';
import FormSuccess from './FormSuccess';
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
  const { values, errors, status, handleChange, handleSubmit } = useForm({
    initial: INITIAL,
    required: REQUIRED,
    // TODO: connect to the client's mail service or CRM endpoint.
    onSubmit: async (data) => {
      console.info('Contact enquiry', data);
      await new Promise((r) => setTimeout(r, 700));
    },
  });

  if (status === 'success') {
    return (
      <FormSuccess>
        <strong>Thank you — your message has reached us.</strong> Our team responds within one working day.
        For anything urgent, the 24×7 control tower is the fastest route.
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

      <Button type="submit" disabled={status === 'submitting'} showIcon={status !== 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </Button>

      <p className="form-note">
        We use your details only to respond to this enquiry. They are never shared with third parties.
      </p>
    </form>
  );
}



