import FormField from './FormField';
import EnquiryDraft from './EnquiryDraft';
import Button from '@/components/buttons/Button';

import useForm from '@/hooks/useForm';
import { BRANCHES } from '@/data/branches';
import { COMPANY } from '@/constants/company';

const INITIAL = { name: '', email: '', phone: '', role: '', location: '', experience: '', message: '' };
const REQUIRED = ['name', 'email', 'phone', 'role'];

export default function ApplicationForm() {
  const { values, errors, status, handleChange, handleSubmit, retry } = useForm({
    initial: INITIAL,
    required: REQUIRED,
  });

  if (status === 'success') {
    return <EnquiryDraft values={values} subject="AGL general application" email={COMPANY.careersEmail} onEdit={retry} application />;
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
          required
        />
        <FormField
          label="Contact number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <FormField
          label="Total experience"
          name="experience"
          value={values.experience}
          onChange={handleChange}
        />
        <FormField
          label="Role applied for"
          name="role"
          as="select"
          options={['Select role', 'General application']}
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
      />

      <Button type="submit">
        Prepare application email
      </Button>

      <p className="form-note">
        This form prepares an email draft for you to send.
        Email your CV to <a href={`mailto:${COMPANY.careersEmail}`}>{COMPANY.careersEmail}</a> with the role
        in the subject line. We review every application received.
      </p>
    </form>
  );
}



