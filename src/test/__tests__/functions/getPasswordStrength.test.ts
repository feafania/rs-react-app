import { describe, it, expect } from 'vitest';
import { getPasswordStrength } from '../../../utils/getPasswordStrength';

describe('getPasswordStrength', () => {
  it('should return all false for an empty password', () => {
    const result = getPasswordStrength('');
    expect(result).toEqual({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: false,
      hasSpecial: false,
    });
  });

  it('should detect numbers correctly', () => {
    const result = getPasswordStrength('123');
    expect(result.hasNumber).toBe(true);
    expect(result.hasUppercase).toBe(false);
    expect(result.hasLowercase).toBe(false);
    expect(result.hasSpecial).toBe(false);
  });

  it('should detect uppercase letters correctly', () => {
    const result = getPasswordStrength('ABC');
    expect(result.hasNumber).toBe(false);
    expect(result.hasUppercase).toBe(true);
    expect(result.hasLowercase).toBe(false);
    expect(result.hasSpecial).toBe(false);
  });

  it('should detect lowercase letters correctly', () => {
    const result = getPasswordStrength('abc');
    expect(result.hasNumber).toBe(false);
    expect(result.hasUppercase).toBe(false);
    expect(result.hasLowercase).toBe(true);
    expect(result.hasSpecial).toBe(false);
  });

  it('should detect special characters correctly', () => {
    const result = getPasswordStrength('!@#');
    expect(result.hasNumber).toBe(false);
    expect(result.hasUppercase).toBe(false);
    expect(result.hasLowercase).toBe(false);
    expect(result.hasSpecial).toBe(true);
  });

  it('should return all true for a strong password', () => {
    const result = getPasswordStrength('SecureP@ss123');
    expect(result).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecial: true,
    });
  });
});
