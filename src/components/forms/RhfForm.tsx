import { useForm } from 'react-hook-form';
import { useFormsStore } from '../../store/useFormsStore';
import type { BaseFormFields } from '../../types/types';
import { createSubmission } from '../../util/createSubmission';
import { FormTypes } from '../../types/types';
import './rhf-form.css';
import { CustomCheckbox } from '../сustom-сheckbox/CustomCheckbox.tsx';

type Props = {
  onSuccess: () => void;
};

export function RhfForm({ onSuccess }: Props) {
  const addSubmission = useFormsStore((state) => state.addSubmission);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<BaseFormFields>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      gender: 'female',
      termsAccepted: false,
    },
  });

  const onSubmit = (data: BaseFormFields) => {
    const submission = createSubmission(FormTypes.rhf, data);

    addSubmission(submission);
    reset();
    onSuccess();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label className="form-label" htmlFor="name">
        Name
        <input
          {...register('name', { required: 'Name is required' })}
          className="form-input"
          placeholder="Your name"
          id="name"
        />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </label>

      <label className="form-label" htmlFor="age">
        Age
        <input
          type="number"
          {...register('age', {
            required: 'Age is required',
            min: { value: 1, message: 'Age must be positive' },
          })}
          className="form-input"
          placeholder="Age"
          id="age"
        />
        {errors.age && <p className="form-error">{errors.age.message}</p>}
      </label>

      <label className="form-label" htmlFor="email">
        Email
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="form-input"
          placeholder="Email"
          id="email"
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </label>

      <label className="form-label" htmlFor="gender">
        Gender
        <select {...register('gender')} className="form-input" id="gender">
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
      </label>

      <CustomCheckbox
        name="termsAccepted"
        label="I accept Terms & Conditions"
        register={register}
      />

      <button type="submit" className="form-submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
