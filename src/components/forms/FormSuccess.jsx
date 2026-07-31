import Icon from '@/components/shared/Icon';

export default function FormSuccess({ children }) {
  return (
    <div className="form-success">
      <Icon name="check" size={18} />
      <span>{children}</span>
    </div>
  );
}
