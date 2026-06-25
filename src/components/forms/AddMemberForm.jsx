import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import Button from '../ui/Button.jsx';

// Define Zod Validation Schema
const addMemberSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be under 50 characters' })
    .regex(/^[a-zA-Z\s]*$/, { message: 'Name can only contain letters and spaces' }),
  email: z.string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address' }),
  membershipType: z.enum(['Basic', 'Premium', 'Enterprise']),
});

export const AddMemberForm = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      name: '',
      email: '',
      membershipType: 'Basic',
    },
  });

  const membershipOptions = [
    { value: 'Basic', label: 'Basic ($29/mo)' },
    { value: 'Premium', label: 'Premium ($99/mo)' },
    { value: 'Enterprise', label: 'Enterprise ($299/mo)' },
  ];

  const handleFormSubmit = async (values) => {
    try {
      await onSubmit(values);
      reset(); // Clear the form on successful submission
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">
      <Input
        label="Full Name"
        placeholder="e.g. John Doe"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="e.g. john@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Select
        label="Membership Tier"
        options={membershipOptions}
        error={errors.membershipType?.message}
        {...register('membershipType')}
      />

      <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-805">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          Add Member
        </Button>
      </div>
    </form>
  );
};

export default AddMemberForm;
