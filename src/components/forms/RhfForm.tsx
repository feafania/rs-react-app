import { Controller, useForm } from 'react-hook-form';
import { useFormsStore } from '../../store/useFormsStore.ts';
import { createSubmission } from '../../utils/createSubmission.ts';
import { FormTypes } from '../../types/types.ts';
import './form.css';
import { CustomCheckbox } from '../custom-checkbox/CustomCheckbox.tsx';
import { PasswordStrength } from '../password-strength/PasswordStrength.tsx';
import { createFormSchema, type FormSchema } from '../../utils/formSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordToggle } from '../password-toggle/PasswordToggle.tsx';
import { useMemo, useState } from 'react';
import { ImageUpload } from '../image-upload/ImageUpload.tsx';

type Props = {
  onSuccess: () => void;
};

export function RhfForm({ onSuccess }: Props) {
  const addSubmission = useFormsStore((state) => state.addSubmission);
  const countries = useFormsStore((state) => state.countries);
  const formSchema = useMemo(() => createFormSchema(countries), [countries]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm<FormSchema>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: undefined,
      gender: 'female',
      image: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      termsAccepted: false,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const submission = createSubmission(FormTypes.rhf, data);

    addSubmission(submission);
    reset();
    onSuccess();
  };
  const password = watch('password');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const termsAccepted = watch('termsAccepted');

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          {...register('name')}
          className={`form-input ${errors.name ? 'form-input-error' : ''}`}
          placeholder="Your name"
          id="name"
        />
        <p className="form-error">{errors.name?.message ?? ''}</p>
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="age">
          Age
        </label>
        <input
          type="number"
          {...register('age', { valueAsNumber: true })}
          className={`form-input ${errors.age ? 'form-input-error' : ''}`}
          placeholder="Age"
          id="age"
        />
        <p className="form-error">{errors.age?.message ?? ''}</p>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="gender">
          Gender
        </label>
        <select {...register('gender')} className="form-input" id="gender">
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-field form-field-full">
        <label className="form-label" htmlFor="image">
          Profile image
        </label>
        <Controller
          name="image"
          control={control}
          rules={{ required: 'Image is required' }}
          render={({ field, fieldState }) => (
            <ImageUpload
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>

      <div className="form-field form-field-full">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          {...register('email')}
          className={`form-input ${errors.email ? 'form-input-error' : ''}`}
          placeholder="Email"
          id="email"
        />
        <p className="form-error">{errors.email?.message ?? ''}</p>
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="password">
          Password
        </label>

        <div className="password-wrapper">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className={`form-input password-input ${
              errors.password ? 'form-input-error' : ''
            }`}
            {...register('password')}
          />
          <PasswordToggle
            visible={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
          />
        </div>

        <PasswordStrength password={password} />
        <p className="form-error">{errors.password?.message ?? ''}</p>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="confirmPassword">
          Confirm password
        </label>

        <div className="password-wrapper">
          <input
            id="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            className={`form-input password-input ${
              errors.confirmPassword ? 'form-input-error' : ''
            }`}
            {...register('confirmPassword')}
          />
          <PasswordToggle
            visible={showConfirm}
            onToggle={() => setShowConfirm((v) => !v)}
          />
        </div>
        <p className="form-error">{errors.confirmPassword?.message ?? ''}</p>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="country">
          Country
        </label>

        <input
          id="country"
          list="countries"
          className={`form-input ${errors.country ? 'form-input-error' : ''}`}
          {...register('country')}
          placeholder="Start typing..."
          onBlur={async () => {
            await trigger('country');
          }}
        />

        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>

        <p className="form-error">{errors.country?.message ?? ''}</p>
      </div>

      <div className="form-field form-field-full">
        <div className="checkbox-row">
          <CustomCheckbox
            name="termsAccepted"
            label="I accept Terms & Conditions"
            register={register}
            error={!!errors.termsAccepted && !termsAccepted}
          />
          {!termsAccepted && !errors.termsAccepted && (
            <span className="form-hint">(Required to continue)</span>
          )}
        </div>
        <p className="form-error">{errors.termsAccepted?.message ?? ''}</p>
      </div>

      {!isValid && (
        <p className="form-summary-error">
          Please complete all required fields.
        </p>
      )}

      <button
        type="submit"
        className="form-submit form-field-full"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
}
