import { useId } from 'react';
import { cn } from '@/utils/cn';

/** Label + control + error, for input, textarea and select. */
export default function FormField({
  label,
  name,
  type = 'text',
  as = 'input',
  options,
  required,
  error,
  className,
  ...rest
}) {
  const Control = as;
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn('field', error && 'field--invalid', className)}>
      <label className="field__label" htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>

      {as === 'select' ? (
        <select id={id} name={name} className="field__control" required={required} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...rest}>
          {options.map((opt) => (
            <option key={opt} value={opt === options[0] ? '' : opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <Control
          id={id}
          name={name}
          type={as === 'input' ? type : undefined}
          className="field__control"
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
      )}

      {error && <span id={errorId} className="field__error" role="alert">{error}</span>}
    </div>
  );
}
