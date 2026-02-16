import { z } from 'zod';

// Contact Form Validation
export const contactFormSchema = z.object({
  fullName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .regex(/^[+\d\s\-()]+$/, 'Please enter a valid phone number')
    .max(20, 'Phone number must be less than 20 characters')
    .optional()
    .or(z.literal('')),
  telegramHandle: z.string()
    .regex(/^@?[a-zA-Z0-9_]{5,32}$/, 'Telegram handle must be 5-32 alphanumeric characters')
    .optional()
    .or(z.literal('')),
  inquiryType: z.enum(['partnership', 'development', 'investment', 'community', 'technical', 'media', 'other'])
    .optional(),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Member Registration Validation
export const memberRegistrationSchema = z.object({
  cardID: z.string()
    .min(2, 'Card ID must be at least 2 characters')
    .regex(/^\d{2,}$/, 'Card ID must contain only numbers and be at least 2 digits'),
  fullName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z.string()
    .regex(/^[+\d\s\-()]{10,20}$/, 'Please enter a valid phone number'),
  email: z.string()
    .email('Please enter a valid email address'),
  telegram: z.string()
    .regex(/^@?[a-zA-Z0-9_]{5,32}$/, 'Telegram handle must be 5-32 alphanumeric characters')
    .optional()
    .or(z.literal('')),
  role: z.string()
    .max(50, 'Role must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  experience: z.string()
    .max(500, 'Experience must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  interests: z.array(z.string())
    .min(1, 'Please select at least one interest'),
  consent: z.boolean()
    .refine(val => val === true, 'You must consent to data storage'),
});

export type MemberRegistrationData = z.infer<typeof memberRegistrationSchema>;

// Validation helper function
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; error?: string } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: `${firstError.path.join('.')}: ${firstError.message}`,
      };
    }
    return { success: false, error: 'Validation failed' };
  }
}
