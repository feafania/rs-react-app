import { getErrorMessage } from '../../../api/errors.ts';

describe('getErrorMessage', () => {
  it('returns 404 message', () => {
    expect(getErrorMessage(404)).toBe('Requested data was not found.');
  });

  it('returns 500 message', () => {
    expect(getErrorMessage(500)).toBe('Please try again later.');
  });

  it('returns default message', () => {
    expect(getErrorMessage(418)).toBe(
      'Something went wrong. Please try again later.'
    );
  });
});
