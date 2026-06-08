import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import './custom-checkbox.css';

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;

  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  register?: UseFormRegister<T>;
  error?: boolean;
};

export function CustomCheckbox<T extends FieldValues>({
  label,
  name,
  checked,
  defaultChecked,
  onChange,
  register,
  error,
}: Props<T>) {
  return (
    <label
      className={`custom-checkbox ${error ? 'custom-checkbox-error' : ''}`}
      htmlFor={String(name)}
    >
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
