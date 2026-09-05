import Icon from '@/components/shared/Icon';

/** Shown when a submission fails, so a lost enquiry is never silent. */
export default function FormError({ children, onRetry }) {
  return (
    <div className="form-error" role="alert">
      <Icon name="bell" size={18} />
      <div className="stack">
        <span>{children}</span>
        {onRetry && (
          <button type="button" className="form-error__retry" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
