import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddMemberForm from '../components/forms/AddMemberForm';

describe('AddMemberForm', () => {
  it('submits valid member data', async () => {
    const onSubmit = vi.fn(async () => Promise.resolve());
    const onCancel = vi.fn();

    render(<AddMemberForm onSubmit={onSubmit} onCancel={onCancel} isSubmitting={false} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane.doe@example.com');
    await user.selectOptions(screen.getByLabelText(/membership tier/i), 'Enterprise');
    await user.click(screen.getByRole('button', { name: /add member/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      membershipType: 'Enterprise',
    });
  });

  it('shows validation errors for empty fields', async () => {
    const onSubmit = vi.fn(async () => Promise.resolve());
    const onCancel = vi.fn();

    render(<AddMemberForm onSubmit={onSubmit} onCancel={onCancel} isSubmitting={false} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /add member/i }));

    expect(await screen.findByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/email address is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
