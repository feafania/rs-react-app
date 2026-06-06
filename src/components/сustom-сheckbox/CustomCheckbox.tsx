import { type UseFormRegister } from 'react-hook-form';
import type { BaseFormFields } from '../../types/types';
import './custom-checkbox.css';

type Props = {
  label: string;
  name: keyof BaseFormFields;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  register?: UseFormRegister<BaseFormFields>;
};

export function CustomCheckbox({
  label,
  name,
  checked,
  defaultChecked,
  onChange,
  register,
}: Props) {
  return (
    <label className="custom-checkbox" htmlFor={String(name)}>
      <input
        id={String(name)}
        type="checkbox"
        {...(register
          ? register(name)
          : { name, checked, defaultChecked, onChange })}
      />

      <span className="checkbox-box" />

      <span className="checkbox-label">{label}</span>
    </label>
  );
}
