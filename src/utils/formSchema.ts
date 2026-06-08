import { z } from 'zod';

export const createFormSchema = (countries: string[]) =>
  z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .refine(
          (value) => value.length > 0 && value[0] === value[0].toUpperCase(),
          'First letter must be uppercase'
        ),
      age: z
        .number({ message: 'Age must be a number' })
        .refine((val) => !isNaN(val), 'Age is required')
        .refine((val) => val >= 0, 'Age cannot be negative'),
      gender: z.enum(['female', 'male', 'other']),
      image: z
        .string()
        .min(1, 'Image is required')
        .refine((value) => value.startsWith('data:image/'), {
          message: 'Invalid image format',
        }),
      email: z.string().refine((value) => {
        const parts = value.split('@');
        if (parts.length !== 2) return false;
        if (!parts[0]) return false;
        const domain = parts[1];
        return domain.includes('.') && domain.split('.').every(Boolean);
      }, 'Invalid email'),
      password: z.string().min(1, 'Password is required'),
      confirmPassword: z.string().min(1, 'Confirm password is required'),
      country: z
        .string()
        .min(1, 'Country is required')
        .refine((value) => countries.includes(value), 'Select a valid country'),
      termsAccepted: z.boolean().refine((v) => v === true, {
        message: 'You must accept Terms & Conditions',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

export type FormSchema = z.infer<ReturnType<typeof createFormSchema>>;
