import './password-toggle.css';

type Props = {
  visible: boolean;
  onToggle: () => void;
};

export function PasswordToggle({ visible, onToggle }: Props) {
  return (
    <button
      type="button"
      className="pw-toggle"
      onClick={onToggle}
      aria-label={visible ? 'Hide password' : 'Show password'}
    >
      {visible ? '🙈' : '👁️'}
    </button>
  );
}
