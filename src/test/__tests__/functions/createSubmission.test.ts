import { describe, it, expect, vi } from 'vitest';
import { createSubmission } from '../../../utils/createSubmission';
import { FormTypes } from '../../../types/types';

describe('createSubmission', () => {
  it('should return a submission object with correct structure', () => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue(
      '12345678-1234-1234-1234-123456789012' as `${string}-${string}-${string}-${string}-${string}`
    );
    vi.spyOn(Date, 'now').mockReturnValue(123456789);

    const mockData = {
      name: 'Test',
      age: 25,
      gender: 'male' as const,
      image: 'base64',
      email: 'test@test.com',
      password: 'password',
      confirmPassword: 'password',
      country: 'Belarus',
      termsAccepted: true,
    };

    const result = createSubmission(FormTypes.uncontrolled, mockData);

    expect(result).toEqual({
      ...mockData,
      id: '12345678-1234-1234-1234-123456789012',
      source: FormTypes.uncontrolled,
      createdAt: 123456789,
    });
  });
});
