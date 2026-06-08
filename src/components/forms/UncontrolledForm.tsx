import {
  type FormSubmission,
  useFormsStore,
} from '../../store/useFormsStore.ts';
import './form.css';
import { createSubmission } from '../../utils/createSubmission.ts';
import { FormTypes } from '../../types/types.ts';
import { CustomCheckbox } from '../custom-checkbox/CustomCheckbox.tsx';
import { useState, useMemo } from 'react';
import { PasswordStrength } from '../password-strength/PasswordStrength.tsx';
import { PasswordToggle } from '../password-toggle/PasswordToggle.tsx';
import { createFormSchema } from '../../utils/formSchema.ts';
import { fileToBase64 } from '../../utils/fileToBase64.ts';
import { UncontrolledImageUpload } from '../image-upload/UncontrolledImageUpload.tsx';

type Props = {
  onSuccess: () => void;
};

export function UncontrolledForm({ onSuccess }: Props) {
  const addSubmission = useFormsStore((state) => state.addSubmission);
  const countries = useFormsStore((state) => state.countries);

  const formSchema = useMemo(() => createFormSchema(countries), [countries]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const currentForm = event.currentTarget;
    const formData = new FormData(currentForm);

    const imageFile = formData.get('image') as File;
    let imageBase64 = '';
    if (imageFile && imageFile.size > 0) {
      imageBase64 = await fileToBase64(imageFile);
    }

    const rawData = {
      name: String(formData.get('name')),
      age: formData.get('age') === '' ? undefined : Number(formData.get('age')),
      gender: String(formData.get('gender')),
      image: imageBase64,
      email: String(formData.get('email')),
      password: String(formData.get('password')),
      confirmPassword: String(formData.get('confirmPassword')),
      country: String(formData.get('country')),
      termsAccepted: formData.get('termsAccepted') === 'on',
    };

    const result = formSchema.safeParse(rawData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path) {
          formattedErrors[path.toString()] = issue.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    const submission: FormSubmission = createSubmission(
      FormTypes.uncontrolled,
      result.data
    );

    addSubmission(submission);
    currentForm.reset();
    setPassword('');
    onSuccess();
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          className={`form-input ${errors.name ? 'form-input-error' : ''}`}
          placeholder="Your name"
        />
        <p className="form-error">{errors.name ?? ''}</p>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="age">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          className={`form-input ${errors.age ? 'form-input-error' : ''}`}
          placeholder="Age"
        />
        <p className="form-error">{errors.age ?? ''}</p>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="gender">
          Gender
        </label>
        <select id="gender" name="gender" className="form-input">
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        <p className="form-error"></p>
      </div>

      <div className="form-field form-field-full">
        <label className="form-label" htmlFor="image">
          Profile image
        </label>
        <UncontrolledImageUpload error={errors.image} />
      </div>

      <div className="form-field form-field-full">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`form-input ${errors.email ? 'form-input-error' : ''}`}
          placeholder="Email"
        />
        <p className="form-error">{errors.email ?? ''}</p>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <div className="password-wrapper">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            className={`form-input password-input ${errors.password ? 'form-input-error' : ''}`}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordToggle
            visible={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
          />
        </div>
        <PasswordStrength password={password} />
        <p className="form-error">{errors.password ?? ''}</p>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="confirmPassword">
          Confirm password
        </label>
        <div className="password-wrapper">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            className={`form-input password-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
          />
          <PasswordToggle
            visible={showConfirm}
            onToggle={() => setShowConfirm((v) => !v)}
          />
        </div>
        <p className="form-error">{errors.confirmPassword ?? ''}</p>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="country">
          Country
        </label>
        <input
          list="countries"
          id="country"
          name="country"
          className={`form-input ${errors.country ? 'form-input-error' : ''}`}
          placeholder="Start typing..."
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <p className="form-error">{errors.country ?? ''}</p>
      </div>

      <div className="form-field form-field-full">
        <div className="checkbox-row">
          <CustomCheckbox
            name="termsAccepted"
            label="I accept Terms & Conditions"
            error={!!errors.termsAccepted}
          />
        </div>
        <p className="form-error">{errors.termsAccepted ?? ''}</p>
      </div>

      {Object.keys(errors).length > 0 && (
        <p className="form-summary-error">
          Please complete all required fields correctly.
        </p>
      )}

      <button type="submit" className="form-submit form-field-full">
        Submit
      </button>
    </form>
  );
}
