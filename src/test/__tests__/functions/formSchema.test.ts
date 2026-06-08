import { describe, it, expect } from 'vitest';
import { createFormSchema } from '../../../utils/formSchema';

describe('formSchema validation', () => {
  const mockCountries = ['Belarus', 'Poland', 'Lithuania'];
  const schema = createFormSchema(mockCountries);

  const validData = {
    name: 'Ivan',
    age: 25,
    gender: 'male' as const,
    image: 'data:image/png;base64,abcdef',
    email: 'test@example.com',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    country: 'Belarus',
    termsAccepted: true,
  };

  it('should validate successfully with correct data', () => {
    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('name field', () => {
    it('should fail if name is empty', () => {
      const result = schema.safeParse({ ...validData, name: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name is required');
      }
    });

    it('should fail if first letter is lowercase', () => {
      const result = schema.safeParse({ ...validData, name: 'ivan' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'First letter must be uppercase'
        );
      }
    });
  });

  describe('age field', () => {
    it('should fail if age is negative', () => {
      const result = schema.safeParse({ ...validData, age: -5 });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Age cannot be negative');
      }
    });

    it('should fail if age is NaN', () => {
      const result = schema.safeParse({ ...validData, age: NaN });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Age must be a number');
      }
    });
  });

  describe('gender field', () => {
    it('should fail if gender is invalid', () => {
      const result = schema.safeParse({ ...validData, gender: 'unknown' });
      expect(result.success).toBe(false);
    });
  });

  describe('image field', () => {
    it('should fail if image does not start with data:image/', () => {
      const result = schema.safeParse({
        ...validData,
        image: 'bad-path/image.png',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid image format');
      }
    });
  });

  describe('email field (custom step-by-step logic)', () => {
    it('should fail if email does not contain @', () => {
      const result = schema.safeParse({
        ...validData,
        email: 'testexample.com',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email');
      }
    });

    it('should fail if email has multiple @ symbols', () => {
      const result = schema.safeParse({
        ...validData,
        email: 'test@sub@example.com',
      });
      expect(result.success).toBe(false);
    });

    it('should fail if local part before @ is empty', () => {
      const result = schema.safeParse({ ...validData, email: '@example.com' });
      expect(result.success).toBe(false);
    });

    it('should fail if domain part does not contain a dot', () => {
      const result = schema.safeParse({ ...validData, email: 'test@example' });
      expect(result.success).toBe(false);
    });

    it('should fail if domain has empty parts between dots', () => {
      const result = schema.safeParse({
        ...validData,
        email: 'test@example..com',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('password field & confirmPassword matching', () => {
    it('should fail if password is empty', () => {
      const result = schema.safeParse({
        ...validData,
        password: '',
        confirmPassword: '',
      });
      expect(result.success).toBe(false);
    });

    it('should fail if passwords do not match', () => {
      const result = schema.safeParse({
        ...validData,
        confirmPassword: 'DifferentPassword123!',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues[0];
        expect(error.message).toBe('Passwords do not match');
        expect(error.path).toContain('confirmPassword');
      }
    });
  });

  describe('country field', () => {
    it('should fail if country is not in the allowed list', () => {
      const result = schema.safeParse({ ...validData, country: 'USA' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Select a valid country');
      }
    });
  });

  describe('termsAccepted field', () => {
    it('should fail if terms are not accepted', () => {
      const result = schema.safeParse({ ...validData, termsAccepted: false });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'You must accept Terms & Conditions'
        );
      }
    });
  });
});
