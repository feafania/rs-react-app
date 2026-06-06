import { type FormSubmission, useFormsStore } from '../../store/useFormsStore';
import './uncontrolled-form.css';
import { createSubmission } from '../../util/createSubmission.ts';
import { type BaseFormFields, FormTypes } from '../../types/types.ts';
import { CustomCheckbox } from '../сustom-сheckbox/CustomCheckbox.tsx';

type Props = {
  onSuccess: () => void;
};

export function UncontrolledForm({ onSuccess }: Props) {
  const addSubmission = useFormsStore((state) => state.addSubmission);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const submission: FormSubmission = createSubmission(
      FormTypes.uncontrolled,
      {
        name: String(formData.get('name')),
        age: Number(formData.get('age')),
        email: String(formData.get('email')),
        gender: String(formData.get('gender')) as BaseFormFields['gender'],
        termsAccepted: formData.get('termsAccepted') === 'on',
      }
    );

    addSubmission(submission);

    event.currentTarget.reset();
    onSuccess();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          className="form-input"
          placeholder="Your name"
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="age">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          className="form-input"
          placeholder="Age"
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="email">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          className="form-input"
          placeholder="Email"
        />
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
      </div>

      <CustomCheckbox
        name="termsAccepted"
        label="I accept Terms & Conditions"
      />

      <button type="submit" className="form-submit">
        Submit
      </button>
    </form>
  );
}
