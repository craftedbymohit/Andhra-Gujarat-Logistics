import FormField from './FormField';
import FormSuccess from './FormSuccess';
import Button from '@/components/buttons/Button';

import useForm from '@/hooks/useForm';
import { OPENINGS } from '@/data/careers';
import { BRANCHES } from '@/data/branches';
import { COMPANY } from '@/constants/company';

const INITIAL = { name: '', email: '', phone: '', role: '', location: '', experience: '', message: '' };
const REQUIRED = ['name', 'email', 'phone', 'role'];

export default function ApplicationForm() {
  const { values, errors, status, handleChange, handleSubmit } = useForm({
    initial: INITIAL,
    required: REQUIRED,
    // TODO: connect to the client's recruitment inbox or ATS.
    onSubmit: async (data) => {
      console.info('Job application', data);
      await new Promise((r) => setTimeout(r, 700));
    },
  });

  if (status === 'success') {
    return (
      <FormSuccess>
        <strong>Application received.</strong> Our HR team reviews every application within five working
        days. Please email your CV to {COMPANY.careersEmail} quoting the role you applied for.
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
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="name@email.com"
          required
        />
        <FormField
          label="Total experience"
          name="experience"
          value={values.experience}
          onChange={handleChange}
          placeholder="e.g. 6 years"
        />
        <FormField
          label="Role applied for"
          name="role"
          as="select"
          options={['Select role', ...OPENINGS.map((o) => o.title), 'Other / General application']}
          value={values.role}
          onChange={handleChange}
          error={errors.role}
          required
        />
        <FormField
          label="Preferred location"
          name="location"
          as="select"
          options={['Select location', ...new Set(BRANCHES.map((b) => b.city))]}
          value={values.location}
          onChange={handleChange}
        />
      </div>

      <FormField
        label="Brief note"
        name="message"
        as="textarea"
        value={values.message}
        onChange={handleChange}
        placeholder="Tell us about your experience — the lanes, commodities or functions you have handled."
      />

      <Button type="submit" disabled={status === 'submitting'} showIcon={status !== 'submitting'}>
        {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
      </Button>

      <p className="form-note">
        Email your CV to <a href={`mailto:${COMPANY.careersEmail}`}>{COMPANY.careersEmail}</a> with the role
        in the subject line. We review every application received.
      </p>
    </form>
  );
}



