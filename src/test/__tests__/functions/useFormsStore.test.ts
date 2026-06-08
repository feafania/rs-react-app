import { describe, it, expect, beforeEach } from 'vitest';
import {
  useFormsStore,
  type FormSubmission,
} from '../../../store/useFormsStore';

describe('useFormsStore', () => {
  beforeEach(() => {
    useFormsStore.setState({
      submissions: [],
      lastAddedId: null,
    });
  });

  it('should have correct default state values', () => {
    const state = useFormsStore.getState();
    expect(state.submissions).toEqual([]);
    expect(state.lastAddedId).toBeNull();
    expect(state.countries).toContain('Belarus');
    expect(state.countries.length).toBe(8);
  });

  it('should add a new submission and set lastAddedId', () => {
    const mockSubmission: FormSubmission = {
      id: 'test-id-1',
      source: 'uncontrolled',
      createdAt: 123456789,
      name: 'Maxim',
      age: 30,
      gender: 'male',
      image: 'data:image/png;base64,abc',
      email: 'test@test.by',
      password: 'Password1',
      confirmPassword: 'Password1',
      country: 'Belarus',
      termsAccepted: true,
    };

    useFormsStore.getState().addSubmission(mockSubmission);

    const state = useFormsStore.getState();
    expect(state.submissions.length).toBe(1);
    expect(state.submissions[0]).toEqual(mockSubmission);
    expect(state.lastAddedId).toBe('test-id-1');
  });

  it('should prepand new submissions to the beginning of the list', () => {
    const firstSubmission: FormSubmission = {
      id: '1',
      source: 'rhf',
      createdAt: 100,
      name: 'First',
      age: 20,
      gender: 'other',
      image: 'data:image/png;',
      email: '1@test.com',
      password: 'P1',
      confirmPassword: 'P1',
      country: 'Poland',
      termsAccepted: true,
    };

    const secondSubmission: FormSubmission = {
      id: '2',
      source: 'uncontrolled',
      createdAt: 200,
      name: 'Second',
      age: 22,
      gender: 'female',
      image: 'data:image/jpeg;',
      email: '2@test.com',
      password: 'P2',
      confirmPassword: 'P2',
      country: 'Germany',
      termsAccepted: true,
    };

    useFormsStore.getState().addSubmission(firstSubmission);
    useFormsStore.getState().addSubmission(secondSubmission);

    const state = useFormsStore.getState();
    expect(state.submissions.length).toBe(2);
    expect(state.submissions[0]).toEqual(secondSubmission);
    expect(state.submissions[1]).toEqual(firstSubmission);
    expect(state.lastAddedId).toBe('2');
  });
});
