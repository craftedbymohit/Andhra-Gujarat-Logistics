import { useCallback, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{7,16}$/;

/**
 * Minimal controlled-form helper: values, validation and a submit lifecycle.
 *
 * `onSubmit` receives the validated values. Wire it to the client's CRM,
 * mail service or form endpoint — the default just resolves so the UI works
 * end to end during development.
 */
export default function useForm({ initial, required = [], onSubmit }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }, []);

  const validate = useCallback(() => {
    const next = {};

    required.forEach((name) => {
      if (!String(values[name] ?? '').trim()) next[name] = 'This field is required';
    });

    if (values.email && !EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address';
    if (values.phone && !PHONE_RE.test(values.phone)) next.phone = 'Enter a valid contact number';

    setErrors(next);
    return Object.keys(next).length === 0;
  }, [required, values]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;

      setStatus('submitting');
      setSubmitError('');
      try {
        await (onSubmit ? onSubmit(values) : Promise.resolve());
        setStatus('success');
        setValues(initial);
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

  /** Return to the editable form after a failure, keeping what the user typed. */
  const retry = useCallback(() => {
    setSubmitError('');
    setStatus('idle');
  }, []);

  return { values, errors, status, submitError, handleChange, handleSubmit, reset, retry };
}
