import { useCallback, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{7,16}$/;

/** Validate locally and run the form submission lifecycle. */
export default function useForm({ initial, required = [], onSubmit }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [status, setStatus] = useState('idle');

  const handleChange = useCallback(({ target: { name, value } }) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }, []);

  const validate = useCallback(() => {
    const next = {};
    required.forEach((name) => {
      if (!String(values[name] ?? '').trim()) next[name] = 'This field is required';
    });
    if (values.email && !EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email address';
    if (values.phone && !PHONE_RE.test(values.phone.trim())) next.phone = 'Enter a valid contact number';
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [required, values]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!validate()) return;

      setStatus('submitting');
      setSubmitError('');
      try {
        await (onSubmit ? onSubmit(values) : Promise.resolve());
        setStatus('success');
      } catch (error) {
        setSubmitError(error?.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    },
    [initial, onSubmit, validate, values]
  );

  const reset = useCallback(() => {
    setValues(initial);
    setErrors({});
    setSubmitError('');
    setStatus('idle');
  }, [initial]);

  const retry = useCallback(() => {
    setSubmitError('');
    setStatus('idle');
  }, []);

  return { values, errors, status, submitError, handleChange, handleSubmit, reset, retry };
}
