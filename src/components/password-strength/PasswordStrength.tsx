import { getPasswordStrength } from '../../utils/getPasswordStrength.ts';
import './password-strength.css';

type Props = {
  password: string;
};

export function PasswordStrength({ password }: Props) {
  const strength = getPasswordStrength(password);

  return (
    <div className="pw-strength">
      <div className={`pw-item ${strength.hasNumber ? 'ok' : 'bad'}`}>
        <span className="pw-icon">{strength.hasNumber ? '✓' : '✗'}</span>
        Number
      </div>

      <div className={`pw-item ${strength.hasUppercase ? 'ok' : 'bad'}`}>
        <span className="pw-icon">{strength.hasUppercase ? '✓' : '✗'}</span>
        Uppercase
      </div>

      <div className={`pw-item ${strength.hasLowercase ? 'ok' : 'bad'}`}>
        <span className="pw-icon">{strength.hasLowercase ? '✓' : '✗'}</span>
        Lowercase
      </div>

      <div className={`pw-item ${strength.hasSpecial ? 'ok' : 'bad'}`}>
        <span className="pw-icon">{strength.hasSpecial ? '✓' : '✗'}</span>
        Special character
      </div>
    </div>
  );
}
