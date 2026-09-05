import { useCallback, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{7,16}$/;

/** Validate locally and prepare a draft; delivery happens in the visitor's email app. */
export default function useForm({ initial, required = [] }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const handleChange = useCallback(({ target: { name, value } }) => {
    setValues(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: undefined }));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {};
    required.forEach(name => {
      if (!String(values[name] ?? '').trim()) next[name] = 'This field is required';
    });
    if (values.email && !EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email address';
    if (values.phone && !PHONE_RE.test(values.phone.trim())) next.phone = 'Enter a valid contact number';
    setErrors(next);
    if (Object.keys(next).length) {
      event.currentTarget.elements.namedItem(Object.keys(next)[0])?.focus();
      return;
    }
    setStatus('ready');
  };
  const edit = useCallback(() => setStatus('idle'), []);
  return { values, errors, status, handleChange, handleSubmit, edit };
}
