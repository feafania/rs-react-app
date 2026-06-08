import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useFormsStore } from '../../../store/useFormsStore';
import { FormTypes } from '../../../types/types';
import { SubmissionsList } from '../../../components/forms/submissions-list/SubmissionsList.tsx';

describe('SubmissionsList', () => {
  beforeEach(() => {
    useFormsStore.setState({
      submissions: [],
      lastAddedId: null,
    });
  });

  it('should render empty state message when there are no submissions', () => {
    render(<SubmissionsList />);
    expect(screen.getByText('No submissions yet')).toBeInTheDocument();
  });

  it('should render a list of submissions', () => {
    useFormsStore.setState({
      submissions: [
        {
          id: '1',
          name: 'Ivan',
          email: 'ivan@test.com',
          age: 25,
          gender: 'male',
          country: 'Belarus',
          source: FormTypes.uncontrolled,
          image: 'data:image/png;base64,mock',
          termsAccepted: true,
          password: 'password',
          confirmPassword: 'password',
          createdAt: Date.now(),
        },
      ],
    });

    render(<SubmissionsList />);

    expect(screen.getByText('Ivan')).toBeInTheDocument();
    expect(screen.getByText('ivan@test.com')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Belarus')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'data:image/png;base64,mock'
    );
  });

  it('should apply new-card class to the most recently added submission', () => {
    useFormsStore.setState({
      submissions: [
        {
          id: '1',
          name: 'Ivan',
          email: 'ivan@test.com',
          age: 25,
          gender: 'male',
          country: 'Belarus',
          source: FormTypes.uncontrolled,
          image: 'data:image/png;base64,mock',
          termsAccepted: true,
          password: '1',
          confirmPassword: '1',
          createdAt: Date.now(),
        },
        {
          id: '2',
          name: 'Petr',
          email: 'petr@test.com',
          age: 30,
          gender: 'male',
          country: 'Poland',
          source: FormTypes.rhf,
          image: 'data:image/png;base64,mock',
          termsAccepted: true,
          password: '1',
          confirmPassword: '1',
          createdAt: Date.now(),
        },
      ],
      lastAddedId: '2',
    });

    render(<SubmissionsList />);

    const cards = screen.getAllByRole('article');
    expect(cards[0]).not.toHaveClass('new-card');
    expect(cards[1]).toHaveClass('new-card');
  });
});
